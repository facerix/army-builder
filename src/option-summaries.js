// Helper function to find and remove items that match replaces array
const findAndRemoveReplacedItems = (actualItems, replaces) => {
  if (Array.isArray(replaces)) {
    // Check if first element is "&" (AND) or "|" (OR)
    const isAnd = replaces[0] === '&';
    const isOr = replaces[0] === '|';
    // Get actual item names (skip first element if it's "&" or "|")
    const itemNames = isAnd || isOr ? replaces.slice(1) : replaces;

    if (isAnd) {
      // AND logic: all items must be found
      const itemsToRemove = [];
      for (const replaceName of itemNames) {
        const found = actualItems.find(w => w.name === replaceName);
        if (!found) {
          // If any item is missing, return empty array (can't replace)
          return [];
        }
        if (!itemsToRemove.includes(found)) {
          itemsToRemove.push(found);
        }
      }
      return itemsToRemove;
    } else {
      // OR logic (default): find all items that match any name in the replaces array
      const itemsToRemove = [];
      itemNames.forEach(replaceName => {
        // Find ALL items with this name, not just the first one
        const foundItems = actualItems.filter(w => w.name === replaceName);
        foundItems.forEach(found => {
          if (!itemsToRemove.includes(found)) {
            itemsToRemove.push(found);
          }
        });
      });
      return itemsToRemove;
    }
  } else {
    // Single string replaces - find one item
    const found = actualItems.find(w => w.name === replaces);
    return found ? [found] : [];
  }
};

// Helper: Check if an option is selected
const isOptionSelected = opt => {
  if (
    opt.selected === false ||
    opt.selected === undefined ||
    opt.selected === 'off' ||
    opt.selected === 0
  ) {
    return false;
  }
  if (Array.isArray(opt.selected) && opt.selected.length === 0) {
    return false;
  }
  return true;
};

// Helper: Find full option definition from definitions array
const findFullOptionDefinition = (opt, fullOptionDefinitions) => {
  if (!fullOptionDefinitions) return opt;

  return (
    fullOptionDefinitions.find(full => {
      if (Array.isArray(full.name)) {
        if (Array.isArray(opt.name)) {
          return (
            full.name.length === opt.name.length &&
            full.name.every((val, idx) => val === opt.name[idx])
          );
        }
        return false;
      }
      return full.name === opt.name;
    }) || opt
  );
};

// Helper: Remove items from actualItems by count (for per-based replacements)
const removeItemsByCount = (actualItems, itemsToRemove, countToRemove) => {
  let remainingToRemove = countToRemove;
  const targetNames = [...new Set(itemsToRemove.map(item => item.name))];

  for (const targetName of targetNames) {
    if (remainingToRemove <= 0) break;

    const matchingItems = actualItems.filter(item => item.name === targetName);

    for (const item of matchingItems) {
      if (remainingToRemove <= 0) break;

      const itemIndex = actualItems.indexOf(item);
      if (itemIndex === -1) continue;

      if (item.count <= remainingToRemove) {
        actualItems.splice(itemIndex, 1);
        remainingToRemove -= item.count;
      } else {
        item.count -= remainingToRemove;
        remainingToRemove = 0;
      }
    }
  }
};

// Helper: Remove all matching items and return total count removed
const removeAllMatchingItems = (actualItems, itemsToRemove) => {
  const totalCount = itemsToRemove.reduce((sum, item) => sum + (item.count || 0), 0);
  itemsToRemove.forEach(item => {
    const index = actualItems.indexOf(item);
    if (index !== -1) actualItems.splice(index, 1);
  });
  return totalCount;
};

// Helper: Add upgrade with optional replacement handling
const addUpgrade = (actualItems, upgrade, replaces, countStrategy = 'full') => {
  if (!replaces) {
    actualItems.push(upgrade);
    return;
  }

  const itemsToRemove = findAndRemoveReplacedItems(actualItems, replaces);
  if (itemsToRemove.length === 0) {
    actualItems.push(upgrade);
    return;
  }

  if (countStrategy === 'per' && typeof upgrade.count === 'number') {
    // Per-based: remove only the specified count
    removeItemsByCount(actualItems, itemsToRemove, upgrade.count);
    actualItems.push(upgrade);
  } else {
    // Full replacement: remove all matching items
    const totalReplaceCount = removeAllMatchingItems(actualItems, itemsToRemove);
    // Use replacement count if available, otherwise use total count of replaced items
    // BUT: if a single weapon replaces multiple weapons, use the upgrade's count (not the sum)
    let finalCount;
    if (countStrategy === 'useReplaced') {
      // When replacing multiple items with a single item, use the upgrade's count
      // Otherwise, use the total replaced count to preserve the original count
      if (itemsToRemove.length > 1 && upgrade.count !== undefined) {
        // Single weapon replacing multiple weapons - use upgrade count
        finalCount = upgrade.count;
      } else {
        // Single replacement or count preservation - use replaced count
        finalCount = totalReplaceCount > 0 ? totalReplaceCount : upgrade.count;
      }
    } else {
      finalCount = upgrade.count;
    }
    actualItems.push({ ...upgrade, count: finalCount });
  }
};

