import DataStore from '../src/DataStore.js';
import { h } from '../src/domUtils.js';
import { serviceWorkerManager } from '../src/ServiceWorkerManager.js';
import { getPointsForList } from '../src/40k-unit-utils.js';
import {
  FACTION_IMAGE_URLS,
  FACTION_NAMES,
  FACTION_NAMES_TO_CODES,
  FACTION_GROUPS,
} from './army-data/factions.js';
import '../components/UpdateNotification.js';
import '../components/MegaMenu.js';

const listSlug = armyList => {
  const { id, faction, name } = armyList;
  const queryParams = `id=${id}&faction=${faction}`;
  const slugElement = h('div', { className: 'list-slug' }, [
    h('img', { className: 'faction', src: FACTION_IMAGE_URLS[faction], alt: 'faction image' }),
    h('div', { className: 'name-and-points' }, [
      h('span', { className: 'name', innerText: name }),
      h('span', { className: 'points' }),
    ]),
    h('span', { className: 'actions' }, [
      h('a', { className: 'btn', href: `list/?${queryParams}`, title: 'Edit' }, [
        h('img', { src: '/images/build.svg', alt: 'build icon' }),
      ]),
      h('a', { className: 'btn', href: `play/?${queryParams}`, title: 'Play' }, [
        h('img', { src: '/images/dice.svg', alt: 'dice icon' }),
      ]),
      h('button', { type: 'button', className: 'btn', title: 'Delete' }, [
        h('img', { src: '/images/trash.svg', alt: 'trash icon' }),
      ]),
    ]),
  ]);
  slugElement.dataset.listId = id;
  slugElement.querySelector('button').dataset.listId = id;
  return slugElement;
};

const whenLoaded = Promise.all([
  customElements.whenDefined('update-notification'),
  customElements.whenDefined('mega-menu'),
]);

whenLoaded.then(() => {
  // Set up update notification
  const updateNotification = document.querySelector('update-notification');
  const megaMenu = document.querySelector('mega-menu');

  // set up mega menu
  megaMenu.items = FACTION_GROUPS.map(group => ({
    name: group.name,
    items: group.factions.map(faction => ({
      name: FACTION_NAMES[faction],
      href: `/40k/list/?faction=${faction}`,
      image: FACTION_IMAGE_URLS[faction],
    })),
  }));

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

  savedLists.addEventListener('click', evt => {
    const deleteBtn = evt.target.closest('button[data-list-id]');
    if (deleteBtn) {
      const listId = deleteBtn.dataset.listId;
      const listElement = deleteBtn.closest('.list-slug');
      const listName = listElement.querySelector('.name').innerText;
      if (window.confirm(`Delete "${listName}": are you sure?`)) {
        DataStore.deleteItem(listId);
      }
    }
  });

  DataStore.addEventListener('change', evt => {
    switch (evt.detail.changeType) {
      case 'init':
        const fortyKLists = evt.detail.items.filter(list => list.game === '40k');
        savedLists.innerHTML = '';
        if (!fortyKLists.length) {
          savedLists.append(h('p', { innerText: 'No saved lists yet' }));
        }
        fortyKLists.forEach(list => {
          const listElement = listSlug(list);
          savedLists.append(listElement);
          setTimeout(async () => {
            // calculate points for each list asynchronously
            const points = await getPointsForList(list);
            listElement.querySelector('.points').innerText = `${points} points`;
          }, 0);
        });
        document.querySelector('main').classList.remove('loading');
        break;
      case 'add':
        const newRec = evt.detail.affectedRecords;
        window.location.assign(`list/?id=${newRec.id}&faction=${newRec.faction}`);
        break;
      case 'delete':
        const deletedId = evt.detail.affectedRecords[0];
        const listElement = savedLists.querySelector(`[data-list-id="${deletedId}"]`);
        if (listElement) {
          listElement.remove();
        }
        // Show "No saved lists yet" if no lists remain
        if (savedLists.children.length === 0) {
          savedLists.append(h('p', { innerText: 'No saved lists yet' }));
        }
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
