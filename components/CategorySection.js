import './UnitModal.js';
import './OptionsModal.js';
import { h } from '../src/domUtils.js';
import { getOptionSummaries } from '../src/parsers.js';

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

  // options
  const optionsList = [];
  if (options?.enhancement) {
    optionsList.push(h("span", { className: "unit-option", innerHTML: `<em>Enhancement</em>: ${options.enhancement}` }));
  }

  // if there are weapon options, show e.g. "5x Plasma Axe" or whatever; otherwise just show "unit size N"
  let weaponProfiles = [];
  weaponProfiles = getOptionSummaries(unit.weapons || [], options.weapons, options.unitSize || unit.modelCount, unit.unitOptions?.weapons);
  if (weaponProfiles.length > 0) {
    optionsList.push(h("span", { className: "unit-option", innerHTML: `<em>Weapons</em>: ${weaponProfiles.join(", ")}` }));
  }

  // if there are wargear options, show e.g. "5x Preymark crest" or whatever
  let wargearProfiles = [];
  wargearProfiles = getOptionSummaries(unit.wargear || [], options.wargear, options.unitSize || unit.modelCount, unit.unitOptions?.wargear);
  if (wargearProfiles.length > 0) {
    optionsList.push(h("span", { className: "unit-option", innerHTML: `<em>Wargear</em>: ${wargearProfiles.join(", ")}` }));
  }

  if (weaponProfiles.length === 0 && wargearProfiles.length === 0 && options?.unitSize) {
    optionsList.push(h("span", { className: "unit-option", innerHTML: `<em>Unit Size</em>: ${options.unitSize}` }));
  }

  // tags
  const tags = [];
  if (options?.warlord) {
    tags.push(h("span", { className: "unit-tag", innerText: "Warlord" }));
  }
  if (unit.tags?.includes("Epic Hero")) {
    tags.push(h("span", { className: "unit-tag", innerText: "Epic" }));
  }

  const unitNamePlusCount = unit.options?.unitSize ? `${unit.options.unitSize}x ${unit.name}` : unit.name;
  const row = h("div", { className: "unit-summary" }, [
    h("div", { className: "unit-details" }, [
      h("span", { className: "unit-name-line" }, [
        h("span", { className: "unit-name", innerText: unitNamePlusCount }),
        ...tags
      ]),
      h("span", { className: "unit-options" }, [ ...optionsList ]),
    ]),
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
      max-width: 70%;

      .unit-name-line {
        display: inline-flex;
      }

      .points {
        margin: 0;
      }
    }

    .unit-options {
      font-size: small;
      color: #666;
      display: flex;
      flex-direction: column;
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

/**
 * Matches a single tag requirement against unit tags.
 * Supports:
 * - Simple tags: "Tag1" - unit must have Tag1
 * - Negated tags: "!Tag2" - unit must NOT have Tag2
 * - Compound tags: "Tag1+!Tag2" - unit must have Tag1 AND NOT Tag2
 * 
 * @param {string} tagRequirement - Single tag requirement to match
 * @param {string[]} unitTags - Tags that the unit has
 * @param {string} unitName - Name of the unit (for exact name matching)
 * @returns {boolean} True if the unit matches the tag requirement
 */
const matchesSingleTagRequirement = (tagRequirement, unitTags, unitName) => {
  // Handle compound tags (AND logic) - e.g., "Tag1+!Tag2"
  if (tagRequirement.includes('+')) {
    const parts = tagRequirement.split('+').map(p => p.trim());
    return parts.every(part => matchesSingleTagRequirement(part, unitTags, unitName));
  }

  // Handle negated tags/names - e.g., "!Tag2" or "!UnitName"
  if (tagRequirement.startsWith('!')) {
    const tag = tagRequirement.substring(1);
    // Check if negated tag matches unit name
    if (tag === unitName) {
      return false;
    }
    // Check if negated tag matches any unit tag
    return !unitTags?.includes(tag);
  }

  // Check for exact unit name match
  if (tagRequirement === unitName) {
    return true;
  }

  // Handle simple positive tags
  return unitTags?.includes(tagRequirement) || false;
};

/**
 * Matches a unit against tag requirements.
 * Supports:
 * - Simple tags: "Tag1" - unit must have Tag1
 * - Negated tags: "!Tag2" - unit must NOT have Tag2
 * - Compound tags: "Tag1+!Tag2" - unit must have Tag1 AND NOT Tag2
 * - Array of tags: ["Tag1+!Tag2", "Tag3"] - (Tag1 AND NOT Tag2) OR Tag3
 * 
 * @param {string|string[]} tagRequirements - Tag requirement(s) to match (can be array for OR logic)
 * @param {string[]} unitTags - Tags that the unit has
 * @param {string} unitName - Name of the unit (for exact name matching)
 * @returns {boolean} True if the unit matches the tag requirements
 */
const matchesTagRequirement = (tagRequirements, unitTags, unitName) => {
  // If no tags requirement, always match
  if (!tagRequirements) {
    return true;
  }

  // Handle array of tag requirements (OR logic)
  if (Array.isArray(tagRequirements)) {
    return tagRequirements.some(req => matchesSingleTagRequirement(req, unitTags, unitName));
  }

  // Handle single tag requirement
  return matchesSingleTagRequirement(tagRequirements, unitTags, unitName);
};

// Helper function: Match option by name (handles arrays and strings)
const matchOptionByName = (optionName, savedOptionName) => {
  if (Array.isArray(optionName)) {
    if (Array.isArray(savedOptionName)) {
      // Compare arrays by checking if they have the same length and same elements
      return optionName.length === savedOptionName.length && 
             optionName.every((val, idx) => val === savedOptionName[idx]);
    }
    // If savedOptionName is not an array but selected is set, check if selected value is in optionName array
    return false; // We'll check selected separately
  } else {
    // If optionName is a string, check if savedOptionName matches (string or array containing it)
    if (Array.isArray(savedOptionName)) {
      return savedOptionName.includes(optionName);
    }
    return savedOptionName === optionName;
  }
};

// Helper function: Calculate effective max based on per property
const calculateEffectiveMax = (option, unitSize) => {
  if (option.per && unitSize) {
    return Math.floor(unitSize / option.per) * option.max;
  }
  return option.max || 0;
};

// Helper function: Truncate selections when unit size decreases
const truncateSelectionsForUnitSize = (option, selected, newUnitSize) => {
  if (!option.per || !option.max) return selected;
  
  const newEffectiveMax = calculateEffectiveMax(option, newUnitSize);
  
  // Handle array selections (selectionType: "any" or "anyNoDuplicates")
  if ((option.selectionType === "any" || option.selectionType === "anyNoDuplicates") && Array.isArray(selected)) {
    return selected.length > newEffectiveMax ? selected.slice(0, newEffectiveMax) : selected;
  }
  
  // Handle single-string with per (integer count)
  if (typeof option.name === 'string' && option.per && typeof selected === 'number') {
    return Math.min(selected, newEffectiveMax);
  }
  
  // Handle selectionType: "all" (string value) - no truncation needed, value is still valid
  // (though the option might not exist if array was changed, but that's handled elsewhere)
  
  return selected;
};

const optionsForUnit = (categoryOptions, unit, includeEnhancements = false) => {
  const availableOptions = {};
  if (!unit.tags?.includes("Epic Hero") && includeEnhancements) {
    // filter enhancements to either match unit name or tags (e.g. "exo-armor")
    availableOptions.enhancements = categoryOptions?.enhancements?.filter(o => {
      // Check if enhancement matches tag requirements (handles arrays, compound tags, negation)
      return matchesTagRequirement(o.tags, unit.tags || [], unit.name);
    }) ?? [];
  }
  // other options
  if (unit.unitOptions) {
    // unitSize
    if (unit.unitOptions.unitSize) {
      availableOptions.unitSize = unit.unitOptions.unitSize.map(opt => ({
        ...opt,
        selected: opt.modelCount === (unit.options?.unitSize || unit.modelCount),
      }));
    }

    // weapons
    if (unit.unitOptions.weapons) {
      availableOptions.weapons = unit.unitOptions.weapons.map(opt => {
        const savedOption = unit.options?.weapons?.find(w => {
          return matchOptionByName(opt.name, w.name);
        });
        const selected = savedOption?.selected || false;
        // Truncate selections if unit size has decreased
        const unitSize = unit.options?.unitSize || unit.modelCount;
        const truncatedSelected = truncateSelectionsForUnitSize(opt, selected, unitSize);
        return {
          ...opt,
          selected: truncatedSelected,
        };
      });
    }

    // wargear
    if (unit.unitOptions.wargear) {
      availableOptions.wargear = unit.unitOptions.wargear.map(opt => {
        const savedOption = unit.options?.wargear?.find(w => {
          return matchOptionByName(opt.name, w.name);
        });
        const selected = savedOption?.selected || false;
        // Truncate selections if unit size has decreased
        const unitSize = unit.options?.unitSize || unit.modelCount;
        const truncatedSelected = truncateSelectionsForUnitSize(opt, selected, unitSize);
        return {
          ...opt,
          selected: truncatedSelected,
        };
      });
    }
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
          const newUnitSize = parseInt(options.unitSize, 10);
          this.activeUnit.modelCount = newUnitSize;
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
    this.#availableUnits = [ ...availableUnits ].sort((a, b) => {
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
    const weaponProfiles = getOptionSummaries(unit.weapons || [], options.weapons, options.unitSize || unit.modelCount);
    const wargearProfiles = getOptionSummaries(unit.wargear || [], options.wargear, options.unitSize || unit.modelCount);
    
    // Build a normalized display state object
    const displayState = {
      points: unit.points,
      name: unit.name,
      unitSize: options?.unitSize || null,
      displayName: options?.unitSize ? `${options.unitSize}x ${unit.name}` : unit.name,
      warlord: options?.warlord === true,
      epicHero: unit.tags?.includes("Epic Hero") === true,
      enhancement: options?.enhancement || null,
      weapons: weaponProfiles.length > 0 ? weaponProfiles.sort().join("|") : null,
      wargear: wargearProfiles.length > 0 ? wargearProfiles.sort().join("|") : null,
      unitSizeDisplay: (weaponProfiles.length === 0 && wargearProfiles.length === 0 && options?.unitSize) ? options.unitSize : null
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

    // Create new row
    const newRow = UnitRow(unit, options);
    
    // Store display signature for future comparisons
    const signature = this.#getDisplaySignature(unit, options);
    newRow.dataset.displaySignature = signature;
    
    // Replace the existing node with the new one
    existingNode.replaceWith(newRow);
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
    Array.from(this.unitList.querySelectorAll(".unit-summary")).forEach(node => {
      const unitId = node.dataset.unitId;
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
        const newNode = UnitRow(unit, options);
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
          const nextNode = existingChildren.find(child => child.dataset.unitId === nextUnitId);
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
  };

  addUnit(unit) {
    // normalize options
    const options = { ...unit.options };
    if (this.heroUnits && unit.options?.warlord === undefined) {
      options.warlord = false;
    }

    const newNode = UnitRow(unit, options);
    // Store display signature for future comparisons
    const signature = this.#getDisplaySignature(unit, options);
    newNode.dataset.displaySignature = signature;
    this.unitList.append(newNode);
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
