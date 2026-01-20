// Singleton module for service worker registration
// Provides centralized management of service worker lifecycle
import { isDevelopmentMode } from './domUtils.js';

export class ServiceWorkerManager {
  #isRegistered = false;
  #registration = null;
  #listenersSetup = false;
  #developmentMode = isDevelopmentMode();
  #swFile = this.#developmentMode ? '/sw-dev.js' : '/sw.js';
  #isUpdating = false; // Track if we're currently updating

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

      // Check for multiple service workers (old + waiting)
      // Don't await - let it run in background
      this.#checkForMultipleWorkers().catch(error => {
        console.warn(`[Personnel] Error checking for multiple workers:`, error);
      });

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
   * Check for multiple service workers and log diagnostic info
   * @private
   */
  async #checkForMultipleWorkers() {
    if (!this.#registration) return;

    const active = this.#registration.active;
    const waiting = this.#registration.waiting;
    const installing = this.#registration.installing;
    const controller = navigator.serviceWorker.controller;

    if ((active && waiting) || (active && installing) || (waiting && installing)) {
      console.warn(`[Personnel] Multiple service workers detected:`, {
        active: active ? `${active.state} (script: ${active.scriptURL})` : 'none',
        waiting: waiting ? `${waiting.state} (script: ${waiting.scriptURL})` : 'none',
        installing: installing ? `${installing.state} (script: ${installing.scriptURL})` : 'none',
        controller: controller ? `${controller.state} (script: ${controller.scriptURL})` : 'none',
      });

      // If there's a waiting worker and we have a controller
      if (waiting && controller && waiting !== controller && !this.#isUpdating) {
        // Check if they're actually different versions
        try {
          const activeVersion = await this.getVersion();
          const waitingVersion = await this.getLatestVersion();
          if (activeVersion === waitingVersion) {
            console.log(`[Personnel] Waiting worker is same version as active. Auto-activating...`);
            // Same version, just activate it (stuck state)
            await this.skipWaiting(waiting);
            return;
          }
        } catch (error) {
          console.warn(`[Personnel] Could not verify versions, proceeding normally:`, error);
        }
      }
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
    // Only show notification if we're not already updating and versions are different
    setTimeout(async () => {
      if (this.#registration.waiting && navigator.serviceWorker.controller && !this.#isUpdating) {
        const waitingWorker = this.#registration.waiting;

        // Check if versions are actually different
        try {
          const currentVersion = await this.getVersion();
          const latestVersion = await this.getLatestVersion();
          if (currentVersion === latestVersion) {
            console.log(`[Personnel] Waiting worker is same version, skipping notification`);
            return;
          }
        } catch (error) {
          console.warn(`[Personnel] Could not verify versions:`, error);
          // If we can't verify, assume it's different and show notification
        }

        console.log(`[Personnel] Found waiting service worker from previous session`);
        this.#dispatchUpdateEvent(waitingWorker);
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
        // Only dispatch if we're not already updating and it's actually a different version
        if (
          (newWorker.state === 'installed' || newWorker.state === 'waiting') &&
          navigator.serviceWorker.controller &&
          !this.#isUpdating
        ) {
          // Verify it's actually a different version before showing notification
          this.getLatestVersion()
            .then(latestVersion => {
              return this.getVersion().then(currentVersion => {
                if (currentVersion === latestVersion) {
                  console.log(`[Personnel] New worker is same version, skipping notification`);
                  return false;
                }
                return true;
              });
            })
            .then(shouldShow => {
              if (shouldShow) {
                console.log(
                  `[Personnel] New service worker available. Consider refreshing the page.`
                );
                // Dispatch event with the actual new worker
                this.#dispatchUpdateEvent(newWorker);
              }
              // Remove the listener since we've handled the update
              newWorker.removeEventListener('statechange', handleStateChange);
            })
            .catch(error => {
              console.warn(`[Personnel] Could not verify version, showing notification:`, error);
              // If we can't verify, assume it's different and show notification
              console.log(
                `[Personnel] New service worker available. Consider refreshing the page.`
              );
              this.#dispatchUpdateEvent(newWorker);
              newWorker.removeEventListener('statechange', handleStateChange);
            });
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
    // Don't dispatch if we're already updating
    if (this.#isUpdating) {
      console.log(`[Personnel] Update already in progress, skipping notification`);
      return;
    }

    const event = new CustomEvent('sw-update-available', {
      detail: {
        registration: this.#registration,
        pendingWorker: pendingWorker || this.#registration.waiting,
      },
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

    return new Promise(resolve => {
      const messageChannel = new window.MessageChannel();
      messageChannel.port1.onmessage = event => {
        resolve(event.data);
      };

      this.#registration.active.postMessage({ type: 'GET_CACHE_INFO' }, [messageChannel.port2]);
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
   * Get the latest available service worker version (from waiting/installing worker)
   * @returns {Promise<string|null>}
   */
  async getLatestVersion() {
    if (!this.#registration) {
      return null;
    }

    // Check waiting worker first, then installing
    const pendingWorker = this.#registration.waiting || this.#registration.installing;
    if (!pendingWorker) {
      return null;
    }

    try {
      // Send message to get version from pending worker
      return new Promise((resolve, reject) => {
        const messageChannel = new window.MessageChannel();
        const timeout = setTimeout(() => {
          messageChannel.port1.close();
          resolve(null);
        }, 1000);

        messageChannel.port1.onmessage = event => {
          clearTimeout(timeout);
          messageChannel.port1.close();
          resolve(event.data?.version || null);
        };

        messageChannel.port1.onerror = () => {
          clearTimeout(timeout);
          messageChannel.port1.close();
          resolve(null);
        };

        pendingWorker.postMessage({ type: 'GET_CACHE_INFO' }, [messageChannel.port2]);
      });
    } catch (error) {
      console.error(`[Personnel] Failed to get latest service worker version:`, error);
      return null;
    }
  }

  /**
   * Dispatch update progress event
   * @private
   */
  #dispatchUpdateProgress(status) {
    const event = new CustomEvent('sw-update-progress', {
      detail: { status },
    });
    window.dispatchEvent(event);
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

    this.#dispatchUpdateProgress('Sending activation signal...');
    console.log(`[Personnel] Sending SKIP_WAITING message to service worker`);
    targetWorker.postMessage({ type: 'SKIP_WAITING' });

    // Wait for the new service worker to take control
    return new Promise(resolve => {
      let resolved = false;

      const handleControllerChange = () => {
        if (resolved) return;
        // Verify that we actually have a new controller
        if (navigator.serviceWorker.controller) {
          this.#dispatchUpdateProgress('New service worker activated...');
          console.log(`[Personnel] New service worker is now controlling the page`);
          // Verify the waiting worker is gone
          setTimeout(() => {
            if (!this.#registration.waiting || this.#registration.waiting !== targetWorker) {
              console.log(`[Personnel] Old waiting worker has been terminated`);
              this.#dispatchUpdateProgress('Preparing to reload...');
            } else {
              console.warn(`[Personnel] Warning: Waiting worker still exists`);
              this.#dispatchUpdateProgress('Waiting for old worker to terminate...');
            }
            if (!resolved) {
              resolved = true;
              resolve();
            }
          }, 200);
        } else {
          // If no controller yet, wait a bit and check again
          this.#dispatchUpdateProgress('Waiting for service worker activation...');
          setTimeout(() => {
            if (navigator.serviceWorker.controller) {
              console.log(`[Personnel] New service worker is now controlling the page (delayed)`);
              this.#dispatchUpdateProgress('Preparing to reload...');
              if (!resolved) {
                resolved = true;
                resolve();
              }
            } else {
              console.warn(`[Personnel] No controller after skipWaiting, resolving anyway`);
              this.#dispatchUpdateProgress('Reloading...');
              if (!resolved) {
                resolved = true;
                resolve();
              }
            }
          }, 500);
        }
      };

      // Also listen for SW_ACTIVATED message from the service worker
      const handleMessage = event => {
        if (event.data && event.data.type === 'SW_ACTIVATED') {
          console.log(`[Personnel] Service worker confirmed activation: ${event.data.version}`);
          this.#dispatchUpdateProgress('Service worker activated. Reloading...');
          if (!resolved) {
            resolved = true;
            navigator.serviceWorker.removeEventListener('message', handleMessage);
            navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
            resolve();
          }
        }
      };

      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange, {
        once: true,
      });
      navigator.serviceWorker.addEventListener('message', handleMessage);

      // Fallback timeout in case controllerchange doesn't fire
      setTimeout(() => {
        if (!resolved) {
          console.log(`[Personnel] Skip waiting timeout, proceeding with reload`);
          this.#dispatchUpdateProgress('Reloading page...');
          resolved = true;
          navigator.serviceWorker.removeEventListener('message', handleMessage);
          navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
          resolve();
        }
      }, 3000);
    });
  }

  /**
   * Clear all service worker caches
   * This will force a fresh download of all cached resources
   * @returns {Promise<void>}
   */
  async clearAllCaches() {
    if (!('caches' in window)) {
      console.warn(`[Personnel] Cache API not supported`);
      return;
    }

    try {
      const cacheNames = await caches.keys();
      const personnelCaches = cacheNames.filter(name => name.startsWith('personnel-cache-'));

      console.log(`[Personnel] Clearing ${personnelCaches.length} cache(s):`, personnelCaches);

      await Promise.all(personnelCaches.map(cacheName => caches.delete(cacheName)));

      console.log(`[Personnel] Successfully cleared all caches`);

      // Unregister service worker to force fresh registration
      if (this.#registration) {
        await this.#registration.unregister();
        console.log(`[Personnel] Service worker unregistered`);
        this.#isRegistered = false;
        this.#registration = null;
      }

      // Reload page to re-register service worker with fresh cache
      window.location.reload();
    } catch (error) {
      console.error(`[Personnel] Failed to clear caches:`, error);
      throw error;
    }
  }

  /**
   * Handle update now request from UpdateNotification component
   * @param {ServiceWorker} pendingWorker - The pending service worker
   * @returns {Promise<void>}
   */
  async handleUpdateNow(pendingWorker) {
    // Prevent multiple update attempts
    if (this.#isUpdating) {
      console.log(`[Personnel] Update already in progress`);
      return;
    }

    this.#isUpdating = true;
    console.log(`[Personnel] Handling update now request`);

    try {
      // Skip waiting and activate the new service worker
      await this.skipWaiting(pendingWorker);

      // Double-check that we have a controller before reloading
      if (!navigator.serviceWorker.controller) {
        this.#dispatchUpdateProgress('Verifying service worker activation...');
        console.warn(
          `[Personnel] No service worker controller after skipWaiting, waiting a bit longer...`
        );
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Verify the old worker is gone before reloading
      if (this.#registration.waiting && this.#registration.waiting === pendingWorker) {
        this.#dispatchUpdateProgress('Waiting for old worker to terminate...');
        console.warn(
          `[Personnel] Warning: Waiting worker still exists after skipWaiting. Waiting longer...`
        );
        // Wait a bit more for the worker to activate
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check again
        if (this.#registration.waiting === pendingWorker) {
          console.error(
            `[Personnel] Error: Waiting worker still exists. This may cause multiple workers.`
          );
        }
      }

      // Reload the page to use the new service worker
      this.#dispatchUpdateProgress('Reloading page...');
      console.log(`[Personnel] Reloading page to use new service worker...`);
      window.location.reload();
    } catch (error) {
      console.error(`[Personnel] Failed to update service worker:`, error);
      this.#dispatchUpdateProgress('Update failed. Please try again.');
      this.#isUpdating = false; // Reset on error
      throw error; // Re-throw so UpdateNotification can handle it
    }
  }
}

// Create and export singleton instance
export const serviceWorkerManager = new ServiceWorkerManager();

// Make it globally accessible for UpdateNotification component
window.serviceWorkerManager = serviceWorkerManager;
