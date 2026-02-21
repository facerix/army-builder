import './TagList.js';
import { h } from '../src/domUtils.js';

const MODAL_TEMPLATE = `
  <dialog class="metadata-modal" closedby="any">
    <form method="dialog">
      <header>
        <h3 id="modalTitle">Datacard Metadata</h3>
        <button id="btnClose" type="button" title="Close">
          <img src="/images/close.svg" alt="close" tabindex="50" />
        </button>
      </header>
      <section class="metadata-body"></section>
      <footer>
        <button id="btnCancel" type="button">Cancel</button>
        <button id="btnSave" type="submit">Save</button>
      </footer>
    </form>
  </dialog>
`;

const MODAL_CSS = `
:host {
  button {
    border: none;
    background: transparent;
    cursor: pointer;

    img {
      height: 2em;
      width: 2em;
      margin: 0;
    }

    &:disabled {
      cursor: not-allowed;
      img {
        opacity: 0.5;
      }
    }
  
    &:not(:disabled):hover,
    &:not(:disabled):focus-visible {
      outline: var(--accent-color) auto 1px;
      background-color: #ddbfc67a;
    }
  }

  header {
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;
    border-radius: 0.25rem;
    
    h3 {
      margin-left: 1rem;
    }
    
    .actions {
      display: flex;
      align-items: center;
    }
    
    button {
      padding: 0.75rem;
      border-radius: 5px;
      img {
        filter: invert(1);
      }
    }
  }

  footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5em;
    padding: 1em;
    border-top: 2px groove #ccc;

    button {
      padding: 0.5em 1em;
      border-radius: 0.5em;
      border: 1px solid #ccc;
      background-color: #f0f0f0;
      color: black;
      cursor: pointer;
    }
  }

  dialog {
    padding: 0.5rem;
    min-width: 320px;
    max-width: min(720px, 90vw);
    max-height: 85dvh;
    flex-direction: column;
    
    &:open {
      display: flex;
    }

    .metadata-body {
      height: fit-content;
      max-height: 70dvh;
      overflow-y: auto;
      padding: 0.5rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    height: -webkit-fill-available;
    max-height: 85dvh;
    overflow-y: auto;
  }

  label {
    font-weight: 600;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .stats-editor {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;

    th, td {
      border: 1px solid #ccc;
      padding: 0.45rem;
      text-align: center;

      input[type="number"] {
        width: 2.5rem;
      }
    }
  }

  input[type="text"],
  input[type="number"],
  textarea {
    border-radius: 0.35rem;
    border: 1px solid #ccc;
    padding: 0.45rem;
    font-size: 0.95rem;
    font-family: inherit;
  }

  textarea {
    min-height: 90px;
    font-family: 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New',
      monospace;
  }

  .helper {
    font-size: 0.85rem;
    color: #4b4b4b;
  }

  .error {
    color: #9d0a1a;
    font-weight: 600;
    font-size: 0.9rem;
  }
}
`;

const buildStatsEditor = stats =>
  h('fieldset', { className: 'field' }, [
    h('label', { innerText: 'Stats' }),
    h('table', { className: 'stats-editor' }, [
      h('thead', {}, [
        h('tr', {}, [
          h('th', { innerText: 'M' }),
          h('th', { innerText: 'T' }),
          h('th', { innerText: 'Sv' }),
          h('th', { innerText: 'W' }),
          h('th', { innerText: 'Ld' }),
          h('th', { innerText: 'OC' }),
        ]),
      ]),
      h('tbody', {}, [
        h('tr', {}, [
          h('td', {}, [
            h('input', { type: 'number', name: 'stat-m', id: 'stat-m', value: stats[0] }),
          ]),
          h('td', {}, [
            h('input', { type: 'number', name: 'stat-t', id: 'stat-t', value: stats[1] }),
          ]),
          h('td', {}, [
            h('input', { type: 'number', name: 'stat-sv', id: 'stat-sv', value: stats[2] }),
          ]),
          h('td', {}, [
            h('input', { type: 'number', name: 'stat-w', id: 'stat-w', value: stats[3] }),
          ]),
          h('td', {}, [
            h('input', { type: 'number', name: 'stat-ld', id: 'stat-ld', value: stats[4] }),
          ]),
          h('td', {}, [
            h('input', { type: 'number', name: 'stat-oc', id: 'stat-oc', value: stats[5] }),
          ]),
        ]),
      ]),
    ]),
  ]);

