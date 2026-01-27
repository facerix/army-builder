import DataStore from '/src/DataStore.js';
import { h } from '/src/domUtils.js';
import '/components/UpdateNotification.js';
import { get40kArmyData } from '../army-data-loader.js';
import { FACTION_NAMES } from '/40k/army-data/factions.js';
import { serviceWorkerManager } from '/src/ServiceWorkerManager.js';

// this will eventually go somewhere else
const UNIT_CARD_DATA = {
  'Necrons': {
    'Skorpekh Destroyers': {
      stats: [8, 6, 3, 3, 7, 2],
      weapons: [
        { name: 'Skorpekh hyperphase weapons', type: 'Melee', profile: [4, 3, 7, -2, 2]}
      ],
      abilities: [
        { name: 'Whirling Onslaught', description: 'Each time a model in this unit makes a melee attack, re-roll a Hit roll of 1. If this unit made a Charge move this turn, you can re-roll the Hit roll instead.' }
      ],
    },
    'Immortals': {
      stats: [5, 5, 3, 1, 7, 2],
      weapons: [
        { name: 'Gauss blaster', type: 'Ranged', profile: [24, 2, 3, 5, -1, 1], tags: ["Lethal Hits"] },
        { name: 'Tesla carbine', type: 'Ranged', profile: [24, 2, 3, 5, 0, 1], tags: ["Assault", "Sustained Hits 2"] },
        { name: 'Close combat weapon', type: 'Melee', profile: [2, 3, 4, 0, 1] },
      ]
    },
    'SHARED': {
      wargear: [
        { name: 'Plasmacyte', description: 'Once per battle for each Plasmacyte this unit has, when this unit is selected to fight, you can use this ability. If you do, until the end of the phase, melee weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability.' }
      ]
    }
  }
};

const get40kDatacardData = (unitName, factionName) => {
  const unitData = {
    ...UNIT_CARD_DATA[factionName]?.[unitName]
  };
  return unitData;
};

const getEquippedWeapons = (unitWeapons = [], unitWeaponMetadata = []) => {
  const equipped = [];
  if (!unitWeapons?.length) {
    // unit builder didn't specify any weapons because there are no options; use all available weapons
    equipped.push(...unitWeaponMetadata);
  } else {
    unitWeapons.forEach(weapon => {
      const metadata = unitWeaponMetadata.find(m => m.name === weapon.name);
      if (metadata) {
        equipped.push({ ...weapon, ...metadata });
      }
    });
  }
  return equipped;
}

