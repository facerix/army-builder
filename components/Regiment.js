import './UnitModal.js';
import { h } from '../src/domUtils.js';

const UnitRow = (unit, isLeader) => {
  const row = h("div", { className: "unit-summary" }, [
    h("span", { className: "unit-name", innerText: isLeader ? unit.leader : unit.name }),
    h("span", { className: "unit-pts points", innerText: `${isLeader ? unit.leaderPoints : unit.points} Points` }),
    ...(isLeader ? [h("button", { className: "options", title: "unit options" }, [
      h("img", { src: "/images/gear.svg", alt: "gear" })
    ])] : []),
    ...(isLeader ? [] : [
      h("button", { className: "remove-unit", title: "remove unit" }, [
        h("img", { src: "/images/circle-minus.svg", alt: "circle minus" })
      ])
    ]),
  ]);
  row.dataset.unitId = unit.id;
  return row;
}

const CSS = `
:host {
  display: block;
  margin: 0.25rem 1rem;
}

.regiment-header {
  background-color: #615655;
  border-radius: 0.25rem 0.25rem 0 0;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    margin: 0;
    padding: 0.5rem;
  }

  .regiment-points {
    font-size: small;
    margin: 0 0.5rem 0 auto;
  }

  button {
    padding: 0.25rem;
    border: none;
    background: transparent;
    cursor: pointer;

    img {
      filter: invert(1);
      height: 2em;
      width: 2em;
      margin: 0;
    }

    &:hover,
    &:focus-visible {
      outline: var(--accent-color) auto 1px;
      background-color: #ddbfc67a;
    }
  }
}

.contents {
  border: 1px solid #615655;
  padding: 0.5rem;
}

.add-unit {
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-top: 0.5rem;

  img {
    height: 2em;
    width: 2em;
    margin: 0;
  }

  &:hover,
  &:focus-visible {
    outline: var(--accent-color) auto 1px;
    background-color: #ddbfc67a;
  }
}

.unit-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;

  .unit-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .points {
      margin: 0;
    }
  }

  .unit-pts {
    font-size: small;
    margin: 0 0.75rem 0 auto;
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;

    img {
      height: 2em;
      width: 2em;
      margin: 0;
    }

    &:hover,
    &:focus-visible {
      outline: var(--accent-color) auto 1px;
      background-color: #ddbfc67a;
    }
  }
}
`;

const TEMPLATE = `
<header class="regiment-header">
  <h4 id="regimentTitle"></h4>
  <span class="regiment-points">0 points</span>
  <button class="remove-regiment" title="remove regiment">
    <img src="/images/circle-minus.svg" alt="circle minus" />
  </button>
</header>
<div class="contents">
  <div id="leaderUnit"></div>
  <div id="regimentUnits"></div>
  <button class="add-unit" title="add unit">
    <img src="/images/plus.svg" alt="plus" />
    <span>Add Unit to Regiment</span>
  </button>
</div>
<unit-modal id="regimentModal"></unit-modal>
`;

class Regiment extends HTMLElement {
  #ready = false;
  #regimentData = null;
  #index = 0;
  #options = [];
  #leaderUnitElement = null;
  #regimentUnitsElement = null;
  #regimentTitleElement = null;
  #regimentModal = null;
  #regimentPointsElement = null;

  constructor() {
    super();
    // console.log("constructor");
  }

  connectedCallback() {
    // console.log("connectedCallback", this.#regimentData?.name);
    // Create shadow root
    const shadow = this.attachShadow({ mode: "open" });
    const styles = document.createElement("style");
    styles.innerHTML = CSS;
    shadow.appendChild(styles);

    const regiment = document.createElement("div");
    regiment.innerHTML = TEMPLATE;
    shadow.appendChild(regiment);

    this.#init();
    if (this.#ready) this.#render();
  }

  #init() {
    if (this.#ready || !this.shadowRoot) return;
    // console.log("init", this.#regimentData?.name);

    // Get references to elements
    this.#leaderUnitElement = this.shadowRoot.querySelector("#leaderUnit");
    this.#regimentUnitsElement = this.shadowRoot.querySelector("#regimentUnits");
    this.#regimentTitleElement = this.shadowRoot.querySelector("#regimentTitle");
    this.#regimentModal = this.shadowRoot.querySelector("#regimentModal");
    this.#regimentPointsElement = this.shadowRoot.querySelector(".regiment-points");
    
    // Set up event listeners
    this.#setupEventListeners();
    this.#ready = true;
  }

  #setupEventListeners() {
    // Remove regiment button
    const removeRegimentBtn = this.shadowRoot.querySelector(".remove-regiment");
    removeRegimentBtn.addEventListener("click", () => {
      this.#emit("removeRegiment", this.#regimentData.id);
    });

    // Add unit button
    const addUnitBtn = this.shadowRoot.querySelector(".add-unit");
    addUnitBtn.addEventListener("click", () => {
      this.#regimentModal.options = this.#options;
      this.#regimentModal.showModal();
    });

    this.#regimentModal.addEventListener("unitAdded", (evt) => {
      const unitToAdd = evt.detail.unit;
      this.#addUnit(unitToAdd);
    });

    // Delegate events for unit actions
    this.shadowRoot.addEventListener("click", (evt) => {
      const btn = evt.target.closest("button");
      if (!btn) return;

      switch (btn.className) {
        case "remove-unit":
          const unitSummary = btn.closest(".unit-summary");
          const { unitId } = unitSummary.dataset;
          this.#removeUnit(unitId);
          break;
        case "options":
          const optionsUnitSummary = btn.closest(".unit-summary");
          const { unitId: optionsUnitId } = optionsUnitSummary.dataset;
          this.#emit("unitOptions", optionsUnitId);
          break;
      }
    });
  }

  #emit(eventType, data) {
    const event = new CustomEvent(eventType, { 
      detail: data,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #render() {
    this.#init();
    if (!this.#ready || !this.#regimentData) return;

    // Set dataset attributes
    this.dataset.regimentId = this.#regimentData.id;
    this.dataset.regimentName = this.#regimentData.name;

    // Render leader unit
    if (this.#leaderUnitElement) {
      this.#leaderUnitElement.innerHTML = "";
      this.#leaderUnitElement.appendChild(UnitRow(this.#regimentData, true));
    }

    // Render regiment units
    if (this.#regimentUnitsElement) {
      this.#regimentUnitsElement.innerHTML = "";
      if (this.#regimentData?.units) {
        this.#regimentData.units.forEach(unit => {
          this.#regimentUnitsElement.appendChild(UnitRow(unit, false));
        });
      }
    }

    // Update title
    if (this.#regimentTitleElement) {
      this.#regimentTitleElement.textContent = `Regiment ${this.#index + 1}`;
    }

    // Update points
    if (this.#regimentPointsElement) {
      this.#regimentPointsElement.textContent = `${this.#regimentData.points} points`;
    }
  }

  #addUnit(unit) {
    this.#emit("addUnit", { unit, regimentId: this.#regimentData.id });
  }

  #removeUnit(unitId) {
    this.#emit("removeUnit", { unitId, regimentId: this.#regimentData.id });
  }

  set regimentData(data) {
    this.#regimentData = data;
    this.#render();
  }

  set index(value) {
    this.#index = value;
    if (this.#regimentTitleElement) {
      this.#regimentTitleElement.textContent = `Regiment ${this.#index + 1}`;
    }
  }

  set options(options) {
    this.#options = options;
  }

  get regimentData() {
    return this.#regimentData;
  }
}

window.customElements.define('aos-regiment', Regiment);

export default Regiment;