// Handler: Per-based options (selected is an integer count)
const handlePerBasedOption = (opt, fullOpt, actualItems, unitSize) => {
  if (typeof opt.name !== 'string' || !fullOpt.per || typeof opt.selected !== 'number') {
    return false;
  }

  const upgrade = { ...opt, count: opt.selected, selected: opt.name };
  addUpgrade(actualItems, upgrade, opt.replaces, 'per');
  return true;
};

// Handler: SelectionType "all" (selected is the option name string)
const handleSelectionTypeAll = (opt, fullOpt, actualItems, unitSize) => {
  const isAll = fullOpt.selectionType === 'all' || opt.selectionType === 'all';
  if (!isAll || !Array.isArray(opt.name) || typeof opt.selected !== 'string') {
    return false;
  }

  if (!opt.name.includes(opt.selected)) {
    return false;
  }

  const upgrade = {
    name: opt.selected,
    count: unitSize,
    selected: opt.selected,
  };
  addUpgrade(actualItems, upgrade, opt.replaces, 'useReplaced');
  return true;
};

// Handler: SelectionType "any" - string selection (radio button)
const handleSelectionTypeAnyString = (opt, actualItems, unitSize) => {
  if (typeof opt.selected !== 'string' || opt.selected === 'off' || opt.selected === false) {
    return false;
  }

  if (!opt.name.includes(opt.selected)) {
    return false;
  }

  const upgrade = {
    name: opt.selected,
    count: unitSize,
    selected: opt.selected,
  };
  addUpgrade(actualItems, upgrade, opt.replaces, 'useReplaced');
  return true;
};

// Handler: SelectionType "any" - array selection (checkboxes)
const handleSelectionTypeAnyArray = (opt, actualItems, unitSize) => {
  if (!Array.isArray(opt.selected)) {
    return false;
  }

  // Count occurrences of each option name
  const counts = {};
  opt.selected.forEach(selectedValue => {
    counts[selectedValue] = (counts[selectedValue] || 0) + 1;
  });

  // Create one upgrade item per unique option name with its count
  Object.entries(counts).forEach(([selectedValue, count]) => {
    const upgrade = { ...opt, count, selected: selectedValue };
    const itemsToRemove = opt.replaces ? findAndRemoveReplacedItems(actualItems, opt.replaces) : [];

    if (itemsToRemove.length > 0) {
      const totalReplaceCount = removeAllMatchingItems(actualItems, itemsToRemove);
      actualItems.push({
        ...upgrade,
        count: Math.min(totalReplaceCount, count),
      });
    } else {
      actualItems.push(upgrade);
    }
  });

  return true;
};

// Handler: Generic array selections
const handleGenericArraySelection = (opt, actualItems, unitSize) => {
  const selectedValues = Array.isArray(opt.selected) ? opt.selected : [opt.selected];

  selectedValues.forEach(selectedValue => {
    const isMultiSelectOption = Array.isArray(opt.name) && opt.max > 1;
    const defaultCount = isMultiSelectOption ? 1 : opt.max || unitSize;
    const upgrade = { ...opt, count: defaultCount, selected: selectedValue };
    addUpgrade(actualItems, upgrade, opt.replaces, 'useReplaced');
  });
};

// Helper: Build summary string from item
const buildSummary = (item, unitSize) => {
  const count = item.count || unitSize;
  const shouldPrefixMax1 = unitSize > 1 && item.max === 1 && count === 1;
  const countStr = count > 1 || shouldPrefixMax1 ? `${count}x ` : '';

  let itemName;
  if (Array.isArray(item.name)) {
    if (
      item.selected !== undefined &&
      item.selected !== false &&
      typeof item.selected === 'string'
    ) {
      itemName = item.selected;
    } else if (
      typeof item.selected === 'number' &&
      item.selected >= 0 &&
      item.selected < item.name.length
    ) {
      itemName = item.name[item.selected];
    } else {
      itemName = item.name[0] || item.name.join(', ');
    }
  } else {
    itemName = item.name;
  }

  // Ensure itemName is a string
  if (Array.isArray(itemName)) {
    itemName = itemName[0] || itemName.join(', ');
  }
  if (!itemName || itemName === 'null' || itemName === 'undefined') {
    itemName = Array.isArray(item.name)
      ? item.name[0] || 'Unknown'
      : String(item.name || 'Unknown');
  }

  return `${countStr}${itemName}`;
};

export const getOptionSummaries = (
  defaultItems,
  itemOptions,
  unitSize,
  fullOptionDefinitions = null
) => {
  const actualItems = [...defaultItems].map(w => ({ ...w, count: w.count || unitSize }));

  itemOptions?.forEach(opt => {
    if (!isOptionSelected(opt)) {
      return;
    }

    const fullOpt = findFullOptionDefinition(opt, fullOptionDefinitions);

    // Try handlers in order - each returns true if it handled the option
    if (handlePerBasedOption(opt, fullOpt, actualItems, unitSize)) return;
    if (handleSelectionTypeAll(opt, fullOpt, actualItems, unitSize)) return;

    if (fullOpt.selectionType === 'any') {
      if (handleSelectionTypeAnyString(opt, actualItems, unitSize)) return;
      if (handleSelectionTypeAnyArray(opt, actualItems, unitSize)) return;
      return;
    }

    handleGenericArraySelection(opt, actualItems, unitSize);
  });

  return actualItems.map(item => buildSummary(item, unitSize));
};
