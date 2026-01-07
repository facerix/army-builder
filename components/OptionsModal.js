import { h } from '../src/domUtils.js';

const TEMPLATE = `
  <dialog class="options-modal" closedby="any">
    <form method="dialog">
      <header>
        <h3 id="modalTitle">Unit Options</h3>
        <button id="btnClose" type="button" title="Close">
          <img src="/images/close.svg" alt="close" tabindex="50" />
        </button>
      </header>
      <section class="options-list">
        <!-- Options HTML TBD -->
      </section>
      <footer>
        <button id="btnCancel" type="button">Cancel</button>
        <button id="btnSave" type="submit">Save</button>
      </footer>
    </form>
  </dialog>
`;

const CSS = `
:host {
  button {
    border: none;
    background: transparent;
    cursor: pointer;

    img {
      height: 2em;
      width: 2em;
      margin: 0;
    }

    &:disabled {
      cursor: not-allowed;
      img {
        opacity: 0.5;
      }
    }
  
    &:not(:disabled):hover,
    &:not(:disabled):focus-visible {
      outline: var(--accent-color) auto 1px;
      background-color: #ddbfc67a;
    }
  }

  header {
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;
    border-radius: 0.25rem;
    
    h3 {
      margin-left: 1rem;
    }
    
    .actions {
      display: flex;
      align-items: center;
    }
    
    button {
      padding: 0.75rem;
      border-radius: 5px;
      img {
        filter: invert(1);
      }
    }
  }

  footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5em;
    padding: 1em;
    border-top: 2px groove #ccc;

    button {
      padding: 0.5em 1em;
      border-radius: 0.5em;
      border: 1px solid #ccc;
      background-color: #f0f0f0;
      cursor: pointer;
    }
  }

  dialog {
    padding: 0.5rem;
    min-width: 300px;
    max-height: 80dvh;
    flex-direction: column;
    
    &:open {
      display: flex;
    }

    .options-list {
      height: fit-content;
      max-height: 70dvh;
      overflow-y: scroll;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    height: -webkit-fill-available;
    max-height: 80dvh;
    overflow-y: scroll;
  }

  fieldset {
    border: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em;
    margin: 0.5em 0;

    label {
      margin-right: auto;
    }

    &.option-options {
      flex-direction: column;
      align-items: flex-start;

      .option-item {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        width: -webkit-fill-available;

        border: 1px dashed gray;
        margin: 0 0.25rem;
        padding: 0.25rem;

        label {
          font-size: small;
        }

        .option-legend-max,
        .option-legend-replaces {
          font-size: small;
          color: #666;
        }

        .option-legend-replaces {
          margin-left: 0.5em;
        }

        &.option-item-multi {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;

          .option-header {
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
          }

          .option-counter {
            font-size: small;
            color: #666;
            font-weight: 500;
          }

          .option-checkboxes {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            width: 100%;

            .option-checkbox-item {
              display: flex;
              gap: 0.5rem;
              align-items: center;

              input:disabled + label {
                opacity: 0.5;
                cursor: not-allowed;
              }
            }

            .option-checkbox-group {
              display: flex;
              flex-direction: column;
              gap: 0.25rem;
              margin-bottom: 0.5rem;
              
              .option-group-label {
                font-weight: 500;
                margin-bottom: 0.25rem;
              }
              
              .option-checkbox-row {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
                
                .option-checkbox {
                  width: 1.2em;
                  height: 1.2em;
                  cursor: pointer;
                  
                  &:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .unit-size-option {
    label.option-value {
      font-size: small;
    }
  }
}
`;

const WarlordOption = (checked) => {
  return h("fieldset", { className: "warlord-option" }, [
    h("label", { for: "warlord", innerText: "Warlord", className: "option-name" }),
    h("input", { type: "checkbox", id: "warlord", name: "warlord", checked })
  ]);
};

const EnhancementOption = (enhancements, currentEnhancement) => {
  const enhancementOptions = enhancements.length
    ? [
      h("option", { value: "", innerText: "None" }),
      ...enhancements.map(e => h("option", { value: e.name, innerText: `${e.name} (${e.points} points)`, selected: e.name === currentEnhancement }))
    ]
    : [h("option", { value: "", innerText: "None available" })];
  return h("fieldset", { className: "enhancement-option" }, [
    h("label", { innerText: "Enhancement:", className: "option-name" }),
    h("select", { id: "enhancement", name: "enhancement" }, enhancementOptions)
  ]);
};

