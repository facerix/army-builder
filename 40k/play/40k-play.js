import DataStore from '/src/DataStore.js';
import { h } from '/src/domUtils.js';
import '/components/UpdateNotification.js';
import { get40kArmyData } from '../army-data-loader.js';
import { FACTION_NAMES } from '/40k/army-data/factions.js';
import { serviceWorkerManager } from '/src/ServiceWorkerManager.js';
import { buildDisplayUnit } from '/src/40k-unit-utils.js';

// this will eventually go somewhere else
const UNIT_CARD_DATA = {
  Necrons: {
    'Skorpekh Destroyers': {
      stats: [8, 6, 3, 3, 7, 2],
      weapons: [{ name: 'Skorpekh hyperphase weapons', type: 'Melee', profile: [4, 3, 7, -2, 2] }],
      abilities: [
        {
          name: 'Whirling Onslaught',
          description:
            'Each time a model in this unit makes a melee attack, re-roll a Hit roll of 1. If this unit made a Charge move this turn, you can re-roll the Hit roll instead.',
        },
      ],
    },
    Immortals: {
      stats: [5, 5, 3, 1, 7, 2],
      weapons: [
        {
          name: 'Gauss blaster',
          type: 'Ranged',
          profile: [24, 2, 3, 5, -1, 1],
          tags: ['Lethal Hits'],
        },
        {
          name: 'Tesla carbine',
          type: 'Ranged',
          profile: [24, 2, 3, 5, 0, 1],
          tags: ['Assault', 'Sustained Hits 2'],
        },
        { name: 'Close combat weapon', type: 'Melee', profile: [2, 3, 4, 0, 1] },
      ],
    },
    SHARED: {
      wargear: [
        {
          name: 'Plasmacyte',
          description:
            'Once per battle for each Plasmacyte this unit has, when this unit is selected to fight, you can use this ability. If you do, until the end of the phase, melee weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability.',
        },
      ],
    },
  },
};

const get40kDatacardData = (unitName, factionName) => {
  return {
    ...UNIT_CARD_DATA[factionName]?.[unitName],
  };
};

const get40kSharedDatacardData = factionName => {
  return UNIT_CARD_DATA[factionName]?.['SHARED'] || {};
};

/**
 * Normalizes unit data for datacard generation into a consistent structure
 * @param {Object} unit - Display unit from buildDisplayUnit
 * @param {Object} datacardData - Datacard metadata (stats, weapons, abilities, wargear)
 * @param {Object} sharedData - SHARED datacard data for looking up descriptions/details
 * @returns {Object} Normalized unit structure
 */
const normalizeUnitForDatacard = (unit, datacardData, sharedData = {}) => {
  const normalized = {
    id: unit.id,
    name: unit.name,
    points: unit.points || 0,
    modelCount: unit.modelCount || 1,
    tags: unit.tags || [],
    weapons: [],
    wargear: [],
    abilities: [],
    rules: [],
  };

  // Extract arrays once to avoid repeated property access
  const unitWeapons = unit?.weapons || [];
  const weaponMetadata = datacardData?.weapons || [];
  const sharedWeapons = sharedData?.weapons || [];
  const unitWargear = unit?.wargear || [];
  const wargearMetadata = datacardData?.wargear || [];
  const sharedWargear = sharedData?.wargear || [];
  const sharedRules = sharedData?.rules || [];

  // Create Maps for O(1) lookups instead of O(n) find() calls
  const weaponMetadataMap = new Map(weaponMetadata.map(w => [w.name, w]));
  const sharedWeaponsMap = new Map(sharedWeapons.map(w => [w.name, w]));
  const wargearMetadataMap = new Map(wargearMetadata.map(w => [w.name, w]));
  const sharedWargearMap = new Map(sharedWargear.map(w => [w.name, w]));
  const sharedRulesMap = new Map(sharedRules.map(r => [r.name, r]));

  // Normalize weapons: merge unit weapons with datacard metadata
  if (unitWeapons.length === 0 && weaponMetadata.length > 0) {
    // No unit weapons specified, use all metadata weapons
    normalized.weapons = weaponMetadata.map(w => ({
      name: w.name,
      description: w.description || '',
      count: w.count || 1,
      type: w.type,
      profile: w.profile,
      tags: w.tags,
    }));
  } else {
    // Match unit weapons with metadata (check unit-specific first, then SHARED)
    for (const weapon of unitWeapons) {
      const metadata = weaponMetadataMap.get(weapon.name);
      const sharedMetadata = sharedWeaponsMap.get(weapon.name);
      normalized.weapons.push({
        name: weapon.name,
        description:
          metadata?.description || sharedMetadata?.description || weapon.description || '',
        count: weapon.count || metadata?.count || sharedMetadata?.count || 1,
        type: metadata?.type || sharedMetadata?.type,
        profile: metadata?.profile || sharedMetadata?.profile,
        tags: metadata?.tags || sharedMetadata?.tags,
      });
    }
  }

  // Normalize wargear: merge unit wargear with datacard metadata
  // Only include wargear that exists on the unit, but look up descriptions from SHARED
  if (unitWargear.length === 0 && wargearMetadata.length > 0) {
    // No unit wargear specified, use all unit-specific metadata wargear (not SHARED)
    normalized.wargear = wargearMetadata.map(w => ({
      name: w.name,
      description: w.description || '',
    }));
  } else {
    // Match unit wargear with metadata (check unit-specific first, then SHARED for lookups)
    for (const wg of unitWargear) {
      const metadata = wargearMetadataMap.get(wg.name);
      const sharedMetadata = sharedWargearMap.get(wg.name);
      normalized.wargear.push({
        name: wg.name,
        description: metadata?.description || sharedMetadata?.description || wg.description || '',
      });
    }
  }

  // Normalize abilities from datacard data (unit-specific only, SHARED is for lookups)
  normalized.abilities = (datacardData?.abilities || []).map(a => ({
    name: a.name,
    description: a.description || '',
  }));

  // Normalize rules (if any exist in the future)
  normalized.rules = (datacardData?.rules || []).map(r => {
    // Look up description from SHARED if not in unit-specific data
    const sharedRule = sharedRulesMap.get(r.name);
    return {
      name: r.name,
      description: r.description || sharedRule?.description || '',
    };
  });

  return normalized;
};

