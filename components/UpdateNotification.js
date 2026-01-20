/**
 * UpdateNotification Web Component
 * Displays a notification when a service worker update is available
 * Uses Shadow DOM with encapsulated styles
 */

class UpdateNotification extends HTMLElement {
  constructor() {
    super();
    this.pendingWorker = null;
    this.isVisible = false;
    this.isUpdating = false;
    this.boundHandleUpdateNow = this.handleUpdateNow.bind(this);
    this.boundHandleUpdateLater = this.handleUpdateLater.bind(this);

    // Attach shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.cleanupEventListeners();
    // Clean up update progress listener if it exists
    if (this._updateProgressHandler) {
      window.removeEventListener('sw-update-progress', this._updateProgressHandler);
      this._updateProgressHandler = null;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .update-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #7a7a7a 0%, #3a3a3a 50%, #5a5a5a 100%);
          color: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          z-index: 1000;
          max-width: 300px;
          display: none;
        }
        
        .update-notification strong {
          display: block;
          margin-bottom: 8px;
        }
        
        .update-notification p {
          margin: 0 0 12px 0;
        }
        
        .update-notification button {
          background: white;
          color: #5a5a5a;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          margin: 8px 8px 0 0;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
        }
        
        .update-notification button:hover:not(:disabled) {
          background: #f0f0f0;
        }
        
        .update-notification button:active:not(:disabled) {
          transform: scale(0.98);
        }
        
        .update-notification button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .updating-state {
          display: none;
        }
        
        .updating-state.active {
          display: block;
        }
        
        .update-actions {
          display: block;
        }
        
        .update-actions.hidden {
          display: none;
        }
        
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .update-status {
          font-size: 13px;
          opacity: 0.9;
          margin-top: 8px;
        }
      </style>
      <div class="update-notification">
        <strong class="title">Update Available!</strong>
        <p class="message">A new version of Personnel is ready.</p>
        <div class="update-actions">
          <button class="update-now">Update Now</button>
          <button class="update-later">Later</button>
        </div>
        <div class="updating-state">
          <div class="spinner"></div>
          <strong>Updating...</strong>
          <p class="update-status">Please wait while we install the update.</p>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const updateNowBtn = this.shadowRoot.querySelector('.update-now');
    const updateLaterBtn = this.shadowRoot.querySelector('.update-later');

    if (updateNowBtn) {
      updateNowBtn.addEventListener('click', this.boundHandleUpdateNow);
    }

    if (updateLaterBtn) {
      updateLaterBtn.addEventListener('click', this.boundHandleUpdateLater);
    }
  }

  cleanupEventListeners() {
    const updateNowBtn = this.shadowRoot.querySelector('.update-now');
    const updateLaterBtn = this.shadowRoot.querySelector('.update-later');

    if (updateNowBtn) {
      updateNowBtn.removeEventListener('click', this.boundHandleUpdateNow);
    }

    if (updateLaterBtn) {
      updateLaterBtn.removeEventListener('click', this.boundHandleUpdateLater);
    }
  }

  /**
   * Show the update notification
   * @param {ServiceWorker} pendingWorker - The pending service worker
   */
  show(pendingWorker) {
    this.pendingWorker = pendingWorker;
    const notification = this.shadowRoot.querySelector('.update-notification');

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
customElements.define('update-notification', UpdateNotification);

export default UpdateNotification;
