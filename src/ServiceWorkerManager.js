// Singleton module for service worker registration
// Provides centralized management of service worker lifecycle
import { isDevelopmentMode } from './domUtils.js';

export class ServiceWorkerManager {
  #isRegistered = false;
  #registration = null;
  #listenersSetup = false;
  #developmentMode = isDevelopmentMode();
  #swFile = this.#developmentMode ? '/sw-dev.js' : '/sw.js';

  constructor() {
    // Prevent multiple instances
    if (ServiceWorkerManager.instance) {
      return ServiceWorkerManager.instance;
    }
    ServiceWorkerManager.instance = this;
  }

  /**
   * Register the service worker if supported and not already registered
   * @returns {Promise<ServiceWorkerRegistration|null>}
   */
  async register() {
    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      console.warn(`[Personnel] Service Workers not supported in this browser`);
      return null;
    }

    // Check if there's already an active registration
    const existingRegistration = await navigator.serviceWorker.getRegistration();
    if (existingRegistration) {
      console.log(`[Personnel] Service Worker already registered`);
      this.#registration = existingRegistration;
      this.#isRegistered = true;
      // Only set up update listeners if not already done
      if (!this.#listenersSetup) {
        this.#setupUpdateListeners();
      }
      return this.#registration;
    }

    // Don't register multiple times in the same instance
    if (this.#isRegistered) {
      console.log(`[Personnel] Service Worker already registered in this instance`);
      return this.#registration;
    }

    try {
      // Wait for page to load before registering
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          window.addEventListener('load', resolve, { once: true });
        });
      }

      // Register the service worker
      this.#registration = await navigator.serviceWorker.register(this.#swFile);
      this.#isRegistered = true;

      console.log(`[Personnel] Service Worker registered successfully:`, this.#registration.scope);

      // Set up event listeners for service worker updates
      this.#setupUpdateListeners();

      return this.#registration;
    } catch (error) {
      console.error(`[Personnel] Service Worker registration failed:`, error);
      return null;
    }
  }

  /**
   * Set up listeners for service worker updates
   * @private
   */
  #setupUpdateListeners() {
    if (!this.#registration || this.#listenersSetup) return;

    // Check if there's already a waiting service worker (update from previous session)
    // Use setTimeout to ensure event listeners are set up first
    setTimeout(() => {
      if (this.#registration.waiting && navigator.serviceWorker.controller) {
        console.log(`[Personnel] Found waiting service worker from previous session`);
        this.#dispatchUpdateEvent(this.#registration.waiting);
      }
    }, 0);

    // Listen for updates to the service worker
    this.#registration.addEventListener('updatefound', () => {
      const newWorker = this.#registration.installing;
      if (!newWorker) return;
      
      console.log(`[Personnel] New service worker installing...`);

      // Handle state changes
      const handleStateChange = () => {
        console.log(`[Personnel] Service worker state changed to: ${newWorker.state}`);
        
        // When the worker reaches "installed" or "waiting" state and there's an active controller,
        // that means an update is available
        if ((newWorker.state === 'installed' || newWorker.state === 'waiting') && navigator.serviceWorker.controller) {
          console.log(`[Personnel] New service worker available. Consider refreshing the page.`);
          // Dispatch event with the actual new worker
          this.#dispatchUpdateEvent(newWorker);
          // Remove the listener since we've handled the update
          newWorker.removeEventListener('statechange', handleStateChange);
        }
      };

      newWorker.addEventListener('statechange', handleStateChange);
      
      // Also check the current state in case it's already installed/waiting
      handleStateChange();
    });
    
    this.#listenersSetup = true;
  }

  /**
   * Dispatch a custom event when a service worker update is available
   * @private
   */
  #dispatchUpdateEvent(pendingWorker) {
    const event = new CustomEvent('sw-update-available', {
      detail: {
        registration: this.#registration,
        pendingWorker: pendingWorker || this.#registration.waiting
      }
    });
    window.dispatchEvent(event);
  }

  /**
   * Manually check for service worker updates
   * @returns {Promise<void>}
   */
  async checkForUpdates() {
    if (!this.#registration) {
      console.warn(`[Personnel] Cannot check for updates: no registration`);
      return;
    }

    try {
      console.log(`[Personnel] Manually checking for service worker updates...`);
      await this.#registration.update();
      
      // After update() completes, check if there's a waiting worker
      // Use a small delay to allow the updatefound event to fire if there's an update
      setTimeout(() => {
        if (this.#registration.waiting && navigator.serviceWorker.controller) {
          console.log(`[Personnel] Update check found waiting service worker`);
          this.#dispatchUpdateEvent(this.#registration.waiting);
        }
      }, 100);
    } catch (error) {
      console.error(`[Personnel] Failed to check for updates:`, error);
    }
  }

  /**
   * Get the current registration
   * @returns {ServiceWorkerRegistration|null}
   */
  getRegistration() {
    return this.#registration;
  }

  /**
   * Check if service worker is registered
   * @returns {boolean}
   */
  isRegistered() {
    return this.#isRegistered;
  }

  /**
   * Get cache information from the service worker
   * @returns {Promise<Object>}
   */
  async getCacheInfo() {
    if (!this.#registration || !this.#registration.active) {
      return null;
    }

    return new Promise((resolve) => {
      const messageChannel = new window.MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data);
      };

      this.#registration.active.postMessage(
        { type: 'GET_CACHE_INFO' },
        [messageChannel.port2]
      );
    });
  }

  /**
   * Get the current service worker version information
   * @returns {Promise<string|null>}
   */
  async getVersion() {
    if (!this.#registration || !this.#registration.active) {
      return null;
    }

    try {
      const cacheInfo = await this.getCacheInfo();
      return cacheInfo?.version || null;
    } catch (error) {
      console.error(`[Personnel] Failed to get service worker version:`, error);
      return null;
    }
  }

  /**
   * Force service worker to skip waiting and activate
   * @param {ServiceWorker} worker - Optional specific worker to skip waiting for
   * @returns {Promise<void>}
   */
  async skipWaiting(worker = null) {
    const targetWorker = worker || this.#registration?.waiting;
    
    if (!this.#registration || !targetWorker) {
      console.warn(`[Personnel] No waiting service worker to skip waiting`);
      return;
    }

    console.log(`[Personnel] Sending SKIP_WAITING message to service worker`);
    targetWorker.postMessage({ type: 'SKIP_WAITING' });
    
    // Wait for the new service worker to take control
    return new Promise((resolve) => {
      navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
    });
  }

  /**
   * Handle update now request from UpdateNotification component
   * @param {ServiceWorker} pendingWorker - The pending service worker
   * @returns {Promise<void>}
   */
  async handleUpdateNow(pendingWorker) {
    console.log(`[Personnel] Handling update now request`);
    
    try {
      // Skip waiting and activate the new service worker
      await this.skipWaiting(pendingWorker);
      
      // Reload the page to use the new service worker
      window.location.reload();
    } catch (error) {
      console.error(`[Personnel] Failed to update service worker:`, error);
    }
  }
}

// Create and export singleton instance
export const serviceWorkerManager = new ServiceWorkerManager();

// Make it globally accessible for UpdateNotification component
window.serviceWorkerManager = serviceWorkerManager;
