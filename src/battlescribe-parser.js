/**
 * Converts XML entity-encoded quotes to double prime character
 */
const unescapeQuotes = (str) => {
  // console.log(`Escaping quotes; raw string: ${str}`);
  return str.replace(/&quot;/g, '″').replace(/\"/g, '″');
};

/**
 * Parses a numeric value, returning number if numeric, string otherwise
 */
const parseNumeric = (str) => {
  const num = Number(str);
  return isNaN(num) ? str : num;
};

/**
 * Extracts unit stats from a Unit profile
 */
const extractUnitStats = (unitProfile) => {
  if (!unitProfile) return null;
  const characteristics = unitProfile.querySelector('characteristics');
  if (!characteristics) return null;

  const stats = {};
  characteristics.querySelectorAll('characteristic').forEach(char => {
    const name = char.getAttribute('name');
    const value = unescapeQuotes(char.textContent.trim());
    stats[name] = value;
  });

  // Return as array: [M, T, SV, W, LD, OC]
  return [
    stats.M || '',
    parseNumeric(stats.T || 0),
    stats.SV || '',
    parseNumeric(stats.W || 0),
    stats.LD || '',
    parseNumeric(stats.OC || 0)
  ];
};

/**
 * Extracts weapon stats from a Ranged Weapons profile
 */
const extractWeaponStats = (weaponProfile) => {
  if (!weaponProfile) return null;
  const characteristics = weaponProfile.querySelector('characteristics');
  if (!characteristics) return null;

  const stats = {};
  characteristics.querySelectorAll('characteristic').forEach(char => {
    const name = char.getAttribute('name');
    const value = unescapeQuotes(char.textContent.trim());
    stats[name] = value;
  });

  // Return as array: [Range, A, BS, S, AP, D]
  return [
    unescapeQuotes(stats.Range || ''),
    parseNumeric(stats.A || 0),
    stats.BS || '',
    parseNumeric(stats.S || 0),
    parseNumeric(stats.AP || 0),
    parseNumeric(stats.D || 0)
  ];
};

/**
 * Extracts keywords from weapon profile characteristics
 */
const extractWeaponKeywords = (weaponProfile) => {
  if (!weaponProfile) return [];
  const characteristics = weaponProfile.querySelector('characteristics');
  if (!characteristics) return [];

  const keywordsChar = Array.from(characteristics.querySelectorAll('characteristic'))
    .find(char => char.getAttribute('name') === 'Keywords');

  if (!keywordsChar) return [];

  return keywordsChar.textContent.trim().split(/\s+/).filter(k => k.length > 0);
};

/**
 * Gets max constraint value from a selectionEntry
 */
const getMaxConstraint = (entry) => {
  const constraints = entry.querySelectorAll('constraint[type="max"]');
  for (const constraint of constraints) {
    const field = constraint.getAttribute('field');
    if (field === 'selections' || !field) {
      return parseInt(constraint.getAttribute('value'), 10);
    }
  }
  return null;
};

/**
 * Extracts weapon options from a selectionEntryGroup
 */
const extractGroupWeaponOptions = (group) => {
  const weaponOptions = [];

  // Find all model entries in this group
  const modelEntries = group.querySelectorAll('selectionEntry[type="model"]');

  modelEntries.forEach(modelEntry => {
    const modelName = modelEntry.getAttribute('name');

    // Look for weapon upgrades (selectionEntry type="upgrade" with weapon profiles)
    const weaponUpgrades = modelEntry.querySelectorAll('selectionEntry[type="upgrade"]');

    weaponUpgrades.forEach(upgrade => {
      const upgradeName = upgrade.getAttribute('name');
      const weaponProfile = upgrade.querySelector('profile[typeName="Ranged Weapons"]');

      if (weaponProfile) {
        // Has weapon stats - extract them
        const weaponObj = {
          name: modelName,
          max: getMaxConstraint(modelEntry) || 1,
          weapon: {
            name: upgradeName,
            stats: extractWeaponStats(weaponProfile),
            keywords: extractWeaponKeywords(weaponProfile)
          }
        };

        // Extract weapon rules from infoLinks
        const upgradeInfoLinks = upgrade.querySelectorAll('infoLink');
        if (upgradeInfoLinks.length > 0) {
          weaponObj.weapon.rules = Array.from(upgradeInfoLinks)
            .map(link => link.getAttribute('name'))
            .filter(name => name);
        }

        weaponOptions.push(weaponObj);
      } else {
        // No weapon profile - might be entryLinks to external weapons
        const entryLinks = upgrade.querySelectorAll('entryLink[type="selectionEntry"]');
        if (entryLinks.length > 0) {
          const weapons = Array.from(entryLinks)
            .map(link => link.getAttribute('name'))
            .filter(name => name && name !== 'Weapon Modifications');

          if (weapons.length > 0) {
            weaponOptions.push({
              name: modelName,
              max: getMaxConstraint(modelEntry) || 1,
              weapon: {
                name: upgradeName,
                weapons: weapons
              }
            });
          }
        }
      }
    });
  });

  // Also check for nested weapon selectionEntryGroups (like "Weapon" group in Theyn)
  const weaponGroups = group.querySelectorAll('selectionEntryGroup');
  weaponGroups.forEach(weaponGroup => {
    const weaponGroupName = weaponGroup.getAttribute('name');
    if (weaponGroupName && weaponGroupName.toLowerCase().includes('weapon')) {
      const weaponEntries = weaponGroup.querySelectorAll('selectionEntry[type="upgrade"]');
      weaponEntries.forEach(weaponEntry => {
        const weaponName = weaponEntry.getAttribute('name');
        const weaponProfile = weaponEntry.querySelector('profile[typeName="Ranged Weapons"]');

        if (weaponProfile) {
          weaponOptions.push({
            name: weaponName,
            max: getMaxConstraint(weaponEntry) || 1,
            weapon: {
              name: weaponName,
              stats: extractWeaponStats(weaponProfile),
              keywords: extractWeaponKeywords(weaponProfile)
            }
          });
        } else {
          // Check for entryLinks
          const entryLinks = weaponEntry.querySelectorAll('entryLink[type="selectionEntry"]');
          if (entryLinks.length > 0) {
            const weapons = Array.from(entryLinks)
              .map(link => link.getAttribute('name'))
              .filter(name => name && name !== 'Weapon Modifications');

            if (weapons.length > 0) {
              weaponOptions.push({
                name: weaponName,
                max: getMaxConstraint(weaponEntry) || 1,
                weapon: {
                  name: weaponName,
                  weapons: weapons
                }
              });
            }
          }
        }
      });
    }
  });

  return weaponOptions;
};

const extractMinMaxFromConstraints = (constraintsElement) => {
  if (constraintsElement.children.length === 2) {
    const constraints = Array.from(constraintsElement.children);
    const minConstraint = constraints.find(el => el.getAttribute('type') === 'min');
    const maxConstraint = constraints.find(el => el.getAttribute('type') === 'max');
    if (minConstraint && maxConstraint) {
      return {
        min: parseInt(minConstraint.getAttribute('value'), 10),
        max: parseInt(maxConstraint.getAttribute('value'), 10)
      };
    }
  }
  // console.warn(`provided <constraints> element is not a min/max pair:`, constraintsElement);
  return null;
}

const findMinMaxConstraints = (groupOrEntry) => {
  // console.log(`finding min/max constraints for '${groupOrEntry.getAttribute('name')}'`);
  let incrementElement = null;
  let minMax = null;
  const topLevelConstraints = groupOrEntry.querySelector(':scope > constraints');

  if (topLevelConstraints) {
    // is this a min/max constraint pair? if not keep looking
    minMax = extractMinMaxFromConstraints(topLevelConstraints);
    incrementElement = groupOrEntry.querySelector(':scope > modifiers > modifier[type="increment"]');
  }

  // not sure fishing is useful since it's also picking up contraints for wargear upgrades and other crap
  if (!minMax) {
    // go fishing
    // approach:
    // 1. if this is a selectionEntryGroup and doesn't have a top-level "constraints" element, check to see if it has one in a nested <selectionEntry>
    if (groupOrEntry.tagName === 'selectionEntryGroup') {
      // console.log(`fishing for a min/max constraint in selectionEntryGroup '${groupOrEntry.getAttribute('name')}'`);
      const nestedEntries = groupOrEntry.querySelectorAll('selectionEntry[type="model"]');
      for (const entry of nestedEntries) {
        // console.log(`checking nested entry '${entry.getAttribute('name')}'`);
        const nestedConstraints = entry.querySelector(':scope > constraints');
        incrementElement = entry.querySelector(':scope > modifiers > modifier[type="increment"]');
        if (nestedConstraints) {
          minMax = extractMinMaxFromConstraints(nestedConstraints);
          if (minMax) {
            break;
          }
        }
      }
    }
  }

  if (minMax?.min === minMax?.max) {
    // weird special case: if we have a mix/max, we may have an associated "increment" with a condition
    // (e.g. "Atalan Jackals" can have min/max=1 Wolfquad, unless they have 8 Jackals -- then they can have 2)
    // const increment = groupOrEntry.querySelector(':scope > modifiers > modifier[type="increment"]');
    if (incrementElement) {
      const incrementValue = parseInt(incrementElement.getAttribute('value'), 10);
      // for now we're going to just add the increment value to the max, but log that this happened, so we can 
      // track it down later if there are weird side-effects
      console.log(`increment value: ${incrementValue} for group/entry '${groupOrEntry.getAttribute('name')}'`);
      minMax.max += incrementValue;

      const incrementCondition = incrementElement.querySelector('condition');
      if (incrementCondition) {
        console.log('increment condition: ', incrementCondition);
      }
    }
  }

  return minMax ?? null;
};

/**
 * Parses a BattleScribe XML selectionEntry to our JSON format
 * @param {Element} rootEntry - The DOM element containing a selectionEntry element (the unit itself)
 * @returns {Object} Unit data in our JSON format
 */
export const parseBattleScribeUnit = (rootEntry) => {
  // Validate the root element
  if (!rootEntry || rootEntry.tagName !== 'selectionEntry' || !['unit', 'model'].includes(rootEntry.getAttribute('type'))) {
    throw new Error('Expected unit or model selectionEntry as root element');
  }

  const unitName = rootEntry.getAttribute('name');
  const result = {
    name: unitName,
    tags: [],
    unitOptions: {},
    stats: null,
    abilities: [],
    rules: [],
    weapons: []
  };

  // Extract tags from root entry's categoryLinks (skipping the "Faction:" category)
  const categoryLinks = rootEntry.querySelector("categoryLinks")?.querySelectorAll("categoryLink") ?? [];
  categoryLinks.forEach(link => {
    const name = link.getAttribute('name');
    if (name && !name.startsWith('Faction:')) {
      result.tags.push(name);
    }
  });

  // Extract unit size from constraints in selectionEntries / selectionEntryGroups
  // -- handles units with multiple sub-groups (e.g., 9 regular + 1 leader)
  const topLevelEntries = rootEntry.querySelector(':scope > selectionEntries')?.querySelectorAll(':scope > selectionEntry[type="model"]') ?? [];
  const topLevelGroups = rootEntry.querySelector(':scope > selectionEntryGroups')?.querySelectorAll(':scope > selectionEntryGroup') ?? [];
  // const modelsInGroups = Array.from(topLevelGroups).flatMap(group => Array.from(group.querySelectorAll(':scope > selectionEntry[type="model"]')));
  const objectsToProcess = [...topLevelEntries, ...topLevelGroups]; // , ...modelsInGroups];

  if (objectsToProcess.length > 0) {
    const groups = [];
    let totalModelCount = 0;

    objectsToProcess.forEach(groupOrEntry => {
      const groupName = groupOrEntry.getAttribute('name');
      
      // console.log('top-level group/entry: ', groupOrEntry);
      const minMax = findMinMaxConstraints(groupOrEntry);
      if (minMax) {
        // console.log('minMax: ', minMax);
        const groupData = { name: groupName, unitOptions: {} };

        // If min and max are the same, it's a fixed size
        if (minMax.min === minMax.max) {
          groupData.modelCount = minMax.min;
          totalModelCount += minMax.min;
        } else {
          groupData.unitSize = [minMax.min, minMax.max];
          totalModelCount += minMax.max - minMax.min + 1;
        }
        groups.push(groupData);
      } else {
        // console.warn(`no min/max constraints found for group/entry '${groupName}'`);
      }

      // TODO: Extract weapon options for this group
      // const weaponOptions = extractGroupWeaponOptions(group);
      // if (weaponOptions.length > 0) {
      //   groupData.weaponOptions = weaponOptions;
      // }
    });
    if (groups?.length) {
      const totalMin = groups.reduce((acc, g) => acc += g.modelCount ?? g.unitSize?.[0], 0);
      const totalMax = groups.reduce((acc, g) => acc += g.modelCount ?? g.unitSize?.[1], 0);
      // console.log(`Groups for ${unitName}:`, groups);
      // console.log('draft unitSize: ', [totalMin, totalMax]);
      if (totalMin === totalMax) {
        result.modelCount = totalMin;
      } else {
        result.unitOptions.unitSize = [totalMin, totalMax];
      }
    }

    // If we have groups, store them in unitOptions
    // if (groups.length > 0) {
    //   result.unitOptions.groups = groups;

    //   // If all groups have fixed sizes, set total modelCount
    //   if (totalModelCount > 0 && groups.every(g => g.modelCount !== undefined)) {
    //     result.modelCount = totalModelCount;
    //   }
    // }
    if (totalModelCount > 0 && result.modelCount && result.modelCount !== totalModelCount) {
      console.log(`totalModelCount for ${unitName} (${totalModelCount}) does not match result.modelCount: ${result.modelCount}`);
    }
  
  } else {
    console.warn(`inside the unitOptions fallback for ${unitName}`);
    // Fallback: Look for single group with "X - Y" pattern or numeric names
    // const unitSizeGroup = Array.from(rootEntry.querySelectorAll('selectionEntryGroup'))
    //   .find(group => {
    //     const name = group.getAttribute('name');
    //     return name && (/^\d+\s*-\s*\d+/.test(name) || /^\d+/.test(name));
    //   });

    // if (unitSizeGroup) {
    //   const constraints = unitSizeGroup.querySelectorAll('constraint');
    //   let min = null, max = null;
    //   constraints.forEach(constraint => {
    //     const type = constraint.getAttribute('type');
    //     const value = parseInt(constraint.getAttribute('value'), 10);
    //     if (type === 'min') min = value;
    //     if (type === 'max') max = value;
    //   });
    //   if (min !== null && max !== null) {
    //     // If min and max are the same, it's a fixed size - use modelCount
    //     if (min === max) {
    //       result.modelCount = min;
    //     } else {
    //       // Range - use unitOptions.unitSize
    //       result.unitOptions.unitSize = [min, max];
    //     }
    //   }
    // }
  }
  if (result.modelCount === undefined && result.unitOptions.unitSize === undefined) {
    // default to modelCount=1 if no constraint info exists for this unit
    result.modelCount = 1;
  }

  // Extract unit stats from Unit profile
  const unitProfile = Array.from(rootEntry.querySelectorAll('profile'))
    .find(profile => profile.getAttribute('typeName') === 'Unit');
  result.stats = extractUnitStats(unitProfile);

  // Extract abilities from Abilities profiles
  const abilityProfiles = Array.from(rootEntry.querySelectorAll('profile'))
    .filter(profile => profile.getAttribute('typeName') === 'Abilities');

  abilityProfiles.forEach(profile => {
    const name = profile.getAttribute('name');
    const descChar = profile.querySelector('characteristic[name="Description"]');
    if (descChar) {
      result.abilities.push({
        name: name,
        description: unescapeQuotes(descChar.textContent.trim())
      });
    }
  });

  // Extract rules from infoLinks (top level only)
  const infoLinks = Array.from(rootEntry.querySelector(":scope > infoLinks")?.children ?? []);
  infoLinks.forEach(link => {
    let ruleName = link.getAttribute('name');
    // Check for modifiers that append to the name (like "Scouts 9"")
    const modifier = link.querySelector('modifier[type="append"]');
    if (modifier) {
      const appendValue = modifier.getAttribute('value');
      ruleName = `${ruleName} ${unescapeQuotes(appendValue)}`;
    }
    if (ruleName) {
      result.rules.push(ruleName);
    }
  });

  // TODO: extract weapon profiles

  return result;
};

const enhancementFromBSEntry = (entry) => {
  const name = entry.getAttribute("name");
  const points = entry.querySelector('costs > cost[name="pts"]')?.getAttribute("value") ?? 0;
  const description = unescapeQuotes(entry.querySelector('characteristic[name="Description"]')?.textContent.trim() ?? '');
  let tags = []; // TODO
  return {
    name,
    points,
    description,
    tags
  };
};

/**
 * Parses a BattleScribe catalogue XML and extracts all unit entries
 * @param {string} xmlString - The XML string containing a catalogue element
 * @returns {Object} Object containing the faction name and an array of parsed unit data objects
 */
export const parseBattleScribeCatalogue = (xmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'text/xml');

  // Check for parsing errors
  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    throw new Error(`XML parsing error: ${parserError.textContent}`);
  }

  // Find the catalogue root element
  const catalogue = doc.documentElement;
  if (!catalogue || catalogue.tagName !== 'catalogue') {
    throw new Error('Expected catalogue as root element');
  }

  let factionName = catalogue.getAttribute('name')?.split(' - ')[1] ?? null;
  if (!factionName) {
    factionName = catalogue.querySelector("categoryLink[name~='Faction:']")
      ?.getAttribute('name')
      ?.split('Faction: ')[1] ?? null;
  }
  if (!factionName) {
    throw new Error('Faction name not found');
  }

  // Find sharedSelectionEntries section (top-level only)
  const sharedSelectionEntries = catalogue.querySelector(':scope > sharedSelectionEntries');
  if (!sharedSelectionEntries) {
    // No shared entries found, return empty array
    return {
      faction: factionName,
      units: []
    };
  }

  // Find all unit-type selectionEntry elements
  // Handle XML namespaces - querySelector should work, but we can also use getElementsByTagName
  const unitEntries = Array.from(sharedSelectionEntries.querySelectorAll(':scope > selectionEntry'))
    .filter(entry => ['unit', 'model'].includes(entry.getAttribute('type')));

  // Parse each unit entry
  const units = [];
  unitEntries.forEach(unitEntry => {
    try {
      // Pass the DOM element directly - no need to serialize and re-parse
      const parsedUnit = parseBattleScribeUnit(unitEntry);
      units.push(parsedUnit);
    } catch (error) {
      // Log error but continue processing other units
      console.warn(`Failed to parse unit "${unitEntry.getAttribute('name')}":`, error);
    }
  });

  // get detachments/enhancements

  // "detachments": [
  //   {
  //     "name": "Berzerker Warband",
  //     "enhancements": [
  //       { name: "Battle-lust", tags: ["World Eaters"] },
  //       { name: "Berzerker Glaive", tags: ["World Eaters"] },
  //       { name: "Favoured of Khorne", tags: ["World Eaters"] },
  //       { name: "Helm of Brazen Ire", tags: ["World Eaters"] },
  //     ],
  //   },
  // ]

  const enhancementsGroup = catalogue.querySelector("selectionEntryGroup[name='Enhancements']");
  const enhancements = {};
  // if the enhancementGroup has subgroups, those are the detachments and this will be fairly easy.
  const detachmentGroups = enhancementsGroup?.querySelectorAll("selectionEntryGroup");
  if (detachmentGroups?.length > 0) {
    detachmentGroups.forEach(detachmentGroup => {
      let detachmentName = detachmentGroup.getAttribute("name");
      if (detachmentName.includes(' Enhancements')) {
        detachmentName = detachmentName.replace(' Enhancements', '');
      }
      if (!detachmentName) {
        // something truly funky about the data if there's a subgroup without a name
        detachmentName = 'Unknown Detachment';
      }
      enhancements[detachmentName] = Array.from(detachmentGroup.querySelectorAll("selectionEntry")).map(entry => {
        return enhancementFromBSEntry(entry);
      });
    });
  } else {
    // if it doesn't, we have to fund other means of digging it out of the selectionEntry objects themselves
    Array.from(enhancementsGroup?.querySelectorAll("selectionEntry") ?? []).forEach(entry => {
      const enhancement = enhancementFromBSEntry(entry);

      // right now detachment name is in a comment in the data files I'm looking at; if it's NOT there,
      let detachmentName = entry.querySelector("comment")?.textContent.trim();
      if (!detachmentName) {
        // if it's not in the comment, the "real" way to find this info is via a lookup based on a
        // complicated modifier condition; I'll only dig into this if we absolutely have to.
        detachmentName = 'Unknown Detachment';
      }

      // add this detachment to the enhancements map if it's not there yet
      if (!enhancements[detachmentName]) {
        enhancements[detachmentName] = [];
      }

      enhancements[detachmentName].push(enhancement);
    });
  }

  return {
    faction: factionName,
    units,
    enhancements
  };
};

