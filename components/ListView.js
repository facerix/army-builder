/**
 * ListView Web Component
 * A box with a list of named items, one of which can be selected at any given time.
 * Clicking an item emits a "change" event with a reference to its DOM node.
 * Renders identically across desktop and mobile.
 */

import { h } from '../src/domUtils.js';

const CSS = `
:host {
  display: block;
}

.container {
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  height: 100%;
  overflow-y: auto;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background-color 0.15s ease;
}

.item:last-child {
  border-bottom: none;
}

.item:hover {
  background-color: #f5f5f5;
}

.item.selected {
  background-color: #e8e8e8;
  font-weight: 600;
}

.item:focus-visible {
  outline: 2px solid var(--accent-color, #ee4343);
  outline-offset: -2px;
}
`;

class ListView extends HTMLElement {
  #items = [];
  #selectedIndex = -1;
  #listEl = null;

  static get observedAttributes() {
    return ['items'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#parseItemsAttr();
    this.#render();
    this.#setupListeners();
  }

  attributeChangedCallback(name, _oldVal, _newVal) {
    if (name === 'items' && this.#listEl) {
      this.#parseItemsAttr();
      this.#renderItems();
    }
  }

  #parseItem(i) {
    if (!i || typeof i !== 'object' || !('name' in i)) return null;
    return {
      name: String(i.name),
      id: i.id != null ? String(i.id) : undefined,
    };
  }

  #parseItemsAttr() {
    const attr = this.getAttribute('items');
    if (attr) {
      try {
        const parsed = JSON.parse(attr);
        this.#items = Array.isArray(parsed)
          ? parsed.map(i => this.#parseItem(i)).filter(Boolean)
          : [];
      } catch {
        this.#items = [];
      }
    }
    this.#selectedIndex = Math.max(-1, Math.min(this.#selectedIndex, this.#items.length - 1));
  }

  get items() {
    return this.#items.map(i => ({ ...i }));
  }

  set items(val) {
    this.#items = Array.isArray(val) ? val.map(i => this.#parseItem(i)).filter(Boolean) : [];
    this.#selectedIndex = Math.max(-1, Math.min(this.#selectedIndex, this.#items.length - 1));
    if (this.#listEl) {
      this.#renderItems();
    }
  }

  get selectedIndex() {
    return this.#selectedIndex;
  }

  set selectedIndex(idx) {
    const i = Number(idx);
    const clamped = Math.max(-1, Math.min(i, this.#items.length - 1));
    if (this.#selectedIndex !== clamped) {
      this.#selectedIndex = clamped;
      if (this.#listEl) {
        this.#updateSelection();
      }
    }
  }

  /**
   * Add an item to the list. The id is set as a data-id attribute on the element.
   * @param {string} name - Display text for the item
   * @param {string} id - Identifier, set as dataset.id on the element
   */
  addItem({ name, id }) {
    this.#items.push({ name: String(name), id: id != null ? String(id) : undefined });
    if (this.#listEl) {
      this.#renderItems();
    }
  }

  #render() {
    this.shadowRoot.innerHTML = '';
    const style = document.createElement('style');
    style.textContent = CSS;
    this.shadowRoot.appendChild(style);

    const container = h('div', { className: 'container' }, []);
    this.#listEl = h('ul', { className: 'list', role: 'listbox' }, []);
    container.appendChild(this.#listEl);
    this.shadowRoot.appendChild(container);

    this.#renderItems();
  }

  #renderItems() {
    if (!this.#listEl) return;

    this.#listEl.innerHTML = '';
    this.#items.forEach((item, index) => {
      const li = h('li', {
        className: 'item',
        innerText: item.name,
        tabIndex: 0,
        role: 'option',
        'aria-selected': index === this.#selectedIndex,
      });
      li.dataset.index = String(index);
      li.dataset.value = item.name;
      if (item.id != null) {
        li.dataset.id = item.id;
      }

      li.addEventListener('click', () => this.#select(index, li));
      li.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.#select(index, li);
        }
      });

      this.#listEl.appendChild(li);
    });

    this.#updateSelection();
  }

  #updateSelection() {
    if (!this.#listEl) return;

    this.#listEl.querySelectorAll('.item').forEach((el, i) => {
      const isSelected = i === this.#selectedIndex;
      el.classList.toggle('selected', isSelected);
      el.setAttribute('aria-selected', isSelected);
    });
  }

  #select(index, node) {
    if (index < 0 || index >= this.#items.length) return;

    this.#selectedIndex = index;
    this.#updateSelection();

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { node, index, ...this.#items[index] },
        bubbles: true,
        composed: true,
      })
    );
  }

  #setupListeners() {
    // No additional listeners needed; items have their own
  }
}

customElements.define('list-view', ListView);

export default ListView;
