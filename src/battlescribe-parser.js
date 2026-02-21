/**
 * Converts XML entity-encoded quotes to double prime character
 */
const unescapeQuotes = str => {
  // console.log(`Escaping quotes; raw string: ${str}`);
  return str.replace(/&quot;/g, '″').replace(/\"/g, '″');
};

/**
 * Parses a numeric value, returning number if numeric, string otherwise
 */
const parseNumeric = str => {
  const num = Number(str);
  return isNaN(num) ? str : num;
};

/**
 * Extracts unit stats from a Unit profile
 */
const extractUnitStats = unitProfile => {
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
    parseNumeric(stats.OC || 0),
  ];
};

/**
 * Extracts weapon stats from a Ranged Weapons or Melee Weapons profile.
 * Ranged: Range, A, BS, S, AP, D. Melee: Range (Melee), A, WS, S, AP, D.
 * Returns array: [Range, A, BS_or_WS, S, AP, D]
 */
const extractWeaponStats = weaponProfile => {
  if (!weaponProfile) return null;
  const characteristics = weaponProfile.querySelector('characteristics');
  if (!characteristics) return null;

  const stats = {};
  characteristics.querySelectorAll('characteristic').forEach(char => {
    const name = char.getAttribute('name');
    const value = unescapeQuotes(char.textContent.trim());
    stats[name] = value;
  });

  // Ranged uses BS, Melee uses WS
  const toHit = stats.BS || stats.WS || '';
  const profile = [
    parseNumeric(stats.A || 0),
    toHit,
    parseNumeric(stats.S || 0),
    parseNumeric(stats.AP || 0),
    parseNumeric(stats.D || 0),
  ];
  if (stats.Range && stats.Range !== 'Melee') {
    profile.unshift(unescapeQuotes(stats.Range));
  }
  return profile;
};

/**
 * Extracts keywords from weapon profile characteristics
 */
const extractWeaponKeywords = weaponProfile => {
  if (!weaponProfile) return [];
  const characteristics = weaponProfile.querySelector('characteristics');
  if (!characteristics) return [];

  const keywordsChar = Array.from(characteristics.querySelectorAll('characteristic')).find(
    char => char.getAttribute('name') === 'Keywords'
  );

  if (!keywordsChar) return [];

  const raw = keywordsChar.textContent.trim();
  if (!raw || raw === '-') return [];

  // Keywords are comma-separated (e.g. "Ignores Cover, Torrent", "Lethal Hits, Rapid Fire 2")
  return raw
    .split(/,\s*/)
    .map(k => k.trim())
    .filter(k => k.length > 0);
};

/**
 * Gets max constraint value from a selectionEntry
 */
const getMaxConstraint = entry => {
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
// eslint-disable-next-line no-unused-vars
const extractGroupWeaponOptions = group => {
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
            keywords: extractWeaponKeywords(weaponProfile),
          },
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
                weapons: weapons,
              },
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
              keywords: extractWeaponKeywords(weaponProfile),
            },
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
                  weapons: weapons,
                },
              });
            }
          }
        }
      });
    }
  });

  return weaponOptions;
};

const extractMinMaxFromConstraints = constraintsElement => {
  if (constraintsElement.children.length === 2) {
    const constraints = Array.from(constraintsElement.children);
    const minConstraint = constraints.find(el => el.getAttribute('type') === 'min');
    const maxConstraint = constraints.find(el => el.getAttribute('type') === 'max');
    if (minConstraint && maxConstraint) {
      return {
        min: parseInt(minConstraint.getAttribute('value'), 10),
        max: parseInt(maxConstraint.getAttribute('value'), 10),
      };
    }
  }
  // console.warn(`provided <constraints> element is not a min/max pair:`, constraintsElement);
  return null;
};

