/**
 * MegaMenu Web Component
 * Displays a "mega menu" for the app, customized based on inputs (e.g. 40k factions, etc)
 * Uses Shadow DOM with encapsulated styles
 */

import { h } from '/src/domUtils.js';

const CSS_TEMPLATE = `
.mega-menu {
  width: 90vw;
  display: flex;
  flex-wrap: wrap;
  background-color: #1c3247;
  color: white;
  gap: 1rem;
  text-align: left;
  padding: 0 1rem 0.5rem;

  .mega-menu-column {
    background-color: #274764;
    flex: 1;
    padding: 0 1rem;
    justify-items: center;

    h3 {
      text-align: center;
      border-bottom: 2px groove white;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0;

        img {
          width: 1rem;
          filter: invert(1);
        }

        a {
          color: white;
          text-decoration: none;

          &[href=''] {
            color: #666;
            cursor: not-allowed;
            filter: grayscale(100%);
            opacity: 0.5;

            &:hover::after,
            &:focus-visible::after {
              content: 'Coming\A0soon';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: white;
              text-align: center;
              font-size: 0.8rem;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              padding: 0.5rem;
              border-radius: 0.25rem;
              background-color: rgba(0, 0, 0, 0.5);
            }
          }

          &:hover {
            text-decoration: underline #950817;
          }

          &:focus-visible {
            outline: var(--accent-color) auto 1px;
          }
        }
      }
    }
  }
}

[popover]:popover-open {
  opacity: 1;
  height: fit-content;
  /* transform: translateY(0); */
}

[popover] {
  /* Final state of the exit animation */
  opacity: 0;
  height: 0;
  /* transform: translateY(-100%); */

  position-anchor: --anc;
  top: anchor(end);
  right: anchor(end);
  border: none;
  margin: 0;
  padding: 0;
  transition-property: opacity, transform, overlay, display, height;
  transition-duration: 0.25s;
  transition-behavior: allow-discrete;
  /* Using the shorthand transition property, we could write:
    transition: 
      opacity 0.7s,
      transform 0.7s,
      overlay 0.7s allow-discrete,
      display 0.7s allow-discrete;

    or even:
    transition: all 0.7s allow-discrete;
  */
}

/* Needs to be included after the previous [popover]:popover-open 
  rule to take effect, as the specificity is the same */
@starting-style {
  [popover]:popover-open {
    opacity: 0;
    height: 0;
    /* transform: translateY(-100%); */
  }
}
`;

class MegaMenu extends HTMLElement {
  #items = [];
  #ready = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.#ready) return;
    const shadow = this.shadowRoot;
    const style = document.createElement('style');
    style.textContent = CSS_TEMPLATE;
    shadow.appendChild(style);

    const menu = document.createElement('div');
    menu.className = 'mega-menu';
    shadow.appendChild(menu);

