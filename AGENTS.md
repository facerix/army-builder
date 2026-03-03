# AGENTS.md

Agent-specific guidance. See [README.md](README.md) for project overview, architecture, metadata, coding standards, and development commands.

## Critical Patterns

### DataStore
```javascript
import { DataStore } from '/src/DataStore.js';

DataStore.addEventListener('change', evt => {
  const { changeType, item } = evt.detail;
  // changeType: "init" | "add" | "update" | "delete"
});

const lists = DataStore.getAll();
DataStore.update(listId, updatedData);
```

### MetadataStore
```javascript
import {
  getUnitMetadata,
  setUnitMetadata,
  getFactionMetadata,
  setFactionMetadata,
} from '/src/MetadataStore.js';

const metadata = await getUnitMetadata('40k', factionName, unitName);
await setUnitMetadata('40k', factionName, unitName, { weapons: [...], abilities: [...] });
const factionMeta = await getFactionMetadata('40k', factionName);
```

### DOM Creation
```javascript
import { h } from '/src/domUtils.js';

// Always use h() - never createElement directly
const el = h('div', { className: 'foo', id: '123' }, [child1, child2]);

// h() doesn't allow inline dataset manipulation, do it using the JS APIs
el.dataset.id = '456';
```

### Web Components
- `/components/` (or subfolders like `CategorySection/`, `option-renderers/`)
- Shadow DOM, `<style>` tag, kebab-case tags

## Important Files

| File | Purpose |
|------|---------|
| `src/DataStore.js` | Army lists (localStorage) |
| `src/MetadataStore.js` | Metadata (IndexedDB) |
| `src/domUtils.js` | `h()` helper |
| `40k/army-data-loader.js` | Dynamic faction loading; use `get40kArmyData(factionName)` |
| `40k/army-data/` | Per-faction files + `points.js` |
| `40k/list/40k-list.js` | 40k list builder |
| `40k/play/40k-play.js` | Play mode (datacards) |
| `40k/metadata/40k-metadata.js` | Metadata UI, BattleScribe import |
| `aos/list/aos-list.js` | AoS list builder |
| `src/battlescribe-parser.js` | BattleScribe .cat parser |

## Common Tasks

**Adding a unit:** Get unit from army data → `{id, name, options}` → `DataStore.update()` → listen for "change" to re-render.

**Metadata:** Use `getUnitMetadata`/`setUnitMetadata` for unit datacard data. Play mode merges via `getUnitFullDatacardData` in 40k-play.js. MetadataModal emits `metadataSaved`.

**Modifying army data:** ⚠️ Per-faction files in `40k/army-data/{factionCode}.js`; points in `points.js`. Consider: multiple factions? existing lists? migration?

## Things to Avoid

1. ❌ Frameworks (React, Vue, etc.)
2. ❌ Modifying army data without careful consideration
3. ❌ Storing full unit objects in lists (use `{id, name, options}` only)
4. ❌ Bypassing DataStore or MetadataStore
5. ❌ Using `createElement` (use `h()`)

## Testing

Use @Browser at `http://localhost:8080` (assume server is already running). Verify UI, interactions, console, service worker.

## Checklist

**Before:** Offline? DataStore? MetadataStore? 40k vs AoS? Using `h()`?

**After:** `npm run format` → `npm run lint` → fix lint → test in browser