const NameAndDescription = ability => {
  return h('div', { className: 'ability-profile' }, [
    h('strong', { innerText: `${ability.name}: ` }),
    h('span', { innerText: ability.description }),
  ]);
};

const datacardStat = (label, value) => {
  return h('datacard-stat', {}, [
    h('span', { className: 'stat-label', innerText: label }),
    h('span', { className: 'stat-value', innerText: `${value}` }),
  ]);
};

// Cache default profile array to avoid recreating on each call
const DEFAULT_PROFILE = ['-', '-', '-', '-', '-', '-', '-'];

const weaponProfile = weapon => {
  const { name, type = 'Melee', profile = DEFAULT_PROFILE } = weapon;
  const [range, a, ws, s, ap, d] = type === 'Ranged' ? profile : [type, ...profile];
  const columns = [h('td', { className: 'attack-name', innerText: name })];
  if (type === 'Ranged') {
    columns.push(h('td', { className: 'stat', innerText: `${range}"` }));
  }
  columns.push(h('td', { className: 'stat', innerText: a }));
  columns.push(h('td', { className: 'stat', innerText: `${ws}+` }));
  columns.push(h('td', { className: 'stat', innerText: s }));
  columns.push(h('td', { className: 'stat', innerText: ap }));
  columns.push(h('td', { className: 'stat', innerText: d }));
  return h('tr', { className: 'attack-profile' }, columns);
};

