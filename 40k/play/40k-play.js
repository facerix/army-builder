import DataStore from '/src/DataStore.js';
import { h } from '/src/domUtils.js';
import '/components/UpdateNotification.js';
import '/components/DataCard.js';
import '/components/MetadataModal.js';
import { get40kArmyData } from '../army-data-loader.js';
import { FACTION_NAMES } from '/40k/army-data/factions.js';
import { serviceWorkerManager } from '/src/ServiceWorkerManager.js';
import { getUnitCanonicalForm } from '/src/40k-unit-utils.js';
import { getUnitMetadata, getFactionMetadata, setUnitMetadata } from '/src/MetadataStore.js';

/**
 * Processes weapons for datacard generation, adding metadata where available
 * and splitting multi-profile weapons into separate weapons
 * @param {Array} unitWeapons
 * @param {Array} weaponMetadata
 * @param {Object} factionMetadata
 * @returns {Array} - Array of weapon objects with metadata applied
 */
const processWeapons = (unitWeapons, weaponMetadata, factionMetadata, defaultCount = 1) => {
  const weapons = [];
  for (const weapon of unitWeapons) {
    const weaponLookup = weapon.name.toLowerCase();
    const metadata = weaponMetadata.find(w => w.name.toLowerCase() === weaponLookup);
    const sharedMetadata = factionMetadata?.[weaponLookup];
    const weaponType = metadata?.type || sharedMetadata?.type;
    if (weaponType === 'Multi') {
      const variants = weapon.variants || metadata?.variants || sharedMetadata?.variants || [];
      variants.forEach(variant => {
        weapons.push({
          name: `${weapon.name}${variant.name ? ` – ${variant.name}` : ''}`,
          description: metadata?.description || sharedMetadata?.description || '',
          count: weapon.count || metadata?.count || sharedMetadata?.count || defaultCount,
          type: variant.type,
          profile: variant.profile,
          tags: variant.tags,
        });
      });
    } else {
      weapons.push({
        name: weapon.name,
        description: metadata?.description || sharedMetadata?.description || '',
        count: weapon.count || metadata?.count || sharedMetadata?.count || defaultCount,
        type: metadata?.type || sharedMetadata?.type,
        profile: metadata?.profile || sharedMetadata?.profile,
        tags: metadata?.tags || sharedMetadata?.tags,
      });
    }
  }
  return weapons;
};

/**
 * Normalizes unit data for datacard generation into a consistent structure
 * @param {Object} unit - Canonical unit from getUnitCanonicalForm
 * @param {Object} datacardData - Datacard metadata (stats, weapons, abilities, wargear)
 * @param {Object} factionMetadata - Faction metadata for shared entities (things like common weapons, wargear, or rules)
 * @returns {Object} Normalized unit structure
 */
const getUnitFullDatacardData = (unit, datacardData, factionMetadata = {}) => {
  const normalized = {
    id: unit.id,
    name: unit.name,
    points: unit.points || 0,
    modelCount: unit.unitSize || 1,
    tags: unit.tags || [],
    stats: datacardData?.stats || null,
    weapons: [],
    wargear: [],
    abilities: [],
    rules: [],
  };

  // Extract arrays once to avoid repeated property access
  const unitWeapons = unit?.selectedWeapons || [];
  const weaponMetadata = datacardData?.weapons || [];
  const unitWargear = unit?.selectedWargear || [];
  const wargearMetadata = datacardData?.wargear || [];

  if (weaponMetadata.length > 0) {
    if (unitWeapons.length === 0) {
      // unit doesn't have weapon options, so just inherit all weapons defined by the metadata
      normalized.weapons = processWeapons(
        weaponMetadata,
        weaponMetadata,
        factionMetadata,
        normalized.modelCount
      );
    } else {
      // Match unit weapons with metadata (check unit-specific first, then SHARED)
      normalized.weapons = processWeapons(
        unitWeapons,
        weaponMetadata,
        factionMetadata,
        normalized.modelCount
      );
    }
  }

  // Normalize wargear: merge unit wargear with datacard metadata
  // Only include wargear that exists on the unit, but look up descriptions from SHARED
  if (unitWargear.length === 0 && wargearMetadata.length > 0) {
    // If canonical unit doesn't specify any wargear but the metadata does, assume the unit gets it
    normalized.wargear = [...wargearMetadata];
  } else {
    // Match unit wargear with metadata (check unit-specific first, then SHARED for lookups)
    for (const wg of unitWargear) {
      const nameLookup = wg.name.toLowerCase();
      const metadata = wargearMetadata.find(w => w.name.toLowerCase() === nameLookup);
      const sharedMetadata = factionMetadata?.[nameLookup];
      normalized.wargear.push({
        name: wg.name,
        description: metadata?.description || sharedMetadata?.description || '',
      });
    }
  }

  // Normalize abilities from datacard data (unit-specific only, SHARED is for lookups)
  normalized.abilities = (datacardData?.abilities || []).map(a => ({
    ...a,
    description: a.description || factionMetadata?.[a.name.toLowerCase()]?.description || '',
  }));

  // Normalize rules (if any exist in the future)
  normalized.rules = (datacardData?.rules || []).map(r => {
    // Look up description from SHARED if not in unit-specific data
    const sharedRule = factionMetadata[r.name.toLowerCase()];
    return {
      name: r.name,
      description: r.description || sharedRule?.description || '',
    };
  });

  return normalized;
};

