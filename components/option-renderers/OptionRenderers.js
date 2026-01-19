/**
 * Renderer functions for different option types
 */

import { h } from '../../src/domUtils.js';
import { normalizeSelectedToArray, formatReplacedItemsLabel, optionFieldsetName } from './OptionUtils.js';

/**
 * Renderer for: replaces without max (whole unit choice)
 */
export const renderReplacesWithoutMax = (option, currentOption, fieldsetName, isDisabled = false) => {
  const upgradeOptions = Array.isArray(option.name) ? option.name : [option.name];
  const isInactive = !currentOption?.selected || currentOption?.selected === "off";
  const replacedItemsLabel = formatReplacedItemsLabel(option.replaces);
  
  return h("div", { className: "option-item" }, [
    h("div", { className: "option-value" }, [
      h("input", { type: "radio", name: fieldsetName, value: "off", checked: isInactive, disabled: isDisabled }),
      h("label", { innerText: replacedItemsLabel, className: "option-value" }),
    ]),
    ...upgradeOptions.map(upgradeName => {
      return h("div", { className: "option-value" }, [
        h("input", { type: "radio", name: fieldsetName, value: upgradeName, checked: currentOption?.selected === upgradeName, disabled: isDisabled }),
        h("label", { innerText: upgradeName, className: "option-value" }),
      ]);
    }),
  ]);
};

/**
 * Renderer for: array name, max === 1, with replaces
 */
export const renderArrayMaxOneWithReplaces = (option, currentOption, fieldsetName, isDisabled = false) => {
  const upgradeOptions = option.name;
  const isInactive = !currentOption?.selected || currentOption?.selected === "off" || 
                    (Array.isArray(currentOption?.selected) && currentOption.selected.length === 0);
  
  const replacedItemsLabel = formatReplacedItemsLabel(option.replaces);
  
  return h("div", { className: "option-item" }, [
    h("div", { className: "option-value" }, [
      h("input", { type: "radio", name: fieldsetName, value: "off", checked: isInactive, disabled: isDisabled }),
      h("label", { innerText: replacedItemsLabel, className: "option-value" }),
    ]),
    ...upgradeOptions.map(upgradeName => {
      const isSelected = Array.isArray(currentOption?.selected) 
        ? currentOption.selected.includes(upgradeName)
        : currentOption?.selected === upgradeName;
      return h("div", { className: "option-value" }, [
        h("input", { type: "radio", name: fieldsetName, value: upgradeName, checked: isSelected, disabled: isDisabled }),
        h("label", { innerText: upgradeName, className: "option-value" }),
      ]);
    }),
  ]);
};

/**
 * Renderer for: array name, max === 1, without replaces
 */
export const renderArrayMaxOneWithoutReplaces = (option, currentOption, fieldsetName, isDisabled = false) => {
  const upgradeOptions = option.name;
  const selectedArray = normalizeSelectedToArray(currentOption?.selected);
  
  return h("div", { className: "option-item" }, [
    ...upgradeOptions.map(upgradeName => {
      const isChecked = selectedArray.includes(upgradeName);
      const checkboxId = `${fieldsetName}-${upgradeName.replace(/ /g, "_")}`;
      return h("div", { className: "option-checkbox-item", style: "display: flex; gap: 0.5rem; align-items: center;" }, [
        h("input", { 
          type: "checkbox", 
          id: checkboxId, 
          name: fieldsetName, 
          value: upgradeName,
          checked: isChecked,
          disabled: isDisabled
        }),
        h("label", { htmlFor: checkboxId, innerText: upgradeName, className: "option-value" }),
      ]);
    }),
  ]);
};

/**
 * Renderer for: array name, max > 1 (standard multi-select)
 */
export const renderArrayMaxMulti = (option, currentOption, fieldsetName, isDisabled = false) => {
  const upgradeOptions = option.name;
  const selectedArray = normalizeSelectedToArray(currentOption?.selected);
  const selectedCount = selectedArray.length;
  const isMaxReached = selectedCount >= option.max;
  
  return h("div", { className: "option-item option-item-multi" }, [
    h("div", { className: "option-header" }, [
      h("span", { className: "option-legend-max", innerText: `Select up to ${option.max}` }),
      h("span", { className: "option-counter", innerText: `${selectedCount} / ${option.max} selected` }),
    ]),
    h("div", { className: "option-checkboxes" }, [
      ...upgradeOptions.map(upgradeName => {
        const isChecked = selectedArray.includes(upgradeName);
        const checkboxId = `${fieldsetName}-${upgradeName.replace(/ /g, "_")}`;
        return h("div", { className: "option-checkbox-item" }, [
          h("input", { 
            type: "checkbox", 
            id: checkboxId, 
            name: fieldsetName, 
            value: upgradeName,
            checked: isChecked,
            disabled: isDisabled || (!isChecked && isMaxReached)
          }),
          h("label", { htmlFor: checkboxId, innerText: upgradeName, className: "option-value" }),
        ]);
      }),
    ]),
  ]);
};

/**
 * Renderer for: single string with max (standard checkbox)
 */
export const renderSingleStringWithMax = (option, currentOption, fieldsetName, isDisabled = false, exclusionReason = null) => {
  const elements = [
    h("label", { innerText: option.name, className: "option-value" }),
    h("input", { type: "checkbox", id: fieldsetName, name: fieldsetName, checked: currentOption?.selected, disabled: isDisabled }),
  ];
  
  if (isDisabled && exclusionReason) {
    elements.push(h("span", { className: "option-legend-excludes", innerText: exclusionReason }));
  }
  
  return h("div", { className: "option-item" }, elements);
};

