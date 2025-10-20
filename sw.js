// Service Worker for Personnel (Army Builder)
// Version will be automatically updated during build process

const CACHE_VERSION = '1.3.6'; // This will be replaced by build script
const CACHE_NAME = `personnel-cache-v${CACHE_VERSION}`;

// Files that should be cached with version control
const VERSIONED_FILES = [
  '/',
  '/index.html',
  '/index.js',
  '/about.html',
  '/main.css',
  '/40k/index.html',
  '/40k/40k.js',
  '/40k/40k-army-data.js',
  '/40k/list/index.html',
  '/40k/list/40k-list.js',
  '/aos/index.html',
  '/aos/aos.js',
  '/aos/aos-army-data.js',
  '/aos/lb.html',
  '/aos/list/index.html',
  '/aos/list/aos-list.js',
  '/components/AOSSection.js',
  '/components/CategorySection.js',
  '/components/OptionsModal.js',
  '/components/Regiment.js',
  '/components/UnitModal.js',
  '/src/DataStore.js',
  '/src/DBDataStore.js',
  '/src/domUtils.js',
  '/src/factions.js',
  '/src/parsers.js',
  '/src/uuid.js',
  '/src/ServiceWorkerManager.js',
  '/components/UpdateNotification.js'
];

// Static asset patterns (using prefix matching for directories)
// These files can be cached indefinitely and won't change between versions
const STATIC_ASSET_PATTERNS = [
  '/images/',        // All files under /images/ (including subdirectories)
  '/icons/',        // All files under /icons/ (including subdirectories)
  '/crossed-swords.svg',
];

/**
 * Check if a pathname matches any static asset pattern
 * @param {string} pathname - The URL pathname to check
 * @returns {boolean} - True if pathname matches a static pattern
 */
function isStaticAsset(pathname) {
  return STATIC_ASSET_PATTERNS.some(pattern => {
    // If pattern ends with '/', treat as directory prefix
    if (pattern.endsWith('/')) {
      return pathname.startsWith(pattern);
    }
    // Otherwise exact match
    return pathname === pattern;
  });
}

// Install event - cache versioned resources
self.addEventListener('install', event => {
  console.log(`[SW] Installing version ${CACHE_VERSION}`);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`[SW] Caching ${VERSIONED_FILES.length} versioned files`);
        return cache.addAll(VERSIONED_FILES);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        // Skip waiting to activate immediately for faster updates
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Installation failed:', error);
      })
  );
  
  // Force activation immediately on install
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log(`[SW] Activating version ${CACHE_VERSION}`);
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old caches that don't match current version
          if (cacheName !== CACHE_NAME && cacheName.startsWith('personnel-cache-')) {
            console.log(`[SW] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // For versioned files, always try network first to check for updates
  const isVersionedFile = VERSIONED_FILES.includes(url.pathname);
  
  event.respondWith(
    (isVersionedFile ? networkFirst(event.request) : cacheFirst(event.request))
  );
});

function networkFirst(request) {
  return fetch(request)
    .then(fetchResponse => {
      // Only cache successful responses
      if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
        return fetchResponse;
      }
      
      // Clone the response
      const responseToCache = fetchResponse.clone();
      
      // Update cache with fresh content
      caches.open(CACHE_NAME)
        .then(cache => {
          cache.put(request, responseToCache);
        });
      
      return fetchResponse;
    })
    .catch(error => {
      console.log(`[SW] Network failed for ${request.url}, falling back to cache`);
      return caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
          throw error;
        });
    });
}

function cacheFirst(request) {
  return caches.match(request)
    .then(response => {
      if (response) {
        console.log(`[SW] Serving from cache: ${new URL(request.url).pathname}`);
        return response;
      }
      
      console.log(`[SW] Fetching from network: ${new URL(request.url).pathname}`);
      return fetch(request)
        .then(fetchResponse => {
          // Only cache successful responses
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse;
          }
          
          // Clone the response
          const responseToCache = fetchResponse.clone();
          
          // Determine which cache to use based on file type
          const url = new URL(request.url);
          const cacheName = isStaticAsset(url.pathname) ? 
            'personnel-static-cache' : CACHE_NAME;
          
          caches.open(cacheName)
            .then(cache => {
              cache.put(request, responseToCache);
            });
          
          return fetchResponse;
        })
        .catch(error => {
          console.error('[SW] Fetch failed:', error);
          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
          throw error;
        });
    });
}

// Handle messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