const findMinMaxConstraints = groupOrEntry => {
  // console.log(`finding min/max constraints for '${groupOrEntry.getAttribute('name')}'`);
  let incrementElement = null;
  let minMax = null;
  const topLevelConstraints = groupOrEntry.querySelector(':scope > constraints');

  if (topLevelConstraints) {
    // is this a min/max constraint pair? if not keep looking
    minMax = extractMinMaxFromConstraints(topLevelConstraints);
    incrementElement = groupOrEntry.querySelector(
      ':scope > modifiers > modifier[type="increment"]'
    );
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
      console.log(
        `increment value: ${incrementValue} for group/entry '${groupOrEntry.getAttribute('name')}'`
      );
      minMax.max += incrementValue;

      const incrementCondition = incrementElement.querySelector('condition');
      if (incrementCondition) {
        console.log('increment condition: ', incrementCondition);
      }
    }
  }

  return minMax ?? null;
};

/** Names to skip when extracting wargear (Crusade/weapon mods) */
const WARGEAR_SKIP_NAMES = new Set(['Weapon Modifications', 'Crusade Relic Upgrades']);

/** Sub-group names that contain weapon choices, not wargear abilities */
const WEAPON_SUBGROUP_NAMES = new Set([
  'Weapon',
  'Weapons',
  'Melee weapon',
  'Main weapon',
  'Weapon Upgrades',
]);

/**
 * Checks if a selectionEntry or its target (for entryLink) has an Abilities profile (wargear, not weapon)
 */
const hasAbilitiesProfile = (entryOrLink, doc) => {
  let el = entryOrLink;
  if (entryOrLink.tagName === 'entryLink') {
    const targetId = entryOrLink.getAttribute('targetId');
    if (!targetId) return false;
    el = doc.querySelector(`[id="${targetId}"]`);
    if (!el) return false;
  }
  const profiles = el.querySelectorAll?.('profile') ?? [];
  for (const p of profiles) {
    const typeName = p.getAttribute('typeName');
    if (typeName === 'Abilities') return true;
    if (typeName === 'Ranged Weapons' || typeName === 'Melee Weapons') return false;
  }
  return false;
};

/**
 * Gets the display name for an entry or entryLink
 */
const getEntryName = (entryOrLink, doc) => {
  const name = entryOrLink.getAttribute('name');
  if (name) return unescapeQuotes(name);
  if (entryOrLink.tagName === 'entryLink') {
    const target = doc.querySelector(`[id="${entryOrLink.getAttribute('targetId')}"]`);
    return target?.getAttribute('name') ? unescapeQuotes(target.getAttribute('name')) : null;
  }
  return null;
};

/**
 * Gets min/max constraints from an element's constraints block
 */
const getConstraints = el => {
  const constraints = el.querySelector(':scope > constraints');
  if (!constraints) return { min: null, max: null };
  let min = null;
  let max = null;
  constraints.querySelectorAll('constraint').forEach(c => {
    const type = c.getAttribute('type');
    const val = parseInt(c.getAttribute('value'), 10);
    if (type === 'min') min = val;
    if (type === 'max') max = val;
  });
  return { min, max };
};

/**
 * Extracts wargear options from a Wargear selectionEntryGroup's sub-group (e.g. Crest, optional items)
 */
const extractWargearFromSubGroup = (subGroup, doc) => {
  const { min, max } = getConstraints(subGroup);
  const isRequired = min === 1 && max === 1;
  const isOptional = (min === 0 || min === null) && max === 1;

  const defaultIdAttr = subGroup.getAttribute('defaultSelectionEntryId');

  const collectEntries = () => {
    const entries = [];
    subGroup.querySelectorAll('entryLink[type="selectionEntry"]').forEach(link => {
      const linkId = link.getAttribute('id');
      const targetId = link.getAttribute('targetId');
      const isDefault = defaultIdAttr && (linkId === defaultIdAttr || targetId === defaultIdAttr);
      entries.push({ el: link, isDefault });
    });
    subGroup
      .querySelectorAll(':scope > selectionEntries > selectionEntry[type="upgrade"]')
      .forEach(entry => {
        const entryId = entry.getAttribute('id');
        const isDefault = defaultIdAttr && entryId === defaultIdAttr;
        entries.push({ el: entry, isDefault });
      });
    return entries;
  };

  const baseWargear = [];
  const wargearOptions = [];
  let defaultName = null;

  const entries = collectEntries();

  // Process defaults first to establish base
  entries
    .filter(e => e.isDefault)
    .forEach(({ el }) => {
      const name = getEntryName(el, doc);
      if (!name || WARGEAR_SKIP_NAMES.has(name)) return;
      if (!hasAbilitiesProfile(el, doc)) return;
      if (isRequired) {
        baseWargear.push({ name });
        defaultName = name;
      } else if (isOptional) {
        wargearOptions.push({ name, max: 1 });
      }
    });

  // Process non-defaults as options
  entries
    .filter(e => !e.isDefault)
    .forEach(({ el }) => {
      const name = getEntryName(el, doc);
      if (!name || WARGEAR_SKIP_NAMES.has(name)) return;
      if (!hasAbilitiesProfile(el, doc)) return;
      if (isRequired && defaultName) {
        wargearOptions.push({ name, replaces: defaultName });
      } else if (isRequired) {
        wargearOptions.push({ name });
      } else if (isOptional) {
        wargearOptions.push({ name, max: 1 });
      }
    });

  return { baseWargear, wargearOptions };
};

