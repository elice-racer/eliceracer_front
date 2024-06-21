import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(config);
const messaging = getMessaging();

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  const messaging = getMessaging(app);
}

//토큰값 얻기
getToken(messaging, {
  vapidKey: import.meta.env.VITE_VAPID_KEY,
})
  .then(async currentToken => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...

      const access_token = localStorage.getItem("userToken");

      const config = {
        headers: {
          "Content-Type": `application/json`,
          Authorization: "Bearer " + access_token,
        },
      };
      const res = await axios.post(import.meta.env.VITE_NOTIFICATIONS_URL, { token: currentToken }, config);
      if (res.status === 201) {
        console.log("Success connected notification elice-app");
      }
    } else {
      // Show permission request UI
      console.log("No registration token available. Request permission to generate one.");
      // ...
    }
  })
  .catch(err => {
    console.log("An error occurred while retrieving token. ", err);
    console.log(err.response?.data);
    // ...
  });

//포그라운드 메시지 수신
onMessage(messaging, payload => {
  console.log("Message received. ", payload);
  console.log(` ${payload.notification.title} ${payload.notification.body}`);
});
