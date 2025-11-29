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

    &.weapon-options {
      flex-direction: column;
      align-items: flex-start;

      .weapon-option-item {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        flex-align: start;
        justify-content: space-between;
        width: 100%;

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

const weaponOptionFieldsetName = (weapon) => {
  return (Array.isArray(weapon.name) ? weapon.name.join("-") : weapon.name).replace(/ /g, "_");
};

const WeaponOption = (weaponOptions, currentOptions) => {
  const optionsList = weaponOptions.map(weapon => {
    // two kinds of weapon options:
    // if it has a "replaces" and no "max", then it's a weapon choice for the whole unit: show both with radio buttons
    // if it has a "max", then it doesn't matter if it has a "replaces": it should be a checkbox per max value
    // if "name" is an array instead of a single string, there are multiple upgrade options: show radio buttons for each
    // huh -- what would no-"max" and no-"replaces" mean? does that even make sense?
    const currentWeaponOption = currentOptions.weapons.find(w => {
      if (Array.isArray(weapon.name)) {
        return weapon.name.includes(w.selected);
      }
      return w.name === weapon.name;
    });

    const fieldsetName = weaponOptionFieldsetName(weapon);
    if (weapon.replaces && !weapon.max) {
      const upgradeOptions = Array.isArray(weapon.name) ? weapon.name : [weapon.name];
      const isInactive = !currentWeaponOption?.selected || currentWeaponOption?.selected === "off"; 
      return h("div", { className: "weapon-option-item" }, [
        h("div", { className: "option-value" }, [
          h("input", { type: "radio", name: fieldsetName, value: "off", checked: isInactive }),
          h("label", { innerText: weapon.replaces, className: "option-value" }),
        ]),
        ...upgradeOptions.map(upgradeName => {
          return h("div", { className: "option-value" }, [
            h("input", { type: "radio", name: fieldsetName, value: upgradeName, checked: currentWeaponOption?.selected === upgradeName }),
            h("label", { innerText: upgradeName, className: "option-value" }),
          ]);
        }),
      ]);
    }

    if (weapon.max) {
      return h("div", { className: "weapon-option-item" }, [
        h("label", { innerText: weapon.name, className: "option-value" }),
        h("input", { type: "checkbox", id: fieldsetName, name: fieldsetName, checked: currentWeaponOption?.selected }),
      ]);
    }

    // return empty fragment for now until I know if this is a thing (no "max" and no "replaces")
    return document.createDocumentFragment();
  });

  return h("fieldset", { className: "weapon-options" }, [
    h("label", { innerText: 'Weapon options:', className: "option-name" }),
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
    }

    this.#ready = true;
    this.render();
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
    const { weapons = [] } = this.#options;

    // interpret weapons form data back into the unit options format
    weapons?.forEach(weaponOption => {
      const fieldsetName = weaponOptionFieldsetName(weaponOption);
      if (fieldsetName in rest) {
        // weapon option radio buttons all have a value equal to their name, except the default / "replaces" weapon, which has a value of "off",
        // rest[fieldsetName] will reflect both states
        weaponOption.selected = rest[fieldsetName];
      } else {
        weaponOption.selected = false;
      }
    });

    this.options = {
      ...(warlord ? { warlord: warlord === "on" } : {}),
      ...(enhancement ? { enhancement } : {}),
      ...(unitSize ? { unitSize: parseInt(unitSize, 10) } : {}),
      ...(weapons ? { weapons } : {}),
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
        this.optionsList.append(WeaponOption(this.#availableOptions.weapons, this.#options));
      }
    }
  }
}

customElements.define("options-modal", OptionsModal);
