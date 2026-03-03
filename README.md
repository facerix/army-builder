# Personnel

Progressive Web App (PWA) for building army lists for Warhammer 40k and Age of Sigmar. Built with vanilla JavaScript, Web Components, and Service Workers.

## Architecture

- **No frameworks** - Pure vanilla JavaScript with ES6 modules
- **Web Components** - Custom elements in `/components/` with Shadow DOM
- **Data Store** - Singleton `DataStore` (EventTarget) manages all army lists in localStorage
- **DOM Creation** - Use `h()` helper from `src/domUtils.js` for all DOM manipulation

## Metadata

Metadata supplements army data with user-editable or imported content (stats, abilities, weapons, wargear, enhancements). It is stored separately from army lists.

- **Storage** - IndexedDB (`PersonnelMetadataDB`), managed by `src/MetadataStore.js`
- **Scope** - Keyed by `gameSystem:factionName:unitName`; faction-level shared data uses a special `SHARED_ENTITIES` unit name
- **Categories** - `stats`, `abilities`, `weapons`, `wargear`, `enhancements` (per unit or faction)
- **Import** - BattleScribe catalogue files (`.cat`) can be parsed and imported via `40k/metadata/`
- **Export** - Metadata can be exported by game system and/or faction

## Development

### Commands

- **Start server**: `npm start` (live-server at http://localhost:8080)
- **Lint**: `npm run lint`
- **Format**: `npm run format`
- **Auto-fix linting**: `npm run lint:fix`

### Service Worker

Separate `sw.js` (production) and `sw-dev.js` (development) files.

## Coding Standards

- **ES6 modules** - Always use `import`/`export`
- **Private fields** - Use `#fieldName` for encapsulation
- **const > let** - Prefer `const`, avoid `var`
- **Arrow functions** - For callbacks
- **async/await** - For promises

## Game Systems

- **40k**: Units in `{units}` array (migrated from old `{characters, battleline, otherUnits}` format)
- **AoS**: Units in `{regiments, auxiliaryUnits, lores, terrain}` structure
- Both use similar patterns but different categorization

## Credits

- Art assets from [SVG Repo](https://www.svgrepo.com/)
- Placeholder animations from [SVGBackgrounds.com](https://www.svgbackgrounds.com/elements/animated-svg-preloaders)
- AoS & 40k icons from [Warhammer40kGroup](https://github.com/Warhammer40kGroup/wh40k-icon)
- Faction icons from [Certseeds](https://github.com/Certseeds/wh40k-icon)
- Additional 40k icons from [Locequen](https://github.com/Locequen/40k-Data-Card)
- Everything else by [me](https://www.facerix.com/about) and Cursor.
