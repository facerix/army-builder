# TODO Analysis - Ranked by Implementation Complexity

## Summary
Found **26 TODO items** across the codebase. Ranked from simplest to most complex.

---

## 🟢 LOW COMPLEXITY (1-2 hours)

### 1. **Calculate Total Points** 
**Location:** `aos/list/aos-list.js:19`
```javascript
const getTotalPoints = (list) => {
  // TODO
  return 0;
}
```
**Complexity:** ⭐ Very Low  
**Effort:** ~30 minutes  
**Description:** Implement point calculation for AOS army lists. The function already has access to `regimentsSection.points` and `auxiliaryUnitsSection.points` (see line 79), so this is likely just summing those values or iterating through units.

**Implementation Notes:**
- Similar pattern exists in 40k list (check `40k/list/40k-list.js`)
- Points are already tracked in section components
- Likely just needs to sum up points from all sections

---

### 2. **Unit Options Handler (AOS)**
**Location:** `components/AOSSection.js:199`
```javascript
case "options":
  console.log("TODO... unit options");
  break;
```
**Complexity:** ⭐ Low  
**Effort:** ~1-2 hours  
**Description:** Implement unit options modal/functionality for AOS units. This likely mirrors the functionality in `CategorySection.js` which already has options handling.

**Implementation Notes:**
- `CategorySection.js` already has options modal implementation
- Can likely reuse existing `OptionsModal` component
- Need to wire up event handler to show modal

---

### 3. **Extract Tags from BattleScribe Entries**
**Location:** `src/battlescribe-parser.js:453`
```javascript
let tags = []; // TODO
```
**Complexity:** ⭐ Low  
**Effort:** ~1-2 hours  
**Description:** Extract tags from BattleScribe XML entries for enhancements. Need to understand BattleScribe XML structure to find where tags are stored.

**Implementation Notes:**
- Need to examine BattleScribe XML structure
- Tags might be in `<categoryLinks>`, `<modifiers>`, or similar elements
- Check existing parser code for similar patterns

---

## 🟡 MEDIUM COMPLEXITY (2-8 hours)

### 4. **Tag Negation Support**
**Location:** `40k/40k-army-data.js:351`
```javascript
// TODO: add support for tag-negation when looking for enhancement options
{ "name": "Cognitive Reinforcement", "tags": ["!Cybernetica Datasmith"] },
```
**Complexity:** ⭐⭐ Medium  
**Effort:** ~2-4 hours  
**Description:** Support negation syntax (`!tag`) in enhancement tags. Currently, tag matching uses `o.tags.some(t => unit.tags.includes(t))` which doesn't handle negation.

**Implementation Notes:**
- Modify `optionsForUnit` function in `CategorySection.js:186`
- Need to parse tags starting with `!` as exclusions
- Logic: enhancement available if unit does NOT have the negated tag
- Example: `["!Cybernetica Datasmith"]` means "available to all units EXCEPT Cybernetica Datasmith"

**Code Changes Required:**
- Update tag matching logic in `CategorySection.js`
- Handle both positive and negative tag matching

---

### 5. **Multi-Tag Matching Support**
**Location:** `40k/40k-army-data.js:625`
```javascript
// TODO: add support for multi-tag matching
{ "name": "Lucid Eye", "tags": ["Asuryani+Psyker"] },
```
**Complexity:** ⭐⭐ Medium  
**Effort:** ~2-4 hours  
**Description:** Support AND logic for tags (e.g., `"Asuryani+Psyker"` means unit must have BOTH tags). Current implementation uses OR logic (`some`).

**Implementation Notes:**
- Modify tag matching to parse `+` separator
- Change from OR (`some`) to AND (`every`) logic for multi-tag requirements
- Need to handle both single tags and multi-tag strings
- Example: `["Asuryani+Psyker"]` means unit must have both "Asuryani" AND "Psyker" tags

**Code Changes Required:**
- Update `CategorySection.js:186` to parse `+` separator
- Implement AND logic for multi-tag requirements

---

### 6. **Populate Empty Faction Data (13 factions)**
**Locations:** `40k/40k-army-data.js:2791-3027`
- Astra Militarum (TODO)
- Black Templars (TODO)
- Chaos Daemons (TODO)
- Chaos Knights (TODO)
- Dark Angels (TODO)
- Death Guard (TODO)
- Deathwatch (TODO)
- Drukhari (TODO)
- Emperor's Children (TODO)
- Genestealer Cults (TODO)
- Grey Knights (TODO)
- Imperial Agents (TODO)
- Imperial Knights (TODO)

**Complexity:** ⭐⭐ Medium  
**Effort:** ~4-8 hours per faction (52-104 hours total)  
**Description:** These are placeholder factions that need unit and enhancement data populated. This is mostly data entry work, but requires understanding the data structure and game rules.

**Implementation Notes:**
- Each faction needs:
  - `units` array with unit definitions (name, modelCount, tags, unitOptions)
  - `detachments` array with detachment-specific enhancements
  - Points data in `POINTS` object
- Can reference existing factions as templates
- Requires knowledge of Warhammer 40k rules and unit data
- Can be done incrementally, one faction at a time

**Data Sources:**
- Official Warhammer 40k app exports
- Codex books
- BattleScribe catalogues

---

