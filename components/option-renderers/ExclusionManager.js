/**
 * Manages exclusion logic for options (when one option excludes another)
 */

import { matchOptionsByName } from './OptionUtils.js';

/**
 * Get list of excluded items that are currently present (not replaced)
 * Returns array of item names that are preventing selection
 */
export const getExcludedItemsPresent = (
  excludes,
  allDefaultItems,
  allCurrentOptions,
  allAvailableOptions
) => {
  if (!excludes || !Array.isArray(excludes)) return [];

  const presentExcludedItems = [];
  const defaultItemNames = allDefaultItems.map(item =>
    typeof item === 'string' ? item : item.name
  );

  // allAvailableOptions can be either a flat array or a structured object { weapons: [], wargear: [] }
  // Handle both cases for backward compatibility
  const availableOptionsByType = Array.isArray(allAvailableOptions)
    ? { weapons: allAvailableOptions, wargear: allAvailableOptions }
    : allAvailableOptions || { weapons: [], wargear: [] };

  for (const excludedName of excludes) {
    if (defaultItemNames.includes(excludedName)) {
      // Check if this item has been replaced in either weapons or wargear
      let wasReplaced = false;
      for (const checkType of ['weapons', 'wargear']) {
        const availableOptions = availableOptionsByType[checkType] || [];

        // Check if any available option that replaces this item is currently selected
        const hasReplacementSelected = availableOptions.some(availableOpt => {
          if (!availableOpt.replaces) return false;

          // Find the corresponding option in currentOptions to check if it's selected
          const currentOpt = allCurrentOptions[checkType]?.find(opt =>
            matchOptionsByName(availableOpt, opt)
          );
          const isSelected =
            currentOpt &&
            currentOpt.selected &&
            currentOpt.selected !== false &&
            currentOpt.selected !== 'off';

          if (!isSelected) return false; // Option not selected, so it doesn't replace anything

          const replacesArray = Array.isArray(availableOpt.replaces)
            ? availableOpt.replaces
            : [availableOpt.replaces];
          // Check if first element is "&" (AND) or "|" (OR)
          const isAnd = replacesArray[0] === '&';
          const isOr = replacesArray[0] === '|';
          // Get actual item names (skip first element if it's "&" or "|")
          const itemNames = isAnd || isOr ? replacesArray.slice(1) : replacesArray;

          if (isAnd) {
            // AND logic: if option is selected, ALL items in replaces array are replaced
            if (itemNames.includes(excludedName)) {
              return true; // This item was replaced
            }
          } else {
            // OR logic: if option is selected, at least one item is replaced
            // We can't know which specific item, so if excludedName is in the list, consider it replaced
            if (itemNames.includes(excludedName)) {
              return true; // This item was replaced
            }
          }
          return false;
        });

        if (hasReplacementSelected) {
          wasReplaced = true;
          break;
        }
      }
      if (!wasReplaced) {
        presentExcludedItems.push(excludedName);
      }
    }
  }

  return presentExcludedItems;
};

/**
 * Format exclusion reason message
 */
export const formatExclusionReason = excludedItems => {
  if (!excludedItems || excludedItems.length === 0) return null;
  if (excludedItems.length === 1) {
    return `(Disabled: ${excludedItems[0]} must be replaced first)`;
  }
  return `(Disabled: ${excludedItems.join(', ')} must be replaced first)`;
};

/**
 * Check if an excluded item is currently equipped/selected
 * This checks default weapons/wargear and selected options, accounting for replacements
 */
export const isExcludedItemPresent = (
  excludes,
  allDefaultItems,
  allCurrentOptions,
  allAvailableOptions,
  optionType
) => {
  const presentItems = getExcludedItemsPresent(
    excludes,
    allDefaultItems,
    allCurrentOptions,
    allAvailableOptions
  );
  return presentItems.length > 0;
};
