import { parseAOSlist } from './src/parsers.js';
// import './components/SiteHeader.js';
// import DataStore from './src/DataStore.js';

// const whenLoaded = Promise.all(
// 	[
// 		customElements.whenDefined("site-header"),
// 	],
// );

// whenLoaded.then(() => {
  // DataStore.init();

  // DataStore.addEventListener("change", evt => {
  //   switch (evt.detail.changeType) {
  //     case "init":
  //       // TODO: load whatever data we need for the home page
  //       break;
  //     default:
  //       // no action to take otherwise
  //       break;
  //   }
  // });

  // we actually don't need to do anything else here right now beyond loading SiteHeader.js
// });

const AOS_LIST = `Clan Skryre 1000/1000 pts
-----
Grand Alliance Chaos | Skaven | Warpcog Convocation
General's Handbook 2024-25
Drops: 2
Spell Lore - Lore of Ruin
Manifestation Lore - Manifestations of Doom
-----
General's Regiment
Warlock Engineer (110)
• General
Ratling Warpblaster (140)
Warp Lightning Cannon (120)
Warp-Grinder (130)
Warplock Jezzails (140)
---
Regiment 1
Master Moulder (80)
Rat Ogors (280)
• Reinforced
-----
Faction Terrain
Gnawhole
-----
Created with Warhammer Age of Sigmar: The App
App: v1.17.0 (3) | Data: v310`

document.addEventListener("DOMContentLoaded", () => {
  console.log(parseAOSlist(AOS_LIST));

  // document.querySelector("#faction-select-aos").addEventListener("change", evt => {
  //   console.log(evt.currentTarget.value)
  // })
})