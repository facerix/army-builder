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

const Regiment = (regimentData, index) => {
  const regiment = h("div", { className: "aos-regiment" }, [
    h("header", { className: "regiment-header" }, [
      h("h4", { innerText: `Regiment ${index + 1}` }),
      h("button", { className: "remove-regiment", title: "remove regiment" }, [
        h("img", { src: "/images/circle-minus.svg", alt: "circle minus" })
      ])
    ]), 
    h("div", { className: "contents" }, [
      UnitRow(regimentData, true),
      ...(regimentData?.units?.map(unit => UnitRow(unit, false)) || []),
      h("button", { className: "add-unit", title: "add unit" }, [
        h("img", { src: "/images/plus.svg", alt: "plus" }),
        h("span", { innerText: "Add Unit to Regiment" })
      ])
    ]),
  ]);
  regiment.dataset.regimentId = regimentData.id;
  regiment.dataset.regimentName = regimentData.name;
  return regiment;
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
    display: flex;
    justify-content: space-between;
    border-radius: 0.25rem;

    .actions {
      display: flex;
      align-items: center;
    }

    button {
      padding: 0.75rem;
      border-radius: 5px;
    }
  }

  .section-header {
    background-color: #DEA652;
    // color: white;
    
    h3 {
      margin-left: 1rem;
    }
  }

  .aos-regiment {
    margin: 0.25rem 1rem;

    .regiment-header {
      background-color: #615655;
      border-radius: 0.25rem 0.25rem 0 0;
      color: white;

      h4 {
        margin: 0;
        padding: 0.5rem;
      }

      button {
        padding: 0.25rem;

        img {
          filter: invert(1);
        }
      }
    }

    .contents {
      border: 1px solid #615655;
      padding: 0.5rem;
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
<header class="section-header">
  <h3 id="sectionTitle">{{title}}</h3>
  <div class="actions">
    <span id="pointsLabel"></span>
    <button id="btnAddUnit" title="add"><img src="/images/plus.svg" alt="add" /></button>
  </div>
</header>

<div class="contents"></div>

<unit-modal id="unitModal"></unit-modal>
<!--confirmation-modal></confirmation-modal-->
`;

class AOSSection extends HTMLElement {
  #ready = false;
  #mode = "units";  // "units" or "regiments"
  #data = null;
  #options = [];
  #subOptions = [];  // for regiments mode, these are the pool of units that might be available for a regiment, based on the leader's unit options

  // DOM handles to things we only want to set up once
  sectionTitle = null;
  pointsLabel = null;
  btnAddUnit = null;
  contentContainer = null;
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
      this.contentContainer = this.shadowRoot.querySelector(".contents");
      this.btnAddUnit = this.shadowRoot.querySelector("#btnAddUnit");
      this.unitModal = this.shadowRoot.querySelector("#unitModal");
      // this.confirmModal = this.shadowRoot.querySelector("confirmation-modal");
  
      // populate attrs
      const title = this.getAttribute("sectionTitle");
      this.showOptions = this.hasAttribute("showOptions") && this.getAttribute("showOptions") !== "false";
      this.sectionTitle.innerText = title;
      
      // set up event handlers
      this.btnAddUnit.addEventListener("click", () => {
        this.activeUnit = null;

        // default modal config
        this.unitModal.title = title;
        this.unitModal.options = this.#options;
        this.unitModal.showModal();
      });

      // Listen for unit added events from the modal
      this.unitModal.addEventListener("unitAdded", (evt) => {
        const unitToAdd = evt.detail.unit;
        this.#data.push(unitToAdd);
        this.#render();
        this.#emit("add", unitToAdd);
      });

      this.contentContainer.addEventListener("click", evt => {
        const btn = evt.target.closest("button");
        if (btn) {
          switch (btn.className) {
            case "remove-unit":
              const unitSummary = btn.closest(".unit-summary");
              const { unitId } = unitSummary.dataset;
              this.removeUnit(unitId);    
              break;
            case "remove-regiment":
              const regiment = btn.closest(".aos-regiment");
              const { regimentId } = regiment.dataset;
              this.removeRegiment(regimentId);
              break;
            case "add-unit":
              const targetRegiment = btn.closest(".aos-regiment");
              const { regimentName, regimentId: id } = targetRegiment.dataset;
              const regimentOptions = this.#options.find(o => o.name === regimentName)?.unitOptions;
              const modalOptions = regimentOptions.map(opt => {
                if (opt.unitName) {
                  return this.#subOptions.find(o => o.name === opt.unitName);
                }
                if (opt.tag) {
                  if (opt.tag === "any") return [ ... this.#subOptions ];
                  return [
                    ...this.#options.filter(o => o.tags?.includes(opt.tag)),
                    ...this.#subOptions.filter(o => o.tags?.includes(opt.tag))
                  ];
                }
                return null;
              }).flat().filter(o => o);
              this.unitModal.options = modalOptions;
              this.activeUnit = id;
              this.unitModal.showModal();
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

  set mode(mode) {
    this.#mode = mode;
    this.#render();
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

  set subOptions(availableUnits) {
    this.#subOptions = [ ...availableUnits ];
  }

  get units() {
    return { ...this.#data };
  }

  #render() {
    if (!this.#data) return;

    this.contentContainer.innerHTML = "";
    this.#data.forEach((regiment, index) => this.#mode === "regiments" ? this.addRegiment(regiment, index) : this.addUnit(regiment));
    this.recalculatePoints();
  };

  addRegiment(regiment, index) {
    this.contentContainer.append(Regiment(regiment, index));
  }

  addUnit(unit) {
    this.contentContainer.append(UnitRow(unit, this.showOptions));
  }

  removeRegiment(regimentId) {
    const foundNode = Array.from(this.contentContainer.querySelectorAll(".aos-regiment")).find(r => r.dataset.regimentId === regimentId);
    if (foundNode) {
      foundNode.remove();
      this.#data = this.#data.filter(r => r.id !== regimentId);
      this.recalculatePoints();
      this.#emit("delete", regimentId);
    }
  }

  removeUnit(unitId) {
    const foundNode = Array.from(this.contentContainer.querySelectorAll(".unit-summary")).find(u => u.dataset.unitId === unitId);
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

window.customElements.define('aos-section', AOSSection);
