# AGENTS.md

Quick reference guide for AI agents working on this project.

## Project Overview

**Personnel** is a Progressive Web App (PWA) for building army lists for Warhammer 40k and Age of Sigmar. Built with vanilla JavaScript, Web Components, and Service Workers.

## Key Architecture

- **No frameworks** - Pure vanilla JavaScript with ES6 modules
- **Web Components** - Custom elements in `/components/` with Shadow DOM
- **Data Store** - Singleton `DataStore` (EventTarget) manages all army lists in localStorage
- **DOM Creation** - Use `h()` helper from `src/domUtils.js` for all DOM manipulation

## Critical Patterns

### Data Storage
```javascript
import { DataStore } from '/src/DataStore.js';

// Listen for changes
DataStore.addEventListener('change', evt => {
  const { changeType, item } = evt.detail;
  // changeType: "init" | "add" | "update" | "delete"
});

// Get all lists
const lists = DataStore.getAll();

// Update a list
DataStore.update(listId, updatedData);
```

### DOM Creation
```javascript
import { h } from '/src/domUtils.js';

// Always use h() helper - never createElements directly
const element = h('div', {
  className: 'my-class',
  dataset: { id: '123' },
}, [child1, child2]);
```

### Web Components
- Define in `/components/` directory
- Use Shadow DOM with scoped styles
- Register with `customElements.define()`
- Tag names: kebab-case (e.g., `update-notification`)

## Important Files

| File | Purpose |
|------|---------|
| `src/DataStore.js` | Central data management singleton |
| `src/domUtils.js` | DOM helpers (`h()` function) |
| `40k/list/40k-list.js` | 40k list builder logic |
| `aos/list/aos-list.js` | AoS list builder logic |
| `40k/army-data/` | 40k faction data (large files, be careful) |

## Data Structure

**Army Lists** store minimal data:
```javascript
{
  id: 'uuid',
  name: 'My Army',
  faction: 'spaceMarines',
  units: [
    { id: 'uuid', name: 'Intercessors', options: { ... } },
  ],
}
```

**Full unit data** comes from army data files (`40k/army-data/` or `aos/aos-army-data.js`).

## Common Tasks

### Adding a Unit
1. Get unit data from army data files
2. Create unit entry with `{id, name, options}`
3. Use `DataStore.update()` to add to list
4. Listen for "change" event to re-render

### Creating UI Components
1. Create file in `/components/`
2. Use Shadow DOM with `<style>` tag
3. Use `h()` helper for DOM creation
4. Register with `customElements.define()`

### Modifying Army Data
⚠️ **Be very careful** - These are large, structured data files. Consider:
- Does this affect multiple factions?
- Will this break existing lists?
- Is there migration code needed?

## Coding Standards

- **ES6 modules** - Always use `import`/`export`
- **Private fields** - Use `#fieldName` for encapsulation
- **const > let** - Prefer `const`, avoid `var`
- **Arrow functions** - For callbacks
- **async/await** - For promises

### Code Formatting

**Always format and lint code before completing changes:**
- **Format code**: Run `npm run format` to auto-format all files
- **Lint code**: Run `npm run lint` to check for errors
- **Auto-fix linting**: Run `npm run lint:fix` to automatically fix linting issues

**Formatting rules:**
- Single quotes for strings
- Semicolons required
- 2 spaces indentation
- Trailing commas (ES5 style)
- Max line length: 100 characters
- Arrow function params: omit parens for single param (`x => x` not `(x) => x`)

## Things to Avoid

1. ❌ Don't use frameworks (React, Vue, etc.)
2. ❌ Don't modify army data files without careful consideration and user confirmation
3. ❌ Don't store full unit objects in lists (store `{id, name, options}` only)
4. ❌ Don't bypass DataStore for data operations
5. ❌ Don't use `createElement` directly (use `h()` helper)

## Development

- **Start server**: `npm start` (live-server)
- **Lint**: `npm run lint`
- **Format**: `npm run format`
- **Service Worker**: Separate `sw.js` (prod) and `sw-dev.js` (dev)

### Testing with Browser Tools

**Always use the @Browser tool to test changes:**
- **Server is already running** at `http://localhost:8080` - do not start the server
- Navigate to `http://localhost:8080` to test the application
- Use browser tools to:
  - Verify UI changes render correctly
  - Test user interactions (clicks, form submissions)
  - Check console for errors
  - Verify service worker functionality
  - Test offline behavior
- Take screenshots to verify visual changes
- Check browser console messages for errors or warnings

## Game Systems

- **40k**: Units in `{units}` array (migrated from old `{characters, battleline, otherUnits}` format)
- **AoS**: Units in `{regiments, auxiliaryUnits, lores, terrain}` structure
- Both use similar patterns but different categorization

## Quick Checklist

Before making changes, ask:
- [ ] Does this need offline support? (Service worker)
- [ ] Does this affect data storage? (DataStore)
- [ ] Is this game-specific? (40k vs AoS)
- [ ] Does this need persistence? (localStorage)
- [ ] Am I using `h()` helper for DOM?
- [ ] Am I using DataStore for data operations?

After making changes:
- [ ] Run `npm run format` to format code
- [ ] Run `npm run lint` to check for linting errors
- [ ] Fix any linting errors (use `npm run lint:fix` if possible)
- [ ] Test changes using @Browser tool at `http://localhost:8080`
- [ ] Verify no console errors
- [ ] Check that UI renders correctly
- [ ] Test user interactions if applicable