const UnitSizeOption = (unitSizes, currentUnitSize) => {
  const unitSizeOptions = unitSizes.length
    ? [
      ...unitSizes.map(u => {
        const id = `unit-size-${u.modelCount}`;
        const checked = Number(u.modelCount) === Number(currentUnitSize);
        return [
          h("input", { type: "radio", name: "unitSize", id, value: u.modelCount, checked }),
          h("label", { className: "option-value", name: "unitSize", htmlFor: id, innerText: `${u.modelCount} (${u.points} points)`})
        ];
      }).flat()
    ]
    : [h("input", { type: "radio", value: "", selected: true })];
  return h("fieldset", { className: "unit-size-option" }, [
    h("label", { innerText: "Unit Size:", className: "option-name" }),
    ...unitSizeOptions,
  ]);
};

const optionFieldsetName = (option) => {
  return (Array.isArray(option.name) ? option.name.join("-") : option.name).replace(/ /g, "_");
};

// Helper function: Match two options by name (handles arrays and strings)
const matchOptionsByName = (option1, option2) => {
  if (Array.isArray(option1.name)) {
    if (Array.isArray(option2.name)) {
      // Both are arrays - compare element by element
      return option1.name.length === option2.name.length && 
             option1.name.every((val, idx) => val === option2.name[idx]);
    }
    // option1 is array, option2 is string - check if option2.name is in array or matches selected
    return option1.name.includes(option2.name) || 
           (option2.selected && option1.name.includes(option2.selected));
  } else {
    if (Array.isArray(option2.name)) {
      // option1 is string, option2 is array - check if option1.name is in array
      return option2.name.includes(option1.name);
    }
    // Both are strings - direct comparison
    return option1.name === option2.name;
  }
};

// Helper function: Find current option state from saved options
const findCurrentOption = (option, currentOptions, optionsKey) => {
  return currentOptions[optionsKey]?.find(w => matchOptionsByName(option, w));
};

// Helper function: Find corresponding available option from saved option
const findAvailableOption = (savedOption, availableOptions) => {
  return availableOptions?.find(opt => matchOptionsByName(opt, savedOption));
};

// Helper function: Validate option configuration
const validateOption = (option) => {
  if (option.selectionType && !Array.isArray(option.name)) {
    throw new Error(`selectionType is only valid when name is an array. Option: ${JSON.stringify(option)}`);
  }
};

// Helper function: Calculate effective max based on per property
const calculateEffectiveMax = (option, unitSize) => {
  if (option.per && unitSize) {
    return Math.floor(unitSize / option.per) * option.max;
  }
  return option.max || 0;
};

// Helper function: Normalize selected value to array for easier processing
const normalizeSelectedToArray = (selected) => {
  if (Array.isArray(selected)) {
    return selected;
  }
  if (selected && selected !== "off" && selected !== false) {
    return [selected];
  }
  return [];
};

