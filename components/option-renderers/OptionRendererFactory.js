/**
 * Factory that routes options to the appropriate renderer based on their properties
 */

import {
  optionFieldsetName,
  findCurrentOption,
  calculateEffectiveMax,
  validateOption,
} from './OptionUtils.js';
import { getExcludedItemsPresent, formatExclusionReason } from './ExclusionManager.js';
import {
  renderReplacesWithoutMax,
  renderArrayMaxOneWithReplaces,
  renderArrayMaxOneWithoutReplaces,
  renderArrayMaxMulti,
  renderSingleStringWithMax,
  renderSelectionTypeAll,
  renderSelectionTypeAny,
  renderSelectionTypeAnyNoDuplicates,
  renderSingleStringWithPer,
} from './OptionRenderers.js';

/**
 * Render a single option using the appropriate renderer
 */
export const renderOption = (
  option,
  currentOptions,
  optionsKey,
  unitSize,
  allDefaultItems,
  allCurrentOptions,
  allAvailableOptions
) => {
  // Validate option
  validateOption(option);

  // Find current option state
  const currentOption = findCurrentOption(option, currentOptions, optionsKey);
  const fieldsetName = optionFieldsetName(option);

  // Check if this option should be disabled due to excludes and get exclusion reason
  let isDisabled = false;
  let exclusionReason = null;
  if (option.excludes) {
    const excludedItems = getExcludedItemsPresent(
      option.excludes,
      allDefaultItems,
      allCurrentOptions,
      allAvailableOptions
    );
    isDisabled = excludedItems.length > 0;
    exclusionReason = formatExclusionReason(excludedItems);
  }

  // Default single string options without max or replaces to max: 1
  // This handles simple optional wargear/weapons (e.g., "Resurrection orb")
  const normalizedOption = { ...option };
  if (typeof option.name === 'string' && !option.max && !option.replaces) {
    normalizedOption.max = 1;
  }

  // Calculate effective max
  const effectiveMax =
    normalizedOption.max !== undefined ? calculateEffectiveMax(normalizedOption, unitSize) : 0;

  // Route to appropriate renderer based on option properties
  // Priority order matters here

  // 1. Has replaces but no max
  if (normalizedOption.replaces && !normalizedOption.max) {
    return renderReplacesWithoutMax(normalizedOption, currentOption, fieldsetName, isDisabled);
  }

  // 2. Has max
  if (normalizedOption.max !== undefined) {
    // Array name with max === 1 and replaces - use radio buttons (prioritize over selectionType)
    if (
      Array.isArray(normalizedOption.name) &&
      normalizedOption.max === 1 &&
      normalizedOption.replaces
    ) {
      return renderArrayMaxOneWithReplaces(
        normalizedOption,
        currentOption,
        fieldsetName,
        isDisabled
      );
    }

    // Array name with selectionType (but not max === 1 with replaces)
    if (Array.isArray(normalizedOption.name) && normalizedOption.selectionType) {
      switch (normalizedOption.selectionType) {
        case 'all':
          return renderSelectionTypeAll(
            normalizedOption,
            currentOption,
            fieldsetName,
            effectiveMax,
            isDisabled
          );
        case 'any':
          return renderSelectionTypeAny(
            normalizedOption,
            currentOption,
            fieldsetName,
            effectiveMax,
            isDisabled
          );
        case 'anyNoDuplicates':
          return renderSelectionTypeAnyNoDuplicates(
            normalizedOption,
            currentOption,
            fieldsetName,
            effectiveMax,
            isDisabled
          );
        default:
          throw new Error(`Unknown selectionType: ${normalizedOption.selectionType}`);
      }
    }

    // Array name without selectionType
    if (Array.isArray(normalizedOption.name)) {
      if (normalizedOption.max === 1) {
        if (normalizedOption.replaces) {
          return renderArrayMaxOneWithReplaces(
            normalizedOption,
            currentOption,
            fieldsetName,
            isDisabled
          );
        } else {
          return renderArrayMaxOneWithoutReplaces(
            normalizedOption,
            currentOption,
            fieldsetName,
            isDisabled
          );
        }
      } else {
        return renderArrayMaxMulti(normalizedOption, currentOption, fieldsetName, isDisabled);
      }
    }

    // Single string name
    if (typeof normalizedOption.name === 'string') {
      if (normalizedOption.per) {
        return renderSingleStringWithPer(
          normalizedOption,
          currentOption,
          fieldsetName,
          effectiveMax,
          isDisabled
        );
      } else {
        return renderSingleStringWithMax(
          normalizedOption,
          currentOption,
          fieldsetName,
          isDisabled,
          exclusionReason
        );
      }
    }
  }

  // 3. No max and no replaces (fallback - should not be reached after normalization)
  return document.createDocumentFragment();
};
