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
    max-height: 90vh;
    flex-direction: column;
    
    &:open {
      display: flex;
    }

    .options-list {
      height: -webkit-fill-available;
      overflow-y: scroll;
    }
  }

  fieldset {
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5em;
    margin: 0.5em 0;

    label {
      margin-right: auto;
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
    const { warlord, enhancement, ...rest } = options;
    this.options = {
      ...(warlord ? { warlord: warlord === "on" } : {}),
      ...(enhancement ? { enhancement } : {}),
      ...rest,
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
    }
  }
}

customElements.define("options-modal", OptionsModal);
