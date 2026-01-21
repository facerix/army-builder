import './UnitModal.js';
import './Regiment.js';
import { h } from '../src/domUtils.js';

const UnitRow = (unit, showOptions) => {
  // Unit should already have points pre-calculated from buildDisplayUnit
  const points = unit.points || 0;

  const row = h('div', { className: 'unit-summary' }, [
    h('span', { className: 'unit-name', innerText: unit.name }),
    h('span', { className: 'unit-pts points', innerText: `${points} Points` }),
    ...(showOptions
      ? [
          h('button', { className: 'options', title: 'unit options' }, [
            h('img', { src: '/images/gear.svg', alt: 'gear' }),
          ]),
        ]
      : []),
    h('button', { className: 'remove-unit', title: 'remove unit' }, [
      h('img', { src: '/images/circle-minus.svg', alt: 'circle minus' }),
    ]),
  ]);
  row.dataset.unitId = unit.id;
  return row;
};

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
  #mode = 'units'; // "units" or "regiments"
  #data = null;
  #options = [];
  #subOptions = []; // for regiments mode, these are the pool of units that might be available for a regiment, based on the leader's unit options
  #points = 0;

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
    const shadow = this.attachShadow({ mode: 'open' });
    const styles = document.createElement('style');
    styles.innerHTML = CSS;
    shadow.appendChild(styles);

    const section = document.createElement('section');
    section.innerHTML = TEMPLATE;
    shadow.appendChild(section);
  }

  #init() {
    if (!this.#ready && this.shadowRoot) {
      this.sectionTitle = this.shadowRoot.querySelector('#sectionTitle');
      this.pointsLabel = this.shadowRoot.querySelector('#pointsLabel');
      this.contentContainer = this.shadowRoot.querySelector('.contents');
      this.btnAddUnit = this.shadowRoot.querySelector('#btnAddUnit');
      this.unitModal = this.shadowRoot.querySelector('#unitModal');
      // this.confirmModal = this.shadowRoot.querySelector("confirmation-modal");

      // populate attrs
      this.#mode = this.getAttribute('mode') || 'units';
      const title = this.getAttribute('sectionTitle');
      this.showOptions =
        this.hasAttribute('showOptions') && this.getAttribute('showOptions') !== 'false';
      this.sectionTitle.innerText = title;

      // set up event handlers
      this.btnAddUnit.addEventListener('click', () => {
        this.activeUnit = null;
        this.showModal();
      });

      // Listen for unit added events from the modal
      this.unitModal.addEventListener('unitAdded', evt => {
        const { unit } = evt.detail;

        const unitToAdd =
          this.#mode === 'regiments'
            ? {
                ...unit,
                name: `${unit.name}'s Regiment`,
                leader: unit.name,
                units: [],
              }
            : unit;
        this.#data.push(unitToAdd);
        this.#render(); // buildDisplayUnit will calculate points
        this.#emit('add', unitToAdd);
      });

      this.contentContainer.addEventListener('click', evt => {
        const btn = evt.target.closest('button');
        if (btn) {
          switch (btn.className) {
            case 'remove-unit':
              const unitSummary = btn.closest('.unit-summary');
              const { unitId } = unitSummary.dataset;
              this.removeUnit(unitId);
              break;
            case 'remove-regiment':
              const regiment = btn.closest('.aos-regiment');
              const { regimentId } = regiment.dataset;
              this.removeRegiment(regimentId);
              break;
            case 'options':
              console.log('TODO... unit options');
              break;
          }
        }
      });

      this.#ready = true;
    }
  }

  #emit(changeType, units) {
    const changeEvent = new CustomEvent('change', {
      detail: {
        changeType,
        units,
      },
    });
    this.dispatchEvent(changeEvent);
  }

  set units(units) {
    this.#data = [...units];

    if (!this.#ready) {
      this.#init();
    }
    this.#render();
  }

  set options(factionProfiles) {
    if (this.#mode === 'regiments') {
      this.#options = factionProfiles.heroes;
      this.#subOptions = factionProfiles.units;
    } else {
      this.#options = [...factionProfiles.heroes, ...factionProfiles.units].toSorted((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (!this.#ready) {
      this.#init();
    } else if (this.unitModal) {
      this.unitModal.options = this.#options;
    }
    this.#render();
  }

  get units() {
    return [...this.#data];
  }

  get points() {
    return this.#points ?? 0;
  }

  /**
   * Builds a display unit with points pre-calculated from definitions
   * Similar to 40k's buildDisplayUnit - calculates points once and caches them
   */
  #buildDisplayUnit(unitInstance) {
    // Helper to look up unit points from definitions
    const getUnitPoints = unitName => {
      const allUnits = [...this.#options, ...this.#subOptions];
      const unitDef = allUnits.find(u => u.name === unitName);
      return unitDef?.points || 0;
    };

    if (this.#mode === 'regiments') {
      // For regiments, calculate leader points and unit points
      const leaderPoints =
        unitInstance.leaderPoints || getUnitPoints(unitInstance.leader || unitInstance.name);
      // Build display units for units within the regiment (with points pre-calculated)
      const displayUnits = (unitInstance.units || []).map(unit => ({
        ...unit,
        points: getUnitPoints(unit.name),
      }));
      const unitPoints = displayUnits.reduce((acc, unit) => acc + (unit.points || 0), 0);
      return {
        ...unitInstance,
        leaderPoints,
        units: displayUnits, // Replace with display units that have points
        points: leaderPoints + unitPoints,
      };
    } else {
      // For regular units, just add points
      return {
        ...unitInstance,
        points: getUnitPoints(unitInstance.name),
      };
    }
  }

  #render() {
    if (!this.#data) return;

    // Build display units with points pre-calculated
    const displayUnits = this.#data.map(unit => this.#buildDisplayUnit(unit));

    // Recalculate total points from display units
    this.#points = displayUnits.reduce((acc, unit) => acc + (unit.points || 0), 0);
    this.pointsLabel.innerText = this.#points ? `${this.#points} Points` : '';

    this.contentContainer.innerHTML = '';
    displayUnits.forEach((unit, index) =>
      this.#mode === 'regiments' ? this.addRegiment(unit, index) : this.addUnit(unit)
    );
  }

  addRegiment(regiment, index) {
    const regimentElement = document.createElement('aos-regiment');
    regimentElement.regimentData = regiment;
    regimentElement.index = index;

    const regimentOptions = regiment?.options?.regimentUnits || [];
    const modalOptions = regimentOptions
      .map(opt => {
        if (opt.unitName) {
          return this.#subOptions.find(o => o.name === opt.unitName);
        }
        if (opt.tag) {
          if (opt.tag === 'any') return [...this.#subOptions];
          return [
            ...this.#options.filter(o => o.tags?.includes(opt.tag)),
            ...this.#subOptions.filter(o => o.tags?.includes(opt.tag)),
          ];
        }
        return null;
      })
      .flat()
      .filter(o => o);
    regimentElement.options = modalOptions;
    // Pass all unit definitions for point lookups
    regimentElement.unitDefinitions = [...this.#options, ...this.#subOptions];

    // Set up event listeners for the regiment component
    regimentElement.addEventListener('removeRegiment', evt => {
      this.removeRegiment(evt.detail);
    });

    regimentElement.addEventListener('removeUnit', evt => {
      const { unitId, regimentId } = evt.detail;
      this.removeUnit(unitId, regimentId);
    });

    regimentElement.addEventListener('addUnit', evt => {
      const { unit, regimentId } = evt.detail;
      const regiment = this.#data.find(r => r.id === regimentId);
      regiment.units.push(unit);
      this.#render();
      this.#emit('update', regiment);
    });

    this.contentContainer.append(regimentElement);
  }

  showModal() {
    this.unitModal.title = this.#mode === 'regiments' ? 'Regiment' : 'Unit';
    this.unitModal.options = this.#options;
    this.unitModal.showModal();
  }

  addUnit(unit) {
    this.contentContainer.append(UnitRow(unit, this.showOptions));
  }

  removeRegiment(regimentId) {
    const foundNode = Array.from(this.contentContainer.querySelectorAll('aos-regiment')).find(
      r => r.dataset.regimentId === regimentId
    );
    if (foundNode) {
      foundNode.remove();
      this.#data = this.#data.filter(r => r.id !== regimentId);
      this.#render();
      this.#emit('delete', regimentId);
    }
  }

  removeUnit(unitId, regimentId) {
    if (this.#mode === 'regiments') {
      // Remove unit from regiment
      const regiment = this.#data.find(r => r.id === regimentId);
      if (regiment) {
        const unitIndex = regiment.units.findIndex(u => u.id === unitId);
        if (unitIndex !== -1) {
          regiment.units.splice(unitIndex, 1);
          this.#render();
          this.#emit('update', regiment);
        }
      }
    } else {
      // Remove unit from main section
      const foundNode = Array.from(this.contentContainer.querySelectorAll('.unit-summary')).find(
        u => u.dataset.unitId === unitId
      );
      if (foundNode) {
        foundNode.remove();
        this.#data = this.#data.filter(u => u.id !== unitId);
        this.#render();
        this.#emit('delete', unitId);
      }
    }
  }

  recalculatePoints() {
    // Points are now calculated in #buildDisplayUnit during render
    // This method is kept for compatibility but points are calculated in #render
    if (this.#data) {
      const displayUnits = this.#data.map(unit => this.#buildDisplayUnit(unit));
      this.#points = displayUnits.reduce((acc, unit) => acc + (unit.points || 0), 0);
      this.pointsLabel.innerText = this.#points ? `${this.#points} Points` : '';
    }
  }
}

window.customElements.define('aos-section', AOSSection);
