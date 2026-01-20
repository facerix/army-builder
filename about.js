import { serviceWorkerManager } from './src/ServiceWorkerManager.js';
import '/components/UpdateNotification.js';

const whenLoaded = Promise.all([customElements.whenDefined('update-notification')]);

whenLoaded.then(async () => {
  // Set up update notification
  const updateNotification = document.querySelector('update-notification');

  // Listen for service worker updates
  window.addEventListener('sw-update-available', event => {
    console.log('Service worker update available, showing notification');
    updateNotification.show(event.detail.pendingWorker);
  });

  // Initialize service worker
  await serviceWorkerManager.register();

  const version = document.getElementById('version');
  const latestVersion = document.getElementById('latestVersion');
  const latestVersionContainer = document.getElementById('latestVersionContainer');
  const noUpdateContainer = document.getElementById('noUpdateContainer');
  const btnUpdate = document.getElementById('btnUpdate');

  // Get and display version information
  const currentVersion = await serviceWorkerManager.getVersion();
  if (currentVersion) {
    version.innerText = currentVersion;
  } else {
    version.innerText = 'Not available';
  }

  // Check for latest version
  const latestVersionInfo = await serviceWorkerManager.getLatestVersion();
  if (latestVersionInfo && latestVersionInfo !== currentVersion) {
    // Show latest version if different
    latestVersion.innerText = latestVersionInfo;
    latestVersionContainer.style.display = 'flex';
    noUpdateContainer.style.display = 'none';
  } else {
    // Hide update UI if no update available
    latestVersionContainer.style.display = 'none';
    if (currentVersion) {
      noUpdateContainer.style.display = 'block';
    } else {
      noUpdateContainer.style.display = 'none';
    }
  }

  btnUpdate.addEventListener('click', () => {
    const pendingWorker =
      updateNotification.pendingWorkerInstance || serviceWorkerManager.getRegistration()?.waiting;
    if (pendingWorker) {
      serviceWorkerManager.handleUpdateNow(pendingWorker);
    } else {
      serviceWorkerManager.checkForUpdates();
    }
  });
});