const buildTextareaField = (id, label, value, helper) =>
  h(
    'fieldset',
    { className: 'field' },
    [
      h('label', { for: id, innerText: label }),
      h('textarea', { id, name: id, value }),
      helper ? h('div', { className: 'helper', innerText: helper }) : null,
    ].filter(Boolean)
  );

const buildArrayList = (id, label, value, schema) => {
  const arrayList = h('array-list', { id, value });
  if (schema) {
    arrayList.schema = schema;
  }
  return h('fieldset', { className: 'field' }, [
    h('label', { for: id, innerText: label }),
    arrayList,
  ]);
};

const parseJsonArray = (value, fieldLabel) => {
  if (!value) {
    return [];
  }
  let parsed;
  try {
    parsed = JSON.parse(value);
  } catch (_error) {
    throw new Error(`${fieldLabel} must be valid JSON.`);
  }
  if (!Array.isArray(parsed)) {
    throw new Error(`${fieldLabel} must be a JSON array.`);
  }
  return parsed;
};

const ARRAY_LIST_CSS = `
:host {
  display: block;
}

.array-list-add-button {
  padding: 0.25em 0.5em;
  border-radius: 0.35rem;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  color: black;
  cursor: pointer;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #e0e0e0;
  }

  &:focus-visible {
    outline: var(--accent-color) auto 1px;
  }
}

array-list .array-list-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.array-list-item {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.35rem;
  background-color: #fafafa;

  input, select, textarea {
    flex: 1 1 auto;
    border-radius: 0.35rem;
    border: 1px solid #ccc;
    padding: 0.45rem;
    font-size: 0.95rem;
    font-family: inherit;
    text-transform: capitalize;

    &:focus {
      outline: var(--accent-color) auto 1px;
      border-color: var(--accent-color);
    }
  }

  textarea {
    flex-basis: 100%;
    field-sizing: content;
    resize: vertical;
  }

  tag-list {
    flex: 1 1 auto;
  }

  button {
    padding: 0.35rem 0.75rem;
    border-radius: 0.35rem;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    color: black;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    min-width: 2rem;

    &:hover {
      background-color: #e0e0e0;
    }

    &:focus-visible {
      outline: var(--accent-color) auto 1px;
    }
  }
}
`;

class ArrayList extends HTMLElement {
  #ready = false;
  #items = [];
  #schema = null;
  #container = null;
  #addButton = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.#ready) return;

    const shadow = this.shadowRoot;
    const style = document.createElement('style');
    style.textContent = ARRAY_LIST_CSS;
    shadow.appendChild(style);

    // Parse schema from attributes or use default
    const schemaAttr = this.getAttribute('schema');
    if (schemaAttr) {
      try {
        this.#schema = JSON.parse(schemaAttr);
      } catch (error) {
        console.warn('Invalid schema attribute, using default schema', error);
        this.#schema = { name: 'String', description: 'String' };
      }
    } else {
      this.#schema = { name: 'String', description: 'String' };
    }

    // Create add button
    this.#addButton = h('button', { className: 'array-list-add-button', innerText: '+ Add' });
    this.#addButton.addEventListener('click', () => this.#addItem());

    // Create container
    this.#container = h('div', { className: 'array-list-container' });

