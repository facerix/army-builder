import { h } from '../src/domUtils.js';

const CSS = `
:host {
  
}

:host > div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 1rem;
  min-height: 450px;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  overflow: hidden;

  h3, h4 {
    font-variant: common-ligatures small-caps;
  }

  header {
    background-color: #274764;
    color: white;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    h3 {
      margin: 0;
    }

    datacard-stat-line {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }

    datacard-stat {
      display: flex;
      flex-direction: column;
      align-items: center;

      span.stat-label {
        font-size: 0.75rem;
      }

      span.stat-value {
        width: 2rem;
        padding: 0.25rem;
        border: 1px solid #ccc;
        border-radius: 0.3rem 0;
        text-align: center;
        corner-shape: bevel;
      }
    }
  }
  section.body {
    display: flex;
    flex: 1 1 auto;

    h4 {
      margin: 0;
      background-color: #274764;
      color: white;
      padding: 0.25rem;
    }

    .attack-profiles {
      flex: 1 1 60%;

      .attack-profile-table {
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 0.5rem;
        width: 100%;
      }

      thead {
        margin: 0;
        background-color: #274764;
        color: white;
        padding: 0.25rem;

        img {
          height: 1rem;
          filter: invert(1);
          margin-right: 0.25rem;
        }

        th {
          font-variant: common-ligatures small-caps;
        }
        th.title {
          padding-left: 0.5rem;
          text-align: left;
        }

        th.stat,
        td.stat {
          font-stretch: condensed;
          width: 42px;
        }
      }

      tr.attack-profile {
        border-bottom: 1px solid #ccc;
        font-size: 0.9rem;

        .attack-name {
          padding: 0.2rem 0 0.2rem 0.5rem;

          .attack-name-text {
            display: table-row;
            text-transform: capitalize;
            white-space: nowrap;
          }
          .attack-name-tag {
            border: 1px dashed;
            border-radius: 3px;
            color: gray;
            font-size: 0.8rem;
            font-variant: small-caps;
            margin: 0 0.2rem;
            padding: 0 0.1rem;
          }
        }
      }

      td.stat {
        text-align: center;
        vertical-align: baseline;
      }

      .enhancement {
        margin-top: 2rem;

        .enhancement-inner {
          padding: 0.2rem 0 0.2rem 0.5rem
        }
      }
    }

    aside {
      flex: 0 0 40%;
      padding: 0 0.5rem;
      border-left: 1px solid #ccc;
    }

    .ability-profile {
      font-stretch: condensed;
      font-size: 0.9rem;
      border-bottom: 1px solid #ccc;
      margin-top: 0.25rem;
      padding-bottom: 0.25rem;

      strong, .inline-abilities {
        font-weight: bold;
        text-transform: capitalize;
      }
    }
  }
  footer {
    border-top: 1px solid #ccc;
    padding: 0 0.5rem;
  }
}
`;

const TEMPLATE = `<header>
  <h3 class="unit-name"></h3>
  <div class="stat-line"></div>
</header>
<section class="body">
  <div class="attack-profiles">
    <table class="attack-profile-table" id="ranged-weapons">
      <thead>
        <tr>
          <th class="title">
            <img src="/images/rangedWeapon.svg" alt="ranged icon" title="Ranged">
            <span>Ranged Weapons</span>
          </th>
          <th class="stat">Range</th>
          <th class="stat">A</th>
          <th class="stat">WS</th>
          <th class="stat">S</th>
          <th class="stat">AP</th>
          <th class="stat">D</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <table class="attack-profile-table" id="melee-weapons">
      <thead>
        <tr>
          <th class="title">
            <img src="/images/meleeWeapon.svg" alt="melee icon" title="Melee">
            <span>Melee Weapons</span>
          </th>
          <th class="stat">A</th>
          <th class="stat">WS</th>
          <th class="stat">S</th>
          <th class="stat">AP</th>
          <th class="stat">D</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <table class="attack-profile-table" id="unknown-weapons">
      <thead>
        <tr>
          <th class="title">
            <img src="/images/weapons.svg" alt="swords icon" title="Incomplete Weapons">
            <span>Incomplete Weapons</span>
          </th>
          <th colspan="6">Details</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <div class="enhancement">
      <h4>Enhancement</h4>
      <div class="enhancement-inner"></div>
    </div>
  </div>
  <aside>
    <div class="abilities">
      <h4>Abilities</h4>
      <div class="abilities-inner"></div>
    </div>
    <div class="wargear">
      <h4>Wargear Abilities</h4>
      <div class="wargear-inner"></div>
    </div>
    <div class="unit-composition">
      <h4>Unit Composition</h4>
      <div class="model-count"></div>
    </div>
  </aside>
</section>
<footer>
  <p>Keywords: <span class="keywords"></span></p>
</footer>`;

