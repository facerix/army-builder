
/**
 * Matches a single tag requirement against unit tags.
 * Supports:
 * - Simple tags: "Tag1" - unit must have Tag1
 * - Negated tags: "!Tag2" - unit must NOT have Tag2
 * - Compound tags: "Tag1+!Tag2" - unit must have Tag1 AND NOT Tag2
 * 
 * @param {string} tagRequirement - Single tag requirement to match
 * @param {string[]} unitTags - Tags that the unit has
 * @param {string} unitName - Name of the unit (for exact name matching)
 * @returns {boolean} True if the unit matches the tag requirement
 */
export const matchesSingleTagRequirement = (tagRequirement, unitTags, unitName) => {
  // Handle compound tags (AND logic) - e.g., "Tag1+!Tag2"
  if (tagRequirement.includes('+')) {
    const parts = tagRequirement.split('+').map(p => p.trim());
    return parts.every(part => matchesSingleTagRequirement(part, unitTags, unitName));
  }

  // Handle negated tags/names - e.g., "!Tag2" or "!UnitName"
  if (tagRequirement.startsWith('!')) {
    const tag = tagRequirement.substring(1);
    // Check if negated tag matches unit name
    if (tag === unitName) {
      return false;
    }
    // Check if negated tag matches any unit tag
    return !unitTags?.includes(tag);
  }

  // Check for exact unit name match
  if (tagRequirement === unitName) {
    return true;
  }

  // Handle simple positive tags
  return unitTags?.includes(tagRequirement) || false;
};

/**
 * Matches a unit against tag requirements.
 * Supports:
 * - Simple tags: "Tag1" - unit must have Tag1
 * - Negated tags: "!Tag2" - unit must NOT have Tag2
 * - Compound tags: "Tag1+!Tag2" - unit must have Tag1 AND NOT Tag2
 * - Array of tags: ["Tag1+!Tag2", "Tag3"] - (Tag1 AND NOT Tag2) OR Tag3
 * 
 * @param {string|string[]} tagRequirements - Tag requirement(s) to match (can be array for OR logic)
 * @param {string[]} unitTags - Tags that the unit has
 * @param {string} unitName - Name of the unit (for exact name matching)
 * @returns {boolean} True if the unit matches the tag requirements
 */
export const matchesTagRequirement = (tagRequirements, unitTags, unitName) => {
  // If no tags requirement, always match
  if (!tagRequirements) {
    return true;
  }

  // Handle array of tag requirements (OR logic)
  if (Array.isArray(tagRequirements)) {
    return tagRequirements.some(req => matchesSingleTagRequirement(req, unitTags, unitName));
  }

  // Handle single tag requirement
  return matchesSingleTagRequirement(tagRequirements, unitTags, unitName);
};

/**
 * Helper function: Match option by name (handles arrays and strings)
 * @param {string|string[]} optionName - The option name(s) to match
 * @param {string|string[]} savedOptionName - The saved option name(s) to match against
 * @returns {boolean} True if the options match
 */
export const matchOptionByName = (optionName, savedOptionName) => {
  if (Array.isArray(optionName)) {
    if (Array.isArray(savedOptionName)) {
      // Compare arrays by checking if they have the same length and same elements
      return optionName.length === savedOptionName.length && 
             optionName.every((val, idx) => val === savedOptionName[idx]);
    }
    // If savedOptionName is not an array but selected is set, check if selected value is in optionName array
    return false; // We'll check selected separately
  } else {
    // If optionName is a string, check if savedOptionName matches (string or array containing it)
    if (Array.isArray(savedOptionName)) {
      return savedOptionName.includes(optionName);
    }
    return savedOptionName === optionName;
  }
};

/**
 * Helper function: Calculate effective max based on per property
 * @param {Object} option - The option object
 * @param {number} unitSize - The unit size
 * @returns {number} The effective maximum
 */
export const calculateEffectiveMax = (option, unitSize) => {
  if (option.per && unitSize) {
    return Math.floor(unitSize / option.per) * option.max;
  }
  return option.max || 0;
};

