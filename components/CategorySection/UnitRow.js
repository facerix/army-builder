import { h, isDevelopmentMode } from '/src/domUtils.js';
import { getOptionSummaries } from '/src/option-summaries.js';

const CSS = `
  :host {
    display: block;
  }

  .unit-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem;
  }

  .unit-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 70%;
  }

  .unit-name-line {
    display: inline-flex;
  }

  .points {
    margin: 0;
  }

  .unit-options {
    font-size: small;
    color: #666;
    display: flex;
    flex-direction: column;
  }

  .unit-tag {
    background: #274764;
    color: white;
    margin-left: 0.5rem;
    font-size: x-small;
    padding: 4px;
    border-radius: 4px;
  }

  .unit-tag.imported-wargear-indicator {
    background: #ffc107;
    color: #856404;
    font-weight: bold;
  }

  .unit-pts {
    font-size: small;
    margin: 0 0.75rem 0 auto;
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  button img {
    height: 2em;
    width: 2em;
    margin: 0;
  }

  button:disabled {
    cursor: not-allowed;
  }

  button:disabled img {
    opacity: 0.5;
  }

  button:not(:disabled):hover,
  button:not(:disabled):focus-visible {
    outline: var(--accent-color) auto 1px;
    background-color: #ddbfc77a;
  }

  .debug-info {
    background-color: #f0f0f0;
    padding: 1em;
    border-radius: 0.5em;
    font-size: small;
    margin-top: 1em;

    &:not(.u-hidden) {
      display: block;
    }

    &.u-hidden {
      display: none;
    }
  }
`;

class UnitRow extends HTMLElement {
  #unit = null;
  #options = null;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['unit-id'];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      const shadow = this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = CSS;
      shadow.appendChild(style);
    }
    this.#render();
  }

  set unit(unit) {
    this.#unit = unit;
    if (unit) {
      this.setAttribute('unit-id', unit.id);
    }
    if (this.shadowRoot) {
      this.#render();
    }
  }

  get unit() {
    return this.#unit;
  }

  set options(options) {
    this.#options = options || {};
    if (this.shadowRoot) {
      this.#render();
    }
  }

  get options() {
    return this.#options || {};
  }

  #render() {
    if (!this.#unit) return;

    const shadow = this.shadowRoot;
    if (!shadow) return;

    // Clear existing content (except style)
    const style = shadow.querySelector('style');
    shadow.innerHTML = '';
    if (style) shadow.appendChild(style);

    const safeOptions = this.#options || {};
    
    const buttons = [
      h("button", { className: "remove-unit", title: "remove unit" }, [
        h("img", { src: "/images/circle-minus.svg", alt: "circle minus" })
      ])
    ];
    if (Object.keys(safeOptions).length > 0) {
      buttons.unshift(h("button", { className: "options", title: "unit options" }, [
        h("img", { src: "/images/gear.svg", alt: "gear" })
      ]));
    }
    if (isDevelopmentMode()) {
      buttons.push(h("button", { className: "debug", title: "debug" }, [
        h("img", { src: "/images/skull.svg", alt: "debug" })
      ]));
    }

    // options
    const optionsList = [];
    if (safeOptions?.enhancement) {
      optionsList.push(h("span", { className: "unit-option", innerHTML: `<em>Enhancement</em>: ${safeOptions.enhancement}` }));
    }

    // if there are weapon options, show e.g. "5x Plasma Axe" or whatever; otherwise just show "unit size N"
    let weaponProfiles = [];
    weaponProfiles = getOptionSummaries(this.#unit.weapons || [], safeOptions.weapons, safeOptions.unitSize || this.#unit.modelCount, this.#unit.unitOptions?.weapons);
    if (weaponProfiles.length > 0) {
      optionsList.push(h("span", { className: "unit-option", innerHTML: `<em>Weapons</em>: ${weaponProfiles.join(", ")}` }));
    }

    // if there are wargear options, show e.g. "5x Preymark crest" or whatever
    let wargearProfiles = [];
    wargearProfiles = getOptionSummaries(this.#unit.wargear || [], safeOptions.wargear, safeOptions.unitSize || this.#unit.modelCount, this.#unit.unitOptions?.wargear);
    if (wargearProfiles.length > 0) {
      optionsList.push(h("span", { className: "unit-option", innerHTML: `<em>Wargear</em>: ${wargearProfiles.join(", ")}` }));
    }

    if (weaponProfiles.length === 0 && wargearProfiles.length === 0 && safeOptions?.unitSize) {
      optionsList.push(h("span", { className: "unit-option", innerHTML: `<em>Unit Size</em>: ${safeOptions.unitSize}` }));
    }

    // tags
    const tags = [];
    if (safeOptions?.warlord) {
      tags.push(h("span", { className: "unit-tag", innerText: "Warlord" }));
    }
    if (this.#unit.tags?.includes("Epic Hero")) {
      tags.push(h("span", { className: "unit-tag", innerText: "Epic" }));
    }
    // Show indicator for units with imported wargear that needs mapping
    if (safeOptions?.importedWargear) {
      tags.push(h("span", { 
        className: "unit-tag imported-wargear-indicator", 
        innerText: "⚠️ Map Wargear",
        title: "This unit has imported wargear that needs to be mapped"
      }));
    }

    const unitNamePlusCount = safeOptions?.unitSize ? `${safeOptions.unitSize}x ${this.#unit.name}` : this.#unit.name;
    const row = h("div", { className: "unit-summary" }, [
      h("div", { className: "unit-details" }, [
        h("span", { className: "unit-name-line" }, [
          h("span", { className: "unit-name", innerText: unitNamePlusCount }),
          ...tags
        ]),
        h("span", { className: "unit-options" }, [ ...optionsList ]),
      ]),
      h("span", { className: "unit-pts points", innerText: `${this.#unit.points} Points` }),
      ...buttons,
      ...(isDevelopmentMode() ? [
        h("pre", { className: "debug-info u-hidden", innerText: JSON.stringify(this.#unit, null, 2) }),
      ] : []),
    ]);

    // Set up event listeners for buttons
    const removeBtn = row.querySelector('.remove-unit');
    const optionsBtn = row.querySelector('.options');
    const debugBtn = row.querySelector('.debug');
    if (debugBtn) {
      const debugInfo = row.querySelector('.debug-info');
      debugBtn.addEventListener('click', () => {
        debugInfo.classList.toggle('u-hidden');
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('remove-unit', {
          bubbles: true,
          detail: { unitId: this.#unit.id }
        }));
      });
    }

    if (optionsBtn) {
      optionsBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('options-clicked', {
          bubbles: true,
          detail: { unitId: this.#unit.id }
        }));
      });
    }

    shadow.appendChild(row);
  }
}

window.customElements.define('unit-row', UnitRow);
