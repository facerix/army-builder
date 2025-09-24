import { FACTION_NAMES_TO_CODES, FACTION_NAMES } from "./factions.js";

const nameAndPointsRE = /^([^(]+)\(([0-9]+).*\)$/im;
const aosListNameLineRE = /^(.*) (\d+)\/(\d+) pts$/im;
const aosUnitDefRE = /^([[\w\s-]+) \(([0-9]+).*\)(\n• .*)*/m;

const parseUnitDef = (unitDef) => {
  const lines = unitDef.split("\n");
  const unitNameAndPoints = nameAndPointsRE.exec(lines[0]);
  return {
    name: unitNameAndPoints[1].trim(),
    points: unitNameAndPoints[2],
    wargear: lines.slice(1).map(l => l.trim()).join('\n')
  }
}

/**
 * Parses an army list exported from the official 40k app, BattleForge
 * @param {string} exported 
 * @returns ArmyList struct
 */
export const parseBattleForgeList = (exported) => {
  const lines = exported.split("\n");
  const armyNameAndPoints = nameAndPointsRE.exec(lines[0]);
  if (!armyNameAndPoints) return null;
  let unitDefs = {
    characters: [],
    battleline: [],
    transports: [],
    otherUnits: [],
  };
  let currentSection = null;
  let currentUnitDef = "";

  for (let line = 5; line < lines.length; line++) {
    switch (lines[line].trim()) {
      case "CHARACTERS":
        currentSection = "characters";
        break;
      case "BATTLELINE":
        currentSection = "battleline";
        break;
      case "DEDICATED TRANSPORTS":
        currentSection = "transports";
        break;
      case "OTHER DATASHEETS":
        currentSection = "otherUnits";
        break;
      case "":  // empty lines indicate the end of the current unit definition
        if (unitDefs[currentSection] && currentUnitDef.length) {
          unitDefs[currentSection].push(parseUnitDef(currentUnitDef.trim()));
        }
        currentUnitDef = "";
        break;
      default:
        if (lines[line].startsWith("Exported with App Version")) {
          // EOF
          break;
        }
        currentUnitDef += lines[line].trimEnd() + '\n';
        // if (unitDefs[currentSection]) {
        //   unitDefs[currentSection].push(lines[line]);
        // }
    }
  }

  return {
    armyName: armyNameAndPoints[1].trim(),
    points: armyNameAndPoints[2].trim(),
    faction: FACTION_NAMES_TO_CODES[lines[2].trim()],
    detachment: lines[3].trim(),  // might be lines[4] --- my two exported files have it differently
    units: [...unitDefs.characters, ...unitDefs.battleline, ...unitDefs.transports, ...unitDefs.otherUnits]
  };
};

const calculatePoints = (units) => {
  return units.reduce(
    (acc, curr) => acc + parseInt(curr.points, 10),
    0,
  );
};

const printUnit = (unit) => {
  const isWarlord = !!unit.options?.warlord ? " [Warlord]" : "";
  const modelCount = unit.options?.unitSize ?? 1; // we don't care about denoting single units that have multiple models
  const modelCountStr = modelCount > 1 ? `${modelCount}x ` : "";
  const lines = [`• ${modelCountStr}${unit.name}${isWarlord} (${unit.points})`];
  if (unit.options) {
    Object.entries(unit.options).forEach(([key, value]) => {
      if (!value) return;
      switch (key) {
        case "unitSize":
        case "warlord":
          // skip these since we already noted them above
          break;
        case "wargear":
          lines.push(`  ◦ ${value}`);
          break;
        default:
          lines.push(`  ◦ ${key}: ${value}`);
      }
    });
  }
  return lines.join("\n");
}

export const exportArmyList = (armyData) => {
  const lines = [];
  const { name: armyName, points, faction, detachment, characters, battleline, otherUnits } = armyData;
  const actualPoints = points || calculatePoints(characters) + calculatePoints(battleline) + calculatePoints(otherUnits);

  lines.push(`${armyName} (${actualPoints} Points)\n`);
  lines.push(`${FACTION_NAMES[faction]}\n${detachment}\n`);

  lines.push("CHARACTERS");
  // warload first
  characters.sort((a, b) => a.options?.warlord ? -1 : 1).forEach(u => lines.push(printUnit(u)));
  // characters.forEach(u => lines.push(printUnit(u)));

  lines.push("\nBATTLELINE");
  battleline.forEach(u => lines.push(printUnit(u)));
  
  lines.push("\nOTHER DATASHEETS");
  otherUnits.forEach(u => lines.push(printUnit(u)));

  return lines.join("\n");
}

export const parseAOSlist = (exported) => {
/*
Clan Skryre 1000/1000 pts
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
App: v1.17.0 (3) | Data: v310
*/
  const sections = exported.split('-----');
  const nameAndPoints = aosListNameLineRE.exec(sections[0]);

  return {
    name: nameAndPoints[1],
    points: {
      total: nameAndPoints[2],
      limit: nameAndPoints[3],
    },
    regiments: sections[2].trim().split('---').map(s => s.trim().split('\n'))
  };
}