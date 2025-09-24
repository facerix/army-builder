import DataStore from '/src/DataStore.js';
import { h } from '/src/domUtils.js';
import '/components/CategorySection.js';
import { get40kArmyData } from '/src/40k-army-data.js';
import { FACTION_NAMES } from '/src/factions.js';
import { exportArmyList } from '/src/parsers.js';

const whenLoaded = Promise.all(
  [
    customElements.whenDefined("category-section"),
  ],
);

const reducer = (acc, curr) => {
  return acc + parseInt(curr.points, 10);
};

const getTotalPoints = (list) => {
  const chars = list.characters.reduce(reducer, 0);
  const bl = list.battleline.reduce(reducer, 0);
  const other = list.otherUnits.reduce(reducer, 0);
  return chars + bl + other;
}

whenLoaded.then(() => {
  const urlParams = new URL(window.location).searchParams;
  const id = urlParams.get('id');
  const faction = urlParams.get('faction');
  const factionName = FACTION_NAMES[faction];
  const detachmentSelector = document.querySelector("select#detachment");

  let armyList;
  let armyData;
  if (factionName) {
    armyData = get40kArmyData(factionName);

    // populate detachment selector
    Object.keys(armyData.enhancements).forEach(detachmentName => {
      detachmentSelector.append(h("option", { value: detachmentName, innerText: detachmentName }));
    });
  }

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
      characters: [],
      battleline: [],
      otherUnits: []
    };
  }

  const recalculatePoints = () => {
    if (totalPoints && armyList) {
      totalPoints.innerText = getTotalPoints(armyList);
    }
  };

  const save = () => {
    DataStore.updateItem(armyList);
  }

  const onUpdate = (section, eventType, affectedItems, categorySection) => {
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
        // the items are already undated in place since they're passed to CategorySection by reference
        break;
    }
    recalculatePoints();
    save();
  };

  const init = () => {
    if (armyList && armyData) {
      armyNameInput.value = armyList.name;
      render();
      document.querySelector("body").classList.remove("loading");
    }
  }

  const render = () => {
    if (armyList && armyData) {
      detachmentSelector.value = armyList.detachment || "";
      charactersSection.units = armyList.characters;
      charactersSection.availableUnits = armyData.characters;
      charactersSection.options = getDetachmentOptions(armyData, armyList.detachment);
      battlelineSection.units = armyList.battleline;
      battlelineSection.availableUnits = armyData.battleline;
      otherSection.units = armyList.otherUnits;
      otherSection.availableUnits = armyData.otherUnits;
    }
  }

  const getDetachmentOptions = (armyData, detachment) => {
    return {
      enhancements: armyData.enhancements[detachment] || [],
    };
  }

  btnExport.addEventListener("click", evt => {
    const exported = exportArmyList(armyList);
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
      // flush any existing character enhancements
      armyList.characters.forEach(c => {
        if (c.options?.enhancement) {
          c.options.enhancement = null;
        }
      });
      charactersSection.options = getDetachmentOptions(armyData, armyList.detachment);
      recalculatePoints();
      save();
      render();
    }
  });

  DataStore.init();

  DataStore.addEventListener("change", evt => {
    switch (evt.detail.changeType) {
      case "init":
        if (evt.detail.items.length) {
          armyList = DataStore.getItemById(id);
        }
        if (!armyList) {
          alert("I can't find a list with this ID");
          armyList = newArmy();
        }
        init();
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