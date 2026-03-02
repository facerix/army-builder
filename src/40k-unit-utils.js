/**
 * Shared utilities for building and manipulating 40k unit data
 * Used by both list builder and play view
 */
import { FACTION_NAMES } from '/40k/army-data/factions.js';
import { POINTS } from '/40k/army-data/points.js';
import { get40kArmyData } from '/40k/army-data-loader.js';

const armyData = new Map();
const retrieveArmyData = async factionName => {
  if (armyData.has(factionName)) {
    return armyData.get(factionName);
  }
  const factionData = await get40kArmyData(factionName);
  armyData.set(factionName, factionData);
  return factionData;
};

export const getPointsForList = async list => {
  const armyData = await retrieveArmyData(FACTION_NAMES[list.faction]);
  const factionPoints = POINTS[FACTION_NAMES[list.faction]];
  const enhancementPoints = factionPoints.enhancements[list.detachment];
  let points = 0;
  if (factionPoints && enhancementPoints) {
    list.units.forEach(unit => {
      const unitPoints = factionPoints.units[unit.name];
      if (Array.isArray(unitPoints)) {
        if (unit.options?.unitSize) {
          // unit size is specified, so we need to figure out the unit cost based on the unit size
          const unitData = armyData.units.find(u => u.name === unit.name);
          if (unitData) {
            const unitSizeIndex = unitData.unitOptions.unitSize.indexOf(unit.options.unitSize);
            if (unitSizeIndex !== -1 && unitSizeIndex < unitData.points.length) {
              points += unitData.points[unitSizeIndex];
            } else {
              // Fallback to first points value if index not found
              points += unitData.points[0];
            }
          } else {
            console.warn(`Unit not found: ${unit.name}`);
          }
        } else {
          // unit size is not specified, so we need to use the default unit size or default to first points value and log a warning
          console.warn(`Unit size not specified for unit: ${unit.name}`);
          points += unitPoints[0];
        }
      } else {
        points += unitPoints;
      }

      if (unit.options?.enhancement) {
        if (unit.options.enhancement in enhancementPoints) {
          points += enhancementPoints[unit.options.enhancement];
        }
      }
    });
  }
  return points;
};

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
 * Builds weapons array with counts by applying user-selected weapon options
 * Uses similar logic to getOptionSummaries but returns structured data instead of strings
 * @param {Array} baseWeapons - Base weapons from canonical unit
 * @param {Array} weaponOptions - User-selected weapon options from unitInstance.options.weapons
 * @param {number} unitSize - Current unit size
 * @param {Array} fullOptionDefinitions - Full option definitions from canonical unit
 * @returns {Array} - Array of weapon objects with {name, count}
 */