// Helper function: Truncate selections when unit size decreases
const truncateSelectionsForUnitSize = (option, selected, unitSize) => {
  if (!option.per || !option.max) return selected;
  
  const effectiveMax = calculateEffectiveMax(option, unitSize);
  
  // Handle array selections (selectionType: "any" or "anyNoDuplicates")
  if ((option.selectionType === "any" || option.selectionType === "anyNoDuplicates") && Array.isArray(selected)) {
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

// Renderer for: replaces without max (whole unit choice)
const renderReplacesWithoutMax = (option, currentOption, fieldsetName) => {
  const upgradeOptions = Array.isArray(option.name) ? option.name : [option.name];
  const isInactive = !currentOption?.selected || currentOption?.selected === "off";
  
  return h("div", { className: "option-item" }, [
    h("div", { className: "option-value" }, [
      h("input", { type: "radio", name: fieldsetName, value: "off", checked: isInactive }),
      h("label", { innerText: option.replaces, className: "option-value" }),
    ]),
    ...upgradeOptions.map(upgradeName => {
      return h("div", { className: "option-value" }, [
        h("input", { type: "radio", name: fieldsetName, value: upgradeName, checked: currentOption?.selected === upgradeName }),
        h("label", { innerText: upgradeName, className: "option-value" }),
      ]);
    }),
  ]);
};

// Renderer for: array name, max === 1, with replaces
const renderArrayMaxOneWithReplaces = (option, currentOption, fieldsetName) => {
  const upgradeOptions = option.name;
  const isInactive = !currentOption?.selected || currentOption?.selected === "off" || 
                    (Array.isArray(currentOption?.selected) && currentOption.selected.length === 0);
  
  return h("div", { className: "option-item" }, [
    h("div", { className: "option-value" }, [
      h("input", { type: "radio", name: fieldsetName, value: "off", checked: isInactive }),
      h("label", { innerText: "None", className: "option-value" }),
    ]),
    ...upgradeOptions.map(upgradeName => {
      const isSelected = Array.isArray(currentOption?.selected) 
        ? currentOption.selected.includes(upgradeName)
        : currentOption?.selected === upgradeName;
      return h("div", { className: "option-value" }, [
        h("input", { type: "radio", name: fieldsetName, value: upgradeName, checked: isSelected }),
        h("label", { innerText: upgradeName, className: "option-value" }),
      ]);
    }),
  ]);
};

// Renderer for: array name, max === 1, without replaces
const renderArrayMaxOneWithoutReplaces = (option, currentOption, fieldsetName) => {
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
          checked: isChecked
        }),
        h("label", { htmlFor: checkboxId, innerText: upgradeName, className: "option-value" }),
      ]);
    }),
  ]);
};

// Renderer for: array name, max > 1 (standard multi-select)
const renderArrayMaxMulti = (option, currentOption, fieldsetName) => {
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
            disabled: !isChecked && isMaxReached
          }),
          h("label", { htmlFor: checkboxId, innerText: upgradeName, className: "option-value" }),
        ]);
      }),
    ]),
  ]);
};

// Renderer for: single string with max (standard checkbox)
const renderSingleStringWithMax = (option, currentOption, fieldsetName) => {
  return h("div", { className: "option-item" }, [
    h("label", { innerText: option.name, className: "option-value" }),
    h("input", { type: "checkbox", id: fieldsetName, name: fieldsetName, checked: currentOption?.selected }),
  ]);
};

// Renderer for: selectionType: "all"
const renderSelectionTypeAll = (option, currentOption, fieldsetName, effectiveMax) => {
  const upgradeOptions = option.name;
  // selected is now the actual option name string, not an index
  const selectedValue = typeof currentOption?.selected === 'string' ? currentOption.selected : null;
  
  return h("div", { className: "option-item" }, [
    h("div", { className: "option-value" }, [
      h("input", { type: "radio", name: fieldsetName, value: "off", checked: !selectedValue || selectedValue === "off" }),
      h("label", { innerText: "None", className: "option-value" }),
    ]),
    ...upgradeOptions.map((upgradeName) => {
      return h("div", { className: "option-value" }, [
        h("input", { type: "radio", name: fieldsetName, value: upgradeName, checked: selectedValue === upgradeName }),
        h("label", { innerText: upgradeName, className: "option-value" }),
      ]);
    }),
  ]);
};

// Renderer for: selectionType: "any"
const renderSelectionTypeAny = (option, currentOption, fieldsetName, effectiveMax) => {
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
              const isDisabled = !isChecked && isMaxReached;
              
              return h("input", {
                type: "checkbox",
                id: checkboxId,
                name: checkboxName,
                value: upgradeName,
                checked: isChecked,
                disabled: isDisabled,
                className: "option-checkbox"
              });
            }),
          ]),
        ]);
      }),
    ]),
  ]);
};

// Renderer for: selectionType: "anyNoDuplicates"
const renderSelectionTypeAnyNoDuplicates = (option, currentOption, fieldsetName, effectiveMax) => {
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
            disabled: !isChecked && isMaxReached
          }),
          h("label", { htmlFor: checkboxId, innerText: upgradeName, className: "option-value" }),
        ]);
      }),
    ]),
  ]);
};

