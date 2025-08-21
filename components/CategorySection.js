import './UnitModal.js';
import { h } from '../src/domUtils.js';

const UnitRow = (unit, showOptions) => {
  const row = h("div", { className: "unit-summary" }, [
    h("span", { className: "unit-name", innerText: unit.name }),
    h("span", { className: "unit-pts points", innerText: `${unit.points} Points` }),
    ...(showOptions ? [h("button", { className: "options", title: "unit options" }, [
      h("img", { src: "/images/gear.svg", alt: "gear" })
    ])] : []),
    h("button", { className: "remove-unit", title: "remove unit" }, [
      h("img", { src: "/images/circle-minus.svg", alt: "circle minus" })
    ]),
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

    .unit-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .points {
        margin: 0;
      }
    }
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
<!--confirmation-modal></confirmation-modal-->
`;

class CategorySection extends HTMLElement {
  #ready = false;
  #data = null;
  #options = [];

  // DOM handles to things we only want to set up once
  sectionTitle = null;
  pointsLabel = null;
  btnAddUnit = null;
  unitList = null;
  unitModal = null;
  confirmModal = null;
  activeUnit = null;
  showOptions = false;

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
      // this.confirmModal = this.shadowRoot.querySelector("confirmation-modal");
  
      // populate attrs
      const title = this.getAttribute("sectionTitle");
      this.showOptions = this.hasAttribute("showOptions") && this.getAttribute("showOptions") !== "false";
      this.sectionTitle.innerText = title;
      
      // Set up the modal title and options
      this.unitModal.title = title;
      this.unitModal.options = this.#options;
  
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
        if (btn) {
          switch (btn.className) {
            case "remove-unit":
              const unitSummary = btn.closest(".unit-summary");
              const { unitId } = unitSummary.dataset;
              this.removeUnit(unitId);    
              break;
            case "options":
              console.log("TODO... unit options");
              break;
          }
        }
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

  set options(availableUnits) {
    this.#options = [ ...availableUnits ];
    if (!this.#ready) {
      this.#init();
    } else if (this.unitModal) {
      this.unitModal.options = this.#options;
    }
    this.#render();
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
    this.unitList.append(UnitRow(unit, this.showOptions));
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