### 7. **Support Armies of Renown**
**Location:** `aos/aos-army-data.js:271`
```javascript
// TODO: support armies of renown
// "The Great-Grand Gnawhorde": {},
// "Thanquol's Mutated Menagerie": {},
```
**Complexity:** ⭐⭐ Medium  
**Effort:** ~4-6 hours  
**Description:** Add support for "Armies of Renown" which are special army configurations with different rules/restrictions in Age of Sigmar.

**Implementation Notes:**
- Need to understand how armies of renown differ from regular formations
- May require additional data structure fields
- Might need validation logic to enforce army of renown restrictions
- Check if similar concept exists in 40k (like detachments)

---

## 🟠 MEDIUM-HIGH COMPLEXITY (8-16 hours)

### 8. **Chapter-Specific Unit Deduplication**
**Location:** `40k/40k-army-data.js:1940`
```javascript
// TODO: de-duplicate chapter-specific units with those coming from the parent faction
parentFaction: "Chaos Space Marines",
```
**Complexity:** ⭐⭐⭐ Medium-High  
**Effort:** ~8-12 hours  
**Description:** When a chapter (like World Eaters) has a `parentFaction`, it should inherit units from the parent but avoid duplicates. Need to merge parent faction units with chapter-specific units, removing duplicates.

**Implementation Notes:**
- Need to understand the data loading/merging logic
- May need to modify how armies are initialized
- Need to identify duplicate units (by name? by tags?)
- Handle edge cases: what if chapter overrides a parent unit?
- Check where `chapterInfo.parentFaction` is used

**Code Changes Required:**
- Find where armies are loaded/initialized
- Implement merge logic that:
  1. Loads parent faction units
  2. Merges with chapter-specific units
  3. Removes duplicates (likely by unit name)
  4. Preserves chapter-specific overrides

---

### 9. **Extract Weapon Options from BattleScribe**
**Location:** `src/battlescribe-parser.js:344`
```javascript
// TODO: Extract weapon options for this group
// const weaponOptions = extractGroupWeaponOptions(group);
// if (weaponOptions.length > 0) {
//   groupData.weaponOptions = weaponOptions;
// }
```
**Complexity:** ⭐⭐⭐ Medium-High  
**Effort:** ~8-12 hours  
**Description:** Extract weapon options from BattleScribe XML group definitions. Requires understanding BattleScribe XML structure for weapon selections.

**Implementation Notes:**
- Need to parse `<selections>` within groups
- Identify weapon-related selections vs other options
- Extract weapon names, profiles, and point costs
- May need to handle nested selections (weapons with options)
- Reference existing BattleScribe XML examples

**Code Changes Required:**
- Implement `extractGroupWeaponOptions` function
- Parse XML structure for weapon selections
- Map to internal weapon options format

---

### 10. **Extract Weapon Profiles from BattleScribe**
**Location:** `src/battlescribe-parser.js:444`
```javascript
// TODO: extract weapon profiles
```
**Complexity:** ⭐⭐⭐ Medium-High  
**Effort:** ~8-16 hours  
**Description:** Extract weapon profile data (range, strength, AP, damage, etc.) from BattleScribe XML. This is more complex than just extracting weapon names.

**Implementation Notes:**
- Weapon profiles are typically in `<profiles>` sections
- Need to extract: name, range, type, strength, AP, damage, abilities
- May need to handle multiple profiles per weapon (e.g., different firing modes)
- Link profiles to weapon selections
- Requires deep understanding of BattleScribe XML schema

**Code Changes Required:**
- Parse `<profiles>` XML elements
- Extract profile characteristics
- Map to internal weapon profile format
- Link profiles to weapons in unit definitions

---

## 📊 Complexity Ranking Summary

| Rank | TODO | Complexity | Estimated Time | Priority |
|------|------|------------|----------------|----------|
| 1 | Calculate Total Points (AOS) | ⭐ Very Low | 30 min | High |
| 2 | Unit Options Handler (AOS) | ⭐ Low | 1-2 hrs | Medium |
| 3 | Extract Tags (BattleScribe) | ⭐ Low | 1-2 hrs | Medium |
| 4 | Tag Negation Support | ⭐⭐ Medium | 2-4 hrs | High |
| 5 | Multi-Tag Matching | ⭐⭐ Medium | 2-4 hrs | High |
| 6 | Populate Empty Factions (13) | ⭐⭐ Medium | 52-104 hrs | Low |
| 7 | Armies of Renown Support | ⭐⭐ Medium | 4-6 hrs | Medium |
| 8 | Chapter Unit Deduplication | ⭐⭐⭐ Med-High | 8-12 hrs | Medium |
| 9 | Extract Weapon Options | ⭐⭐⭐ Med-High | 8-12 hrs | Medium |
| 10 | Extract Weapon Profiles | ⭐⭐⭐ Med-High | 8-16 hrs | Low |

---

## Recommendations

**Quick Wins (Do First):**
1. Calculate Total Points - Very simple, high impact
2. Tag Negation Support - Improves enhancement filtering
3. Multi-Tag Matching - Completes tag matching feature

**Medium Priority:**
4. Unit Options Handler (AOS) - Completes AOS functionality
5. Extract Tags (BattleScribe) - Improves parser completeness

**Long-term Projects:**
6. Populate Empty Factions - Can be done incrementally
7. Chapter Unit Deduplication - Architectural improvement
8. Extract Weapon Options/Profiles - Enhances BattleScribe parser

**Low Priority:**
9. Armies of Renown - Niche feature, can wait

