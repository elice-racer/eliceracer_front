importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const cacheName = "cache-v1";
const appShellFiles = ["/favicon.ico", "/pwa/*", "/imgs/*"];

self.addEventListener("install", function (e) {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image, // 웹 푸시 이미지는 icon
    tag: resultData.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener("notificationclick", function (event) {
//   console.log("notification click");
//   const url = "/";
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });

const firebaseConfig = {
  apiKey: "AIzaSyDk88Mukm4U1CFIYUkswLWySmHdvzAbgh0",
  authDomain: "elicerracer-6a153.firebaseapp.com",
  projectId: "elicerracer-6a153",
  storageBucket: "elicerracer-6a153.appspot.com",
  messagingSenderId: "335591681747",
  appId: "1:335591681747:web:12cb0493b14afb723b6e26",
  measurementId: "G-96N6G735FC",
};

// const firebaseConfig = {
//   apiKey: process.env.VITE_FIREBASE_API_KEY,
//   authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.VITE_FIREBASE_APP_ID,
//   measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    title: payload.notification.title,
    icon: "imgs/elice-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
