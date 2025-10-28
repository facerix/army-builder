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
        
        .update-notification button:hover {
          background: #f0f0f0;
        }
        
        .update-notification button:active {
          transform: scale(0.98);
        }
      </style>
      <div class="update-notification">
        <strong>Update Available!</strong>
        <p>A new version of Personnel is ready.</p>
        <button class="update-now">Update Now</button>
        <button class="update-later">Later</button>
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
      this.dispatchEvent(new CustomEvent('update-notification-shown', {
        detail: { pendingWorker },
        bubbles: true,
        composed: true
      }));
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
      this.dispatchEvent(new CustomEvent('update-notification-hidden', {
        bubbles: true,
        composed: true
      }));
    }
  }

  /**
   * Handle user accepting the update
   */
  handleUpdateNow() {
    // Dispatch custom event before updating
    this.dispatchEvent(new CustomEvent('update-accepted', {
      detail: { pendingWorker: this.pendingWorker },
      bubbles: true,
      composed: true
    }));

    // Delegate to ServiceWorkerManager for the actual update logic
    if (window.serviceWorkerManager) {
      window.serviceWorkerManager.handleUpdateNow(this.pendingWorker);
    } else {
      console.error('[UpdateNotification] ServiceWorkerManager not available');
    }
    this.hide();
  }

  /**
   * Handle user dismissing the update
   */
  handleUpdateLater() {
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('update-dismissed', {
      bubbles: true,
      composed: true
    }));
    
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

