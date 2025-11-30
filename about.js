import { serviceWorkerManager } from './src/ServiceWorkerManager.js';

document.addEventListener('DOMContentLoaded', async () => {
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
    serviceWorkerManager.handleUpdateNow();
  });
});