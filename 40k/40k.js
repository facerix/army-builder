import DataStore from '../src/DataStore.js';
import { h } from '../src/domUtils.js';
import { FACTION_IMAGE_URLS, FACTION_NAMES } from '../src/factions.js';
import { ARMIES } from '/src/40k-army-data.js';

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

  // disable faction options that don't have a battle profile
  factionSelector.querySelectorAll("option").forEach(option => {
    const faction = FACTION_NAMES[option.value];
    if (!ARMIES[faction] || !ARMIES[faction]?.characters?.length || !ARMIES[faction]?.otherUnits?.length) {
      option.disabled = true;
    }
  });

  DataStore.init();

  DataStore.addEventListener("change", evt => {
    switch (evt.detail.changeType) {
      case "init":
        const fortyKLists = evt.detail.items.filter(list => list.game === '40k');
        if (!fortyKLists.length) {
          savedLists.append(h("p", { innerText: "No saved lists yet" }));
        }
        fortyKLists.forEach(list => {
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
      game: "40k",
      faction,
      name: `Unnamed ${FACTION_NAMES[faction]} army`,
      totalPoints: 0,
      characters: [],
      battleline: [],
      otherUnits: []
    })
  });
})