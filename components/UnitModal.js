import { h } from '../src/domUtils.js';
import { v4WithTimestamp } from '../src/uuid.js';

// I want to define a type for the unit object for JSDoc usage but not TypeScript
/**
 * @typedef {Object} Unit
 * @property {string} name
 * @property {Object} unitOptions
 * @property {number} points
 * @property {string[]} tags
 */

const multipleUnitPoints = (unitSizes, pointValues) => {
  return Object.values(unitSizes)
    .map((count, idx) => `${count}x ${pointValues[idx]}`)
    .join(', ');
};

/**
 *
 * @param {Unit} unit
 * @returns
 */
const UnitListing = unit => {
  const { name, unitOptions, modelCount = 1 } = unit;
  let points = unit.points;
  if (unitOptions?.unitSize) {
    points = `(${multipleUnitPoints(unitOptions.unitSize, unit.points)})`;
  }
  const row = h('div', { className: 'unit-summary' }, [
    h('div', { className: 'unit-info' }, [
      h('span', { className: 'unit-name', innerText: name }),
      h('span', { className: 'unit-pts points', innerText: `${points} Points` }),
    ]),
    h('button', { className: 'add-unit', title: 'add unit' }, [
      h('img', { src: '/images/plus.svg', alt: 'add unit' }),
    ]),
  ]);
  row.dataset.unitName = name;
  row.dataset.defaultModelCount = modelCount;
  row.dataset.unitTags = unit.tags?.join(', ') ?? '';
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

  dialog {
    padding: 0.5rem;
    min-width: 300px;
    max-height: 90dvh;
    flex-direction: column;
    
    &:open {
      display: flex;
    }

    #unitList {
      height: fit-content;
      max-height: 80dvh;
      overflow-y: scroll;
    }


    /* background scroll fix */
    /* see https://www.bram.us/2025/11/25/use-overscroll-behavior-contain-to-prevent-a-page-from-scrolling-while-a-dialog-is-open/ */
    overscroll-behavior: contain;
  
    &::backdrop {
      overflow: hidden;
      overscroll-behavior: contain;
    }
  }
}
`;

const TEMPLATE = `
<dialog id="unit-modal" closedby="any">
  <header>
    <h3 id="modalTitle">Add Units</h3>
    <button id="btnClose">
      <img src="/images/close.svg" alt="cancel" tabindex="50" />
    </button>
  </header>
  <div id="unitList">
  </div>
</dialog>
`;

class UnitModal extends HTMLElement {
  #ready = false;
  #options = [];
  #modalTitle = null;
  #unitModal = null;
  #unitList = null;
  #btnClose = null;

  constructor() {
    super();
  }

  connectedCallback() {
    // Create shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    const styles = document.createElement('style');
    styles.innerHTML = CSS;
    shadow.appendChild(styles);

    const modal = document.createElement('div');
    modal.innerHTML = TEMPLATE;
    shadow.appendChild(modal);

    this.#init();
  }

  #init() {
    if (!this.#ready) {
      this.#modalTitle = this.shadowRoot.querySelector('#modalTitle');
      this.#unitModal = this.shadowRoot.querySelector('#unit-modal');
      this.#unitList = this.shadowRoot.querySelector('#unitList');
      this.#btnClose = this.shadowRoot.querySelector('#btnClose');

      // Set up event handlers
      this.#btnClose.addEventListener('click', () => {
        this.close();
      });

      this.#unitList.addEventListener('click', evt => {
        const btn = evt.target.closest('button');
        if (btn && btn.className === 'add-unit') {
          const unitSummary = btn.closest('.unit-summary');
          const { unitName: name } = unitSummary.dataset;
          // Unit definition :> name: string, points: number, tags?: string[], modelCount?: number | number[], unitOptions?: object
          const unitDef = this.#options.find(u => u.name === name);
          const { unitOptions = undefined } = unitDef;

          // Store only instance-specific data: id, name, and options
          const unitToAdd = {
            id: v4WithTimestamp(),
            name,
            options: {},
          };

          if (unitOptions) {
            // populate options object for unit's defaults
            Object.keys(unitOptions).forEach(option => {
              switch (option) {
                case 'unitSize':
                  // pick smallest unit size as default
                  const sizeOptions = [...unitOptions.unitSize];
                  const selectedSize = sizeOptions[0];
                  unitToAdd.options.unitSize = selectedSize;
                  break;
                case 'weapons':
                  const weaponOptions = [...unitOptions.weapons];
                  unitToAdd.options.weapons = weaponOptions.map(weapon => {
                    const max = weapon.max;
                    const replaces = weapon.replaces;
                    return {
                      name: weapon.name,
                      selected: false,
                      ...(max ? { max } : {}),
                      ...(replaces ? { replaces } : {}),
                    };
                  });
                  break;
                case 'wargear':
                  const wargearOptions = [...unitOptions.wargear];
                  unitToAdd.options.wargear = wargearOptions.map(wargear => {
                    const max = wargear.max;
                    const replaces = wargear.replaces;
                    return {
                      name: wargear.name,
                      selected: false,
                      ...(max ? { max } : {}),
                      ...(replaces ? { replaces } : {}),
                    };
                  });
                  break;
                default:
                  unitToAdd.options[option] = unitOptions[option];
                  break;
              }
            });
          }

          // Dispatch custom event for unit addition
          const addEvent = new CustomEvent('unitAdded', {
            detail: { unit: unitToAdd },
          });
          this.dispatchEvent(addEvent);

          this.close();
        }
      });

      this.#ready = true;
    }
  }

  set title(title) {
    if (this.#modalTitle) {
      this.#modalTitle.innerText = `Add ${title}`;
    }
  }

  set options(availableUnits) {
    this.#options = [...availableUnits];
    this.#render();
  }

  #render() {
    if (!this.#unitList) return;

    this.#unitList.innerHTML = '';
    this.#options.forEach(unit => {
      this.#unitList.append(UnitListing(unit));
    });
  }

  showModal() {
    if (this.#unitModal) {
      this.#unitModal.showModal();
    }
  }

  close() {
    if (this.#unitModal) {
      this.#unitModal.close();
    }
  }
}

window.customElements.define('unit-modal', UnitModal);
