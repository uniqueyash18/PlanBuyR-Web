// firebase.js
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../config/firebase";

export { messaging, getToken, onMessage };

const requestNotificationPermission = async () => {
  const isAlreadyFirebaseSaved = localStorage.getItem("fireBaseToken");
  if (isAlreadyFirebaseSaved) {
    return isAlreadyFirebaseSaved;
  }

  try {
    // Check if the browser supports notifications
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications');
      return null;
    }

    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      console.error('This browser does not support service workers');
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        // Register the service worker first
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-cloud-messaging-push-scope'
        });
        
        console.log('Service Worker registered successfully:', registration);

        const token = await getToken(messaging, {
          vapidKey: "BDXtW1Tu4PSTYDsLptOuEm027F8qQ7KAOQL7zxL7oEKMiWUM2PlI565lzGIKjG3veRGd4YHQI96MKn8ah6op3S8",
          serviceWorkerRegistration: registration
        });

        if (token) {
          localStorage.setItem("fireBaseToken", token);
          console.log("Device token:", token);
          return token;
        } else {
          console.error("No registration token available.");
          return null;
        }
      } catch (error) {
        console.error("Error registering service worker:", error);
        return null;
      }
    } else {
      console.error("Notification permission denied.");
      return null;
    }
  } catch (error) {
    console.error("Error while requesting notification permission:", error);
    return null;
  }
};

export default requestNotificationPermission;
