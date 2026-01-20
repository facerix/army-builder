/**
 * Utility functions for option matching, validation, and formatting
 */

/**
 * Generate a fieldset name from an option (handles arrays and strings)
 */
export const optionFieldsetName = option => {
  return (Array.isArray(option.name) ? option.name.join('-') : option.name).replace(/ /g, '_');
};

/**
 * Match two options by name (handles arrays and strings)
 */
export const matchOptionsByName = (option1, option2) => {
  if (Array.isArray(option1.name)) {
    if (Array.isArray(option2.name)) {
      // Both are arrays - compare element by element
      return (
        option1.name.length === option2.name.length &&
        option1.name.every((val, idx) => val === option2.name[idx])
      );
    }
    // option1 is array, option2 is string - check if option2.name is in array or matches selected
    return (
      option1.name.includes(option2.name) ||
      (option2.selected && option1.name.includes(option2.selected))
    );
  } else {
    if (Array.isArray(option2.name)) {
      // option1 is string, option2 is array - check if option1.name is in array
      return option2.name.includes(option1.name);
    }
    // Both are strings - direct comparison
    return option1.name === option2.name;
  }
};

/**
 * Find current option state from saved options
 */
export const findCurrentOption = (option, currentOptions, optionsKey) => {
  return currentOptions[optionsKey]?.find(w => matchOptionsByName(option, w));
};

/**
 * Find corresponding available option from saved option
 */
export const findAvailableOption = (savedOption, availableOptions) => {
  return availableOptions?.find(opt => matchOptionsByName(opt, savedOption));
};

/**
 * Validate option configuration
 */
export const validateOption = option => {
  if (option.selectionType && !Array.isArray(option.name)) {
    throw new Error(
      `selectionType is only valid when name is an array. Option: ${JSON.stringify(option)}`
    );
  }
};

/**
 * Calculate effective max based on per property
 */
export const calculateEffectiveMax = (option, unitSize) => {
  if (option.per && unitSize) {
    return Math.floor(unitSize / option.per) * option.max;
  }
  if (option.max === '[unitSize]') {
    return unitSize;
  }
  return option.max || 0;
};

/**
 * Normalize selected value to array for easier processing
 */
export const normalizeSelectedToArray = selected => {
  if (Array.isArray(selected)) {
    return selected;
  }
  if (selected && selected !== 'off' && selected !== false) {
    return [selected];
  }
  return [];
};

/**
 * Format replaced items label
 */
export const formatReplacedItemsLabel = replaces => {
  if (!replaces) return 'None';
  if (Array.isArray(replaces)) {
    // Skip first element if it's "&" or "|"
    const isAnd = replaces[0] === '&';
    const isOr = replaces[0] === '|';
    const itemNames = isAnd || isOr ? replaces.slice(1) : replaces;

    if (itemNames.length === 0) {
      return 'None';
    } else if (itemNames.length === 1) {
      return itemNames[0];
    } else if (itemNames.length === 2) {
      return `${itemNames[0]} and ${itemNames[1]}`;
    } else {
      // For 3+ items: "Item1, Item2, and Item3"
      const lastItem = itemNames[itemNames.length - 1];
      const otherItems = itemNames.slice(0, -1).join(', ');
      return `${otherItems}, and ${lastItem}`;
    }
  }
  return replaces;
};

/**
 * Truncate selections when unit size decreases
 */
export const truncateSelectionsForUnitSize = (option, selected, unitSize) => {
  if (!option.per || !option.max) return selected;

  const effectiveMax = calculateEffectiveMax(option, unitSize);

  // Handle array selections (selectionType: "any" or "anyNoDuplicates")
  if (
    (option.selectionType === 'any' || option.selectionType === 'anyNoDuplicates') &&
    Array.isArray(selected)
  ) {
    return selected.length > effectiveMax ? selected.slice(0, effectiveMax) : selected;
  }

  // Handle single-string with per (integer count)
  if (typeof option.name === 'string' && option.per && typeof selected === 'number') {
    return Math.min(selected, effectiveMax);
  }

  // Handle selectionType: "all" (string value) - no truncation needed, value is still valid
  // (though the option might not exist if array was changed, but that's handled elsewhere)

  return selected;
};
