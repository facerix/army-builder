import DataStore from '../src/DataStore.js';
import { h } from '../src/domUtils.js';
import { FACTION_IMAGE_URLS, AOS_FACTION_NAMES } from '../src/factions.js';

const listSlug = (armyList) => {
  const { id, faction, name } = armyList;
  return h("a", { className: "list-slug", href: `list/?id=${id}&faction=${faction}` }, [
    h("img", { className: "faction", src: FACTION_IMAGE_URLS[faction], alt: "faction image" }),
    h("span", { innerText: name })
  ]);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLists = document.querySelector(".saved-lists");
  const btnNew = document.querySelector(".faction-selector button");
  const factionSelector = document.querySelector("select#faction");

  DataStore.init();

  DataStore.addEventListener("change", evt => {
    switch (evt.detail.changeType) {
      case "init":
        const aosLists = evt.detail.items.filter(list => list.game === 'aos');
        if (!aosLists.length) {
          savedLists.append(h("p", { innerText: "No saved lists yet" }));
        }
        aosLists.forEach(list => {
          savedLists.append(listSlug(list));
        });
        document.querySelector("main").classList.remove("loading");
        break;
      case "add":
        const newRec = evt.detail.affectedRecords;
        window.location.assign(`list/?id=${newRec.id}&faction=${newRec.faction}`);
        break;
      default:
        // no action to take otherwise
        break;
    }
  });

  factionSelector.addEventListener("change", evt => {
    btnNew.disabled = !evt.target.value;
  });

  btnNew.addEventListener("click", evt => {
    const faction = factionSelector.value;
    DataStore.addItem({
      game: "aos",
      faction,
      name: `Unnamed ${AOS_FACTION_NAMES[faction]} army`,
      totalPoints: 0,
      regiments: [],
      auxiliaryUnits: [],
      lores: {
        spell: null,
        prayer :null,
        manifestation: null,
      },
      terrain: null,
    })
  });
})