const NameAndDescription = (ability) => {
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

const weaponProfile = (weapon) => {
  const { name, type = 'Melee', profile = '-------'.split('') } = weapon;
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

const buildDatacard = (unit, unitDatacardData) => {
  // card header
  const headerContents = [h('h3', { innerText: unit.name })];
  const stats = unitDatacardData?.stats;
  if (stats) {
    headerContents.push(h('datacard-stat-line', {}, [
      datacardStat('M', stats[0]),
      datacardStat('T', stats[1]),
      datacardStat('Sv', `${stats[2]}+`),
      datacardStat('W', stats[3]),
      datacardStat('Ld', `${stats[4]}+`),
      datacardStat('OC', stats[5]),
    ]));
  } else {
    headerContents.push(h('p', { innerText: '[Missing unit stats]' }));
  }

  // weapons
  const meleeAttacks = [];
  const rangedAttacks = [];
  const attackProfiles = [];
  const weapons = getEquippedWeapons(unit?.weapons, unitDatacardData?.weapons);
  if (weapons.length > 0) {
    weapons.forEach(w => {
      if (w.type === 'Melee') {
        meleeAttacks.push(weaponProfile(w));
      } else {
        rangedAttacks.push(weaponProfile(w));
      }
    });
  }
  if (rangedAttacks.length > 0) {
    attackProfiles.push(h('table', { className: 'attack-profile-table' }, [
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
    ]));
  }
  if (meleeAttacks.length > 0) {
    attackProfiles.push(h('table', { className: 'attack-profile-table' }, [
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
    ]));
  }

  // abilities
  const abilities = unitDatacardData?.abilities ?? [];

  // wargear
  const wargear = getEquippedWeapons(unit?.wargear, unitDatacardData?.wargear);
  
  const card = h('data-card', {}, [
    h('header', {}, headerContents),
    h('section', { className: 'body' }, [
      h('div', { className: 'attack-profiles' }, [
        ...attackProfiles,
        h('details', {}, [
          h('summary', { innerText: 'Debug' }),
          h('pre', { innerText: JSON.stringify(unit, null, 2) }),
        ]),
      ]),
      h('aside', {}, [
        h('h4', { innerText: 'Abilities' }),
        ...abilities.map(NameAndDescription),
        ...(wargear?.length > 0
          ? [
              h('h4', { innerText: 'Wargear' }),
              ...wargear.map(NameAndDescription),
            ]
          : []),
        h('h4', { innerText: 'Unit Composition' }),
        h('p', {}, [
          h('strong', { innerText: 'Model Count: ' }),
          h('span', { innerText: unit?.modelCount }),
        ]),
      ]),
    ]),
    h('footer', {}, [h('p', { innerText: `Keywords: ${unit.tags.join(', ')}` })]),
  ]);
  card.dataset.id = unit.id;
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
  let cachedDisplayUnits = null; // Cache display units as Map<unitId, displayUnit> for O(1) lookups
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
    const unitDatacardData = get40kDatacardData(unit.name, factionName);
    
    if (unit && faction) {
      datacardsContainer.innerHTML = '';
      if (!unitDatacardData) {
        datacardsContainer.append(
          h('p', {
            className: 'warning',
            innerText:
              'No datacard data found for this unit; have you uploaded the datacard data for this faction?',
          })
        );
      }
      datacardsContainer.append(
        buildDatacard({ ...unit, faction }, unitDatacardData)
      );
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
        .map(u => buildDisplayUnit(u, armyData, armyList.detachment))
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

  /**
   * Calculates the total points for a unit instance based on canonical unit and options
   * @param {Object} unitInstance - The stored unit instance (id, name, options)
   * @param {Object} canonicalUnit - The canonical unit definition from armyData
   * @param {Object} detachmentData - The detachment data (for enhancements)
   * @returns {number} - Total points for the unit
   */
  const calculateUnitPoints = (unitInstance, canonicalUnit, detachmentData) => {
    let points = 0;

    // Base points from unitSize or default
    if (
      unitInstance.options?.unitSize &&
      canonicalUnit.unitOptions?.unitSize &&
      Array.isArray(canonicalUnit.points)
    ) {
      // unitOptions.unitSize is an array like [10, 20]
      // points is an array like [180, 360]
      // Find the index of the selected unitSize and use it to get the corresponding points
      const unitSizeIndex = canonicalUnit.unitOptions.unitSize.indexOf(
        unitInstance.options.unitSize
      );
      if (unitSizeIndex !== -1 && unitSizeIndex < canonicalUnit.points.length) {
        points = canonicalUnit.points[unitSizeIndex];
      } else {
        // Fallback to first points value if index not found
        points = canonicalUnit.points[0];
      }
    } else if (Array.isArray(canonicalUnit.points)) {
      // If points is an array but no unitSize selected, use first value
      points = canonicalUnit.points[0];
    } else {
      // Single points value
      points = canonicalUnit.points || 0;
    }

    // Add enhancement points if present
    if (unitInstance.options?.enhancement && detachmentData?.enhancements) {
      const enhancement = detachmentData.enhancements.find(
        e => e.name === unitInstance.options.enhancement
      );
      if (enhancement) {
        points += enhancement.points || 0;
      }
    }

    return points;
  };

  /**
   * Builds a complete display unit from a stored instance, canonical unit, and detachment modifications
   * @param {Object} unitInstance - The stored unit instance (id, name, options)
   * @param {Object} armyData - The army data containing canonical units
   * @param {string} detachment - The detachment name
   * @returns {Object} - Complete unit object for display
   */
  const buildDisplayUnit = (unitInstance, armyData, detachment) => {
    console.log('building display unit: ', unitInstance);
    // Find canonical unit by name
    const canonicalUnit = armyData.units.find(u => u.name === unitInstance.name);
    if (!canonicalUnit) {
      console.warn(`Unit not found: ${unitInstance.name}`);
      return null;
    }

    // Get detachment data
    const detachmentData = detachment ? armyData.detachments[detachment] : null;
    const unitModifications = detachmentData?.unitModifications || [];

    // Apply detachment modifications to get modified tags
    const modifiedUnit = applyUnitModifications(canonicalUnit, unitModifications);

    // Calculate points
    const points = calculateUnitPoints(unitInstance, canonicalUnit, detachmentData);

    // Apply unit options to unit size, weapons, and wargear
    if (unitInstance.options) {
      const { unitSize, weapons, wargear, enhancement } = unitInstance.options;
      if (enhancement) {
        modifiedUnit.enhancement = enhancement;
      }
      if (unitSize) {
        modifiedUnit.modelCount = unitSize;
      }
      weapons?.forEach(weapon => {
        if (weapon.selected && weapon.selected !== 'off') {
          console.log('TODO: apply weapon option: ', weapon);
          if (weapon.replaces) {
            for (let i = 0; i < modifiedUnit.weapons.length; i++) {
              if (modifiedUnit.weapons[i].name === weapon.replaces) {
                if (Array.isArray(weapon.name)) {
                  modifiedUnit.weapons[i].name = weapon.selected;
                } else {
                  modifiedUnit.weapons[i].name = weapon.name;
                }
                break;
              }
            }
          } else {
            if (Array.isArray(weapon.name)) {
              modifiedUnit.weapons.push({ name: weapon.selected });
            } else {
              modifiedUnit.weapons.push({ name: weapon.name });
            }
          }
        }
      });
      if (wargear?.length && !modifiedUnit.wargear) {
        modifiedUnit.wargear = [];
      }
      wargear?.forEach(wg => {
        if (wg.selected && wg.selected !== 'off') {
          console.log('adding wargear: ', wg);
          modifiedUnit.wargear.push(wg);
        }
      });
    }

    // Transform unitOptions for display (CategorySection expects unitSize to be array of objects with modelCount and points)
    let displayUnitOptions = undefined;
    if (canonicalUnit.unitOptions) {
      displayUnitOptions = JSON.parse(JSON.stringify(canonicalUnit.unitOptions));

      // Transform unitSize from array of numbers to array of objects with modelCount and points
      if (
        displayUnitOptions.unitSize &&
        Array.isArray(displayUnitOptions.unitSize) &&
        Array.isArray(canonicalUnit.points)
      ) {
        displayUnitOptions.unitSize = displayUnitOptions.unitSize.map((modelCount, index) => ({
          modelCount: modelCount,
          points: canonicalUnit.points[index] || canonicalUnit.points[0] || 0,
        }));
      }
    }

    // Build display unit by merging canonical data with instance options
    const displayUnit = {
      id: unitInstance.id,
      name: canonicalUnit.name,
      ...modifiedUnit,
      points: points,
      modelCount: unitInstance.options?.unitSize || canonicalUnit.modelCount || 1,
      tags: [...(modifiedUnit.tags || [])],
      unitOptions: displayUnitOptions,
      options: { ...unitInstance.options },
    };

    return displayUnit;
  };

  /**
   * Applies unitModifications to a unit, returning a modified copy
   * @param {Object} unit - The unit to modify
   * @param {Array} unitModifications - Array of modification objects
   * @returns {Object} - A modified copy of the unit
   */
  const applyUnitModifications = (unit, unitModifications) => {
    if (!unitModifications || unitModifications.length === 0) {
      return unit;
    }

    // Create a deep copy of the unit to avoid mutating the original
    const modifiedUnit = JSON.parse(JSON.stringify(unit));

    unitModifications.forEach(modification => {
      // Check if this modification applies to this unit
      if (modification.target === unit.name) {
        switch (modification.type) {
          case 'addTag':
            // Add the tag if it doesn't already exist
            if (!modifiedUnit.tags) {
              modifiedUnit.tags = [];
            }
            if (!modifiedUnit.tags.includes(modification.value)) {
              modifiedUnit.tags.push(modification.value);
            }
            break;
          // Add more modification types here as needed
          default:
            console.warn(`Unknown modification type: ${modification.type}`);
        }
      }
    });

    return modifiedUnit;
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
