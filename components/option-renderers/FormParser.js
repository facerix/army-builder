/**
 * Handles parsing form data into option selections
 */

import { optionFieldsetName, findAvailableOption } from './OptionUtils.js';

/**
 * Helper: Get form values for a fieldset name, filtering out "off"
 */
const getFormValues = (formData, name) => formData.getAll(name).filter(v => v !== 'off');

/**
 * Helper: Return array if non-empty, otherwise false
 */
const arrayOrFalse = arr => (arr.length > 0 ? arr : false);

/**
 * Parse a single option from form data
 */
export const parseOption = (savedOption, availableOption, formData, rest) => {
  const fieldsetName = optionFieldsetName(savedOption);

  // Use availableOption for property checks since it has the full definition
  const option = availableOption || savedOption;

  // Handle selectionType: "all"
  if (option.selectionType === 'all' && Array.isArray(option.name)) {
    if (fieldsetName in rest) {
      const value = rest[fieldsetName];
      return value === 'off' ? false : value;
    }
    return false;
  }

  // Handle selectionType: "any"
  // But if max === 1 and replaces exists, it uses radio buttons (handled below)
  if (
    option.selectionType === 'any' &&
    Array.isArray(option.name) &&
    !(option.max === 1 && option.replaces)
  ) {
    const selectedArray = [];
    option.name.forEach((optionName, optionIndex) => {
      const checkboxName = `${fieldsetName}-${optionIndex}`;
      const checkedCount = getFormValues(formData, checkboxName).length;
      for (let i = 0; i < checkedCount; i++) {
        selectedArray.push(optionName);
      }
    });
    return arrayOrFalse(selectedArray);
  }

  // Handle selectionType: "anyNoDuplicates"
  if (option.selectionType === 'anyNoDuplicates' && Array.isArray(option.name)) {
    return arrayOrFalse(getFormValues(formData, fieldsetName));
  }

  // Handle single string with per
  if (typeof option.name === 'string' && option.per) {
    return getFormValues(formData, fieldsetName).length;
  }

  // Existing logic for other cases
  // Check if this is a multi-select option (array name with max > 1)
  const isMultiSelect = Array.isArray(option.name) && option.max > 1;

  if (isMultiSelect) {
    return arrayOrFalse(getFormValues(formData, fieldsetName));
  } else if (fieldsetName in rest) {
    // Single select: radio buttons or single checkbox
    return rest[fieldsetName];
  } else {
    return false;
  }
};

/**
 * Process and parse options for a single option type
 */
export const processOptionType = (savedOptions, availableOptions, formData, rest) => {
  savedOptions?.forEach(savedOption => {
    const availableOption = findAvailableOption(savedOption, availableOptions);
    savedOption.selected = parseOption(savedOption, availableOption, formData, rest);
  });
};

/**
 * Sync form state to options object for a single option type
 */
export const syncOptionsFromForm = (optionType, savedOptions, availableOptions, formData, rest) => {
  if (!savedOptions || !availableOptions) return;

  savedOptions.forEach(savedOption => {
    const availableOption = findAvailableOption(savedOption, availableOptions);
    const option = availableOption || savedOption;
    const fieldsetName = optionFieldsetName(savedOption);

    // Read current form state based on option type
    if (option.selectionType === 'all' && Array.isArray(option.name)) {
      if (fieldsetName in rest) {
        const value = rest[fieldsetName];
        savedOption.selected = value === 'off' ? false : value;
      }
    } else if (
      option.selectionType === 'any' &&
      Array.isArray(option.name) &&
      !(option.max === 1 && option.replaces)
    ) {
      const selectedArray = [];
      option.name.forEach((optionName, optionIndex) => {
        const checkboxName = `${fieldsetName}-${optionIndex}`;
        const checkedCount = getFormValues(formData, checkboxName).length;
        for (let i = 0; i < checkedCount; i++) {
          selectedArray.push(optionName);
        }
      });
      savedOption.selected = arrayOrFalse(selectedArray);
    } else if (option.selectionType === 'anyNoDuplicates' && Array.isArray(option.name)) {
      savedOption.selected = arrayOrFalse(getFormValues(formData, fieldsetName));
    } else if (typeof option.name === 'string' && option.per) {
      savedOption.selected = getFormValues(formData, fieldsetName).length;
    } else {
      // For other types, read from form if present
      const isMultiSelect = Array.isArray(option.name) && option.max > 1;
      if (isMultiSelect) {
        savedOption.selected = arrayOrFalse(getFormValues(formData, fieldsetName));
      } else if (fieldsetName in rest) {
        savedOption.selected = rest[fieldsetName];
      }
    }
  });
};
