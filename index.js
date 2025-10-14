import { parseAOSlist } from './src/parsers.js';
import { serviceWorkerManager } from './src/ServiceWorkerManager.js';
import './components/UpdateNotification.js';

const whenLoaded = Promise.all(
	[
		customElements.whenDefined("update-notification"),
	],
);

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

whenLoaded.then(() => {
  // Initialize service worker
  serviceWorkerManager.init();
  
  console.log(parseAOSlist(AOS_LIST));

  // document.querySelector("#faction-select-aos").addEventListener("change", evt => {
  //   console.log(evt.currentTarget.value)
  // })
});