    this.#ready = true;
  }

  disconnectedCallback() {
    this.cleanupEventListeners();
    // do any event listener cleanup here
  }

  render() {
    if (!this.#ready) return;
    const megaMenu = document.createElement('div');
    this.shadowRoot.appendChild(megaMenu);
  }

  setupEventListeners() {
    // const updateNowBtn = this.shadowRoot.querySelector('.update-now');
    // const updateLaterBtn = this.shadowRoot.querySelector('.update-later');
    // if (updateNowBtn) {
    //   updateNowBtn.addEventListener('click', this.boundHandleUpdateNow);
    // }
    // if (updateLaterBtn) {
    //   updateLaterBtn.addEventListener('click', this.boundHandleUpdateLater);
    // }
  }

  cleanupEventListeners() {
    // const updateNowBtn = this.shadowRoot.querySelector('.update-now');
    // const updateLaterBtn = this.shadowRoot.querySelector('.update-later');
    // if (updateNowBtn) {
    //   updateNowBtn.removeEventListener('click', this.boundHandleUpdateNow);
    // }
    // if (updateLaterBtn) {
    //   updateLaterBtn.removeEventListener('click', this.boundHandleUpdateLater);
    // }
  }

  #regenerateMenuItems() {
    const menu = this.shadowRoot.querySelector('.mega-menu');
    menu.innerHTML = '';
    this.#items.forEach(item => {
      if (item.items) {
        // it's a column
        const subitems = item.items.map(item =>
          h('li', { className: 'mega-menu-item' }, [
            h('img', { src: item.image, alt: item.name }),
            h('a', { href: item.href, innerText: item.name }),
          ])
        );
        menu.appendChild(
          h('div', { className: 'mega-menu-column' }, [
            h('h3', { innerText: item.name }),
            h('ul', {}, subitems),
          ])
        );
      } else {
        // todo: add a single item to the menu
        menu.appendChild(
          h('div', { className: 'mega-menu-item' }, [
            h('img', { src: item.image, alt: item.name }),
            h('a', { href: item.href, innerText: item.name }),
          ])
        );
      }
    });
  }

  /**
   * @param {array} items
   */
  set items(items) {
    this.#items = items;
    this.#regenerateMenuItems();
    this.render();
  }

  /**
   * Show the update notification
   * @param {ServiceWorker} pendingWorker - The pending service worker
   */
  show(pendingWorker) {
    if (notification) {
      this.style.display = 'block';
      notification.style.display = 'block';
      this.isVisible = true;

      // Dispatch custom event for analytics or other tracking
      this.dispatchEvent(
        new CustomEvent('update-notification-shown', {
          detail: { pendingWorker },
          bubbles: true,
          composed: true,
        })
      );
    } else {
      console.error('[UpdateNotification] Could not find .update-notification element');
    }
  }

  /**
   * Hide the update notification
   */
  hide() {
    const notification = this.shadowRoot.querySelector('.update-notification');

    if (notification) {
      this.style.display = 'none';
      notification.style.display = 'none';
      this.isVisible = false;

      // Dispatch custom event
      this.dispatchEvent(
        new CustomEvent('update-notification-hidden', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  /**
   * Show updating state
   */
  showUpdating(status = 'Please wait while we install the update.') {
    this.isUpdating = true;
    const notification = this.shadowRoot.querySelector('.update-notification');
    const actions = this.shadowRoot.querySelector('.update-actions');
    const updatingState = this.shadowRoot.querySelector('.updating-state');
    const statusText = this.shadowRoot.querySelector('.update-status');
    const title = this.shadowRoot.querySelector('.title');
    const message = this.shadowRoot.querySelector('.message');

    if (notification && actions && updatingState) {
      actions.classList.add('hidden');
      updatingState.classList.add('active');
      if (statusText) {
        statusText.textContent = status;
      }
      if (title) {
        title.textContent = 'Updating...';
      }
      if (message) {
        message.style.display = 'none';
      }

      // Disable buttons
      const buttons = this.shadowRoot.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.disabled = true;
      });
    }
  }

  /**
   * Handle user accepting the update
   */
  handleUpdateNow() {
    // Show updating state immediately
    this.showUpdating('Activating new service worker...');

    // Dispatch custom event before updating
    this.dispatchEvent(
      new CustomEvent('update-accepted', {
        detail: { pendingWorker: this.pendingWorker },
        bubbles: true,
        composed: true,
      })
    );

    // Delegate to ServiceWorkerManager for the actual update logic
    if (window.serviceWorkerManager) {
      // Listen for update progress events
      const handleUpdateProgress = event => {
        if (event.detail && event.detail.status) {
          this.showUpdating(event.detail.status);
        }
      };

      // Store handler reference for cleanup
      this._updateProgressHandler = handleUpdateProgress;
      window.addEventListener('sw-update-progress', handleUpdateProgress);

      window.serviceWorkerManager.handleUpdateNow(this.pendingWorker).catch(error => {
        console.error('[UpdateNotification] Update failed:', error);
        // Show error state
        this.showUpdating('Update failed. Please try again.');
        this.isUpdating = false;
        // Re-enable buttons on error
        const buttons = this.shadowRoot.querySelectorAll('button');
        buttons.forEach(btn => {
          btn.disabled = false;
        });
        // Clean up event listener
        if (this._updateProgressHandler) {
          window.removeEventListener('sw-update-progress', this._updateProgressHandler);
          this._updateProgressHandler = null;
        }
      });
    } else {
      console.error('[UpdateNotification] ServiceWorkerManager not available');
      this.hide();
    }
  }

  /**
   * Handle user dismissing the update
   */
  handleUpdateLater() {
    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('update-dismissed', {
        bubbles: true,
        composed: true,
      })
    );

    this.hide();
  }

  /**
   * Check if notification is currently visible
   */
  get visible() {
    return this.isVisible;
  }

  /**
   * Get the pending worker
   */
  get pendingWorkerInstance() {
    return this.pendingWorker;
  }
}

// Register the custom element
customElements.define('mega-menu', MegaMenu);

export default MegaMenu;
