import '../UnitModal.js';
import '../OptionsModal.js';
import './UnitRow.js';
import { getOptionSummaries } from '/src/option-summaries.js';
import { optionsForUnit, getUnitCurrentOptions } from './helpers.js';

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
    const shadow = this.attachShadow({ mode: 'open' });
    const styles = document.createElement('style');
    styles.innerHTML = CSS;
    shadow.appendChild(styles);

    const section = document.createElement('section');
    section.innerHTML = TEMPLATE;
    shadow.appendChild(section);
  }

  #init() {
    if (!this.#ready) {
      this.sectionTitle = this.shadowRoot.querySelector('#sectionTitle');
      this.pointsLabel = this.shadowRoot.querySelector('#pointsLabel');
      this.unitList = this.shadowRoot.querySelector('.unit-list');
      this.btnAddUnit = this.shadowRoot.querySelector('#btnAddUnit');
      this.unitModal = this.shadowRoot.querySelector('#unitModal');
      this.optionsModal = this.shadowRoot.querySelector('#optionsModal');
      // this.confirmModal = this.shadowRoot.querySelector("confirmation-modal");

      // populate attrs
      const title = this.getAttribute('sectionTitle');
      this.heroUnits = this.hasAttribute('heroUnits') && this.getAttribute('heroUnits') !== 'false';
      this.sectionTitle.innerText = title;

      // Set up the modal title and options
      this.unitModal.title = title;
      this.unitModal.options = this.#availableUnits;

      // set up event handlers
      this.btnAddUnit.addEventListener('click', () => {
        this.activeUnit = null;
        this.unitModal.showModal();
      });

      // Listen for unit added events from the modal
      this.unitModal.addEventListener('unitAdded', evt => {
        const unitToAdd = evt.detail.unit;
        this.#data.push(unitToAdd);
        this.#render();
        this.#emit('add', unitToAdd);
      });

      // Listen for custom events from unit-row components
      this.unitList.addEventListener('remove-unit', evt => {
        const { unitId } = evt.detail;
        this.removeUnit(unitId);
      });

      this.unitList.addEventListener('options-clicked', evt => {
        const { unitId } = evt.detail;
        this.activeUnit = this.#data.find(u => u.id === unitId);
        this.optionsModal.options = getUnitCurrentOptions(this.activeUnit, this.heroUnits);
        this.optionsModal.availableOptions = optionsForUnit(
          this.#options,
          this.activeUnit,
          this.heroUnits
        );
        this.optionsModal.defaultWeapons = this.activeUnit.weapons || [];
        this.optionsModal.defaultWargear = this.activeUnit.wargear || [];
        this.optionsModal.importedWargear = this.activeUnit.options?.importedWargear || null;
        this.optionsModal.showModal();
      });

      this.optionsModal.addEventListener('optionsSaved', evt => {
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
          const prevEnhancementPoints = this.activeUnit.options?.enhancement
            ? this.#options.enhancements.find(e => e.name === this.activeUnit.options?.enhancement)
                .points
            : 0;
          if (options.enhancement) {
            const enhancementPoints = options.enhancement
              ? this.#options.enhancements.find(e => e.name === options.enhancement).points
              : 0;
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
          const newUnitSize = parseInt(options.unitSize, 10);
          this.activeUnit.modelCount = newUnitSize;
          this.activeUnit.points = this.activeUnit.unitOptions.unitSize.find(
            opts => opts.modelCount === options.unitSize
          ).points;
        }

        // Preserve importedWargear if it exists and user hasn't set wargear options yet
        const hadImportedWargear = !!this.activeUnit?.options?.importedWargear;
        // Check if any wargear option is actually selected (not just that the array exists)
        const hasWargearOptions =
          options.wargear &&
          options.wargear.some(w => w.selected && w.selected !== false && w.selected !== 'off');
        const importedWargearValue = hadImportedWargear
          ? this.activeUnit.options.importedWargear
          : undefined;

        // Assign the new options
        this.activeUnit.options = options;

        // Only preserve importedWargear if user hasn't mapped wargear options yet
        if (hadImportedWargear && !hasWargearOptions) {
          this.activeUnit.options.importedWargear = importedWargearValue;
        }
        // If hasWargearOptions is true, importedWargear is intentionally not preserved (user has mapped it)

        this.#emit('update', this.activeUnit);
        this.#render();
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

  set availableUnits(availableUnits) {
    this.#availableUnits = [...availableUnits].sort((a, b) => {
      const nameA = a.name?.toLowerCase() || '';
      const nameB = b.name?.toLowerCase() || '';
      return nameA.localeCompare(nameB);
    });
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
    return [...this.#data];
  }

  /**
   * Generates a display signature/hash for a unit based on all display-relevant properties
   * This signature is used to quickly compare if a unit's display has changed
   * @param {Object} unit - The unit object
   * @param {Object} options - The normalized unit options
   * @returns {string} A hash string representing the unit's display state
   */
  #getDisplaySignature(unit, options) {
    // Generate options summaries (same logic as UnitRow)
    const weaponProfiles = getOptionSummaries(
      unit.weapons || [],
      options.weapons,
      options.unitSize || unit.modelCount,
      unit.unitOptions?.weapons
    );
    const wargearProfiles = getOptionSummaries(
      unit.wargear || [],
      options.wargear,
      options.unitSize || unit.modelCount,
      unit.unitOptions?.wargear
    );

    // Build a normalized display state object
    const displayState = {
      points: unit.points,
      name: unit.name,
      unitSize: options?.unitSize || null,
      displayName: options?.unitSize ? `${options.unitSize}x ${unit.name}` : unit.name,
      warlord: options?.warlord === true,
      epicHero: unit.tags?.includes('Epic Hero') === true,
      enhancement: options?.enhancement || null,
      weapons: weaponProfiles.length > 0 ? weaponProfiles.sort().join('|') : null,
      wargear: wargearProfiles.length > 0 ? wargearProfiles.sort().join('|') : null,
      unitSizeDisplay:
        weaponProfiles.length === 0 && wargearProfiles.length === 0 && options?.unitSize
          ? options.unitSize
          : null,
    };

    // Return JSON string as hash (simple and effective)
    return JSON.stringify(displayState);
  }

  /**
   * Checks if a unit's display data has changed by comparing display signatures
   * @param {Object} unit - The unit object
   * @param {HTMLElement} existingNode - The existing DOM node
   * @returns {boolean} True if the unit has changed
   */
  #unitHasChanged(unit, existingNode) {
    if (!existingNode) return true;

    // Normalize options (same as in addUnit)
    const options = { ...unit.options };
    if (this.heroUnits && unit.options?.warlord === undefined) {
      options.warlord = false;
    }

    // Get stored signature from node
    const storedSignature = existingNode.dataset.displaySignature;
    if (!storedSignature) return true; // No signature means it's a new node or old format

    // Generate current signature
    const currentSignature = this.#getDisplaySignature(unit, options);

    // Simple hash comparison - O(1) instead of multiple string comparisons
    return storedSignature !== currentSignature;
  }

  /**
   * Updates an existing DOM node with new unit data
   * @param {HTMLElement} existingNode - The existing DOM node to update
   * @param {Object} unit - The unit object with new data
   */
  #updateUnitNode(existingNode, unit) {
    // Normalize options
    const options = { ...unit.options };
    if (this.heroUnits && unit.options?.warlord === undefined) {
      options.warlord = false;
    }

    // Update the unit-row component
    if (existingNode.tagName === 'UNIT-ROW') {
      existingNode.unit = unit;
      existingNode.options = options;

      // Store display signature for future comparisons
      const signature = this.#getDisplaySignature(unit, options);
      existingNode.dataset.displaySignature = signature;
    } else {
      // Fallback: create new row if not a unit-row element
      const newRow = document.createElement('unit-row');
      newRow.unit = unit;
      newRow.options = options;

      const signature = this.#getDisplaySignature(unit, options);
      newRow.dataset.displaySignature = signature;

      existingNode.replaceWith(newRow);
    }
  }

  /**
   * Renders units incrementally, only updating what has changed
   */
  #render() {
    if (!this.#data) return;

    // Preserve scroll position
    const scrollTop = this.unitList.scrollTop;

    // Get existing nodes mapped by unit ID
    const existingNodes = new Map();
    Array.from(this.unitList.querySelectorAll('unit-row')).forEach(node => {
      const unitId = node.getAttribute('unit-id') || node.unit?.id;
      if (unitId) {
        existingNodes.set(unitId, node);
      }
    });

    // Track which units we've processed
    const processedUnitIds = new Set();

    // Use DocumentFragment for batch additions
    const fragment = document.createDocumentFragment();
    const nodesToAdd = [];

    // Process each unit in the data
    this.#data.forEach((unit, index) => {
      processedUnitIds.add(unit.id);
      const existingNode = existingNodes.get(unit.id);

      if (existingNode) {
        // Unit exists - check if it needs updating
        if (this.#unitHasChanged(unit, existingNode)) {
          // Update the existing node
          this.#updateUnitNode(existingNode, unit);
        }
        // If unchanged, leave it as-is, but ensure correct order
        // Check if node is in the right position
        const currentIndex = Array.from(this.unitList.children).indexOf(existingNode);
        const expectedIndex = index;
        if (currentIndex !== expectedIndex) {
          // Node exists but in wrong position - will be handled by reordering below
        }
      } else {
        // New unit - prepare to add
        const options = { ...unit.options };
        if (this.heroUnits && unit.options?.warlord === undefined) {
          options.warlord = false;
        }
        const newNode = document.createElement('unit-row');
        newNode.unit = unit;
        newNode.options = options;
        // Store display signature for future comparisons
        const signature = this.#getDisplaySignature(unit, options);
        newNode.dataset.displaySignature = signature;
        nodesToAdd.push({ node: newNode, index });
      }
    });

    // Remove units that are no longer in the data
    existingNodes.forEach((node, unitId) => {
      if (!processedUnitIds.has(unitId)) {
        node.remove();
      }
    });

    // Insert new nodes in the correct order
    if (nodesToAdd.length > 0) {
      // Sort by index to maintain order
      nodesToAdd.sort((a, b) => a.index - b.index);

      nodesToAdd.forEach(({ node, index }) => {
        const existingChildren = Array.from(this.unitList.children);
        let insertBefore = null;

        // Find insertion point: the first existing node that comes after this unit's position
        for (let i = index + 1; i < this.#data.length; i++) {
          const nextUnitId = this.#data[i].id;
          const nextNode = existingChildren.find(child => {
            const childUnitId = child.getAttribute('unit-id') || child.unit?.id;
            return childUnitId === nextUnitId;
          });
          if (nextNode) {
            insertBefore = nextNode;
            break;
          }
        }

        if (insertBefore) {
          this.unitList.insertBefore(node, insertBefore);
        } else {
          // Append to end
          fragment.appendChild(node);
        }
      });

      // Append any remaining nodes from fragment
      if (fragment.hasChildNodes()) {
        this.unitList.appendChild(fragment);
      }
    }

    // Reorder existing nodes if needed (simple approach: rebuild order if many changes)
    // For now, we'll rely on the natural order from the data array
    // A more sophisticated approach would compare positions and only move when necessary

    // Restore scroll position
    this.unitList.scrollTop = scrollTop;

    this.recalculatePoints();
  }

  addUnit(unit) {
    // normalize options
    const options = { ...unit.options };
    if (this.heroUnits && unit.options?.warlord === undefined) {
      options.warlord = false;
    }

    const newNode = document.createElement('unit-row');
    newNode.unit = unit;
    newNode.options = options;
    // Store display signature for future comparisons
    const signature = this.#getDisplaySignature(unit, options);
    newNode.dataset.displaySignature = signature;
    this.unitList.append(newNode);
  }

  removeUnit(unitId) {
    const foundNode = Array.from(this.unitList.querySelectorAll('unit-row')).find(u => {
      const nodeUnitId = u.getAttribute('unit-id') || u.unit?.id;
      return nodeUnitId === unitId;
    });
    if (foundNode) {
      foundNode.remove();
      this.#data = this.#data.filter(u => u.id !== unitId);
      this.recalculatePoints();
      this.#emit('delete', unitId);
    }
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
}

window.customElements.define('category-section', CategorySection);
