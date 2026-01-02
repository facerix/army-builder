import DataStore from '/src/DataStore.js';
import { h } from '/src/domUtils.js';
import '/components/CategorySection.js';
import '/components/UpdateNotification.js';
import { get40kArmyData } from '../army-data-loader.js';
import { FACTION_NAMES } from '/40k/army-data/factions.js';
import { exportArmyList } from '/src/parsers.js';
import { serviceWorkerManager } from '/src/ServiceWorkerManager.js';

const whenLoaded = Promise.all(
  [
    customElements.whenDefined("category-section"),
    customElements.whenDefined("update-notification"),
  ],
);

const reducer = (acc, curr) => {
  return acc + parseInt(curr.points, 10);
};

const getTotalPoints = (list) => {
  if (list.units) {
    // New format: single units array
    return list.units.reduce(reducer, 0);
  } else {
    // Old format: three separate arrays (for migration)
    const chars = (list.characters || []).reduce(reducer, 0);
    const bl = (list.battleline || []).reduce(reducer, 0);
    const other = (list.otherUnits || []).reduce(reducer, 0);
    return chars + bl + other;
  }
}

whenLoaded.then(() => {
  // Set up update notification
  const updateNotification = document.querySelector('update-notification');

  // Listen for service worker updates
  window.addEventListener('sw-update-available', (event) => {
    console.log('Service worker update available, showing notification');
    updateNotification.show(event.detail.pendingWorker);
  });

  const urlParams = new URL(window.location).searchParams;
  const id = urlParams.get('id');
  const faction = urlParams.get('faction');
  const factionName = FACTION_NAMES[faction];
  const detachmentSelector = document.querySelector("select#detachment");

  let armyList;
  let armyData;
  
  // Load army data asynchronously
  if (factionName) {
    get40kArmyData(factionName).then(data => {
      armyData = data;

      // populate detachment selector
      Object.keys(armyData.detachments).forEach(detachmentName => {
        detachmentSelector.append(h("option", { value: detachmentName, innerText: detachmentName }));
      });
      
      // Initialize if armyList is already loaded
      if (armyList) {
        init();
        recalculatePoints();
      }
    }).catch(error => {
      console.error('Failed to load army data:', error);
      alert(`Failed to load faction data: ${error.message}`);
    });
  }

  // Initialize service worker
  serviceWorkerManager.register();
  
  const btnDelete = document.querySelector("#btnDelete");
  const btnExport = document.querySelector("#btnExport");
  const armyNameInput = document.querySelector("#armyName");
  const charactersSection = document.querySelector("#characters");
  const battlelineSection = document.querySelector("#battleline");
  const otherSection = document.querySelector("#otherUnits");
  const totalPoints = document.querySelector("#totalPoints");

  const newArmy = () => {
    return {
      id,
      faction,
      game: "40k",
      totalPoints: 0,
      units: []
    };
  }

  const recalculatePoints = () => {
    if (totalPoints && armyList && armyData) {
      if (armyList.units) {
        // New format: build display units and sum their points
        const displayUnits = armyList.units
          .map(u => buildDisplayUnit(u, armyData, armyList.detachment))
          .filter(u => u !== null);
        const total = displayUnits.reduce((acc, curr) => acc + curr.points, 0);
        totalPoints.innerText = total;
      } else {
        // Old format: use existing calculation (for migration)
        totalPoints.innerText = getTotalPoints(armyList);
      }
    }
  };

  const save = () => {
    DataStore.updateItem(armyList);
  }

  const onUpdate = (section, eventType, affectedItems, categorySection) => {
    if (armyList.units) {
      // New format: work with single units array
      switch (eventType) {
        case "add":
          // affectedItems is the unit instance to add
          armyList.units.push(affectedItems);
          armyList.units.sort((a, b) => a.name.localeCompare(b.name));
          // Re-render to rebuild display units and update sections
          render();
          break;
        case "delete":
          // affectedItems is the unit ID to delete
          const deleteIndex = armyList.units.findIndex(u => u.id === affectedItems);
          if (deleteIndex !== -1) {
            armyList.units.splice(deleteIndex, 1);
          }
          // Re-render to rebuild display units and update sections
          render();
          break;
        case "update":
          // affectedItems is the updated display unit from CategorySection
          // Find the corresponding instance in armyList.units and update its options
          const updateIndex = armyList.units.findIndex(u => u.id === affectedItems.id);
          if (updateIndex !== -1) {
            const prevEnhancement = armyList.units[updateIndex].options?.enhancement;
            const newEnhancement = affectedItems.options?.enhancement;
            
            // If enhancement changed, remove it from other units
            if (newEnhancement && newEnhancement !== prevEnhancement) {
              armyList.units.forEach(u => {
                if (u.id !== affectedItems.id && u.options?.enhancement === newEnhancement) {
                  u.options.enhancement = null;
                }
              });
            }
            
            // If unit is newly promoted to warlord, remove warlord from other units
            if (affectedItems.options?.warlord && !armyList.units[updateIndex].options?.warlord) {
              armyList.units.forEach(u => {
                if (u.id !== affectedItems.id && u.options?.warlord) {
                  u.options.warlord = false;
                }
              });
            }
            
            // Update only the options, keeping id and name
            armyList.units[updateIndex].options = { ...affectedItems.options };
          }
          // Re-render to rebuild display units with updated options
          render();
          break;
      }
    } else {
      // Old format: use existing logic (for migration)
      switch (eventType) {
        case "add":
          armyList[section].push(affectedItems);
          armyList[section].sort((a, b) => a.name.localeCompare(b.name));
          categorySection.units = armyList[section];
          break;
        case "delete":
          const toPrune = armyList[section].findIndex(u => u.id === affectedItems);
          armyList[section].splice(toPrune, 1);
          break;
        case "update":
          // the items are already updated in place since they're passed to CategorySection by reference
          break;
      }
    }
    recalculatePoints();
    save();
  };

  /**
   * Migrates an army list from old format (three arrays) to new format (single array)
   * @param {Object} oldList - The army list in old format
   * @returns {Object} - The army list in new format
   */
  const migrateArmyList = (oldList) => {
    if (oldList.units) {
      // Already in new format
      return oldList;
    }

    // Collect all units from all sections
    const allUnits = [
      ...(oldList.characters || []),
      ...(oldList.battleline || []),
      ...(oldList.otherUnits || [])
    ];

    // Convert to new format: strip non-instance data, keep only id, name, options
    const migratedUnits = allUnits.map(unit => {
      const instance = {
        id: unit.id,
        name: unit.name,
        options: { ...unit.options }
      };
      return instance;
    });

    // Create new list structure
    const newList = {
      ...oldList,
      units: migratedUnits
    };

    // Remove old arrays (but keep them commented for reference)
    delete newList.characters;
    delete newList.battleline;
    delete newList.otherUnits;

    return newList;
  }

  const init = async () => {
    // Ensure armyData is loaded
    if (factionName && !armyData) {
      try {
        armyData = await get40kArmyData(factionName);
      } catch (error) {
        console.error('Failed to load army data:', error);
        alert(`Failed to load faction data: ${error.message}`);
        return;
      }
    }
    
    if (armyList && armyData) {
      // Migrate if needed
      if (!armyList.units && (armyList.characters || armyList.battleline || armyList.otherUnits)) {
        armyList = migrateArmyList(armyList);
        save(); // Save migrated format
      }
      
      armyNameInput.value = armyList.name;
      render();
      document.querySelector("body").classList.remove("loading");
    }
  }

  const render = () => {
    if (armyList && armyData) {
      detachmentSelector.value = armyList.detachment || "";
      
      // Get units with modifications applied based on current detachment (for available units)
      const modifiedUnits = getModifiedUnits(armyData, armyList.detachment);
      
      if (armyList.units) {
        // New format: build display units and categorize at runtime
        const displayUnits = armyList.units
          .map(u => buildDisplayUnit(u, armyData, armyList.detachment))
          .filter(u => u !== null);
        
        // Categorize display units
        const characters = displayUnits.filter(u => getUnitSection(u) === "characters");
        const battleline = displayUnits.filter(u => getUnitSection(u) === "battleline");
        const otherUnits = displayUnits.filter(u => getUnitSection(u) === "otherUnits");
        
        charactersSection.units = characters;
        charactersSection.availableUnits = modifiedUnits.filter(u => u.tags?.includes("Character"));
        charactersSection.options = getDetachmentOptions(armyData, armyList.detachment);
        
        battlelineSection.units = battleline;
        battlelineSection.availableUnits = modifiedUnits.filter(u => u.tags?.includes("Battleline"));
        
        otherSection.units = otherUnits;
        otherSection.availableUnits = modifiedUnits.filter(u => !u.tags?.includes("Character") && !u.tags?.includes("Battleline"));
      } else {
        // Old format: use existing structure (for migration)
        charactersSection.units = armyList.characters || [];
        charactersSection.availableUnits = modifiedUnits.filter(u => u.tags?.includes("Character"));
        charactersSection.options = getDetachmentOptions(armyData, armyList.detachment);
        battlelineSection.units = armyList.battleline || [];
        battlelineSection.availableUnits = modifiedUnits.filter(u => u.tags?.includes("Battleline"));
        otherSection.units = armyList.otherUnits || [];
        otherSection.availableUnits = modifiedUnits.filter(u => !u.tags?.includes("Character") && !u.tags?.includes("Battleline"));
      }
    }
  }

  const getDetachmentOptions = (armyData, detachment) => {
    return {
      enhancements: armyData.detachments[detachment]?.enhancements || [],
    };
  }

  /**
   * Calculates the total points for a unit instance based on canonical unit and options
   * @param {Object} unitInstance - The stored unit instance (id, name, options)
   * @param {Object} canonicalUnit - The canonical unit definition from armyData
   * @param {Object} detachmentData - The detachment data (for enhancements)
   * @returns {number} - Total points for the unit
   */
  const calculateUnitPoints = (unitInstance, canonicalUnit, detachmentData) => {
    let points = 0;

    // Base points from unitSize or default
    if (unitInstance.options?.unitSize && canonicalUnit.unitOptions?.unitSize && Array.isArray(canonicalUnit.points)) {
      // unitOptions.unitSize is an array like [10, 20]
      // points is an array like [180, 360]
      // Find the index of the selected unitSize and use it to get the corresponding points
      const unitSizeIndex = canonicalUnit.unitOptions.unitSize.indexOf(unitInstance.options.unitSize);
      if (unitSizeIndex !== -1 && unitSizeIndex < canonicalUnit.points.length) {
        points = canonicalUnit.points[unitSizeIndex];
      } else {
        // Fallback to first points value if index not found
        points = canonicalUnit.points[0];
      }
    } else if (Array.isArray(canonicalUnit.points)) {
      // If points is an array but no unitSize selected, use first value
      points = canonicalUnit.points[0];
    } else {
      // Single points value
      points = canonicalUnit.points || 0;
    }

    // Add enhancement points if present
    if (unitInstance.options?.enhancement && detachmentData?.enhancements) {
      const enhancement = detachmentData.enhancements.find(
        e => e.name === unitInstance.options.enhancement
      );
      if (enhancement) {
        points += enhancement.points || 0;
      }
    }

    return points;
  }

  /**
   * Builds a complete display unit from a stored instance, canonical unit, and detachment modifications
   * @param {Object} unitInstance - The stored unit instance (id, name, options)
   * @param {Object} armyData - The army data containing canonical units
   * @param {string} detachment - The detachment name
   * @returns {Object} - Complete unit object for display
   */
  const buildDisplayUnit = (unitInstance, armyData, detachment) => {
    // Find canonical unit by name
    const canonicalUnit = armyData.units.find(u => u.name === unitInstance.name);
    if (!canonicalUnit) {
      console.warn(`Unit not found: ${unitInstance.name}`);
      return null;
    }

    // Get detachment data
    const detachmentData = detachment ? armyData.detachments[detachment] : null;
    const unitModifications = detachmentData?.unitModifications || [];

    // Apply detachment modifications to get modified tags
    const modifiedUnit = applyUnitModifications(canonicalUnit, unitModifications);

    // Calculate points
    const points = calculateUnitPoints(unitInstance, canonicalUnit, detachmentData);

    // Transform unitOptions for display (CategorySection expects unitSize to be array of objects with modelCount and points)
    let displayUnitOptions = undefined;
    if (canonicalUnit.unitOptions) {
      displayUnitOptions = JSON.parse(JSON.stringify(canonicalUnit.unitOptions));
      
      // Transform unitSize from array of numbers to array of objects with modelCount and points
      if (displayUnitOptions.unitSize && Array.isArray(displayUnitOptions.unitSize) && Array.isArray(canonicalUnit.points)) {
        displayUnitOptions.unitSize = displayUnitOptions.unitSize.map((modelCount, index) => ({
          modelCount: modelCount,
          points: canonicalUnit.points[index] || canonicalUnit.points[0] || 0
        }));
      }
    }

    // Build display unit by merging canonical data with instance options
    const displayUnit = {
      id: unitInstance.id,
      name: canonicalUnit.name,
      points: points,
      modelCount: unitInstance.options?.unitSize || canonicalUnit.modelCount || 1,
      tags: [...(modifiedUnit.tags || [])],
      weapons: [...(canonicalUnit.weapons || [])],
      wargear: [...(canonicalUnit.wargear || [])],
      unitOptions: displayUnitOptions,
      options: { ...unitInstance.options }
    };

    return displayUnit;
  }

  /**
   * Determines which section a unit should belong to based on its tags
   * @param {Object} displayUnit - The display unit (with tags after detachment mods)
   * @returns {string} - The section name: "characters", "battleline", or "otherUnits"
   */
  const getUnitSection = (displayUnit) => {
    const tags = displayUnit.tags || [];
    if (tags.includes("Character")) {
      return "characters";
    } else if (tags.includes("Battleline")) {
      return "battleline";
    } else {
      return "otherUnits";
    }
  }

  /**
   * Applies unitModifications to a unit, returning a modified copy
   * @param {Object} unit - The unit to modify
   * @param {Array} unitModifications - Array of modification objects
   * @returns {Object} - A modified copy of the unit
   */
  const applyUnitModifications = (unit, unitModifications) => {
    if (!unitModifications || unitModifications.length === 0) {
      return unit;
    }

    // Create a deep copy of the unit to avoid mutating the original
    const modifiedUnit = JSON.parse(JSON.stringify(unit));

    unitModifications.forEach(modification => {
      // Check if this modification applies to this unit
      if (modification.target === unit.name) {
        switch (modification.type) {
          case "addTag":
            // Add the tag if it doesn't already exist
            if (!modifiedUnit.tags) {
              modifiedUnit.tags = [];
            }
            if (!modifiedUnit.tags.includes(modification.value)) {
              modifiedUnit.tags.push(modification.value);
            }
            break;
          // Add more modification types here as needed
          default:
            console.warn(`Unknown modification type: ${modification.type}`);
        }
      }
    });

    return modifiedUnit;
  }

  /**
   * Gets units with modifications applied based on the current detachment
   * @param {Object} armyData - The army data
   * @param {string} detachment - The detachment name
   * @returns {Array} - Array of units with modifications applied
   */
  const getModifiedUnits = (armyData, detachment) => {
    if (!detachment || !armyData.detachments[detachment]) {
      return armyData.units;
    }

    const detachmentData = armyData.detachments[detachment];
    const unitModifications = detachmentData.unitModifications || [];

    if (unitModifications.length === 0) {
      return armyData.units;
    }

    // Apply modifications to each unit
    return armyData.units.map(unit => 
      applyUnitModifications(unit, unitModifications)
    );
  }


  btnExport.addEventListener("click", evt => {
    // Build display units for export if using new format
    let exportData = armyList;
    if (armyList.units && armyData) {
      const displayUnits = armyList.units
        .map(u => buildDisplayUnit(u, armyData, armyList.detachment))
        .filter(u => u !== null);
      
      // Categorize for export
      const characters = displayUnits.filter(u => getUnitSection(u) === "characters");
      const battleline = displayUnits.filter(u => getUnitSection(u) === "battleline");
      const otherUnits = displayUnits.filter(u => getUnitSection(u) === "otherUnits");
      
      exportData = {
        ...armyList,
        characters,
        battleline,
        otherUnits
      };
    }
    
    const exported = exportArmyList(exportData);
    navigator.clipboard.writeText(exported);
    alert("Army list exported to clipboard");
  });

  btnDelete.addEventListener("click", evt => {
    if (confirm("Delete this army list: are you sure?")) {
      DataStore.deleteItem(id);
    }
  });

  armyNameInput.addEventListener("change", evt => {
    armyList.name = evt.target.value;
    save();
  });

  charactersSection.addEventListener("change", evt => {
    onUpdate("characters", evt.detail.changeType, evt.detail.units, charactersSection);
  });
  battlelineSection.addEventListener("change", evt => {
    onUpdate("battleline", evt.detail.changeType, evt.detail.units, battlelineSection);
  });
  otherSection.addEventListener("change", evt => {
    onUpdate("otherUnits", evt.detail.changeType, evt.detail.units, otherSection);
  });

  detachmentSelector.addEventListener("change", evt => {
    const detachmentName = evt.target.value;
    if (detachmentName && detachmentName !== armyList.detachment) {
      armyList.detachment = detachmentName;
      
      if (armyList.units) {
        // New format: flush any existing character enhancements
        armyList.units.forEach(u => {
          if (u.options?.enhancement) {
            u.options.enhancement = null;
          }
        });
      } else {
        // Old format: flush any existing character enhancements
        (armyList.characters || []).forEach(c => {
          if (c.options?.enhancement) {
            c.options.enhancement = null;
          }
        });
      }
      
      // Re-render to rebuild display units with new detachment (units will be re-categorized automatically)
      charactersSection.options = getDetachmentOptions(armyData, armyList.detachment);
      recalculatePoints();
      save();
      render();
    }
  });

  DataStore.init();

  DataStore.addEventListener("change", async evt => {
    switch (evt.detail.changeType) {
      case "init":
        if (evt.detail.items.length) {
          armyList = DataStore.getItemById(id);
        }
        if (!armyList) {
          alert("I can't find a list with this ID");
          armyList = newArmy();
        }
        await init();
        recalculatePoints();
        break;
      case "delete":
        window.history.go(-1);
        break;
      default:
        // no action to take otherwise
        break;
    }
  });
});  