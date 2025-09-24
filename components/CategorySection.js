import './UnitModal.js';
import './OptionsModal.js';
import { h } from '../src/domUtils.js';

const UnitRow = (unit, options = null) => {
  const buttons = [
    h("button", { className: "remove-unit", title: "remove unit" }, [
      h("img", { src: "/images/circle-minus.svg", alt: "circle minus" })
    ])
  ];
  if (Object.keys(options).length > 0) {
    buttons.unshift(h("button", { className: "options", title: "unit options" }, [
      h("img", { src: "/images/gear.svg", alt: "gear" })
    ]));
  }

  const tags = [];
  const optionsList = [];
  if (options?.warlord) {
    tags.push(h("span", { className: "unit-tag", innerText: "Warlord" }));
  }
  if (options?.enhancement) {
    optionsList.push(h("span", { className: "unit-option", innerText: `Enhancement: ${options.enhancement}` }));
  }
  if (options?.unitSize) {
    optionsList.push(h("span", { className: "unit-option", innerText: `Unit Size: ${options.unitSize}` }));
  }
  if (unit.tags?.includes("epic")) {
    tags.push(h("span", { className: "unit-tag", innerText: "Epic" }));
  }
  // model count for units without a unit size option
  if (!options?.unitSize && unit.modelCount > 1) {
    optionsList.push(h("span", { className: "unit-option", innerText: `Unit Size: ${unit.modelCount}` }));
  }

  const row = h("div", { className: "unit-summary" }, [
    h("div", { className: "unit-details" }, [
      h("span", { className: "unit-name", innerText: unit.name }),
      h("span", { className: "unit-options" }, [ ...optionsList ]),
    ]),
    ...tags,
    h("span", { className: "unit-pts points", innerText: `${unit.points} Points` }),
    ...buttons,
  ]);
  row.dataset.unitId = unit.id;
  return row;
}

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

  .unit-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem;

    .unit-details {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .points {
        margin: 0;
      }
    }

    .unit-options {
      font-size: small;
      color: #666;
    }
  }

  .unit-tag {
    background: #274764;
    color: white;
    margin-left: 0.5rem;
    font-size: x-small;
    padding: 4px;
    border-radius: 4px;
  }

  .unit-pts {
    font-size: small;
    margin: 0 0.75rem 0 auto;
  }


}
`;

const TEMPLATE = `
<header class="top">
  <h3 id="sectionTitle">{{title}}</h3>
  <div class="actions">
    <span id="pointsLabel"></span>
    <button id="btnAddUnit" title="add"><img src="/images/plus.svg" alt="add" /></button>
  </div>
</header>

<div class="unit-list"></div>