// helper element builders
const StatLine = stats => {
  // strip any non-numeric values (inches, pluses, etc.)
  const normalized = stats.map(stat => parseInt(stat, 10));
  const Stat = (label, value) => {
    return h('datacard-stat', {}, [
      h('span', { className: 'stat-label', innerText: label }),
      h('span', { className: 'stat-value', innerText: `${value}` }),
    ]);
  };

  return h('datacard-stat-line', {}, [
    Stat('M', `${normalized[0]}″`),
    Stat('T', normalized[1]),
    Stat('Sv', `${normalized[2]}+`),
    Stat('W', normalized[3]),
    Stat('Ld', `${normalized[4]}+`),
    Stat('OC', normalized[5]),
  ]);
};

const WeaponProfile = weapon => {
  const { name, profile, type = 'Melee', tags = [] } = weapon;
  const normalizedTags = Array.isArray(tags) ? tags : (tags?.split(',') ?? []);
  const normalizedProfile = Array.isArray(profile) ? profile : (profile?.split(',') ?? []);
  if (!name) {
    return document.createDocumentFragment();
  }
  const label = weapon.count > 1 ? `${weapon.count}x ${name}` : name;
  const columns = [
    h('td', { className: 'attack-name' }, [
      h('span', { className: 'attack-name-text', innerText: label }),
      ...(normalizedTags?.map(tag => h('span', { className: 'attack-name-tag', innerText: tag })) ||
        []),
    ]),
  ];
  if (!normalizedProfile || normalizedProfile.length === 0) {
    columns.push(h('td', { className: 'stat', colSpan: 6, innerText: '[Missing weapon profile]' }));
  } else {
    const [range, a, ws, s, ap, d] =
      type === 'Ranged' ? normalizedProfile : [type, ...normalizedProfile];
    if (type === 'Ranged') {
      const rangeValue = parseInt(range, 10);
      columns.push(h('td', { className: 'stat', innerText: `${rangeValue}″` }));
    }
    const wsValue = parseInt(ws, 10);
    columns.push(h('td', { className: 'stat', innerText: a }));
    columns.push(h('td', { className: 'stat', innerText: `${wsValue}+` }));
    columns.push(h('td', { className: 'stat', innerText: s }));
    columns.push(h('td', { className: 'stat', innerText: ap }));
    columns.push(h('td', { className: 'stat', innerText: d }));
  }
  return h('tr', { className: 'attack-profile' }, columns);
};

const NameAndDescription = ability => {
  const { name, description, type } = ability;
  return h('div', { className: 'ability-profile' }, [
    h('strong', { innerText: `${name}: ` }),
    h('span', { innerText: description }),
  ]);
};

const InlineAbilities = (abilities, type) => {
  const innerText = abilities.map(a => `${a.name}${a.value ? ` (${a.value})` : ''}`).join(', ');
  return h('div', { className: 'ability-profile' }, [
    h('em', { innerText: `${type}: ` }),
    h('span', { className: 'inline-abilities', innerText: innerText }),
  ]);
};

class DataCard extends HTMLElement {
  #ready = false;
  #unitData = null;

