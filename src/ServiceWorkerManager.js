/**
 * Service Worker Manager
 * Handles service worker registration, updates, and notifications
 */

export class ServiceWorkerManager {
  constructor() {
    this.pendingWorker = null;
    this.updateCheckInterval = null;
    this.isSupported = 'serviceWorker' in navigator;
  }

  /**
   * Initialize service worker registration and update handling
   */
  async init() {
    if (!this.isSupported) {
      console.log('Service Worker not supported');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      
      this.setupUpdateHandling(registration);
      this.startPeriodicUpdateChecks(registration);
      
    } catch (error) {
      console.log('SW registration failed: ', error);
    }
  }

  /**
   * Set up update detection and notification
   */
  setupUpdateHandling(registration) {
    registration.addEventListener('updatefound', () => {
      console.log('New service worker found');
      this.pendingWorker = registration.installing;
      
      this.pendingWorker.addEventListener('statechange', () => {
        if (this.pendingWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('New service worker installed, showing update notification');
          this.showUpdateNotification();
        }
      });
    });
  }

  /**
   * Start periodic update checks
   */
  startPeriodicUpdateChecks(registration) {
    // Check for updates on page load
    registration.update();
    
    // Set up periodic update checks (every 30 minutes)
    this.updateCheckInterval = setInterval(() => {
      registration.update();
    }, 30 * 60 * 1000);
  }

  /**
   * Show update notification to user
   */
  showUpdateNotification() {
    // Try to find the update-notification web component
    const updateNotification = document.querySelector('update-notification');
    
    if (updateNotification) {
      updateNotification.show(this.pendingWorker);
    }
  }

  /**
   * Handle user accepting the update
   * @param {ServiceWorker} pendingWorker - The pending service worker (optional, uses this.pendingWorker if not provided)
   */
  handleUpdateNow(pendingWorker = null) {
    const worker = pendingWorker || this.pendingWorker;
    
    if (worker) {
      // Tell the service worker to skip waiting and activate
      worker.postMessage({ type: 'SKIP_WAITING' });
      
      // Listen for the controlling service worker to change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }

  /**
   * Manually check for updates
   */
  async checkForUpdates() {
    if (!this.isSupported) return false;
    
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        return true;
      }
    } catch (error) {
      console.error('[ServiceWorkerManager] Failed to check for updates:', error);
    }
    return false;
  }

  /**
   * Force trigger an update notification for testing
   */
  async forceUpdateNotification() {
    if (this.pendingWorker) {
      this.showUpdateNotification();
    } else {
      console.warn('[ServiceWorkerManager] No pending worker available for testing');
    }
  }

  /**
   * Clean up resources
   */
  destroy() {
    if (this.updateCheckInterval) {
      clearInterval(this.updateCheckInterval);
      this.updateCheckInterval = null;
    }
  }
}

// Export a singleton instance
export const serviceWorkerManager = new ServiceWorkerManager();

// Make it globally accessible for UpdateNotification component
window.serviceWorkerManager = serviceWorkerManager;

