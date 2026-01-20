import { h } from '../src/domUtils.js';
import {
  optionFieldsetName,
  truncateSelectionsForUnitSize,
  findAvailableOption,
} from './option-renderers/OptionUtils.js';
import {
  isExcludedItemPresent,
  getExcludedItemsPresent,
  formatExclusionReason,
} from './option-renderers/ExclusionManager.js';
import { renderOption } from './option-renderers/OptionRendererFactory.js';
import { processOptionType, syncOptionsFromForm } from './option-renderers/FormParser.js';

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
        .option-legend-replaces,
        .option-legend-excludes {
          font-size: small;
          color: #666;
        }

        .option-legend-replaces {
          margin-left: 0.5em;
        }

        .option-legend-excludes {
          margin-left: 0.5em;
          color: #d32f2f;
          font-style: italic;
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

const WarlordOption = checked => {
  return h('fieldset', { className: 'warlord-option' }, [
    h('label', { for: 'warlord', innerText: 'Warlord', className: 'option-name' }),
    h('input', { type: 'checkbox', id: 'warlord', name: 'warlord', checked }),
  ]);
};

const EnhancementOption = (enhancements, currentEnhancement) => {
  const enhancementOptions = enhancements.length
    ? [
        h('option', { value: '', innerText: 'None' }),
        ...enhancements.map(e =>
          h('option', {
            value: e.name,
            innerText: `${e.name} (${e.points} points)`,
            selected: e.name === currentEnhancement,
          })
        ),
      ]
    : [h('option', { value: '', innerText: 'None available' })];
  return h('fieldset', { className: 'enhancement-option' }, [
    h('label', { innerText: 'Enhancement:', className: 'option-name' }),
    h('select', { id: 'enhancement', name: 'enhancement' }, enhancementOptions),
  ]);
};

const UnitSizeOption = (unitSizes, currentUnitSize) => {
  const unitSizeOptions = unitSizes.length
    ? [
        ...unitSizes
          .map(u => {
            const id = `unit-size-${u.modelCount}`;
            const checked = Number(u.modelCount) === Number(currentUnitSize);
            return [
              h('input', { type: 'radio', name: 'unitSize', id, value: u.modelCount, checked }),
              h('label', {
                className: 'option-value',
                name: 'unitSize',
                htmlFor: id,
                innerText: `${u.modelCount} (${u.points} points)`,
              }),
            ];
          })
          .flat(),
      ]
    : [h('input', { type: 'radio', value: '', selected: true })];
  return h('fieldset', { className: 'unit-size-option' }, [
    h('label', { innerText: 'Unit Size:', className: 'option-name' }),
    ...unitSizeOptions,
  ]);
};

const OptionFieldset = (
  optionType,
  optionOptions,
  currentOptions,
  labelText,
  defaultItems = [],
  availableOptions = [],
  allDefaultItems = [],
  allCurrentOptions = {},
  allAvailableOptions = []
) => {
  const optionsKey = optionType; // "weapons" or "wargear"
  const unitSize = currentOptions.unitSize;

  const optionsList = optionOptions.map(option => {
    return renderOption(
      option,
      currentOptions,
      optionsKey,
      unitSize,
      allDefaultItems,
      allCurrentOptions,
      allAvailableOptions
    );
  });

  return h('fieldset', { className: 'option-options' }, [
    h('label', { innerText: labelText, className: 'option-name' }),
    ...optionsList,
  ]);
};

class OptionsModal extends HTMLElement {
  #options = {};
  #availableOptions = {};
  #defaultWeapons = [];
  #defaultWargear = [];
  #ready = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.#ready) return;
    const shadow = this.shadowRoot;
    const style = document.createElement('style');
    style.textContent = CSS;
    shadow.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = TEMPLATE;
    shadow.appendChild(wrapper);

    this.dialog = shadow.querySelector('dialog');
    this.titleElem = shadow.querySelector('#modalTitle');
    this.btnClose = shadow.querySelector('#btnClose');
    this.btnCancel = shadow.querySelector('#btnCancel');
    this.btnSave = shadow.querySelector('#btnSave');
    this.optionsList = shadow.querySelector('.options-list');

    this.btnClose.addEventListener('click', () => this.close());
    this.btnCancel.addEventListener('click', () => this.close());
    this.dialog.addEventListener('close', () => this.close());

    // Attach the submit event handler to the form element
    this.form = shadow.querySelector('form');
    if (this.form) {
      this.form.addEventListener('submit', evt => {
        evt.preventDefault();
        this.saveOptions();
      });

      // Add change listeners for checkboxes to update counters dynamically and enforce max: 1
      this.form.addEventListener('change', evt => {
        if (evt.target.name === 'unitSize') {
          // Unit size changed, update options first then truncate and re-render to update effectiveMax
          this.#options.unitSize = parseInt(evt.target.value, 10);
          this.#truncateAllSelections();
          this.render();
        } else if (evt.target.type === 'checkbox' && evt.target.name) {
          // Check if this is a max: 1 checkbox option (no counter header, just checkboxes)
          const optionItem = evt.target.closest('.option-item');
          if (optionItem && !optionItem.classList.contains('option-item-multi')) {
            // This might be a max: 1 checkbox group - check if we need to enforce single selection
            const checkboxes = this.form.querySelectorAll(
              `input[type="checkbox"][name="${evt.target.name}"]`
            );
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
            const match = checkboxName.match(/^(.+)-(\d+)$/);
            const baseName = match ? match[1] : checkboxName;
            this.updateMultiSelectCounter(baseName);
          }
        }

        // Update exclusion states when any option changes (radio or checkbox)
        if (evt.target.type === 'radio' || evt.target.type === 'checkbox') {
          this.#updateExclusionStates();
        }
      });
    }

    this.#ready = true;
    this.render();
  }

  // Update exclusion states dynamically when options change
  #updateExclusionStates() {
    // Sync current form state to check exclusions
    this.#syncOptionsFromForm('weapons');
    this.#syncOptionsFromForm('wargear');

    // Prepare combined arrays for exclusion checks
    const allDefaultItems = [...(this.#defaultWeapons || []), ...(this.#defaultWargear || [])];
    const allCurrentOptions = {
      weapons: this.#options.weapons || [],
      wargear: this.#options.wargear || [],
    };
    const allAvailableOptions = [
      ...(this.#availableOptions.weapons || []),
      ...(this.#availableOptions.wargear || []),
    ];

    // Update disabled states for options with excludes
    ['weapons', 'wargear'].forEach(optionType => {
      const availableOptions = this.#availableOptions[optionType] || [];

      availableOptions.forEach(option => {
        if (option.excludes) {
          const isDisabled = isExcludedItemPresent(
            option.excludes,
            allDefaultItems,
            allCurrentOptions,
            allAvailableOptions,
            optionType
          );
          const fieldsetName = optionFieldsetName(option);

          // Find all inputs for this option in the shadow DOM
          const shadowRoot = this.shadowRoot;
          if (shadowRoot) {
            const inputs = shadowRoot.querySelectorAll(
              `input[name="${fieldsetName}"], input[name^="${fieldsetName}-"]`
            );
            inputs.forEach(input => {
              input.disabled = isDisabled;
            });

            // Update exclusion reason text if present
            if (isDisabled) {
              const excludedItems = getExcludedItemsPresent(
                option.excludes,
                allDefaultItems,
                allCurrentOptions,
                allAvailableOptions
              );
              const exclusionReason = formatExclusionReason(excludedItems);
              const optionItem = shadowRoot
                .querySelector(`input[name="${fieldsetName}"], input[name^="${fieldsetName}-"]`)
                ?.closest('.option-item');
              if (optionItem) {
                let reasonElement = optionItem.querySelector('.option-legend-excludes');
                if (!reasonElement && exclusionReason) {
                  reasonElement = document.createElement('span');
                  reasonElement.className = 'option-legend-excludes';
                  optionItem.appendChild(reasonElement);
                }
                if (reasonElement) {
                  reasonElement.innerText = exclusionReason;
                }
              }
            } else {
              // Remove exclusion reason if option is no longer disabled
              const optionItem = shadowRoot
                .querySelector(`input[name="${fieldsetName}"], input[name^="${fieldsetName}-"]`)
                ?.closest('.option-item');
              if (optionItem) {
                const reasonElement = optionItem.querySelector('.option-legend-excludes');
                if (reasonElement) {
                  reasonElement.remove();
                }
              }
            }
          }
        }
      });
    });
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

    const optionItem = firstCheckbox.closest('.option-item-multi');
    if (!optionItem) return;

    const counter = optionItem.querySelector('.option-counter');
    const header = optionItem.querySelector('.option-legend-max');

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

    syncOptionsFromForm(optionType, savedOptions, availableOptions, formData, rest);
  }

  // Helper: Truncate selections for a single option type (weapons or wargear)
  #truncateSelectionsForOptionType(savedOptions, availableOptions, unitSize) {
    if (!savedOptions || !availableOptions) return;

    savedOptions.forEach(savedOption => {
      const unitOption = findAvailableOption(savedOption, availableOptions);
      if (unitOption && savedOption.selected !== false && savedOption.selected !== undefined) {
        savedOption.selected = truncateSelectionsForUnitSize(
          unitOption,
          savedOption.selected,
          unitSize
        );
      }
    });
  }

  // Truncate selections for all options based on current unit size
  // Reads current form state first to preserve unsaved changes
  #truncateAllSelections() {
    const unitSize = this.#options.unitSize;
    if (!unitSize) return;

    // Sync current form state to this.#options before truncating
    this.#syncOptionsFromForm('weapons');
    this.#syncOptionsFromForm('wargear');

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

  set defaultWeapons(weapons) {
    this.#defaultWeapons = weapons || [];
  }

  set defaultWargear(wargear) {
    this.#defaultWargear = wargear || [];
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

    // Interpret weapons and wargear form data back into the unit options format
    processOptionType(weapons, this.#availableOptions.weapons, formData, rest);
    processOptionType(wargear, this.#availableOptions.wargear, formData, rest);

    // Truncate selections before saving to ensure validity
    const currentUnitSize = unitSize ? parseInt(unitSize, 10) : this.#options.unitSize;
    if (currentUnitSize) {
      this.#truncateSelectionsForOptionType(
        weapons,
        this.#availableOptions.weapons,
        currentUnitSize
      );
      this.#truncateSelectionsForOptionType(
        wargear,
        this.#availableOptions.wargear,
        currentUnitSize
      );
    }

    this.options = {
      ...(warlord ? { warlord: warlord === 'on' } : {}),
      ...(enhancement ? { enhancement } : {}),
      ...(unitSize ? { unitSize: parseInt(unitSize, 10) } : {}),
      ...(weapons ? { weapons } : {}),
      ...(wargear ? { wargear } : {}),
    };

    this.dispatchEvent(
      new CustomEvent('optionsSaved', {
        detail: {
          options: this.options,
        },
        bubbles: true,
        composed: true,
      })
    );
    this.close();
  }

  render() {
    if (this.optionsList && this.#availableOptions) {
      this.optionsList.innerHTML = '';
      if (this.#options.warlord !== undefined) {
        this.optionsList.append(WarlordOption(this.#options.warlord));
      }
      if (this.#availableOptions.enhancements) {
        this.optionsList.append(
          EnhancementOption(this.#availableOptions.enhancements, this.#options.enhancement)
        );
      }
      if (this.#availableOptions.unitSize) {
        this.optionsList.append(
          UnitSizeOption(this.#availableOptions.unitSize, this.#options.unitSize)
        );
      }
      // Prepare combined arrays for exclusion checks
      const allDefaultItems = [...(this.#defaultWeapons || []), ...(this.#defaultWargear || [])];
      const allCurrentOptions = {
        weapons: this.#options.weapons || [],
        wargear: this.#options.wargear || [],
      };
      const allAvailableOptions = {
        weapons: this.#availableOptions.weapons || [],
        wargear: this.#availableOptions.wargear || [],
      };

      if (this.#availableOptions.weapons) {
        this.optionsList.append(
          OptionFieldset(
            'weapons',
            this.#availableOptions.weapons,
            this.#options,
            'Weapon options:',
            this.#defaultWeapons,
            this.#availableOptions.weapons,
            allDefaultItems,
            allCurrentOptions,
            allAvailableOptions
          )
        );
      }
      if (this.#availableOptions.wargear) {
        this.optionsList.append(
          OptionFieldset(
            'wargear',
            this.#availableOptions.wargear,
            this.#options,
            'Wargear options:',
            this.#defaultWargear,
            this.#availableOptions.wargear,
            allDefaultItems,
            allCurrentOptions,
            allAvailableOptions
          )
        );
      }

      // Update exclusion states after rendering
      this.#updateExclusionStates();

      // Initialize counters for multi-select options
      if (this.#availableOptions.weapons) {
        this.#availableOptions.weapons.forEach(opt => {
          const fieldsetName = optionFieldsetName(opt);
          // Initialize counter if it's a multi-select option (max > 1, or has per property, or has selectionType)
          if (
            (Array.isArray(opt.name) && opt.max > 1) ||
            (opt.per && opt.max) ||
            (opt.selectionType && Array.isArray(opt.name))
          ) {
            this.updateMultiSelectCounter(fieldsetName);
          }
        });
      }
      if (this.#availableOptions.wargear) {
        this.#availableOptions.wargear.forEach(opt => {
          const fieldsetName = optionFieldsetName(opt);
          // Initialize counter if it's a multi-select option (max > 1, or has per property, or has selectionType)
          if (
            (Array.isArray(opt.name) && opt.max > 1) ||
            (opt.per && opt.max) ||
            (opt.selectionType && Array.isArray(opt.name))
          ) {
            this.updateMultiSelectCounter(fieldsetName);
          }
        });
      }
    }
  }
}

customElements.define('options-modal', OptionsModal);
