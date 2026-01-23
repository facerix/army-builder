import DataStore from '../src/DataStore.js';
import { h } from '../src/domUtils.js';
import { FACTION_IMAGE_URLS, FACTION_NAMES, FACTION_NAMES_TO_CODES } from './army-data/factions.js';
import { serviceWorkerManager } from '../src/ServiceWorkerManager.js';
import '../components/UpdateNotification.js';

const listSlug = armyList => {
  const { id, faction, name } = armyList;
  return h('a', { className: 'list-slug', href: `list/?id=${id}&faction=${faction}` }, [
    h('img', { className: 'faction', src: FACTION_IMAGE_URLS[faction], alt: 'faction image' }),
    h('span', { innerText: name }),
  ]);
};

const whenLoaded = Promise.all([customElements.whenDefined('update-notification')]);

whenLoaded.then(() => {
  // Set up update notification
  const updateNotification = document.querySelector('update-notification');

  // Listen for service worker updates
  window.addEventListener('sw-update-available', event => {
    console.log('Service worker update available, showing notification');
    updateNotification.show(event.detail.pendingWorker);
  });

  // Initialize service worker
  serviceWorkerManager.register();
});

document.addEventListener('DOMContentLoaded', () => {
  const savedLists = document.querySelector('.saved-lists');
  // const factionSelector = document.querySelector('select#faction');
  const factionLinks = document.querySelectorAll('#factionMenu li a');

  // disable faction options that don't have a battle profile
  factionLinks.forEach(link => {
    const factionCode = link.href.split('=')[1];
    const faction = FACTION_NAMES[factionCode];
    if (faction) {
      if (!(faction in FACTION_NAMES_TO_CODES)) {
        console.log(`faction '${faction}' is missing battle profile data`);
        link.href = '';
      }
    }
  });

  DataStore.init();

  DataStore.addEventListener('change', evt => {
    switch (evt.detail.changeType) {
      case 'init':
        const fortyKLists = evt.detail.items.filter(list => list.game === '40k');
        if (!fortyKLists.length) {
          savedLists.append(h('p', { innerText: 'No saved lists yet' }));
        }
        fortyKLists.forEach(list => {
          savedLists.append(listSlug(list));
        });
        document.querySelector('main').classList.remove('loading');
        break;
      case 'add':
        const newRec = evt.detail.affectedRecords;
        window.location.assign(`list/?id=${newRec.id}&faction=${newRec.faction}`);
        break;
      default:
        // no action to take otherwise
        break;
    }
  });

  // factionSelector.addEventListener('change', evt => {
  //   // TODO: filter the saved lists to only show lists for the selected faction
  //   const faction = evt.target.value;
  //   const savedLists = document.querySelectorAll('.saved-lists .list-slug');
  //   savedLists.forEach(list => {
  //     if (list.dataset.faction !== faction) {
  //       list.style.display = 'none';
  //     }
  //   });
  // });
});
