import DataStore from '/src/DataStore.js';
import '/components/CategorySection.js';
import { MUNITORIUM } from '/src/mfm.js';
import { FACTION_NAMES } from '/src/factions.js';

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

  let armyList;
  let mfm;
  if (factionName) {
    mfm = MUNITORIUM[factionName];
  }

  const btnDelete = document.querySelector("#btnDelete");
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
    }
    recalculatePoints();
    save();
  };

  const init = () => {
    if (armyList && mfm) {
      armyNameInput.value = armyList.name;

      charactersSection.units = armyList.characters;
      charactersSection.options = mfm.characters;
    
      battlelineSection.units = armyList.battleline;
      battlelineSection.options = mfm.battleline;
    
      otherSection.units = armyList.otherUnits;
      otherSection.options = mfm.otherUnits;

      document.querySelector("body").classList.remove("loading");
    }
  }

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