const isCardComplete = unitDatacardData => {
  const hasStats = !!unitDatacardData.stats;
  const hasWeaponProfiles =
    unitDatacardData.weapons.length > 0 && unitDatacardData.weapons?.every(w => !!w.profile);
  const hasWargearDescriptions = unitDatacardData.wargear?.every(w => !!w.description);
  const hasAbilityDescriptions = unitDatacardData.abilities?.every(
    a => !!a.description || ['Core', 'Faction'].includes(a.type)
  );
  const returnValue =
    hasStats && hasWeaponProfiles && hasWargearDescriptions && hasAbilityDescriptions;
  if (!returnValue) {
    console.group('card is incomplete due to:');
    console.log('hasStats', hasStats);
    console.log('hasWeaponProfiles', hasWeaponProfiles);
    console.log('hasWargearDescriptions', hasWargearDescriptions);
    console.log('hasAbilityDescriptions', hasAbilityDescriptions);
    console.groupEnd();
  }
  return returnValue;
};

const whenLoaded = Promise.all([
  customElements.whenDefined('update-notification'),
  customElements.whenDefined('data-card'),
]);

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
  let cachedCanonicalUnits = null; // Cache canonical units as Map<unitId, canonicalUnit> - needed for points calculation and as input to normalization
  const cachedUnitDatacardData = new Map(); // Cache normalized units as Map<unitId, normalizedUnit> to avoid re-normalization
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
  const unitNamesSelect = document.querySelector('#unitNames');
  const datacardElement = document.querySelector('data-card');
  const warningElement = document.querySelector('.warning');
  const warningButton = document.querySelector('#btnEditMetadata');
  const metadataModal = document.querySelector('metadata-modal');
  const btnMetadata = document.querySelector('#btnMetadata');
  btnMetadata.href = `/40k/metadata/?faction=${faction}`;
  let selectedUnitId = null;

  if (warningButton) {
    warningButton.disabled = true;
  }

  if (metadataModal) {
    metadataModal.addEventListener('metadataSaved', async evt => {
      const { gameSystem, factionName: savedFaction, unitName, metadata } = evt.detail || {};
      if (!gameSystem || !savedFaction || !unitName) {
        return;
      }

      await setUnitMetadata(gameSystem, savedFaction, unitName, metadata);

      const unit = selectedUnitId ? cachedCanonicalUnits?.get(selectedUnitId) : null;
      if (unit && unit.name === unitName) {
        const factionMetadata = await getFactionMetadata(gameSystem, savedFaction);
        const unitDatacardData = getUnitFullDatacardData(unit, metadata, factionMetadata);
        cachedUnitDatacardData.set(unit.id, unitDatacardData);

        const showWarning = !isCardComplete(unitDatacardData);
        if (warningElement) {
          warningElement.classList[showWarning ? 'remove' : 'add']('u-hidden');
        }
        datacardElement.unitData = unitDatacardData;
      }
    });
  }

  if (warningButton && metadataModal) {
    warningButton.addEventListener('click', async () => {
      const unit = selectedUnitId ? cachedCanonicalUnits?.get(selectedUnitId) : null;
      if (!unit || !factionName) {
        return;
      }
      const metadata = await getUnitMetadata('40k', factionName, unit.name);
      metadataModal.open({
        gameSystem: '40k',
        factionName,
        unitName: unit.name,
        metadata,
      });
    });
  }

  unitNamesSelect.addEventListener('change', async evt => {
    const unitId = evt.target.value;
    selectedUnitId = unitId;
    const unit = cachedCanonicalUnits?.get(unitId);

    if (unit && faction) {
      if (warningButton) {
        warningButton.disabled = false;
      }
      // Check cache first, normalize only if not cached
      let unitDatacardData = cachedUnitDatacardData.get(unitId);
      let unitMetadata;

      if (!unitDatacardData) {
        unitMetadata = await getUnitMetadata('40k', factionName, unit.name);
        const factionMetadata = await getFactionMetadata('40k', factionName);
        unitDatacardData = getUnitFullDatacardData(unit, unitMetadata, factionMetadata);
        cachedUnitDatacardData.set(unitId, unitDatacardData);
      }

      const showWarning = !isCardComplete(unitDatacardData);
      if (warningElement) {
        warningElement.classList[showWarning ? 'remove' : 'add']('u-hidden');
      }
      datacardElement.unitData = unitDatacardData;
    } else if (warningButton) {
      warningButton.disabled = true;
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
      render();
      document.querySelector('body').classList.remove('loading');
    } else {
      // Reset flag if we can't initialize yet
      isInitialized = false;
    }
  };

  const buildCanonicalUnits = () => {
    let canonicalUnits;
    if (armyList?.units && armyData && !cachedCanonicalUnits) {
      cachedCanonicalUnits = new Map();
      canonicalUnits = armyList.units
        .map(u => getUnitCanonicalForm(u, armyData, armyList.detachment))
        .filter(u => u !== null)
        .sort((a, b) => a.name.localeCompare(b.name));
      canonicalUnits.forEach(unit => {
        cachedCanonicalUnits.set(unit.id, unit);
      });
    } else {
      canonicalUnits = Array.from(cachedCanonicalUnits.values());
    }
    return canonicalUnits;
  };

  const render = () => {
    armyName.innerText = armyList.name;
    detachmentName.innerText = armyList.detachment;
    const sortedUnitList = buildCanonicalUnits();

    // calculate points
    if (armyList?.units?.length) {
      const total = sortedUnitList.reduce((acc, curr) => acc + curr.points, 0);
      totalPoints.innerText = `${total} points`;
    }

    sortedUnitList.forEach(unit => {
      unitNamesSelect.append(h('option', { value: unit.id, innerText: unit.name }));
    });
    unitNamesSelect.size = sortedUnitList.length;
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