// Renderer for: single string with per
const renderSingleStringWithPer = (option, currentOption, fieldsetName, effectiveMax) => {
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
        const isDisabled = !isChecked && isMaxReached;
        
        return h("div", { className: "option-checkbox-item" }, [
          h("input", {
            type: "checkbox",
            id: checkboxId,
            name: fieldsetName,
            value: "1",
            checked: isChecked,
            disabled: isDisabled
          }),
          h("label", { htmlFor: checkboxId, innerText: option.name, className: "option-value" }),
        ]);
      }),
    ]),
  ]);
};

const OptionFieldset = (optionType, optionOptions, currentOptions, labelText) => {
  const optionsKey = optionType; // "weapons" or "wargear"
  const unitSize = currentOptions.unitSize;
  
  const optionsList = optionOptions.map(option => {
    // Validate option
    validateOption(option);
    
    // Find current option state
    const currentOption = findCurrentOption(option, currentOptions, optionsKey);
    const fieldsetName = optionFieldsetName(option);
    
    // Calculate effective max
    const effectiveMax = option.max ? calculateEffectiveMax(option, unitSize) : 0;
    
    // Route to appropriate renderer based on option properties
    // Priority order matters here
    
    // 1. Has replaces but no max
    if (option.replaces && !option.max) {
      return renderReplacesWithoutMax(option, currentOption, fieldsetName);
    }
    
    // 2. Has max
    if (option.max) {
      // Array name with selectionType
      if (Array.isArray(option.name) && option.selectionType) {
        switch (option.selectionType) {
          case "all":
            return renderSelectionTypeAll(option, currentOption, fieldsetName, effectiveMax);
          case "any":
            return renderSelectionTypeAny(option, currentOption, fieldsetName, effectiveMax);
          case "anyNoDuplicates":
            return renderSelectionTypeAnyNoDuplicates(option, currentOption, fieldsetName, effectiveMax);
          default:
            throw new Error(`Unknown selectionType: ${option.selectionType}`);
        }
      }
      
      // Array name without selectionType
      if (Array.isArray(option.name)) {
        if (option.max === 1) {
          if (option.replaces) {
            return renderArrayMaxOneWithReplaces(option, currentOption, fieldsetName);
          } else {
            return renderArrayMaxOneWithoutReplaces(option, currentOption, fieldsetName);
          }
        } else {
          return renderArrayMaxMulti(option, currentOption, fieldsetName);
        }
      }
      
      // Single string name
      if (typeof option.name === 'string') {
        if (option.per) {
          return renderSingleStringWithPer(option, currentOption, fieldsetName, effectiveMax);
        } else {
          return renderSingleStringWithMax(option, currentOption, fieldsetName);
        }
      }
    }
    
    // 3. No max and no replaces (fallback)
    return document.createDocumentFragment();
  });

  return h("fieldset", { className: "option-options" }, [
    h("label", { innerText: labelText, className: "option-name" }),
    ...optionsList
  ]);
};

class OptionsModal extends HTMLElement {
  #options = {};
  #availableOptions = {};
  #ready = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.#ready) return;
    const shadow = this.shadowRoot;
    const style = document.createElement("style");
    style.textContent = CSS;
    shadow.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.innerHTML = TEMPLATE;
    shadow.appendChild(wrapper);

    this.dialog = shadow.querySelector("dialog");
    this.titleElem = shadow.querySelector("#modalTitle");
    this.btnClose = shadow.querySelector("#btnClose");
    this.btnCancel = shadow.querySelector("#btnCancel");
    this.btnSave = shadow.querySelector("#btnSave");
    this.optionsList = shadow.querySelector(".options-list");

    this.btnClose.addEventListener("click", () => this.close());
    this.btnCancel.addEventListener("click", () => this.close());
    this.dialog.addEventListener("close", () => this.close());