const buildWeaponsWithCounts = (
  baseWeapons = [],
  weaponOptions = [],
  unitSize,
  fullOptionDefinitions = null
) => {
  // Import option-summaries helpers (we'll need to adapt the logic)
  // Start with base weapons, each with count = unitSize (or their own count if specified)
  const actualWeapons = [...baseWeapons].map(w => ({ ...w, count: w.count || unitSize }));

  // Helper to check if option is selected
  const isOptionSelected = opt => {
    if (
      opt.selected === false ||
      opt.selected === undefined ||
      opt.selected === 'off' ||
      opt.selected === 0
    ) {
      return false;
    }
    if (Array.isArray(opt.selected) && opt.selected.length === 0) {
      return false;
    }
    return true;
  };

  // Helper to find full option definition
  const findFullOptionDefinition = opt => {
    if (!fullOptionDefinitions) return opt;
    return (
      fullOptionDefinitions.find(full => {
        if (Array.isArray(full.name)) {
          if (Array.isArray(opt.name)) {
            return (
              full.name.length === opt.name.length &&
              full.name.every((val, idx) => val === opt.name[idx])
            );
          }
          return false;
        }
        return full.name === opt.name;
      }) || opt
    );
  };

  // Helper to find and remove replaced items
  const findAndRemoveReplacedItems = (actualItems, replaces) => {
    if (Array.isArray(replaces)) {
      const isAnd = replaces[0] === '&';
      const isOr = replaces[0] === '|';
      const itemNames = isAnd || isOr ? replaces.slice(1) : replaces;

      if (isAnd) {
        const itemsToRemove = [];
        for (const replaceName of itemNames) {
          const found = actualItems.find(w => w.name === replaceName);
          if (!found) return [];
          if (!itemsToRemove.includes(found)) {
            itemsToRemove.push(found);
          }
        }
        return itemsToRemove;
      } else {
        const itemsToRemove = [];
        itemNames.forEach(replaceName => {
          const foundItems = actualItems.filter(w => w.name === replaceName);
          foundItems.forEach(found => {
            if (!itemsToRemove.includes(found)) {
              itemsToRemove.push(found);
            }
          });
        });
        return itemsToRemove;
      }
    } else {
      const found = actualItems.find(w => w.name === replaces);
      return found ? [found] : [];
    }
  };

  // Helper to remove items by count
  const removeItemsByCount = (actualItems, itemsToRemove, countToRemove) => {
    let remainingToRemove = countToRemove;
    const targetNames = [...new Set(itemsToRemove.map(item => item.name))];

    for (const targetName of targetNames) {
      if (remainingToRemove <= 0) break;
      const matchingItems = actualItems.filter(item => item.name === targetName);
      for (const item of matchingItems) {
        if (remainingToRemove <= 0) break;
        const itemIndex = actualItems.indexOf(item);
        if (itemIndex === -1) continue;
        if (item.count <= remainingToRemove) {
          actualItems.splice(itemIndex, 1);
          remainingToRemove -= item.count;
        } else {
          item.count -= remainingToRemove;
          remainingToRemove = 0;
        }
      }
    }
  };

  // Helper to remove all matching items and return total count
  const removeAllMatchingItems = (actualItems, itemsToRemove) => {
    const totalCount = itemsToRemove.reduce((sum, item) => sum + (item.count || 0), 0);
    itemsToRemove.forEach(item => {
      const index = actualItems.indexOf(item);
      if (index !== -1) actualItems.splice(index, 1);
    });
    return totalCount;
  };

  // Helper to add upgrade with replacement handling
  const addUpgrade = (actualItems, upgrade, replaces, countStrategy = 'full') => {
    if (!replaces) {
      actualItems.push(upgrade);
      return;
    }

    const itemsToRemove = findAndRemoveReplacedItems(actualItems, replaces);
    if (itemsToRemove.length === 0) {
      actualItems.push(upgrade);
      return;
    }

    if (countStrategy === 'per' && typeof upgrade.count === 'number') {
      removeItemsByCount(actualItems, itemsToRemove, upgrade.count);
      actualItems.push(upgrade);
    } else {
      const totalReplaceCount = removeAllMatchingItems(actualItems, itemsToRemove);
      let finalCount;
      if (countStrategy === 'useReplaced') {
        if (itemsToRemove.length > 1 && upgrade.count !== undefined) {
          finalCount = upgrade.count;
        } else {
          finalCount = totalReplaceCount > 0 ? totalReplaceCount : upgrade.count;
        }
      } else {
        finalCount = upgrade.count;
      }
      actualItems.push({ ...upgrade, count: finalCount });
    }
  };

  // Process each weapon option
  weaponOptions.forEach(opt => {
    if (!isOptionSelected(opt)) {
      return;
    }

    const fullOpt = findFullOptionDefinition(opt);

    // Handle per-based options
    if (typeof opt.name === 'string' && fullOpt.per && typeof opt.selected === 'number') {
      const upgrade = { ...opt, count: opt.selected, selected: opt.name };
      addUpgrade(actualWeapons, upgrade, opt.replaces, 'per');
      return;
    }

    // Handle selectionType "all"
    const isAll = fullOpt.selectionType === 'all' || opt.selectionType === 'all';
    if (isAll && Array.isArray(opt.name) && typeof opt.selected === 'string') {
      if (opt.name.includes(opt.selected)) {
        const upgrade = {
          name: opt.selected,
          count: unitSize,
          selected: opt.selected,
        };
        addUpgrade(actualWeapons, upgrade, opt.replaces, 'useReplaced');
      }
      return;
    }

    // Handle selectionType "any" - string selection
    if (
      fullOpt.selectionType === 'any' &&
      typeof opt.selected === 'string' &&
      opt.selected !== 'off' &&
      opt.selected !== false
    ) {
      if (opt.name.includes(opt.selected)) {
        const upgrade = {
          name: opt.selected,
          count: unitSize,
          selected: opt.selected,
        };
        addUpgrade(actualWeapons, upgrade, opt.replaces, 'useReplaced');
      }
      return;
    }

    // Handle selectionType "any" - array selection
    if (fullOpt.selectionType === 'any' && Array.isArray(opt.selected)) {
      const counts = {};
      opt.selected.forEach(selectedValue => {
        counts[selectedValue] = (counts[selectedValue] || 0) + 1;
      });
      Object.entries(counts).forEach(([selectedValue, count]) => {
        const upgrade = { ...opt, count, selected: selectedValue };
        const itemsToRemove = opt.replaces
          ? findAndRemoveReplacedItems(actualWeapons, opt.replaces)
          : [];
        if (itemsToRemove.length > 0) {
          const totalReplaceCount = removeAllMatchingItems(actualWeapons, itemsToRemove);
          actualWeapons.push({
            ...upgrade,
            count: Math.min(totalReplaceCount, count),
          });
        } else {
          actualWeapons.push(upgrade);
        }
      });
      return;
    }

    // Handle generic array selections
    const selectedValues = Array.isArray(opt.selected) ? opt.selected : [opt.selected];
    selectedValues.forEach(selectedValue => {
      const isMultiSelectOption = Array.isArray(opt.name) && opt.max > 1;
      const defaultCount = isMultiSelectOption ? 1 : opt.max || unitSize;
      let weaponName;
      if (Array.isArray(opt.name)) {
        weaponName =
          typeof selectedValue === 'string'
            ? selectedValue
            : opt.name[selectedValue] || opt.name[0];
      } else {
        weaponName = opt.name;
      }
      const upgrade = { name: weaponName, count: defaultCount, selected: selectedValue };
      addUpgrade(actualWeapons, upgrade, opt.replaces, 'useReplaced');
    });
  });

  // Return simplified array with just name and count
  return actualWeapons.map(w => ({
    name: Array.isArray(w.name) ? w.selected || w.name[0] || w.name.join(', ') : w.name,
    count: w.count || unitSize,
  }));
};

