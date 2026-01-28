/**
 * Shared utilities for building and manipulating 40k unit data
 * Used by both list builder and play view
 */

/**
 * Applies unitModifications to a unit, returning a modified copy
 * @param {Object} unit - The unit to modify
 * @param {Array} unitModifications - Array of modification objects
 * @returns {Object} - A modified copy of the unit
 */
export const applyUnitModifications = (unit, unitModifications) => {
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

/**
 * Gets units with modifications applied based on the current detachment
 * @param {Object} armyData - The army data
 * @param {string} detachment - The detachment name
 * @returns {Array} - Array of units with modifications applied
 */
export const getModifiedUnits = (armyData, detachment) => {
  if (!detachment || !armyData.detachments[detachment]) {
    return armyData.units;
  }

  const detachmentData = armyData.detachments[detachment];
  const unitModifications = detachmentData.unitModifications || [];

  if (unitModifications.length === 0) {
    return armyData.units;
  }

  // Apply modifications to each unit
  return armyData.units.map(unit => applyUnitModifications(unit, unitModifications));
};

/**
 * Determines which section a unit should belong to based on its tags
 * @param {Object} displayUnit - The display unit (with tags after detachment mods)
 * @returns {string} - The section name: "characters", "battleline", or "otherUnits"
 */
export const getUnitSection = displayUnit => {
  const tags = displayUnit.tags || [];
  if (tags.includes('Character')) {
    return 'characters';
  } else if (tags.includes('Battleline')) {
    return 'battleline';
  } else {
    return 'otherUnits';
  }
};

/**
 * Calculates the total points for a unit instance based on canonical unit and options
 * @param {Object} unitInstance - The stored unit instance (id, name, options)
 * @param {Object} canonicalUnit - The canonical unit definition from armyData (with points already merged)
 * @param {Object} detachmentData - The detachment data (for enhancements)
 * @returns {number} - Total points for the unit
 */
export const calculateUnitPoints = (unitInstance, canonicalUnit, detachmentData) => {
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
    const unitSizeIndex = canonicalUnit.unitOptions.unitSize.indexOf(unitInstance.options.unitSize);
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
 * Transforms unitOptions.unitSize from array of numbers to array of objects with modelCount and points
 * @param {Object} canonicalUnit - The canonical unit definition (with points already merged)
 * @returns {Object|undefined} - Transformed unitOptions or undefined if no unitOptions
 */
export const transformUnitOptionsForDisplay = canonicalUnit => {
  if (!canonicalUnit.unitOptions) {
    return undefined;
  }

  const displayUnitOptions = JSON.parse(JSON.stringify(canonicalUnit.unitOptions));

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

  return displayUnitOptions;
};

/**
 * Builds weapons array by applying user-selected weapon options
 * @param {Array} baseWeapons - Base weapons from canonical unit
 * @param {Array} weaponOptions - User-selected weapon options from unitInstance.options.weapons
 * @returns {Array} - Array of weapon objects with options applied
 */
export const buildWeaponsArray = (baseWeapons = [], weaponOptions = []) => {
  // Start with a copy of base weapons
  const weapons = [...baseWeapons];

  weaponOptions.forEach(weaponOption => {
    if (weaponOption.selected && weaponOption.selected !== 'off') {
      if (weaponOption.replaces) {
        // Replace existing weapon
        const replaceIndex = weapons.findIndex(w => w.name === weaponOption.replaces);
        if (replaceIndex !== -1) {
          if (Array.isArray(weaponOption.name)) {
            // Multiple options - use selected value
            weapons[replaceIndex] = { ...weapons[replaceIndex], name: weaponOption.selected };
          } else {
            // Single option
            weapons[replaceIndex] = { ...weapons[replaceIndex], name: weaponOption.name };
          }
        }
      } else {
        // Add new weapon
        if (Array.isArray(weaponOption.name)) {
          // Multiple options - use selected value
          weapons.push({ name: weaponOption.selected });
        } else {
          // Single option
          weapons.push({ name: weaponOption.name });
        }
      }
    }
  });

  return weapons;
};

/**
 * Builds wargear array by applying user-selected wargear options
 * @param {Array} baseWargear - Base wargear from canonical unit
 * @param {Array} wargearOptions - User-selected wargear options from unitInstance.options.wargear
 * @returns {Array} - Array of wargear objects with options applied
 */
export const buildWargearArray = (baseWargear = [], wargearOptions = []) => {
  // Start with a copy of base wargear
  const wargear = [...baseWargear];

  wargearOptions.forEach(wgOption => {
    if (wgOption.selected && wgOption.selected !== 'off') {
      wargear.push(wgOption);
    }
  });

  return wargear;
};

/**
 * Builds a complete display unit from a stored instance, canonical unit, and detachment modifications
 * @param {Object} unitInstance - The stored unit instance (id, name, options)
 * @param {Object} armyData - The army data containing canonical units (with points already merged)
 * @param {string} detachment - The detachment name
 * @param {Object} options - Optional configuration
 * @param {boolean} options.applyWeaponWargearOptions - If true, apply weapon/wargear options (for play view)
 * @returns {Object|null} - Complete unit object for display, or null if unit not found
 */
export const buildDisplayUnit = (unitInstance, armyData, detachment, options = {}) => {
  const { applyWeaponWargearOptions = false } = options;

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

  // Transform unitOptions for display
  const displayUnitOptions = transformUnitOptionsForDisplay(canonicalUnit);

  // Build weapons and wargear arrays
  let weapons = [...(canonicalUnit.weapons || [])];
  let wargear = [...(canonicalUnit.wargear || [])];

  // Apply weapon/wargear options if requested (for play view)
  if (applyWeaponWargearOptions && unitInstance.options) {
    if (unitInstance.options.weapons) {
      weapons = buildWeaponsArray(canonicalUnit.weapons, unitInstance.options.weapons);
    }
    if (unitInstance.options.wargear) {
      wargear = buildWargearArray(canonicalUnit.wargear, unitInstance.options.wargear);
    }
  }

  // Build display unit by merging canonical data with instance options
  const displayUnit = {
    id: unitInstance.id,
    name: canonicalUnit.name,
    points: points,
    modelCount: unitInstance.options?.unitSize || canonicalUnit.modelCount || 1,
    tags: [...(modifiedUnit.tags || [])],
    weapons: weapons,
    wargear: wargear,
    unitOptions: displayUnitOptions,
    options: { ...unitInstance.options },
  };

  // Add enhancement if present (for play view)
  if (unitInstance.options?.enhancement) {
    displayUnit.enhancement = unitInstance.options.enhancement;
  }

  return displayUnit;
};