    // Append to shadow root
    shadow.appendChild(this.#addButton);
    shadow.appendChild(this.#container);

    // Load initial value from attribute or property
    const valueAttr = this.getAttribute('value');
    if (valueAttr && this.#items.length === 0) {
      try {
        this.#items = JSON.parse(valueAttr);
      } catch (error) {
        console.warn('Invalid value attribute', error);
      }
    }
    this.#render();

    this.#ready = true;
  }

  #addItem() {
    const newItem = {};
    Object.keys(this.#schema).forEach(key => {
      newItem[key] = '';
    });
    this.#items.push(newItem);
    this.#render();
    this.#emitChange();
  }

  #removeItem(index) {
    this.#items.splice(index, 1);
    this.#render();
    this.#emitChange();
  }

  #updateItem(index, key, value) {
    if (this.#items[index]) {
      this.#items[index][key] = value;
      this.#emitChange();
    }
  }

  #render() {
    if (!this.#container) return;

    this.#container.innerHTML = '';

    this.#items.forEach((item, index) => {
      const itemElement = h('div', { className: 'array-list-item' }, []);

      // Create input for each property in schema
      Object.keys(this.#schema).forEach(key => {
        let input;
        const currentValue = item[key] || '';
        switch (this.#schema[key]) {
          case 'String':
            input = h('input', {
              name: `item-${key}`,
              placeholder: this.#getPlaceholder(key),
              value: currentValue,
            });
            break;
          case 'LongString':
            input = h('textarea', {
              name: `item-${key}`,
              placeholder: this.#getPlaceholder(key),
              value: currentValue,
            });
            break;
          case 'TagList':
            input = h('tag-list', {
              name: `item-${key}`,
              value: currentValue,
            });
            break;
          case 'Array':
            input = h('input', {
              name: `item-${key}`,
              placeholder: this.#getPlaceholder(key),
              value: currentValue.join(','),
            });
            break;
          default:
            if (Array.isArray(this.#schema[key])) {
              input = h(
                'select',
                {
                  name: `item-${key}`,
                  placeholder: this.#getPlaceholder(key),
                },
                [
                  h('option', {
                    value: '',
                    innerText: this.#getPlaceholder(key),
                    disabled: true,
                    selected: true,
                    hidden: true,
                  }),
                  ...this.#schema[key].map(optionValue =>
                    h('option', {
                      value: optionValue === 'None' ? '' : optionValue,
                      innerText: optionValue,
                    })
                  ),
                ]
              );
              input.value = currentValue;
            } else {
              throw new Error(`Unknown schema type: ${this.#schema[key]}`);
            }
        }

        input.addEventListener('input', evt => {
          this.#updateItem(index, key, evt.target.value);
        });

        itemElement.appendChild(input);
      });

      // Create remove button
      const removeButton = h('button', { innerText: '-' });
      removeButton.addEventListener('click', () => this.#removeItem(index));
      itemElement.appendChild(removeButton);

      this.#container.appendChild(itemElement);
    });
  }

  #getPlaceholder(key) {
    // Capitalize first letter and add ellipsis for description-like fields
    const capitalized = key.charAt(0).toUpperCase() + key.slice(1);
    if (key.toLowerCase().includes('description')) {
      return `${capitalized}...`;
    }
    return capitalized;
  }

  #emitChange() {
    // Update value attribute
    this.setAttribute('value', JSON.stringify(this.#items));

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          value: this.#items,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  // Public API
  get value() {
    return this.#items;
  }

  set value(newValue) {
    const newItems = Array.isArray(newValue) ? newValue : JSON.parse(newValue);
    if (newItems.length > 0) {
      this.#items = newItems;
      this.#render();
      this.#emitChange();
    }
  }

  get schema() {
    return this.#schema;
  }

  set schema(newSchema) {
    if (typeof newSchema === 'object' && newSchema !== null) {
      this.#schema = newSchema;
      this.setAttribute('schema', JSON.stringify(newSchema));
      this.#render();
    }
  }
}

customElements.define('array-list', ArrayList);

class MetadataModal extends HTMLElement {
  #ready = false;
  #metadata = {};
  #context = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.#ready) return;
    const shadow = this.shadowRoot;
    const style = document.createElement('style');
    style.textContent = MODAL_CSS;
    shadow.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = MODAL_TEMPLATE;
    shadow.appendChild(wrapper);

    this.dialog = shadow.querySelector('dialog');
    this.titleElem = shadow.querySelector('#modalTitle');
    this.btnClose = shadow.querySelector('#btnClose');
    this.btnCancel = shadow.querySelector('#btnCancel');
    this.btnSave = shadow.querySelector('#btnSave');
    this.body = shadow.querySelector('.metadata-body');
    this.form = shadow.querySelector('form');

    this.btnClose.addEventListener('click', () => this.close());
    this.btnCancel.addEventListener('click', () => this.close());
    this.dialog.addEventListener('close', () => this.close());

    if (this.form) {
      this.form.addEventListener('submit', evt => {
        evt.preventDefault();
        this.saveMetadata();
      });
    }

    this.#ready = true;
    this.render();
  }

  open(context) {
    this.#context = context;
    this.#metadata = context?.metadata || {};
    if (!this.#ready) {
      this.connectedCallback();
    }
    this.render();
    this.dialog.showModal();
  }

  close() {
    if (this.dialog && this.dialog.open) {
      this.dialog.close();
    }
  }

  saveMetadata() {
    const formData = new window.FormData(this.form);
    const statsRaw = [
      formData.get('stat-m')?.trim(),
      formData.get('stat-t')?.trim(),
      formData.get('stat-sv')?.trim(),
      formData.get('stat-w')?.trim(),
      formData.get('stat-ld')?.trim(),
      formData.get('stat-oc')?.trim(),
    ].map(stat => parseInt(stat, 10));
    const errorElem = this.shadowRoot.querySelector('.error');

    if (errorElem) {
      errorElem.innerText = '';
    }

    try {
      const weapons = this.form.querySelector('array-list#weapons').value ?? [];
      const wargear = this.form.querySelector('array-list#wargear').value ?? [];
      const abilities = this.form.querySelector('array-list#abilities').value ?? [];

      const metadata = {};
      if (statsRaw.length) {
        metadata.stats = statsRaw;
      }
      if (weapons.length) {
        metadata.weapons = weapons;
      }
      if (wargear.length) {
        metadata.wargear = wargear;
      }
      if (abilities.length) {
        metadata.abilities = abilities;
      }

      this.dispatchEvent(
        new CustomEvent('metadataSaved', {
          detail: {
            ...this.#context,
            metadata,
          },
          bubbles: true,
          composed: true,
        })
      );
      this.close();
    } catch (error) {
      if (errorElem) {
        errorElem.innerText = error.message;
      }
    }
  }

  render() {
    if (!this.body) return;
    this.body.innerHTML = '';

    const unitName = this.#context?.unitName || 'Unit';
    if (this.titleElem) {
      this.titleElem.textContent = `Datacard Metadata: ${unitName}`;
    }

    const statsValue = this.#metadata.stats?.map(stat => parseInt(stat, 10)) || [];
    const weaponsValue = JSON.stringify(this.#metadata.weapons || [], null, 2);
    const wargearValue = JSON.stringify(this.#metadata.wargear || [], null, 2);
    const abilitiesValue = JSON.stringify(this.#metadata.abilities || [], null, 2);

    const fields = [
      buildStatsEditor(statsValue),
      buildArrayList('weapons', 'Weapons', weaponsValue, {
        name: 'String',
        type: ['Ranged', 'Melee'],
        profile: 'String',
        tags: 'TagList',
      }),
      buildArrayList('wargear', 'Wargear', wargearValue, {
        name: 'String',
        description: 'LongString',
      }),
      buildArrayList('abilities', 'Abilities', abilitiesValue, {
        name: 'String',
        type: ['None', 'Core', 'Faction'],
        description: 'LongString',
      }),
      h('div', { className: 'error' }),
    ];

    fields.forEach(field => {
      if (field) {
        this.body.appendChild(field);
      }
    });
  }
}

customElements.define('metadata-modal', MetadataModal);