/**
 * Builds wargear array by applying user-selected wargear options
 * @param {Array} baseWargear - Base wargear from canonical unit
 * @param {Array} wargearOptions - User-selected wargear options from unitInstance.options.wargear
 * @returns {Array} - Array of wargear objects with {name}
 */
const buildSelectedWargear = (baseWargear = [], wargearOptions = []) => {
  // Start with base wargear names
  const selectedWargearNames = [...(baseWargear || [])].map(wg =>
    typeof wg === 'string' ? wg : wg.name
  );

  // Add selected wargear options
  wargearOptions.forEach(wgOption => {
    if (wgOption.selected && wgOption.selected !== 'off') {
      if (Array.isArray(wgOption.name)) {
        // Multiple options - use selected value
        if (typeof wgOption.selected === 'string') {
          selectedWargearNames.push(wgOption.selected);
        } else if (Array.isArray(wgOption.selected)) {
          selectedWargearNames.push(...wgOption.selected);
        }
      } else {
        // Single option
        selectedWargearNames.push(wgOption.name);
      }
    }
  });

  // Remove duplicates and convert to objects
  const uniqueNames = [...new Set(selectedWargearNames)];
  return uniqueNames.map(name => ({ name }));
};

// --- Weapon metadata processing (for datacard generation) ---