/**
 * Helper function: Truncate selections when unit size decreases
 * @param {Object} option - The option object
 * @param {*} selected - The current selected value(s)
 * @param {number} newUnitSize - The new unit size
 * @returns {*} The truncated selection
 */
export const truncateSelectionsForUnitSize = (option, selected, newUnitSize) => {
  if (!option.per || !option.max) return selected;
  
  const newEffectiveMax = calculateEffectiveMax(option, newUnitSize);
  
  // Handle array selections (selectionType: "any" or "anyNoDuplicates")
  if ((option.selectionType === "any" || option.selectionType === "anyNoDuplicates") && Array.isArray(selected)) {
    return selected.length > newEffectiveMax ? selected.slice(0, newEffectiveMax) : selected;
  }
  
  // Handle single-string with per (integer count)
  if (typeof option.name === 'string' && option.per && typeof selected === 'number') {
    return Math.min(selected, newEffectiveMax);
  }
  
  // Handle selectionType: "all" (string value) - no truncation needed, value is still valid
  // (though the option might not exist if array was changed, but that's handled elsewhere)
  
  return selected;
};

/**
 * Gets available options for a unit based on category options and unit properties
 * @param {Object} categoryOptions - The category options (enhancements, etc.)
 * @param {Object} unit - The unit object
 * @param {boolean} includeEnhancements - Whether to include enhancements
 * @returns {Object} Available options for the unit
 */
export const optionsForUnit = (categoryOptions, unit, includeEnhancements = false) => {
  const availableOptions = {};
  if (!unit.tags?.includes("Epic Hero") && includeEnhancements) {
    // filter enhancements to either match unit name or tags (e.g. "exo-armor")
    availableOptions.enhancements = categoryOptions?.enhancements?.filter(o => {
      // Check if enhancement matches tag requirements (handles arrays, compound tags, negation)
      return matchesTagRequirement(o.tags, unit.tags || [], unit.name);
    }) ?? [];
  }
  // other options
  if (unit.unitOptions) {
    // unitSize
    if (unit.unitOptions.unitSize) {
      availableOptions.unitSize = unit.unitOptions.unitSize.map(opt => ({
        ...opt,
        selected: opt.modelCount === (unit.options?.unitSize || unit.modelCount),
      }));
    }

    // weapons
    if (unit.unitOptions.weapons) {
      availableOptions.weapons = unit.unitOptions.weapons.map(opt => {
        const savedOption = unit.options?.weapons?.find(w => {
          return matchOptionByName(opt.name, w.name);
        });
        const selected = savedOption?.selected || false;
        // Truncate selections if unit size has decreased
        const unitSize = unit.options?.unitSize || unit.modelCount;
        const truncatedSelected = truncateSelectionsForUnitSize(opt, selected, unitSize);
        return {
          ...opt,
          selected: truncatedSelected,
        };
      });
    }

    // wargear
    if (unit.unitOptions.wargear) {
      availableOptions.wargear = unit.unitOptions.wargear.map(opt => {
        const savedOption = unit.options?.wargear?.find(w => {
          return matchOptionByName(opt.name, w.name);
        });
        const selected = savedOption?.selected || false;
        // Truncate selections if unit size has decreased
        const unitSize = unit.options?.unitSize || unit.modelCount;
        const truncatedSelected = truncateSelectionsForUnitSize(opt, selected, unitSize);
        return {
          ...opt,
          selected: truncatedSelected,
        };
      });
    }
  }
  return availableOptions;
};

/**
 * Gets the current options for a unit, normalizing them with defaults
 * @param {Object} unit - The unit object
 * @param {boolean} isHeroUnit - Whether this is a hero unit
 * @returns {Object} The normalized unit options
 */
export const getUnitCurrentOptions = (unit, isHeroUnit = false) => {
  const sizeOption = unit.options?.unitSize ?? unit.modelCount ? { unitSize: unit.options?.unitSize || unit.modelCount } : {};
  return {
    ...(isHeroUnit ? { warlord: false } : {}),
    ...(unit.options ? unit.options : {}),
    ...sizeOption,
  };
};