  // DOM element references to hang onto for easy access
  #unitName = null;
  #statLine = null;
  #rangedWeaponsSection = null;
  #rangedWeapons = null;
  #meleeWeaponsSection = null;
  #meleeWeapons = null;
  #unknownWeaponsSection = null;
  #unknownWeapons = null;
  #enhancement = null;
  #enhancementInner = null;
  #abilities = null;
  #abilitiesInner = null;
  #wargear = null;
  #wargearInner = null;
  #unitComposition = null;
  #keywords = null;

  constructor() {
    super();
  }

  connectedCallback() {
    // Create shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    const styles = document.createElement('style');
    styles.innerHTML = CSS;
    shadow.appendChild(styles);

    const dataCard = document.createElement('div');
    dataCard.innerHTML = TEMPLATE;
    shadow.appendChild(dataCard);

    this.#init();
    if (this.#ready) this.#render();
  }

  #init() {
    if (this.#ready || !this.shadowRoot) return;

    // Get references to elements
    this.#unitName = this.shadowRoot.querySelector('.unit-name');
    this.#statLine = this.shadowRoot.querySelector('.stat-line');
    this.#rangedWeaponsSection = this.shadowRoot.querySelector('#ranged-weapons');
    this.#rangedWeapons = this.shadowRoot.querySelector('#ranged-weapons tbody');
    this.#meleeWeaponsSection = this.shadowRoot.querySelector('#melee-weapons');
    this.#meleeWeapons = this.shadowRoot.querySelector('#melee-weapons tbody');
    this.#unknownWeaponsSection = this.shadowRoot.querySelector('#unknown-weapons');
    this.#unknownWeapons = this.shadowRoot.querySelector('#unknown-weapons tbody');
    this.#enhancement = this.shadowRoot.querySelector('.enhancement');
    this.#enhancementInner = this.shadowRoot.querySelector('.enhancement-inner');
    this.#abilities = this.shadowRoot.querySelector('.abilities');
    this.#abilitiesInner = this.shadowRoot.querySelector('.abilities-inner');
    this.#wargear = this.shadowRoot.querySelector('.wargear');
    this.#wargearInner = this.shadowRoot.querySelector('.wargear-inner');
    this.#unitComposition = this.shadowRoot.querySelector('.unit-composition');
    this.#keywords = this.shadowRoot.querySelector('.keywords');

    this.#ready = true;
  }

  #render() {
    this.#init();
    if (!this.#ready) return;

    if (!this.#unitData) {
      this.style.display = 'none';
      return;
    } else {
      this.style.display = '';
    }

    // Set dataset attributes
    this.dataset.unitId = this.#unitData.id;

    // Update name
    if (this.#unitName) {
      this.#unitName.textContent = this.#unitData.name;
    }

    // Update stat line
    if (this.#statLine) {
      this.#statLine.innerHTML = '';
      if (this.#unitData.stats) {
        this.#statLine.appendChild(StatLine(this.#unitData.stats));
      } else {
        this.#statLine.textContent = '[Missing statline for this unit]';
      }
    }

    // split weapons into ranged and melee
    const rangedWeapons = this.#unitData.weapons?.filter(w => w.type === 'Ranged') || [];
    const meleeWeapons = this.#unitData.weapons?.filter(w => w.type === 'Melee') || [];

    // render ranged weapons
    if (this.#rangedWeaponsSection) {
      this.#rangedWeapons.innerHTML = '';
      if (rangedWeapons.length > 0) {
        rangedWeapons.forEach(w => {
          this.#rangedWeapons.appendChild(WeaponProfile(w));
        });
        this.#rangedWeaponsSection.style.display = '';
      } else {
        this.#rangedWeaponsSection.style.display = 'none';
      }
    }

    // render melee weapons
    if (this.#meleeWeaponsSection) {
      this.#meleeWeapons.innerHTML = '';
      if (meleeWeapons.length > 0) {
        meleeWeapons.forEach(w => {
          this.#meleeWeapons.appendChild(WeaponProfile(w));
        });
        this.#meleeWeaponsSection.style.display = '';
      } else {
        this.#meleeWeaponsSection.style.display = 'none';
      }
    }

    // under-defined weapons, if any
    const underDefinedWeapons = this.#unitData.weapons?.filter(w => !w.type || !w.profile) || [];
    if (underDefinedWeapons.length > 0) {
      this.#unknownWeapons.innerHTML = '';
      underDefinedWeapons.forEach(w => {
        this.#unknownWeapons.appendChild(WeaponProfile(w));
      });
      this.#unknownWeaponsSection.style.display = '';
    } else {
      this.#unknownWeaponsSection.style.display = 'none';
    }

    // enhancement, if any
    if (this.#enhancement) {
      this.#enhancementInner.innerHTML = '';
      if (this.#unitData.enhancement) {
        this.#enhancementInner.appendChild(NameAndDescription(this.#unitData.enhancement));
        this.#enhancement.style.display = '';
      } else {
        this.#enhancement.style.display = 'none';
      }
    }

    console.log('about to check for enhancement: ', this.#unitData);
    // <div class="unit-composition">
    //   <h4>Unit Composition</h4>
    //   <div class="model-count"><div class="ability-profile"><strong>Model Count: </strong><span>1</span></div><div class="ability-profile"><strong>Leader: </strong><span>This model can be attached to the following units: ^^**Ironkin Steeljacks with Heavy Volkanite Disintegrators^^**, ^^**Ironkin Steeljacks with Melee Weapons^^**</span></div></div>
    // </div>

    // abilities
    const leaderAbility = this.#unitData.abilities?.find(a => a.name.toLowerCase() === 'leader');
    const nonLeaderAbilities = this.#unitData.abilities?.filter(
      a => a.name !== leaderAbility?.name
    );
    if (this.#abilities) {
      this.#abilitiesInner.innerHTML = '';
      if (nonLeaderAbilities?.length > 0) {
        const coreAbilities = nonLeaderAbilities.filter(a => a.type === 'Core');
        const factionAbilities = nonLeaderAbilities.filter(a => a.type === 'Faction');
        const otherAbilities = nonLeaderAbilities.filter(
          a => !['Core', 'Faction'].includes(a.type)
        );
        if (coreAbilities.length > 0) {
          this.#abilitiesInner.appendChild(InlineAbilities(coreAbilities, 'Core'));
        }
        if (factionAbilities.length > 0) {
          this.#abilitiesInner.appendChild(InlineAbilities(factionAbilities, 'Faction'));
        }
        otherAbilities.forEach(a => {
          this.#abilitiesInner.appendChild(NameAndDescription(a));
        });
        this.#abilities.style.display = '';
      } else {
        this.#abilities.style.display = 'none';
      }
    }

    // wargear
    if (this.#wargear) {
      this.#wargearInner.innerHTML = '';
      if (this.#unitData.wargear?.length > 0) {
        this.#unitData.wargear.forEach(w => {
          this.#wargearInner.appendChild(NameAndDescription(w));
        });
        this.#wargear.style.display = '';
      } else {
        this.#wargear.style.display = 'none';
      }
    }

    // unit composition
    if (this.#unitComposition) {
      const modelCountEl = this.#unitComposition.querySelector('.model-count');
      modelCountEl.innerHTML = '';
      modelCountEl.appendChild(
        NameAndDescription({ name: 'Model Count', description: this.#unitData.modelCount || 1 })
      );

      if (leaderAbility) {
        modelCountEl.appendChild(NameAndDescription(leaderAbility));
      }
    }

    // keywords
    if (this.#keywords) {
      this.#keywords.textContent = this.#unitData.tags?.join(', ') || 'None';
    }
  }

  set unitData(data) {
    this.#unitData = data;
    this.#render();
  }

  get unitData() {
    return this.#unitData;
  }
}

window.customElements.define('data-card', DataCard);

export default DataCard;