/**
 * Extracts wargear and wargear options from a unit's Wargear selectionEntryGroups
 */
const extractWargearFromUnit = rootEntry => {
  const doc = rootEntry.ownerDocument;
  const baseWargear = [];
  const wargearOptions = [];
  const seenOptions = new Set();

  const addOption = opt => {
    const key = typeof opt.name === 'string' ? opt.name : (opt.name?.join?.('|') ?? '');
    if (seenOptions.has(key)) return;
    seenOptions.add(key);
    wargearOptions.push(opt);
  };

  const wargearGroups = rootEntry.querySelectorAll('selectionEntryGroup[name="Wargear"]');

  wargearGroups.forEach(wg => {
    // Process sub-groups (Crest, optional items, etc.) - skip weapon-named subgroups
    wg.querySelectorAll(':scope > selectionEntryGroups > selectionEntryGroup').forEach(sub => {
      const subName = sub.getAttribute('name') ?? '';
      if (WEAPON_SUBGROUP_NAMES.has(subName)) return;

      const { baseWargear: bw, wargearOptions: wo } = extractWargearFromSubGroup(sub, doc);
      bw.forEach(w => baseWargear.push(w));
      wo.forEach(addOption);
    });

    // Direct entryLinks under Wargear (no subgroup)
    wg.querySelectorAll(':scope > entryLinks > entryLink[type="selectionEntry"]').forEach(link => {
      const name = getEntryName(link, doc);
      if (!name || WARGEAR_SKIP_NAMES.has(name)) return;
      if (!hasAbilitiesProfile(link, doc)) return;

      const { min, max } = getConstraints(link);
      if ((min === 0 || min === null) && max === 1) {
        addOption({ name, max: 1 });
      } else if (min === 1 && max === 1) {
        baseWargear.push({ name });
      }
    });

    // Direct selectionEntries under Wargear
    wg.querySelectorAll(':scope > selectionEntries > selectionEntry[type="upgrade"]').forEach(
      entry => {
        const name = getEntryName(entry, doc);
        if (!name || WARGEAR_SKIP_NAMES.has(name)) return;
        if (!hasAbilitiesProfile(entry, doc)) return;

        const { min, max } = getConstraints(entry);
        if ((min === 0 || min === null) && max === 1) {
          addOption({ name, max: 1 });
        } else if (min === 1 && max === 1) {
          baseWargear.push({ name });
        }
      }
    );
  });

  return { baseWargear, wargearOptions };
};

/**
 * Parses a BattleScribe XML selectionEntry to our JSON format
 * @param {Element} rootEntry - The DOM element containing a selectionEntry element (the unit itself)
 * @returns {Object} Unit data in our JSON format
 */
