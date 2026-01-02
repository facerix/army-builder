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

const OptionFieldset = (optionType, optionOptions, currentOptions, labelText) => {
  const optionsKey = optionType; // "weapons" or "wargear"
  
  const optionsList = optionOptions.map(option => {
    // two kinds of options:
    // if it has a "replaces" and no "max", then it's a choice for the whole unit: show both with radio buttons
    // if it has a "max", then it doesn't matter if it has a "replaces": it should be a checkbox per max value
    // if "name" is an array instead of a single string, there are multiple upgrade options: show radio buttons for each
    const currentOption = currentOptions[optionsKey]?.find(w => {
      // Match by name, handling arrays
      if (Array.isArray(option.name)) {
        // If option.name is an array, check if w.name matches (also array) or if w.selected is in the array
        if (Array.isArray(w.name)) {
          // Compare arrays by checking if they have the same length and same elements
          return w.name.length === option.name.length && 
                 w.name.every((val, idx) => val === option.name[idx]);
        }
        // If w.name is not an array but w.selected is set, check if selected value is in option.name array
        return w.selected && option.name.includes(w.selected);
      } else {
        // If option.name is a string, check if w.name matches (string or array containing it)
        if (Array.isArray(w.name)) {
          return w.name.includes(option.name);
        }
        return w.name === option.name;
      }
    });

    const fieldsetName = optionFieldsetName(option);
    if (option.replaces && !option.max) {
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
    }

    if (option.max) {
      // If name is an array, handle based on max value
      if (Array.isArray(option.name)) {
        const upgradeOptions = option.name;
        // If max is 1, show radio buttons only if there's a replaces property, otherwise show checkbox
        if (option.max === 1) {
          // If there's a replaces property, use radio buttons (mutually exclusive choice)
          if (option.replaces) {
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
          }
          // If no replaces property, use checkboxes (optional selection, max 1)
          const selectedArray = Array.isArray(currentOption?.selected) 
            ? currentOption.selected 
            : (currentOption?.selected && currentOption.selected !== "off" ? [currentOption.selected] : []);
          
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
        }
        // If max > 1, show checkboxes with counter (choose up to max)
        const selectedArray = Array.isArray(currentOption?.selected) 
          ? currentOption.selected 
          : (currentOption?.selected && currentOption.selected !== "off" ? [currentOption.selected] : []);
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
      }
      // If name is a string, show checkbox (can select/deselect)
      return h("div", { className: "option-item" }, [
        h("label", { innerText: option.name, className: "option-value" }),
        h("input", { type: "checkbox", id: fieldsetName, name: fieldsetName, checked: currentOption?.selected }),
      ]);
    }

    // return empty fragment for now until I know if this is a thing (no "max" and no "replaces")
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
        if (evt.target.type === "checkbox" && evt.target.name) {
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
            // Multi-select with counter
            this.updateMultiSelectCounter(evt.target.name);
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
    
    const checkboxes = shadow.querySelectorAll(`input[type="checkbox"][name="${fieldsetName}"]`);
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const firstCheckbox = shadow.querySelector(`input[type="checkbox"][name="${fieldsetName}"]`);
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

  get options() {
    return { ...this.#options };
  }

  set options(obj) {
    this.#options = { ...obj };
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
    const formData = new FormData(this.form);
    const options = Object.fromEntries(formData);
    const { warlord, enhancement, unitSize, ...rest } = options;
    const { weapons = [], wargear = [] } = this.#options;

    // interpret weapons form data back into the unit options format
    weapons?.forEach(weaponOption => {
      const fieldsetName = optionFieldsetName(weaponOption);
      // Check if this is a multi-select option (array name with max > 1)
      const isMultiSelect = Array.isArray(weaponOption.name) && weaponOption.max > 1;
      
      if (isMultiSelect) {
        // Use getAll to get all checkbox values
        const selectedValues = formData.getAll(fieldsetName).filter(v => v !== "off");
        weaponOption.selected = selectedValues.length > 0 ? selectedValues : false;
      } else if (fieldsetName in rest) {
        // Single select: radio buttons or single checkbox
        // weapon option radio buttons all have a value equal to their name, except the default / "replaces" weapon, which has a value of "off",
        // rest[fieldsetName] will reflect both states
        weaponOption.selected = rest[fieldsetName];
      } else {
        weaponOption.selected = false;
      }
    });

    // interpret wargear form data back into the unit options format
    wargear?.forEach(wargearOption => {
      const fieldsetName = optionFieldsetName(wargearOption);
      // Check if this is a checkbox option (array name with max, regardless of max value)
      const isCheckboxOption = Array.isArray(wargearOption.name) && wargearOption.max && !wargearOption.replaces;
      
      if (isCheckboxOption) {
        // Use getAll to get all checkbox values
        const selectedValues = formData.getAll(fieldsetName).filter(v => v !== "off");
        wargearOption.selected = selectedValues.length > 0 ? selectedValues : false;
      } else if (fieldsetName in rest) {
        // Single select: radio buttons or single checkbox
        // wargear option radio buttons all have a value equal to their name, except the default / "replaces" wargear, which has a value of "off",
        // rest[fieldsetName] will reflect both states
        wargearOption.selected = rest[fieldsetName];
      } else {
        wargearOption.selected = false;
      }
    });

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
          if (Array.isArray(opt.name) && opt.max > 1) {
            const fieldsetName = optionFieldsetName(opt);
            this.updateMultiSelectCounter(fieldsetName);
          }
        });
      }
      if (this.#availableOptions.wargear) {
        this.#availableOptions.wargear.forEach(opt => {
          if (Array.isArray(opt.name) && opt.max > 1) {
            const fieldsetName = optionFieldsetName(opt);
            this.updateMultiSelectCounter(fieldsetName);
          }
        });
      }
    }
  }
}

customElements.define("options-modal", OptionsModal);
