import { serviceWorkerManager } from './src/ServiceWorkerManager.js';
import '/components/UpdateNotification.js';

const whenLoaded = Promise.all([
  customElements.whenDefined("update-notification"),
]);

whenLoaded.then(async () => {
  // Set up update notification
  const updateNotification = document.querySelector('update-notification');

  // Listen for service worker updates
  window.addEventListener('sw-update-available', (event) => {
    console.log('Service worker update available, showing notification');
    updateNotification.show(event.detail.pendingWorker);
  });

  // Initialize service worker
  await serviceWorkerManager.register();

  const version = document.getElementById('version');
  const btnUpdate = document.getElementById('btnUpdate');

  // Get and display version information
  const versionInfo = await serviceWorkerManager.getVersion();
  if (versionInfo) {
    version.innerText = versionInfo;
  } else {
    version.innerText = 'Not available';
  }

  btnUpdate.addEventListener('click', () => {
    const pendingWorker = updateNotification.pendingWorkerInstance || serviceWorkerManager.getRegistration()?.waiting;
    if (pendingWorker) {
      serviceWorkerManager.handleUpdateNow(pendingWorker);
    } else {
      serviceWorkerManager.checkForUpdates();
    }
  });
});