export const parseBattleScribeUnit = rootEntry => {
  // Validate the root element
  if (
    !rootEntry ||
    rootEntry.tagName !== 'selectionEntry' ||
    !['unit', 'model'].includes(rootEntry.getAttribute('type'))
  ) {
    throw new Error('Expected unit or model selectionEntry as root element');
  }

  const unitName = rootEntry.getAttribute('name');
  const result = {
    name: unitName,
    tags: [],
    unitOptions: {},
    stats: null,
    abilities: [],
    weapons: [],
    wargear: [],
  };

  // Extract tags from root entry's categoryLinks (skipping the "Faction:" category)
  const categoryLinks =
    rootEntry.querySelector('categoryLinks')?.querySelectorAll('categoryLink') ?? [];
  categoryLinks.forEach(link => {
    const name = link.getAttribute('name');
    if (name && !name.startsWith('Faction:')) {
      result.tags.push(name);
    }
  });

  // Extract unit size from constraints in selectionEntries / selectionEntryGroups
  // -- handles units with multiple sub-groups (e.g., 9 regular + 1 leader)
  const topLevelEntries =
    rootEntry
      .querySelector(':scope > selectionEntries')
      ?.querySelectorAll(':scope > selectionEntry[type="model"]') ?? [];
  const topLevelGroups =
    rootEntry
      .querySelector(':scope > selectionEntryGroups')
      ?.querySelectorAll(':scope > selectionEntryGroup') ?? [];
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
      const totalMin = groups.reduce((acc, g) => (acc += g.modelCount ?? g.unitSize?.[0]), 0);
      const totalMax = groups.reduce((acc, g) => (acc += g.modelCount ?? g.unitSize?.[1]), 0);
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
      console.log(
        `totalModelCount for ${unitName} (${totalModelCount}) does not match result.modelCount: ${result.modelCount}`
      );
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
  const unitProfile = Array.from(rootEntry.querySelectorAll('profile')).find(
    profile => profile.getAttribute('typeName') === 'Unit'
  );
  result.stats = extractUnitStats(unitProfile);

  // Extract abilities from Abilities profiles
  const abilityProfiles = Array.from(rootEntry.querySelectorAll('profile')).filter(
    profile => profile.getAttribute('typeName') === 'Abilities'
  );

  abilityProfiles.forEach(profile => {
    const name = profile.getAttribute('name');
    const descChar = profile.querySelector('characteristic[name="Description"]');
    if (descChar) {
      result.abilities.push({
        name: name,
        description: unescapeQuotes(descChar.textContent.trim()),
      });
    }
  });

  // Extract rules from infoLinks (top level only)
  const infoLinks = Array.from(rootEntry.querySelector(':scope > infoLinks')?.children ?? []);
  infoLinks.forEach(link => {
    let ruleName = link.getAttribute('name');
    // Check for modifiers that append to the name (like "Scouts 9"")
    const modifier = link.querySelector('modifier[type="append"]');
    if (modifier) {
      const appendValue = modifier.getAttribute('value');
      ruleName = `${ruleName} ${unescapeQuotes(appendValue)}`;
    }
    if (ruleName) {
      result.abilities.push({
        name: ruleName,
        type: 'Core',
      });
    }
  });

  // Extract weapon profiles (Ranged Weapons and Melee Weapons) from root entry and nested selectionEntries
  const weaponProfileTypes = ['Ranged Weapons', 'Melee Weapons'];
  const addedWeapons = new Set(); // avoid duplicates from both inline profiles and entryLinks

  const addWeapon = (profile, nameOverride = null) => {
    const weaponName = nameOverride ?? profile.getAttribute('name');
    if (!weaponName) return;
    const typeName = profile.getAttribute('typeName');
    const type = typeName === 'Ranged Weapons' ? 'Ranged' : 'Melee';
    const key = `${weaponName}|${type}`;
    if (addedWeapons.has(key)) return;
    addedWeapons.add(key);
    result.weapons.push({
      name: weaponName,
      type,
      profile: extractWeaponStats(profile),
      keywords: extractWeaponKeywords(profile),
    });
  };

  // 1. Inline profiles: profiles directly under selectionEntries
  const weaponProfiles = Array.from(rootEntry.querySelectorAll('profile')).filter(p =>
    weaponProfileTypes.includes(p.getAttribute('typeName') ?? '')
  );
  weaponProfiles.forEach(profile => addWeapon(profile));

  // 2. entryLinks: Votann and others reference weapons by targetId; profiles live in the target
  const doc = rootEntry.ownerDocument;
  const entryLinks = rootEntry.querySelectorAll('entryLink[type="selectionEntry"][targetId]');
  entryLinks.forEach(link => {
    const targetId = link.getAttribute('targetId');
    const linkName = link.getAttribute('name');
    if (!targetId || linkName === 'Weapon Modifications') return;
    const target = doc.querySelector(`[id="${targetId}"]`);
    if (!target) return;
    const targetProfiles = Array.from(target.querySelectorAll('profile')).filter(p =>
      weaponProfileTypes.includes(p.getAttribute('typeName') ?? '')
    );
    targetProfiles.forEach(profile => addWeapon(profile, linkName));
  });

  // Extract wargear and wargear options from Wargear selectionEntryGroups
  const { baseWargear, wargearOptions } = extractWargearFromUnit(rootEntry);
  if (baseWargear.length > 0) {
    result.wargear = baseWargear;
  }
  if (wargearOptions.length > 0) {
    result.unitOptions.wargear = wargearOptions;
  }

  return result;
};

