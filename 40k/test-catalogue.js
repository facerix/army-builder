import { parseBattleScribeCatalogue, parseBattleScribeUnit } from '../src/battlescribe-parser.js';

let parsedData = null;
let simplifyOutput = true;

document.getElementById('simplifyOutput').addEventListener('change', e => {
  simplifyOutput = e.target.checked;
});

document.getElementById('parseEntryBtn').addEventListener('click', async () => {
  try {
    await parseEntry();
  } catch (error) {
    console.error('Error parsing entry:', error);
    const entryResults = document.getElementById('entryResults');
    entryResults.value = `Error: ${error.message}`;
  }
});

document.getElementById('loadAndParseBtn').addEventListener('click', async () => {
  try {
    await loadAndParse();
  } catch (error) {
    console.error('Error loading and parsing:', error);
  }
});

const statsHeaderRow =
  '<thead><tr>' +
  ['M', 'T', 'SV', 'W', 'LD', 'OC'].map(header => `<th>${header}</th>`).join('') +
  '</tr></thead>';
const formatUnit = unit => {
  const unitSizeInner = unit.unitOptions?.unitSize
    ? unit.unitOptions.unitSize.join(' / ')
    : (unit.modelCount ?? '(error parsing)');
  const summary = `<b>${unit.name}</b>`;
  const unitSize = `<p><b>Unit Size:</b> ${unitSizeInner}</p>`;
  const stats = unit.stats
    ? `<table><thead>${statsHeaderRow}</thead><tr>${unit.stats.map(s => `<td>${s}</td>`).join('')}</tr></table>`
    : '';
  const tags = unit.tags ? `<p><b>Tags:</b> ${unit.tags.join(', ')}</p>` : '';
  const rules = unit.rules ? `<p><b>Rules:</b> ${unit.rules.join(', ')}</p>` : '';
  const weapons = unit.weapons?.length
    ? `<p><b>Weapons:</b> ${unit.weapons.map(w => `${w.name} (${w.type})`).join(', ')}</p>`
    : '';
  const wargear = unit.wargear?.length
    ? `<p><b>Wargear:</b> ${unit.wargear.map(w => w.name).join(', ')}</p>`
    : '';
  const abilities = unit.abilities
    ? `<p><b>Abilities:</b> ${unit.abilities.map(a => a.name).join(', ')}</p>`
    : '';
  const details = `${unitSize}${stats}${tags}${weapons}${wargear}${rules}${abilities}`;
  const debug = `<details><summary>Debug info</summary><pre>${JSON.stringify(unit, null, 2)}</pre></details>`;
  return `<li><details><summary>${summary}</summary>${details}${debug}</details></li>`;
};
const formatEnhancement = enhancement => {
  return `<li><details><summary>${enhancement.name} (${enhancement.points} points)</summary><p>${enhancement.description}</p></details></li>`;
};

const parseEntry = async function () {
  const entryText = document.getElementById('entryText').value;
  const entryResults = document.getElementById('entryResults');

  // eslint-disable-next-line no-undef
  const parser = new DOMParser();
  const doc = parser.parseFromString(entryText, 'text/xml');

  // Check for parsing errors
  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    throw new Error(`XML parsing error: ${parserError.textContent}`);
  }

  // Find the catalogue root element
  const entry = doc.documentElement;
  if (!entry || entry.tagName !== 'selectionEntry') {
    throw new Error('Expected selectionEntry as root element');
  }

  const parsedEntry = parseBattleScribeUnit(entry);
  entryResults.value = JSON.stringify(parsedEntry, null, 2);
};

const sortedUnits = units => {
  return units.toSorted((a, b) => a.name.localeCompare(b.name));
};

const simplifiedUnits = units => {
  if (!simplifyOutput) {
    return units;
  }
  return units.map(u => {
    const unit = {
      name: u.name,
      modelCount: u.modelCount,
      tags: u.tags,
    };
    if (u.wargear?.length) {
      unit.wargear = u.wargear;
    }
    if (Object.keys(u.unitOptions).length > 0) {
      unit.unitOptions = u.unitOptions;
    }
    return unit;
  });
};

