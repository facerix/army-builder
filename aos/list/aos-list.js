import DataStore from '/src/DataStore.js';
import '/components/AOSSection.js';
import '/components/Regiment.js';
import '/components/UpdateNotification.js';
import { BATTLE_PROFILES } from '/src/aos-army-data.js';
import { AOS_FACTION_NAMES } from '/src/factions.js';
import { h } from '/src/domUtils.js';
import { serviceWorkerManager } from '/src/ServiceWorkerManager.js';

const whenLoaded = Promise.all(
  [
    customElements.whenDefined("aos-section"),
    customElements.whenDefined("aos-regiment"),
  ],
);

const getTotalPoints = (list) => {
  // TODO
  return 0;
}

whenLoaded.then(() => {
  // Initialize service worker
  serviceWorkerManager.init();
  
  const urlParams = new URL(window.location).searchParams;
  const id = urlParams.get('id');
  const faction = urlParams.get('faction');
  const factionName = AOS_FACTION_NAMES[faction];
  const formationSelector = document.querySelector("select#formation");

  let armyList;
  let factionProfiles;
  if (factionName) {
    factionProfiles = BATTLE_PROFILES[faction];

    // populate formation selector
    Object.keys(factionProfiles.formations).forEach(formationName => {
      formationSelector.append(h("option", { value: formationName, innerText: formationName }));
    });
  }

  const btnDelete = document.querySelector("#btnDelete");
  const armyNameInput = document.querySelector("#armyName");
  const regimentsSection = document.querySelector("#regiments");
  const auxiliaryUnitsSection = document.querySelector("#auxiliaryUnits");
  // const loresSection = document.querySelector("#lores");
  // const terrainSection = document.querySelector("#terrain");
  const totalPoints = document.querySelector("#totalPoints");

  const newArmy = () => {
    return {
      id,
      faction,
      game: "aos",
      totalPoints: 0,
      regiments: [],
      auxiliaryUnits: [],
      lores: {
        spell: null,
        prayer :null,
        manifestation: null,
      },
      terrain: null,
    };
  }

  const recalculatePoints = () => {
    const updatedPoints = regimentsSection.points + auxiliaryUnitsSection.points;
    if (totalPoints && armyList) {
      armyList.totalPoints = updatedPoints;
      totalPoints.innerText = updatedPoints;
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
        console.log("update", affectedItems);
        // const regimentIndex = armyList[section].findIndex(r => r.id === affectedItems.id);
        // armyList[section][regimentIndex] = affectedItems;
        break;
    }
    recalculatePoints();
    save();
  };

  const init = () => {
    if (armyList && factionProfiles) {
      armyNameInput.value = armyList.name;

      regimentsSection.units = armyList.regiments ?? [];
      regimentsSection.mode = "regiments";
      regimentsSection.options = factionProfiles;

      auxiliaryUnitsSection.units = armyList.auxiliaryUnits ?? [];
      auxiliaryUnitsSection.mode = "units";
      auxiliaryUnitsSection.options = factionProfiles;
    
      // loresSection.units = armyList.lores;
      // loresSection.options = factionProfiles.lores;

      // terrainSection.units = armyList.terrain;
      // terrainSection.options = factionProfiles.terrain;

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

  regimentsSection.addEventListener("change", evt => {
    onUpdate("regiments", evt.detail.changeType, evt.detail.units, regimentsSection);
  });
  auxiliaryUnitsSection.addEventListener("change", evt => {
    onUpdate("auxiliaryUnits", evt.detail.changeType, evt.detail.units, auxiliaryUnitsSection);
  });
  // loresSection.addEventListener("change", evt => {
  //   onUpdate("lores", evt.detail.changeType, evt.detail.units, loresSection);
  // });
  // terrainSection.addEventListener("change", evt => {
  //   onUpdate("terrain", evt.detail.changeType, evt.detail.units, terrainSection);
  // });

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