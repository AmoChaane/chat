import { initializeApp } from "firebase/app";

const config = {
  /* TODO: ADD YOUR FIREBASE CONFIGURATION OBJECT HERE */
  apiKey: "AIzaSyBP0UGFll98tjApQ6GJzFizNyEdf3mQDbs",
  authDomain: "codepilot4.firebaseapp.com",
  projectId: "codepilot4",
  storageBucket: "codepilot4.appspot.com",
  messagingSenderId: "149989451569",
  appId: "1:149989451569:web:e3154b8cdf3c6845663210",
  measurementId: "G-FLVCQTT07E"
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}

initializeApp(config);