/**
 * TagList Web Component
 * Tagify-like input for managing an array of string tags.
 * - Enter adds the current text as a tag
 * - Backspace removes last tag when input is empty
 * - Double-click a tag to edit it
 */

import { h } from '../src/domUtils.js';

const CSS = `
:host {
  display: inline-block;
  min-width: 200px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  min-height: 2.25rem;
}

.container:focus-within {
  outline: 2px solid var(--accent-color, #ee4343);
  outline-offset: 1px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.15rem 0.35rem;
  background: #e8e8e8;
  border-radius: 3px;
  font-size: 0.9rem;
}

.tag .tag-text {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag .tag-delete {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: 1.1rem;
  padding: 0;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  border-radius: 2px;
  font-size: 1rem;
  line-height: 1;
}

.tag .tag-delete:hover {
  background: #ccc;
  color: #333;
}

.tag-input {
  flex: 1;
  min-width: 80px;
  border: none;
  outline: none;
  padding: 0.15rem 0;
  font: inherit;
  font-size: 0.9rem;
}

.tag-edit-wrapper {
  display: inline-flex;
}

.tag-edit-input {
  width: 100%;
  min-width: 60px;
  padding: 0.1rem 0.25rem;
  border: 1px solid var(--accent-color, #ee4343);
  border-radius: 2px;
  font: inherit;
  font-size: 0.9rem;
}
`;

class TagList extends HTMLElement {
  #values = [];
  #container = null;
  #input = null;
  #editingIndex = null;
  #editingInput = null;

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#values = this.value ?? [];
    this.#render();
    this.#setupListeners();
  }

  get value() {
    return [...this.#values];
  }

  set value(val) {
    this.#values = Array.isArray(val) ? val.map(String) : [];
    this.#editingIndex = null;
    this.#editingInput = null;
    if (this.#container) {
      this.#renderTags();
    }
  }

  #render() {
    this.shadowRoot.innerHTML = '';
    const style = document.createElement('style');
    style.textContent = CSS;
    this.shadowRoot.appendChild(style);

    this.#input = h('input', {
      type: 'text',
      className: 'tag-input',
      placeholder: 'Add tag...',
    });

    this.#container = h('div', { className: 'container' }, []);
    this.#container.appendChild(this.#input);
    this.shadowRoot.appendChild(this.#container);

    this.#renderTags();
  }

  #renderTags() {
    // Remove existing tags (but not the input)
    const toRemove = [...this.#container.querySelectorAll('.tag, .tag-edit-wrapper')];
    toRemove.forEach(el => el.remove());

    this.#values.forEach((text, index) => {
      const tagEl = this.#createTagElement(text, index);
      this.#container.insertBefore(tagEl, this.#input);
    });
  }

  #createTagElement(text, index) {
    const wrapper = h('div', { className: 'tag' }, []);

    const textSpan = h('span', { className: 'tag-text', innerText: text }, []);
    textSpan.addEventListener('dblclick', () => this.#startEdit(index));

    const deleteBtn = h(
      'button',
      {
        type: 'button',
        className: 'tag-delete',
        innerHTML: '×',
      },
      []
    );
    deleteBtn.setAttribute('aria-label', 'Remove tag');
    deleteBtn.addEventListener('click', e => {
      e.stopPropagation();
      this.#removeTag(index);
    });

    wrapper.appendChild(textSpan);
    wrapper.appendChild(deleteBtn);
    wrapper.dataset.index = String(index);

    return wrapper;
  }

  #createEditElement(index, currentText) {
    const wrapper = h('div', { className: 'tag-edit-wrapper' }, []);
    const input = h(
      'input',
      {
        type: 'text',
        className: 'tag-edit-input',
        value: currentText,
      },
      []
    );

    const finishEdit = () => {
      const newText = input.value.trim();
      if (newText) {
        this.#values[index] = newText;
        this.#emitChange();
      }
      this.#cancelEdit();
      this.#renderTags();
      this.#input?.focus();
    };

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        finishEdit();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        this.#cancelEdit();
        this.#renderTags();
        this.#input?.focus();
      }
    });
    input.addEventListener('blur', finishEdit);

    wrapper.appendChild(input);
    this.#editingIndex = index;
    this.#editingInput = input;

    return wrapper;
  }

  #startEdit(index) {
    if (this.#editingIndex !== null) return;

    const tagEl = this.#container.querySelector(`[data-index="${index}"]`);
    if (!tagEl) return;

    const text = this.#values[index];
    const editEl = this.#createEditElement(index, text);
    tagEl.replaceWith(editEl);
    this.#editingInput?.focus();
    this.#editingInput?.select();
  }

  #cancelEdit() {
    this.#editingIndex = null;
    this.#editingInput = null;
  }

  #addTag(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    this.#values.push(trimmed);
    this.#emitChange();
    this.#renderTags();
    this.#input.value = '';
    this.#input.focus();
  }

  #addTags(texts) {
    const toAdd = texts.map(t => t.trim()).filter(Boolean);
    if (!toAdd.length) return;

    this.#values.push(...toAdd);
    this.#emitChange();
    this.#renderTags();
    this.#input.value = '';
    this.#input.focus();
  }

  #removeTag(index) {
    this.#values.splice(index, 1);
    this.#emitChange();
    this.#renderTags();
    this.#input?.focus();
  }

  #getPastedText(clipboardData) {
    if (!clipboardData) return '';
    const plain = clipboardData.getData('text/plain') || clipboardData.getData('text');
    if (plain) return plain;

    const html = clipboardData.getData('text/html');
    if (html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      const text = div.textContent?.trim();
      if (text) return text;
    }

    const lexical = clipboardData.getData('application/x-lexical-editor');
    if (lexical) {
      try {
        const parsed = JSON.parse(lexical);
        const extracted = this.#extractTextFromLexical(parsed);
        if (extracted) return extracted;
      } catch {
        // fall through
      }
    }

    for (const type of clipboardData.types || []) {
      if (['text/plain', 'text', 'text/html', 'application/x-lexical-editor'].includes(type))
        continue;
      const data = clipboardData.getData(type);
      if (!data?.trim()) continue;
      if (type.startsWith('application/')) {
        try {
          const parsed = JSON.parse(data);
          const extracted = this.#extractTextFromLexical(parsed);
          if (extracted) return extracted;
        } catch {
          return data.trim();
        }
      }
    }
    return '';
  }

  #extractTextFromLexical(node) {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (node.text) return node.text;
    if (Array.isArray(node)) return node.map(n => this.#extractTextFromLexical(n)).join('');
    if (node.children) return this.#extractTextFromLexical(node.children);
    if (node.nodes) return this.#extractTextFromLexical(node.nodes);
    return '';
  }

  #emitChange() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  #setupListeners() {
    this.#container.addEventListener('click', () => this.#input?.focus());

    this.#input.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        this.#addTag(this.#input.value);
      }
      if (e.key === 'Backspace' && !this.#input.value && this.#values.length > 0) {
        e.preventDefault();
        this.#removeTag(this.#values.length - 1);
      }
    });

    const handlePaste = e => {
      if (!this.contains(e.target)) return;
      const text = this.#getPastedText(e.clipboardData);
      e.preventDefault();
      const pasted = text.split(',');
      if (pasted.length > 1) {
        this.#addTags(pasted);
      } else {
        this.#addTag(pasted[0] ?? '');
      }
    };
    this.addEventListener('paste', handlePaste, { capture: true });
  }
}

customElements.define('tag-list', TagList);

export default TagList;