<unit-modal id="unitModal"></unit-modal>
<options-modal id="optionsModal"></options-modal>
<!--confirmation-modal></confirmation-modal-->
`;

const optionsForUnit = (categoryOptions, unit, includeEnhancements = false) => {
  const availableOptions = {};
  if (!unit.tags?.includes("epic") && includeEnhancements) {
    // filter enhancements to either match unit name or tags (e.g. "exo-armor")
    availableOptions.enhancements = categoryOptions.enhancements?.filter(o => {
      return !o.tags || o.tags.includes(unit.name) || o.tags.some(t => unit.tags.includes(t));
    }) ?? [];
  }
  // other options
  if (unit.unitOptions) {
    // unitSize
    availableOptions.unitSize = unit.unitOptions.unitSize.map(opt => ({
      ...opt,
      selected: opt.modelCount === unit.options?.unitSize,
    }));

    // wargear TBD
  }
  return availableOptions;
}

const getUnitCurrentOptions = (unit, isHeroUnit = false) => {
  const sizeOption = unit.options?.unitSize ?? unit.modelCount ? { unitSize: unit.options?.unitSize || unit.modelCount } : {};
  return {
    ...(isHeroUnit ? { warlord: false } : {}),
    ...(unit.options ? unit.options : {}),
    ...sizeOption,
  };
}


class CategorySection extends HTMLElement {
  #ready = false;
  #data = null;
  #availableUnits = [];
  #options = {};

  // DOM handles to things we only want to set up once
  sectionTitle = null;
  pointsLabel = null;
  btnAddUnit = null;
  unitList = null;
  unitModal = null;
  confirmModal = null;
  activeUnit = null;
  heroUnits = false;

  constructor() {
    super();
  }

  connectedCallback() {
    // Create shadow root
    const shadow = this.attachShadow({ mode: "open" });
    const styles = document.createElement("style");
    styles.innerHTML = CSS;
    shadow.appendChild(styles);

    const section = document.createElement("section");
    section.innerHTML = TEMPLATE;
    shadow.appendChild(section);
  }

  #init() {
    if (!this.#ready) {
      this.sectionTitle = this.shadowRoot.querySelector("#sectionTitle");
      this.pointsLabel = this.shadowRoot.querySelector("#pointsLabel");
      this.unitList = this.shadowRoot.querySelector(".unit-list");
      this.btnAddUnit = this.shadowRoot.querySelector("#btnAddUnit");
      this.unitModal = this.shadowRoot.querySelector("#unitModal");
      this.optionsModal = this.shadowRoot.querySelector("#optionsModal");
      // this.confirmModal = this.shadowRoot.querySelector("confirmation-modal");
  
      // populate attrs
      const title = this.getAttribute("sectionTitle");
      this.heroUnits = this.hasAttribute("heroUnits") && this.getAttribute("heroUnits") !== "false";
      this.sectionTitle.innerText = title;
      
      // Set up the modal title and options
      this.unitModal.title = title;
      this.unitModal.options = this.#availableUnits;
  
      // set up event handlers
      this.btnAddUnit.addEventListener("click", () => {
        this.activeUnit = null;
        this.unitModal.showModal();
      });

      // Listen for unit added events from the modal
      this.unitModal.addEventListener("unitAdded", (evt) => {
        const unitToAdd = evt.detail.unit;
        this.#data.push(unitToAdd);
        this.#render();
        this.#emit("add", unitToAdd);
      });

      this.unitList.addEventListener("click", evt => {
        const btn = evt.target.closest("button");
        const unitSummary = btn?.closest(".unit-summary");
        const { unitId } = unitSummary?.dataset || {};
        if (btn) {
          switch (btn.className) {
            case "remove-unit":
              this.removeUnit(unitId);    
              break;
            case "options":
              this.activeUnit = this.#data.find(u => u.id === unitId);
              this.optionsModal.options = getUnitCurrentOptions(this.activeUnit, this.heroUnits);
              this.optionsModal.availableOptions = optionsForUnit(this.#options, this.activeUnit, this.heroUnits);
              this.optionsModal.showModal();
              break;
          }
        }
      });

      this.optionsModal.addEventListener("optionsSaved", (evt) => {
        const options = evt.detail.options;
        
        // if this unit is newly promoted to warlord, remove warlord tag from all other units
        if (options.warlord && !this.activeUnit?.options?.warlord) {
          this.#data.forEach(u => {
            if (u.id !== this.activeUnit.id && u.options?.warlord) {
              u.options.warlord = false;
            }
          });
        }

        // if unit's enhancement has changed or been removed, update the unit and any others that may be affected
        if (options.enhancement !== this.activeUnit.options?.enhancement) {
          const prevEnhancementPoints = this.activeUnit.options?.enhancement ? this.#options.enhancements.find(e => e.name === this.activeUnit.options?.enhancement).points : 0;
          if (options.enhancement) {
            const enhancementPoints = options.enhancement ? this.#options.enhancements.find(e => e.name === options.enhancement).points : 0;
            // remove this enhancement from any other unit that has it
            this.#data.forEach(u => {
              if (u.id !== this.activeUnit.id && u.options?.enhancement === options.enhancement) {
                u.options.enhancement = null;
                u.points -= enhancementPoints;
              }
            });

            // update points
            if (this.activeUnit.options?.enhancement) {
              this.activeUnit.points -= prevEnhancementPoints;
            }
            this.activeUnit.points += enhancementPoints;
          } else {
            // remove enhancement points from unit
            this.activeUnit.points -= prevEnhancementPoints;
          }
        }

        // unit size
        if (options.unitSize && options.unitSize != this.activeUnit.modelCount) {
          this.activeUnit.modelCount = parseInt(options.unitSize, 10);
          this.activeUnit.points = this.activeUnit.unitOptions.unitSize.find(opts => opts.modelCount === options.unitSize).points;
        }

        this.activeUnit.options = options;
        this.#emit("update", this.activeUnit);
        this.#render();
      });

      this.#ready = true;
    }
  }

  #emit(changeType, units) {
    const changeEvent = new CustomEvent("change", { detail: {
      changeType,
      units
    }});
    this.dispatchEvent(changeEvent);
  }

  set units(units) {
    this.#data = [ ...units ];

    if (!this.#ready) {
      this.#init();
    }
    this.#render();
  }

  set availableUnits(availableUnits) {
    this.#availableUnits = [ ...availableUnits ];
    if (!this.#ready) {
      this.#init();
    } else if (this.unitModal) {
      this.unitModal.options = this.#availableUnits;
    }
    this.#render();
  }

  set options(options) {
    this.#options = { ...options };
    this.optionsModal.availableOptions = this.#options;
  }

  get units() {
    return { ...this.#data };
  }

  #render() {
    if (!this.#data) return;

    this.unitList.innerHTML = "";
    this.#data.forEach(unit => this.addUnit(unit));
    this.recalculatePoints();
  };

  addUnit(unit) {
    // normalize options
    const options = { ...unit.options };
    if (this.heroUnits && unit.options?.warlord === undefined) {
      options.warlord = false;
    }

    this.unitList.append(UnitRow(unit, options));
  }

  removeUnit(unitId) {
    const foundNode = Array.from(this.unitList.querySelectorAll(".unit-summary")).find(u => u.dataset.unitId === unitId);
    if (foundNode) {
      foundNode.remove();
      this.#data = this.#data.filter(u => u.id !== unitId);
      this.recalculatePoints();
      this.#emit("delete", unitId);
    };
  }

  recalculatePoints() {
    const totalPoints = this.#data.reduce((acc, curr) => {
      return acc + curr.points;
    }, 0);
    this.pointsLabel.innerText = totalPoints ? `${totalPoints} Points` : '';
  }

  // #onUnitSave() {
  //   this.unitModal.close();

  //   if (this.activeUnit) {
  //     // editing existing
  //     DataStore.updateUnitInRoster(this.activeUnit.dataset.unitId, this.unitCard.unit, this.#data.id);

  //   } else {
  //     // adding new
  //     DataStore.addUnitToRoster(this.unitCard.unit, this.#data.id);
  //   }
  // }
};

window.customElements.define('category-section', CategorySection);