const writerRawOutput = (parsedData, _simplify) => {
  const unitsInOrder = [
    ...simplifiedUnits(sortedUnits(parsedData.units.filter(u => u.tags?.includes('Character')))),
    ...simplifiedUnits(sortedUnits(parsedData.units.filter(u => u.tags?.includes('Battleline')))),
    ...simplifiedUnits(
      sortedUnits(parsedData.units.filter(u => u.tags?.includes('Dedicated Transport')))
    ),
    ...simplifiedUnits(
      sortedUnits(
        parsedData.units.filter(
          u =>
            !u.tags?.includes('Character') &&
            !u.tags?.includes('Battleline') &&
            !u.tags?.includes('Dedicated Transport')
        )
      )
    ),
  ];
  const detachments = Object.keys(parsedData.enhancements).map(detachmentName => {
    return {
      name: detachmentName,
      enhancements: parsedData.enhancements[detachmentName].map(enhancement => {
        return { name: enhancement.name, points: enhancement.points };
      }),
    };
  });
  return `<textarea>{
    "faction": "${parsedData.faction}",
    "units": ${JSON.stringify(unitsInOrder, null, 2)},
    "detachments": ${JSON.stringify(detachments, null, 2)}
  }</textarea>`;
};

const loadAndParse = async function () {
  const statusDiv = document.getElementById('status');
  const resultsDiv = document.getElementById('results');
  const fileInput = document.getElementById('catalogueFile');

  try {
    // Get file from input
    const file = fileInput.files[0];
    if (!file) {
      throw new Error('Please select a catalogue file (.cat)');
    }

    statusDiv.className = 'info';
    statusDiv.textContent = 'Loading catalogue file...';

    // Read the file
    const catalogueXml = await file.text();

    await parseCatalogue(catalogueXml);
  } catch (error) {
    statusDiv.className = 'error';
    statusDiv.textContent = `✗ Error: ${error.message}`;
    console.error('Error:', error);
    resultsDiv.innerHTML = `<pre>${error.stack}</pre>`;
  }

  async function parseCatalogue(catalogueXml) {
    const statusDiv = document.getElementById('status');
    const resultsDiv = document.getElementById('results');
    const rawResultsDiv = document.getElementById('rawResults');

    statusDiv.textContent = 'Parsing catalogue...';

    // Parse the catalogue
    parsedData = parseBattleScribeCatalogue(catalogueXml);
    rawResultsDiv.innerHTML = writerRawOutput(parsedData);

    statusDiv.className = 'success';
    statusDiv.textContent = `✓ Successfully parsed ${parsedData.units.length} units!`;

    // Display results
    const characters = simplifiedUnits(
      sortedUnits(parsedData.units.filter(u => u.tags?.includes('Character')))
    );
    const battleline = simplifiedUnits(
      sortedUnits(parsedData.units.filter(u => u.tags?.includes('Battleline')))
    );
    const dedicatedTransports = simplifiedUnits(
      sortedUnits(parsedData.units.filter(u => u.tags?.includes('Dedicated Transport')))
    );
    const otherUnits = simplifiedUnits(
      sortedUnits(
        parsedData.units.filter(
          u =>
            !u.tags?.includes('Character') &&
            !u.tags?.includes('Battleline') &&
            !u.tags?.includes('Dedicated Transport')
        )
      )
    );
    resultsDiv.innerHTML = `
      <h3>Parsed Catalogue: ${parsedData.faction}</h3>
      <details><summary><b>Parsed Units (${parsedData.units.length})</b></summary>
        <b>Characters:</b>
        <ul>${characters.map(formatUnit).join('')}</ul>
        <b>Battleline:</b>
        <ul>${battleline.map(formatUnit).join('')}</ul>
        <b>Dedicated Transports:</b>
        <ul>${dedicatedTransports.map(formatUnit).join('')}</ul>
        <b>Other Units:</b>
        <ul>${otherUnits.map(formatUnit).join('')}</ul>
      </details>
      <details><summary><b>Parsed Enhancements (${Object.keys(parsedData.enhancements).length})</b></summary>
      <ul>${Object.keys(parsedData.enhancements)
        .map(detachmentName => {
          return `<li>${detachmentName}:<ul>${parsedData.enhancements[detachmentName].map(formatEnhancement).join('')}</ul></li>`;
        })
        .join('')}</ul></details>
      <details><summary><b>Parsed Shared Upgrades (${parsedData.sharedUpgrades.length})</b></summary>
        <ul>${parsedData.sharedUpgrades
          .map(upgrade => {
            return `<li><details><summary>${upgrade.name}</summary><p>${upgrade.description}</p></details></li>`;
          })
          .join('')}</ul>
      </details>
    `;
  }
};