const buildDatacard = (normalizedUnit, unitDatacardData) => {
  // card header
  const headerContents = [h('h3', { innerText: normalizedUnit.name })];
  const stats = unitDatacardData?.stats;
  if (stats) {
    headerContents.push(
      h('datacard-stat-line', {}, [
        datacardStat('M', stats[0]),
        datacardStat('T', stats[1]),
        datacardStat('Sv', `${stats[2]}+`),
        datacardStat('W', stats[3]),
        datacardStat('Ld', `${stats[4]}+`),
        datacardStat('OC', stats[5]),
      ])
    );
  } else {
    headerContents.push(h('p', { innerText: '[Missing unit stats]' }));
  }

  // weapons - use normalized weapons
  const meleeAttacks = [];
  const rangedAttacks = [];
  const attackProfiles = [];
  normalizedUnit.weapons.forEach(w => {
    if (w.type === 'Melee') {
      meleeAttacks.push(weaponProfile(w));
    } else if (w.type === 'Ranged') {
      rangedAttacks.push(weaponProfile(w));
    }
  });

  if (rangedAttacks.length > 0) {
    attackProfiles.push(
      h('table', { className: 'attack-profile-table' }, [
        h('thead', {}, [
          h('tr', {}, [
            h('th', { className: 'title' }, [
              h('img', { src: '/images/rangedWeapon.svg', alt: 'ranged icon', title: 'Ranged' }),
              h('span', { innerText: 'Ranged Weapons' }),
            ]),
            h('th', { className: 'stat', innerText: 'Range' }),
            h('th', { className: 'stat', innerText: 'A' }),
            h('th', { className: 'stat', innerText: 'WS' }),
            h('th', { className: 'stat', innerText: 'S' }),
            h('th', { className: 'stat', innerText: 'AP' }),
            h('th', { className: 'stat', innerText: 'D' }),
          ]),
        ]),
        h('tbody', {}, rangedAttacks),
      ])
    );
  }
  if (meleeAttacks.length > 0) {
    attackProfiles.push(
      h('table', { className: 'attack-profile-table' }, [
        h('thead', {}, [
          h('tr', {}, [
            h('th', { className: 'title' }, [
              h('img', { src: '/images/meleeWeapon.svg', alt: 'melee icon', title: 'Melee' }),
              h('span', { innerText: 'Melee Weapons' }),
            ]),
            h('th', { className: 'stat', innerText: 'A' }),
            h('th', { className: 'stat', innerText: 'WS' }),
            h('th', { className: 'stat', innerText: 'S' }),
            h('th', { className: 'stat', innerText: 'AP' }),
            h('th', { className: 'stat', innerText: 'D' }),
          ]),
        ]),
        h('tbody', {}, meleeAttacks),
      ])
    );
  }

  // Use normalized abilities, wargear, and rules
  const card = h('data-card', {}, [
    h('header', {}, headerContents),
    h('section', { className: 'body' }, [
      h('div', { className: 'attack-profiles' }, [
        ...attackProfiles,
        h('details', {}, [
          h('summary', { innerText: 'Debug' }),
          h('pre', { innerText: JSON.stringify(normalizedUnit, null, 2) }),
        ]),
      ]),
      h('aside', {}, [
        ...(normalizedUnit.abilities.length > 0
          ? [
              h('h4', { innerText: 'Abilities' }),
              ...normalizedUnit.abilities.map(NameAndDescription),
            ]
          : []),
        ...(normalizedUnit.wargear.length > 0
          ? [h('h4', { innerText: 'Wargear' }), ...normalizedUnit.wargear.map(NameAndDescription)]
          : []),
        ...(normalizedUnit.rules.length > 0
          ? [h('h4', { innerText: 'Rules' }), ...normalizedUnit.rules.map(NameAndDescription)]
          : []),
        h('h4', { innerText: 'Unit Composition' }),
        h('p', {}, [
          h('strong', { innerText: 'Model Count: ' }),
          h('span', { innerText: normalizedUnit.modelCount || 1 }),
        ]),
      ]),
    ]),
    h('footer', {}, [
      h('p', { innerText: `Keywords: ${normalizedUnit.tags?.join(', ') || 'None'}` }),
    ]),
  ]);
  card.dataset.id = normalizedUnit.id;
  return card;
};

const whenLoaded = Promise.all([customElements.whenDefined('update-notification')]);

const getTotalPoints = list => {
  if (list.units) {
    // New format: single units array
    return list.units.reduce(reducer, 0);
  } else {
    // Old format: three separate arrays (for migration)
    const chars = (list.characters || []).reduce(reducer, 0);
    const bl = (list.battleline || []).reduce(reducer, 0);
    const other = (list.otherUnits || []).reduce(reducer, 0);
    return chars + bl + other;
  }
};