const enhancementFromBSEntry = entry => {
  const name = entry.getAttribute('name');
  const points = entry.querySelector('costs > cost[name="pts"]')?.getAttribute('value') ?? 0;
  const description = unescapeQuotes(
    entry.querySelector('characteristic[name="Description"]')?.textContent.trim() ?? ''
  );
  const tags = []; // TODO
  return {
    name,
    points,
    description,
    tags,
  };
};

/**
 * Parses a BattleScribe catalogue XML and extracts all unit entries
 * @param {string} xmlString - The XML string containing a catalogue element
 * @returns {Object} Object containing the faction name and an array of parsed unit data objects
 */
export const parseBattleScribeCatalogue = xmlString => {
  const parser = new window.DOMParser();
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
    factionName =
      catalogue
        .querySelector("categoryLink[name~='Faction:']")
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
      units: [],
    };
  }

  // shared upgrade entries (i.e. usually wargear / weapons)
  const sharedUpgrades = [];
  const sharedUpgradeEntries = Array.from(
    sharedSelectionEntries.querySelectorAll(':scope > selectionEntry[type="upgrade"]')
  );
  sharedUpgradeEntries.forEach(entry => {
    const name = entry.getAttribute('name');
    const description = unescapeQuotes(
      entry.querySelector('characteristic[name="Description"]')?.textContent.trim() ?? ''
    );
    if (name && description) {
      sharedUpgrades.push({
        name,
        description,
      });
    } else {
      // console.warn(`shared upgrade entry '${name}' has no name or description`);
      // console.log('entry: ', entry);
    }
  });

  // Find all unit-type selectionEntry elements
  // Handle XML namespaces - querySelector should work, but we can also use getElementsByTagName
  const unitEntries = Array.from(
    sharedSelectionEntries.querySelectorAll(':scope > selectionEntry')
  ).filter(entry => ['unit', 'model'].includes(entry.getAttribute('type')));

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
  const enhancementsGroup = catalogue.querySelector("selectionEntryGroup[name='Enhancements']");
  const enhancements = {};
  // if the enhancementGroup has subgroups, those are the detachments and this will be fairly easy.
  const detachmentGroups = enhancementsGroup?.querySelectorAll('selectionEntryGroup');
  if (detachmentGroups?.length > 0) {
    detachmentGroups.forEach(detachmentGroup => {
      let detachmentName = detachmentGroup.getAttribute('name');
      if (detachmentName.includes(' Enhancements')) {
        detachmentName = detachmentName.replace(' Enhancements', '');
      }
      if (!detachmentName) {
        // something truly funky about the data if there's a subgroup without a name
        detachmentName = 'Unknown Detachment';
      }
      enhancements[detachmentName] = Array.from(
        detachmentGroup.querySelectorAll('selectionEntry')
      ).map(entry => {
        return enhancementFromBSEntry(entry);
      });
    });
  } else {
    // if it doesn't, we have to fund other means of digging it out of the selectionEntry objects themselves
    Array.from(enhancementsGroup?.querySelectorAll('selectionEntry') ?? []).forEach(entry => {
      // console.log('selectionEntry: ', entry);
      const enhancement = enhancementFromBSEntry(entry);

      // right now detachment name is in a comment in the data files I'm looking at; if it's NOT there,
      let detachmentName = entry.querySelector('comment')?.textContent.trim();
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
    enhancements,
    sharedUpgrades,
  };
};
