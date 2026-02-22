import { h } from '/src/domUtils.js';
import '/components/UpdateNotification.js';
import '/components/MegaMenu.js';
import '/components/DataCard.js';
import '/components/MetadataModal.js';
import { get40kArmyData } from '../army-data-loader.js';
import {
  FACTION_NAMES,
  FACTION_NAMES_TO_CODES,
  FACTION_GROUPS,
  FACTION_IMAGE_URLS,
} from '/40k/army-data/factions.js';
import { serviceWorkerManager } from '/src/ServiceWorkerManager.js';
import {
  getUnitMetadata,
  setUnitMetadata,
  getFactionMetadata,
  setFactionMetadata,
  importMetadata,
  SHARED_ENTITIES_UNIT_NAME,
} from '/src/MetadataStore.js';
import { parseBattleScribeCatalogue } from '/src/battlescribe-parser.js';

const SUPPORTED_METADATA_KEYS = ['stats', 'abilities', 'weapons', 'wargear', 'enhancements'];
const isMetadataNonNull = metadata => {
  return !!metadata && Object.values(metadata).length > 0;
};

// BattleScribe loading/parsing
const loadAndParse = async function (catalogFile) {
  let parsedData = null;
  try {
    // Get file from input
    if (!catalogFile) {
      throw new Error('Please select a catalogue file (.cat)');
    }

    // Read the file
    const catalogueXml = await catalogFile.text();

    const rawData = await parseBattleScribeCatalogue(catalogueXml);
    parsedData = {
      faction: rawData.faction,
      units: rawData.units.map(unit => ({
        name: unit.name,
        stats: unit.stats,
        abilities: unit.abilities,
        weapons: unit.weapons,
        wargear: unit.wargear,
      })),
      shared: rawData.shared,
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }

  return parsedData;
};

const whenLoaded = Promise.all([
  customElements.whenDefined('update-notification'),
  customElements.whenDefined('data-card'),
  customElements.whenDefined('mega-menu'),
]);

whenLoaded.then(async () => {
  // Set up update notification
  const updateNotification = document.querySelector('update-notification');

  // Listen for service worker updates
  window.addEventListener('sw-update-available', event => {
    console.log('Service worker update available, showing notification');
    updateNotification.show(event.detail.pendingWorker);
  });

  // Initialize service worker
  serviceWorkerManager.register();

  // get DOM elements
  const metadataTable = document.querySelector('#metadataTable tbody');
  const metadataModal = document.querySelector('metadata-modal');
  const datafileInput = document.querySelector('#bsDataFile');
  const uploadButton = document.querySelector('#btnUpload');
  const uploadStatus = document.querySelector('#uploadStatus');

  // URL params
  const urlParams = new URL(window.location).searchParams;
  let factionCode = urlParams.get('faction');
  if (!factionCode) {
    document.querySelector('#allFactions').classList.remove('u-hidden');

    const megaMenu = document.querySelector('mega-menu');

    // set up mega menu
    megaMenu.items = FACTION_GROUPS.map(group => ({
      name: group.name,
      items: group.factions.map(faction => ({
        name: FACTION_NAMES[faction],
        href: `/40k/metadata/?faction=${faction}`,
        image: FACTION_IMAGE_URLS[faction],
      })),
    }));

    return;
  } else {
    document.querySelector('#selectedFaction').classList.remove('u-hidden');
  }

  // page-level globals
  let factionName = FACTION_NAMES[factionCode];
  let factionCoreData;
  let factionMetadata;

  if (!factionName) {
    console.error('Unknown faction:', factionCode);
    document.querySelector('body').classList.remove('loading');
    return;
  }

  const loadDataForFaction = async factionName => {
    try {
      factionCoreData = await get40kArmyData(factionName);
      factionMetadata = await getFactionMetadata('40k', factionName);
      return true;
    } catch (error) {
      console.error('Failed to load army data:', error);
      alert(`Failed to load faction data: ${error.message}`);
      return false;
    }
  };

  datafileInput.addEventListener('change', async evt => {
    const file = evt.target.files[0];
    uploadButton.disabled = !file;
  });

  const showFactionMismatchWarning = parsedDataFactionName => {
    if (FACTION_NAMES_TO_CODES[parsedDataFactionName]) {
      // there is a faction for the uploaded data; ask the user if they want to switch to it
      let warningText = `⚠️ Warning: Catalogue is for '${parsedDataFactionName}', not '${factionName}'. Do you want to switch to that faction?`;
      const switchButton = h('button', { type: 'button', innerText: 'Switch' });
      const cancelButton = h('button', { type: 'button', innerText: 'Cancel' });
      cancelButton.addEventListener('click', () => {
        uploadStatus.innerHTML = '';
      });
      const warningDiv = h('div', { className: 'warning', innerText: warningText }, [
        switchButton,
        cancelButton,
      ]);
      switchButton.addEventListener('click', async () => {
        factionCode = FACTION_NAMES_TO_CODES[parsedDataFactionName];
        window.history.pushState({}, '', `/40k/metadata/?faction=${factionCode}`);
        // do this on the next clock tick to make sure the DOM is updated
        setTimeout(async () => {
          if (await loadDataForFaction(parsedDataFactionName)) {
            render();
            warningDiv.remove();
          }
        }, 0);
      });
      uploadStatus.appendChild(warningDiv);
    } else {
      uploadStatus.appendChild(
        h('div', {
          className: 'warning',
          innerText: `⚠️ Warning: Catalogue is for unknown faction '${parsedDataFactionName}', not '${factionName}'. Proceed with caution.`,
        })
      );
    }
  };

  uploadButton.addEventListener('click', async () => {
    const file = datafileInput.files[0];
    if (!file) {
      alert('Please select a file to upload');
      return;
    }
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'cat' && ext !== 'xml') {
      alert('Please select a .cat or .xml file');
      return;
    }
    uploadStatus.innerText = 'Loading catalogue file...';
    uploadStatus.classList.remove('u-hidden');
    try {
      const parsedData = await loadAndParse(file);
      uploadStatus.innerHTML = '';
      if (parsedData.faction !== factionName) {
        showFactionMismatchWarning(parsedData.faction);
      }
      const sharedCount =
        parsedData.shared?.abilities?.length +
        parsedData.shared?.weapons?.length +
        parsedData.shared?.wargear?.length +
        parsedData.shared?.enhancements?.length;
      const importButton = h('button', { type: 'button', innerText: 'Import' });
      importButton.addEventListener('click', async () => {
        importMetadata('40k', parsedData.faction, parsedData.units, parsedData.shared)
          .then(() => {
            render();
            let successText = `Imported ${parsedData.units.length} units`;
            if (sharedCount > 0) {
              successText += ` and ${sharedCount} shared entities`;
            }
            uploadStatus.replaceChildren(
              h('div', {
                className: 'success',
                innerText: `${successText}.`,
              })
            );
          })
          .catch(error => {
            uploadStatus.replaceChildren(
              h('div', {
                className: 'error',
                innerText: `Error importing metadata: ${error.message}`,
              })
            );
          });
      });
      let successText = `Found ${parsedData.units.length} units`;
      if (sharedCount > 0) {
        successText += ` and ${sharedCount} shared entities`;
      }
      uploadStatus.appendChild(
        h('div', { className: 'success', innerText: `${successText}.` }, [importButton])
      );

      const unitNames = parsedData.units.map(unit => unit.name).join(', ');
      uploadStatus.appendChild(
        h('details', {}, [
          h('summary', { innerText: 'Parsed data' }),
          h('div', { innerText: `Units: ${unitNames}` }),
          h('label', { innerText: 'Shared entities:' }),
          h('textarea', { innerText: JSON.stringify(parsedData.shared, null, 2) }),
        ])
      );
    } catch (error) {
      uploadStatus.textContent = `✗ Error parsing catalogue: ${error.message}`;
      console.error('Error:', error);
      uploadStatus.appendChild(
        h('details', {}, [
          h('summary', { innerText: 'Error details' }),
          h('pre', { innerText: error.stack }),
        ])
      );
    }
  });

  const render = async () => {
    metadataTable.innerHTML = '';

    if (factionMetadata) {
      const row = h('tr', {}, [
        h('td', { innerText: 'Shared elements (rules, weapons, wargear)' }),
      ]);
      row.dataset.unitName = SHARED_ENTITIES_UNIT_NAME;
      const statusCell = h('td', {});
      Object.keys(factionMetadata).forEach(key => {
        if (SUPPORTED_METADATA_KEYS.includes(key) && isMetadataNonNull(factionMetadata[key])) {
          statusCell.appendChild(
            h('span', { className: 'md-cat' }, [
              h('img', { src: `/images/${key}.svg`, alt: key }),
              h('span', { innerText: key }),
            ])
          );
        }
      });
      row.appendChild(statusCell);
      row.appendChild(
        h('td', {}, [
          h('button', { innerText: 'Edit', type: 'button', title: 'Edit metadata for this unit' }),
        ])
      );
      metadataTable.appendChild(row);
    }

    if (factionCoreData) {
      factionCoreData.units.forEach(unit => {
        const row = h('tr', {}, [h('td', { innerText: unit.name })]);
        row.dataset.unitName = unit.name;
        const statusCell = h('td', { innerText: '...checking...' });
        const actionsCell = h('td', {}, [
          h('button', { innerText: 'Edit', type: 'button', title: 'Edit metadata for this unit' }),
        ]);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);
        setTimeout(async () => {
          const metadata = await getUnitMetadata('40k', factionName, unit.name);
          const statusIcons = [];
          Object.keys(metadata).forEach(key => {
            if (SUPPORTED_METADATA_KEYS.includes(key) && isMetadataNonNull(metadata[key])) {
              statusIcons.push(
                h('span', { className: 'md-cat' }, [
                  h('img', { src: `/images/${key}.svg`, alt: key }),
                  h('span', { innerText: key }),
                ])
              );
            }
          });
          statusCell.replaceChildren(...statusIcons);
        }, 0);
        metadataTable.appendChild(row);
      });
    } else {
      console.error('No core data found');
    }
  };

  metadataTable.addEventListener('click', async evt => {
    const target = evt.target;
    if (target.tagName === 'BUTTON') {
      const row = target.closest('tr');
      const unitName = row.dataset.unitName;
      const mode = unitName !== SHARED_ENTITIES_UNIT_NAME ? 'unit' : 'faction';
      if (unitName) {
        const metadata = await getUnitMetadata('40k', factionName, unitName);
        metadataModal.open({
          gameSystem: '40k',
          factionName,
          unitName,
          metadata,
          mode,
        });
      }
    }
  });

  metadataModal.addEventListener('metadataSaved', async evt => {
    // console.log('metadataSaved', evt.detail);
    const { gameSystem, factionName: savedFaction, unitName, metadata } = evt.detail || {};
    if (!gameSystem || !savedFaction || !unitName) {
      return;
    }
    if (unitName === SHARED_ENTITIES_UNIT_NAME) {
      await setFactionMetadata(gameSystem, savedFaction, metadata);
    } else {
      await setUnitMetadata(gameSystem, savedFaction, unitName, metadata);
    }
    render();
  });

  // Load army data asynchronously
  if (factionName) {
    const success = await loadDataForFaction(factionName);
    if (success) {
      render();
    }
  }
});