whenLoaded.then(async () => {
  // Set up update notification
  const updateNotification = document.querySelector('update-notification');

  // Listen for service worker updates
  window.addEventListener('sw-update-available', event => {
    console.log('Service worker update available, showing notification');
    updateNotification.show(event.detail.pendingWorker);
  });

  const urlParams = new URL(window.location).searchParams;
  const id = urlParams.get('id');
  const faction = urlParams.get('faction');
  const factionName = FACTION_NAMES[faction];

  let armyList;
  let armyData;
  let datacardData = new Map();
  let cachedDisplayUnits = null; // Cache display units as Map<unitId, displayUnit> - needed for points calculation and as input to normalization
  let cachedNormalizedUnits = new Map(); // Cache normalized units as Map<unitId, normalizedUnit> to avoid re-normalization
  let isInitialized = false; // Flag to prevent double initialization

  // Load army data asynchronously
  if (factionName) {
    try {
      armyData = await get40kArmyData(factionName);

      // If armyList is already loaded but not yet initialized, initialize now
      // This handles the case where armyData loads before DataStore fires "init" event
      if (armyList && !isInitialized) {
        await init();
      }
    } catch (error) {
      console.error('Failed to load army data:', error);
      alert(`Failed to load faction data: ${error.message}`);
    }
  }

  // Initialize service worker
  serviceWorkerManager.register();

  const armyName = document.querySelector('#armyName');
  const detachmentName = document.querySelector('#detachment');
  const totalPoints = document.querySelector('#totalPoints');
  const datacardsContainer = document.querySelector('#datacardContainer');
  const unitNamesSelect = document.querySelector('#unitNames');

  unitNamesSelect.addEventListener('change', evt => {
    const unitId = evt.target.value;
    const unit = cachedDisplayUnits?.get(unitId);

    if (unit && faction) {
      // Check cache first, normalize only if not cached
      let normalizedUnit = cachedNormalizedUnits.get(unitId);
      let unitDatacardData;

      if (!normalizedUnit) {
        unitDatacardData = get40kDatacardData(unit.name, factionName);
        const sharedDatacardData = get40kSharedDatacardData(factionName);
        normalizedUnit = normalizeUnitForDatacard(unit, unitDatacardData, sharedDatacardData);
        cachedNormalizedUnits.set(unitId, normalizedUnit);
      } else {
        // Still need datacard data for stats and buildDatacard
        unitDatacardData = get40kDatacardData(unit.name, factionName);
      }

      datacardsContainer.innerHTML = '';
      if (!unitDatacardData || Object.keys(unitDatacardData).length === 0) {
        datacardsContainer.append(
          h('p', {
            className: 'warning',
            innerText:
              'No datacard data found for this unit; have you uploaded the datacard data for this faction?',
          })
        );
      }
      datacardsContainer.append(buildDatacard(normalizedUnit, unitDatacardData));
    }
  });

  const init = async () => {
    // Prevent double initialization - set flag immediately to prevent race condition
    if (isInitialized) {
      return;
    }

    // Set flag immediately to prevent concurrent initialization
    isInitialized = true;

    // Ensure armyData is loaded
    if (factionName && !armyData) {
      try {
        armyData = await get40kArmyData(factionName);
      } catch (error) {
        console.error('Failed to load army data:', error);
        alert(`Failed to load faction data: ${error.message}`);
        isInitialized = false; // Reset flag on error to allow retry
        return;
      }
    }

    if (armyList && armyData) {
      const displayUnits = Array.from(buildDisplayUnits().values()) || [];
      // calculate points
      console.log('calculating points');
      if (armyList?.units?.length) {
        const total = displayUnits.reduce((acc, curr) => acc + curr.points, 0);
        totalPoints.innerText = `${total} points`;
      }

      render();
      document.querySelector('body').classList.remove('loading');
    } else {
      // Reset flag if we can't initialize yet
      isInitialized = false;
    }
  };

  const buildDisplayUnits = () => {
    if (armyList?.units && armyData && !cachedDisplayUnits) {
      cachedDisplayUnits = new Map();
      const displayUnits = armyList.units
        .map(u =>
          buildDisplayUnit(u, armyData, armyList.detachment, { applyWeaponWargearOptions: true })
        )
        .filter(u => u !== null)
        .sort((a, b) => a.name.localeCompare(b.name));
      displayUnits.forEach(unit => {
        cachedDisplayUnits.set(unit.id, unit);
      });
    }
    return cachedDisplayUnits;
  };

  const render = () => {
    armyName.innerText = armyList.name;
    detachmentName.innerText = armyList.detachment;
    buildDisplayUnits();
    datacardsContainer.innerHTML = '';
    cachedDisplayUnits.forEach(unit => {
      unitNamesSelect.append(h('option', { value: unit.id, innerText: unit.name }));
    });
    unitNamesSelect.size = cachedDisplayUnits.size;
  };

  const getDetachmentOptions = (armyData, detachment) => {
    return {
      enhancements: armyData.detachments[detachment]?.enhancements || [],
    };
  };

  DataStore.init();

  DataStore.addEventListener('change', async evt => {
    switch (evt.detail.changeType) {
      case 'init':
        if (evt.detail.items.length) {
          armyList = DataStore.getItemById(id);
        }
        if (!armyList) {
          alert('No army list found for this ID');
          break;
        }
        await init();
        break;
      default:
        // no action to take otherwise
        break;
    }
  });
});