/**
 * Expands weapon items that encapsulate multiple actual weapons (e.g. "Bolt revolver & Plasma knife"
 * or "L7 missile launcher & 1 Sagitaur missile launcher") into separate items before metadata lookup.
 * Handles optional numeric prefixes like "1 Sagitaur missile launcher" as the count for that weapon.
 * @param {Array} weapons - Array of {name, count?, ...}
 * @returns {Array} - Expanded array of weapon items
 */
export const expandWeaponItems = weapons => {
  const expanded = [];
  for (const weapon of weapons) {
    const name = weapon.name || '';
    if (!name.includes('&')) {
      expanded.push({ ...weapon });
      continue;
    }
    const parts = name.split(/\s+&\s+/);
    for (const part of parts) {
      const trimmed = part.trim();
      const countMatch = trimmed.match(/^(\d+)\s+(.+)$/);
      if (countMatch) {
        expanded.push({
          ...weapon,
          name: countMatch[2].trim(),
          count: parseInt(countMatch[1], 10),
        });
      } else {
        expanded.push({
          ...weapon,
          name: trimmed,
        });
      }
    }
  }
  return expanded;
};

/**
 * Extracts the base weapon name from a metadata entry for comparison.
 * Strips leading symbols (➤, ►, etc.) and trailing " – [attack type]" or " - [attack type]".
 * @param {string} name - Metadata weapon name
 * @returns {string} - Normalized base name (lowercase)
 */
const getBaseWeaponName = name => {
  const stripped = (name || '').replace(/^[\s➤►→\u2022]*/, '').trim();
  const parts = stripped.split(/\s+[–—-]\s+/);
  return parts[0].toLowerCase().trim();
};

const toSingular = s => {
  if (!s || s.length < 2) return s;
  if (s.endsWith('es') && s.length > 3) return s.slice(0, -2);
  if (s.endsWith('s')) return s.slice(0, -1);
  return s;
};

const toPlural = s => {
  if (!s || s.length < 1) return s;
  if (/[sxz]$|sh$|ch$/.test(s)) return s + 'es';
  return s + 's';
};

const getWeaponLookupVariants = weaponLookup => {
  const variants = [weaponLookup];
  const singular = toSingular(weaponLookup);
  const plural = toPlural(weaponLookup);
  if (singular !== weaponLookup) variants.push(singular);
  if (plural !== weaponLookup) variants.push(plural);
  return variants;
};

/**
 * Finds all metadata entries that match a weapon (exact or base-name match).
 * Tries both singular and plural forms to catch "Bolt revolver"/"Bolt revolvers" and
 * "Armored wheel"/"Armored wheels".
 * Handles multi-profile weapons stored as "[name] – [attack type]" or "➤ [name] - [attack type]".
 * @param {string} weaponLookup - Weapon name (lowercase)
 * @param {Array} metadataArray - Array of weapon metadata
 * @returns {Array} - All matching metadata entries
 */
export const findMatchingWeaponMetadata = (weaponLookup, metadataArray) => {
  const variants = new Set(getWeaponLookupVariants(weaponLookup));
  return metadataArray.filter(w => {
    const metaName = w.name.toLowerCase();
    const metaBase = getBaseWeaponName(w.name);
    return variants.has(metaName) || variants.has(metaBase);
  });
};

/**
 * Processes weapons for datacard generation, adding metadata where available
 * @param {Array} unitWeapons
 * @param {Array} weaponMetadata
 * @param {Array} factionMetadata
 * @param {number} defaultCount
 * @returns {Array} - Array of weapon objects with metadata applied
 */