    // Attach the submit event handler to the form element, not the custom element itself
    this.form = shadow.querySelector("form");
    if (this.form) {
      this.form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this.saveOptions();
      });
      
      // Add change listeners for checkboxes to update counters dynamically and enforce max: 1
      this.form.addEventListener("change", (evt) => {
        if (evt.target.name === "unitSize") {
          // Unit size changed, update options first then truncate and re-render to update effectiveMax
          this.#options.unitSize = parseInt(evt.target.value, 10);
          this.#truncateAllSelections();
          this.render();
        } else if (evt.target.type === "checkbox" && evt.target.name) {
          // Check if this is a max: 1 checkbox option (no counter header, just checkboxes)
          const optionItem = evt.target.closest(".option-item");
          if (optionItem && !optionItem.classList.contains("option-item-multi")) {
            // This might be a max: 1 checkbox group - check if we need to enforce single selection
            const checkboxes = this.form.querySelectorAll(`input[type="checkbox"][name="${evt.target.name}"]`);
            if (checkboxes.length > 1 && evt.target.checked) {
              // If max is 1, uncheck all other checkboxes when one is checked
              checkboxes.forEach(cb => {
                if (cb !== evt.target && cb.checked) {
                  cb.checked = false;
                }
              });
            }
          } else {
            // Multi-select with counter - need to find the base fieldset name
            const checkboxName = evt.target.name;
            // For selectionType: "any", checkbox names are like "fieldsetName-0", extract base name
            // Check if name ends with a pattern like "-N" where N is a number
            const match = checkboxName.match(/^(.+)-(\d+)$/);
            const baseName = match ? match[1] : checkboxName;
            this.updateMultiSelectCounter(baseName);
          }
        }
      });
    }

    this.#ready = true;
    this.render();
  }

  updateMultiSelectCounter(fieldsetName) {
    const shadow = this.shadowRoot;
    if (!shadow) return;
    
    // Find all checkboxes that match this fieldset (including indexed names for selectionType: "any")
    const checkboxes = shadow.querySelectorAll(
      `input[type="checkbox"][name="${fieldsetName}"], input[type="checkbox"][name^="${fieldsetName}-"]`
    );
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const firstCheckbox = shadow.querySelector(
      `input[type="checkbox"][name="${fieldsetName}"], input[type="checkbox"][name^="${fieldsetName}-"]`
    );
    if (!firstCheckbox) return;
    
    const optionItem = firstCheckbox.closest(".option-item-multi");
    if (!optionItem) return;
    
    const counter = optionItem.querySelector(".option-counter");
    const header = optionItem.querySelector(".option-legend-max");
    
    if (counter && header) {
      // Extract max from the option header text (e.g., "Select up to 2")
      const maxMatch = header.textContent.match(/\d+/);
      const max = maxMatch ? parseInt(maxMatch[0], 10) : 0;
      counter.textContent = `${checkedCount} / ${max} selected`;
      
      // Enable/disable checkboxes based on max
      checkboxes.forEach(cb => {
        if (!cb.checked && checkedCount >= max) {
          cb.disabled = true;
        } else {
          cb.disabled = false;
        }
      });
    }
  }

  // Helper: Read current form state for an option type and update this.#options
  #syncOptionsFromForm(optionType) {
    const formData = new window.FormData(this.form);
    const options = Object.fromEntries(formData);
    const { warlord, enhancement, unitSize, ...rest } = options;
    const savedOptions = this.#options[optionType] || [];
    const availableOptions = this.#availableOptions[optionType];
    
    if (!savedOptions || !availableOptions) return;
    
    // Helper: Get form values for a fieldset name, filtering out "off"
    const getFormValues = (name) => formData.getAll(name).filter(v => v !== "off");
    
    // Helper: Return array if non-empty, otherwise false
    const arrayOrFalse = (arr) => arr.length > 0 ? arr : false;
    
    savedOptions.forEach(savedOption => {
      const availableOption = findAvailableOption(savedOption, availableOptions);
      const option = availableOption || savedOption;
      const fieldsetName = optionFieldsetName(savedOption);
      
      // Read current form state based on option type
      if (option.selectionType === "all" && Array.isArray(option.name)) {
        if (fieldsetName in rest) {
          const value = rest[fieldsetName];
          savedOption.selected = value === "off" ? false : value;
        }
      } else if (option.selectionType === "any" && Array.isArray(option.name)) {
        const selectedArray = [];
        option.name.forEach((optionName, optionIndex) => {
          const checkboxName = `${fieldsetName}-${optionIndex}`;
          const checkedCount = getFormValues(checkboxName).length;
          for (let i = 0; i < checkedCount; i++) {
            selectedArray.push(optionName);
          }
        });
        savedOption.selected = arrayOrFalse(selectedArray);
      } else if (option.selectionType === "anyNoDuplicates" && Array.isArray(option.name)) {
        savedOption.selected = arrayOrFalse(getFormValues(fieldsetName));
      } else if (typeof option.name === 'string' && option.per) {
        savedOption.selected = getFormValues(fieldsetName).length;
      } else {
        // For other types, read from form if present
        const isMultiSelect = Array.isArray(option.name) && option.max > 1;
        if (isMultiSelect) {
          savedOption.selected = arrayOrFalse(getFormValues(fieldsetName));
        } else if (fieldsetName in rest) {
          savedOption.selected = rest[fieldsetName];
        }
      }
    });
  }

  // Helper: Truncate selections for a single option type (weapons or wargear)
  #truncateSelectionsForOptionType(savedOptions, availableOptions, unitSize) {
    if (!savedOptions || !availableOptions) return;
    
    savedOptions.forEach(savedOption => {
      const unitOption = findAvailableOption(savedOption, availableOptions);
      if (unitOption && savedOption.selected !== false && savedOption.selected !== undefined) {
        savedOption.selected = truncateSelectionsForUnitSize(unitOption, savedOption.selected, unitSize);
      }
    });
  }

  // Truncate selections for all options based on current unit size
  // Reads current form state first to preserve unsaved changes
  #truncateAllSelections() {
    const unitSize = this.#options.unitSize;
    if (!unitSize) return;
    
    // Sync current form state to this.#options before truncating
    this.#syncOptionsFromForm("weapons");
    this.#syncOptionsFromForm("wargear");
    
    this.#truncateSelectionsForOptionType(
      this.#options.weapons, 
      this.#availableOptions.weapons, 
      unitSize
    );
    this.#truncateSelectionsForOptionType(
      this.#options.wargear, 
      this.#availableOptions.wargear, 
      unitSize
    );
  }

  get options() {
    return { ...this.#options };
  }

  set options(obj) {
    this.#options = { ...obj };
    // Truncate selections if unit size is set
    this.#truncateAllSelections();
    this.render();
  }

  set availableOptions(obj) {
    this.#availableOptions = { ...obj };
    this.render();
  }

  set title(val) {
    if (!this.titleElem) return;
    this.titleElem.textContent = val;
  }

  showModal() {
    if (!this.#ready) this.connectedCallback();
    this.dialog.showModal();
  }

  close() {
    if (this.dialog && this.dialog.open) {
      this.dialog.close();
    }
  }

  saveOptions() {
    const formData = new window.FormData(this.form);
    const options = Object.fromEntries(formData);
    const { warlord, enhancement, unitSize, ...rest } = options;
    const { weapons = [], wargear = [] } = this.#options;

    // Helper: Get form values for a fieldset name, filtering out "off"
    const getFormValues = (name) => formData.getAll(name).filter(v => v !== "off");
    
    // Helper: Return array if non-empty, otherwise false
    const arrayOrFalse = (arr) => arr.length > 0 ? arr : false;

    // Helper function to parse weapon/wargear option
    const parseOption = (savedOption, availableOption) => {
      const fieldsetName = optionFieldsetName(savedOption);
      
      // Use availableOption for property checks since it has the full definition
      const option = availableOption || savedOption;
      
      // Handle selectionType: "all"
      if (option.selectionType === "all" && Array.isArray(option.name)) {
        if (fieldsetName in rest) {
          const value = rest[fieldsetName];
          return value === "off" ? false : value;
        }
        return false;
      }
      
      // Handle selectionType: "any"
      if (option.selectionType === "any" && Array.isArray(option.name)) {
        const selectedArray = [];
        option.name.forEach((optionName, optionIndex) => {
          const checkboxName = `${fieldsetName}-${optionIndex}`;
          const checkedCount = getFormValues(checkboxName).length;
          for (let i = 0; i < checkedCount; i++) {
            selectedArray.push(optionName);
          }
        });
        return arrayOrFalse(selectedArray);
      }
      
      // Handle selectionType: "anyNoDuplicates"
      if (option.selectionType === "anyNoDuplicates" && Array.isArray(option.name)) {
        return arrayOrFalse(getFormValues(fieldsetName));
      }
      
      // Handle single string with per
      if (typeof option.name === 'string' && option.per) {
        return getFormValues(fieldsetName).length;
      }
      
      // Existing logic for other cases
      // Check if this is a multi-select option (array name with max > 1)
      const isMultiSelect = Array.isArray(option.name) && option.max > 1;
      
      if (isMultiSelect) {
        return arrayOrFalse(getFormValues(fieldsetName));
      } else if (fieldsetName in rest) {
        // Single select: radio buttons or single checkbox
        return rest[fieldsetName];
      } else {
        return false;
      }
    };

    // Helper: Process and parse options for a single option type
    const processOptionType = (savedOptions, availableOptions) => {
      savedOptions?.forEach(savedOption => {
        const availableOption = findAvailableOption(savedOption, availableOptions);
        savedOption.selected = parseOption(savedOption, availableOption);
      });
    };

    // Interpret weapons and wargear form data back into the unit options format
    processOptionType(weapons, this.#availableOptions.weapons);
    processOptionType(wargear, this.#availableOptions.wargear);

    // Truncate selections before saving to ensure validity
    const currentUnitSize = unitSize ? parseInt(unitSize, 10) : this.#options.unitSize;
    if (currentUnitSize) {
      this.#truncateSelectionsForOptionType(weapons, this.#availableOptions.weapons, currentUnitSize);
      this.#truncateSelectionsForOptionType(wargear, this.#availableOptions.wargear, currentUnitSize);
    }

    this.options = {
      ...(warlord ? { warlord: warlord === "on" } : {}),
      ...(enhancement ? { enhancement } : {}),
      ...(unitSize ? { unitSize: parseInt(unitSize, 10) } : {}),
      ...(weapons ? { weapons } : {}),
      ...(wargear ? { wargear } : {}),
    };

    this.dispatchEvent(new CustomEvent("optionsSaved", {
      detail: {
        options: this.options
      },
      bubbles: true,
      composed: true
    }));
    this.close();
  }

  render() {
    if (this.optionsList && this.#availableOptions) {
      this.optionsList.innerHTML = "";
      if (this.#options.warlord !== undefined) {
        this.optionsList.append(WarlordOption(this.#options.warlord));
      }
      if (this.#availableOptions.enhancements) {
        this.optionsList.append(EnhancementOption(this.#availableOptions.enhancements, this.#options.enhancement));
      }
      if (this.#availableOptions.unitSize) {
        this.optionsList.append(UnitSizeOption(this.#availableOptions.unitSize, this.#options.unitSize));
      }
      if (this.#availableOptions.weapons) {
        this.optionsList.append(OptionFieldset("weapons", this.#availableOptions.weapons, this.#options, "Weapon options:"));
      }
      if (this.#availableOptions.wargear) {
        this.optionsList.append(OptionFieldset("wargear", this.#availableOptions.wargear, this.#options, "Wargear options:"));
      }
      
      // Initialize counters for multi-select options
      if (this.#availableOptions.weapons) {
        this.#availableOptions.weapons.forEach(opt => {
          const fieldsetName = optionFieldsetName(opt);
          // Initialize counter if it's a multi-select option (max > 1, or has per property, or has selectionType)
          if ((Array.isArray(opt.name) && opt.max > 1) || 
              (opt.per && opt.max) || 
              (opt.selectionType && Array.isArray(opt.name))) {
            this.updateMultiSelectCounter(fieldsetName);
          }
        });
      }
      if (this.#availableOptions.wargear) {
        this.#availableOptions.wargear.forEach(opt => {
          const fieldsetName = optionFieldsetName(opt);
          // Initialize counter if it's a multi-select option (max > 1, or has per property, or has selectionType)
          if ((Array.isArray(opt.name) && opt.max > 1) || 
              (opt.per && opt.max) || 
              (opt.selectionType && Array.isArray(opt.name))) {
            this.updateMultiSelectCounter(fieldsetName);
          }
        });
      }
    }
  }
}

customElements.define("options-modal", OptionsModal);
