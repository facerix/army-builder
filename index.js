import { serviceWorkerManager } from './src/ServiceWorkerManager.js';
import './components/UpdateNotification.js';

const whenLoaded = Promise.all(
	[
		customElements.whenDefined("update-notification"),
	],
);

whenLoaded.then(() => {
  // Initialize service worker
  serviceWorkerManager.init();
});