export const processWeapons = (unitWeapons, weaponMetadata, factionMetadata, defaultCount = 1) => {
  const expandedWeapons = expandWeaponItems(unitWeapons);
  const weapons = [];
  const expandedProfileKeys = new Set();

  for (const weapon of expandedWeapons) {
    const weaponLookup = weapon.name.toLowerCase();
    const unitMatches = findMatchingWeaponMetadata(weaponLookup, weaponMetadata);
    const sharedMatches = findMatchingWeaponMetadata(weaponLookup, factionMetadata);
    const matches = unitMatches.length > 0 ? unitMatches : sharedMatches;
    const metadata = matches[0];

    if (matches.length > 1) {
      const profileKey = matches
        .map(m => `${(m.name || '').toLowerCase()}|${m.type || ''}`)
        .sort()
        .join(';');
      if (expandedProfileKeys.has(profileKey)) continue;
      expandedProfileKeys.add(profileKey);

      matches.forEach(m => {
        weapons.push({
          name: m.name,
          description: m.description || '',
          count: weapon.count || m.count || defaultCount,
          type: m.type,
          profile: m.profile,
          keywords: m.keywords ?? m.tags ?? [],
        });
      });
    } else {
      weapons.push({
        name: weapon.name,
        description: metadata?.description || '',
        count: weapon.count || metadata?.count || defaultCount,
        type: metadata?.type,
        profile: metadata?.profile,
        keywords: metadata?.keywords ?? metadata?.tags ?? [],
      });
    }
  }
  return weapons;
};

// --- End weapon metadata processing ---

/**
 * Gets the canonical form of a unit instance - a simplified representation of the unit's actual configuration
 * Takes core unit data from army-data, unit instance data from localStorage, and detachment name,
 * and returns a single object representing the unit instance's actual configuration.
 * @param {Object} unitInstance - Stored unit instance (id, name, options)
 * @param {Object} armyData - The army data containing canonical units and detachment info
 * @param {string} detachment - Detachment name (for applying modifications)
 * @returns {Object|null} - Canonical unit form with:
 *   - id: Unit instance ID
 *   - name: Unit name
 *   - tags: Array of tags (after detachment modifications)
 *   - unitSize: Selected unit size
 *   - points: Total points for the unit
 *   - selectedWeapons: Array of {name, count} objects
 *   - selectedWargear: Array of {name} objects
 *   - characterDetails: {isWarlord: boolean, enhancementName: string|null} (only if Character tag present)
 */
export const getUnitCanonicalForm = (unitInstance, armyData, detachment) => {
  if (!unitInstance || !armyData) {
    console.warn('Missing required parameters for getUnitCanonicalForm');
    return null;
  }

  // Find canonical unit by name
  const canonicalUnit = armyData.units?.find(u => u.name === unitInstance.name);
  if (!canonicalUnit) {
    console.warn(`Unit not found: ${unitInstance.name}`);
    return null;
  }

  // Get detachment data and apply modifications
  const detachmentData =
    detachment && armyData?.detachments ? armyData.detachments[detachment] : null;
  const unitModifications = detachmentData?.unitModifications || [];
  const modifiedUnit = applyUnitModifications(canonicalUnit, unitModifications);

  // Get unit size
  const unitSize = unitInstance.options?.unitSize || canonicalUnit.modelCount || 1;

  // Build selected weapons with counts
  const baseWeapons = canonicalUnit.weapons || [];
  const weaponOptions = unitInstance.options?.weapons || [];
  const fullWeaponOptions = canonicalUnit.unitOptions?.weapons || [];
  const selectedWeapons = buildWeaponsWithCounts(
    baseWeapons,
    weaponOptions,
    unitSize,
    fullWeaponOptions
  );

  // Build selected wargear (names only)
  const baseWargear = canonicalUnit.wargear || [];
  const wargearOptions = unitInstance.options?.wargear || [];
  const selectedWargear = buildSelectedWargear(baseWargear, wargearOptions);

  // Calculate points
  const points = calculateUnitPoints(unitInstance, canonicalUnit, detachmentData);

  // Build canonical form
  const canonicalForm = {
    id: unitInstance.id,
    name: canonicalUnit.name,
    tags: [...(modifiedUnit.tags || [])],
    unitSize: unitSize,
    points: points,
    selectedWeapons: selectedWeapons,
    selectedWargear: selectedWargear,
  };

  // Add character details if this is a character unit
  const isCharacter = modifiedUnit.tags?.includes('Character');
  if (isCharacter) {
    canonicalForm.characterDetails = {
      isWarlord: unitInstance.options?.warlord === true,
      enhancementName: unitInstance.options?.enhancement || null,
    };
  }

  return canonicalForm;
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