/**
 * Renderer for: selectionType: "all"
 */
export const renderSelectionTypeAll = (option, currentOption, fieldsetName, effectiveMax, isDisabled = false) => {
  const upgradeOptions = option.name;
  const selectedValue = typeof currentOption?.selected === 'string' ? currentOption.selected : null;
  
  return h("div", { className: "option-item" }, [
    h("div", { className: "option-value" }, [
      h("input", { type: "radio", name: fieldsetName, value: "off", checked: !selectedValue || selectedValue === "off", disabled: isDisabled }),
      h("label", { innerText: "None", className: "option-value" }),
    ]),
    ...upgradeOptions.map((upgradeName) => {
      return h("div", { className: "option-value" }, [
        h("input", { type: "radio", name: fieldsetName, value: upgradeName, checked: selectedValue === upgradeName, disabled: isDisabled }),
        h("label", { innerText: upgradeName, className: "option-value" }),
      ]);
    }),
  ]);
};

/**
 * Renderer for: selectionType: "any"
 */
export const renderSelectionTypeAny = (option, currentOption, fieldsetName, effectiveMax, isDisabled = false) => {
  const upgradeOptions = option.name;
  
  // Count selections per option
  const selectionsByOption = {};
  upgradeOptions.forEach(optName => {
    selectionsByOption[optName] = (currentOption?.selected || []).filter(s => s === optName).length;
  });
  
  const totalSelected = (currentOption?.selected || []).length;
  const isMaxReached = totalSelected >= effectiveMax;
  
  return h("div", { className: "option-item option-item-multi" }, [
    h("div", { className: "option-header" }, [
      h("span", { className: "option-legend-max", innerText: `Select up to ${effectiveMax}` }),
      h("span", { className: "option-counter", innerText: `${totalSelected} / ${effectiveMax} selected` }),
    ]),
    h("div", { className: "option-checkboxes" }, [
      ...upgradeOptions.map((upgradeName, optionIndex) => {
        return h("div", { className: "option-checkbox-group" }, [
          h("label", { className: "option-group-label", innerText: upgradeName }),
          h("div", { className: "option-checkbox-row" }, [
            ...Array.from({ length: effectiveMax }, (_, checkboxIndex) => {
              const checkboxId = `${fieldsetName}-${optionIndex}-${checkboxIndex}`;
              const checkboxName = `${fieldsetName}-${optionIndex}`;
              const isChecked = checkboxIndex < selectionsByOption[upgradeName];
              const checkboxDisabled = isDisabled || (!isChecked && isMaxReached);
              
              return h("input", {
                type: "checkbox",
                id: checkboxId,
                name: checkboxName,
                value: upgradeName,
                checked: isChecked,
                disabled: checkboxDisabled,
                className: "option-checkbox"
              });
            }),
          ]),
        ]);
      }),
    ]),
  ]);
};

/**
 * Renderer for: selectionType: "anyNoDuplicates"
 */
export const renderSelectionTypeAnyNoDuplicates = (option, currentOption, fieldsetName, effectiveMax, isDisabled = false) => {
  const upgradeOptions = option.name;
  const selectedArray = normalizeSelectedToArray(currentOption?.selected);
  const selectedCount = selectedArray.length;
  const isMaxReached = selectedCount >= effectiveMax;
  
  return h("div", { className: "option-item option-item-multi" }, [
    h("div", { className: "option-header" }, [
      h("span", { className: "option-legend-max", innerText: `Select up to ${effectiveMax}` }),
      h("span", { className: "option-counter", innerText: `${selectedCount} / ${effectiveMax} selected` }),
    ]),
    h("div", { className: "option-checkboxes" }, [
      ...upgradeOptions.map(upgradeName => {
        const isChecked = selectedArray.includes(upgradeName);
        const checkboxId = `${fieldsetName}-${upgradeName.replace(/ /g, "_")}`;
        return h("div", { className: "option-checkbox-item" }, [
          h("input", { 
            type: "checkbox", 
            id: checkboxId, 
            name: fieldsetName, 
            value: upgradeName,
            checked: isChecked,
            disabled: isDisabled || (!isChecked && isMaxReached)
          }),
          h("label", { htmlFor: checkboxId, innerText: upgradeName, className: "option-value" }),
        ]);
      }),
    ]),
  ]);
};

/**
 * Renderer for: single string with per
 */
export const renderSingleStringWithPer = (option, currentOption, fieldsetName, effectiveMax, isDisabled = false) => {
  const selectedCount = typeof currentOption?.selected === 'number' ? currentOption.selected : 0;
  const isMaxReached = selectedCount >= effectiveMax;
  
  return h("div", { className: "option-item option-item-multi" }, [
    h("div", { className: "option-header" }, [
      h("span", { className: "option-legend-max", innerText: `Select up to ${effectiveMax}` }),
      h("span", { className: "option-counter", innerText: `${selectedCount} / ${effectiveMax} selected` }),
    ]),
    h("div", { className: "option-checkboxes" }, [
      ...Array.from({ length: effectiveMax }, (_, index) => {
        const checkboxId = `${fieldsetName}-${index}`;
        const isChecked = index < selectedCount;
        const checkboxDisabled = isDisabled || (!isChecked && isMaxReached);
        
        return h("div", { className: "option-checkbox-item" }, [
          h("input", {
            type: "checkbox",
            id: checkboxId,
            name: fieldsetName,
            value: "1",
            checked: isChecked,
            disabled: checkboxDisabled
          }),
          h("label", { htmlFor: checkboxId, innerText: option.name, className: "option-value" }),
        ]);
      }),
    ]),
  ]);
};
