importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBg8cUs7HlCdPjys9mA1NMD-n446IzF_IQ",
    authDomain: "notifierps-1380a.firebaseapp.com",
    projectId: "notifierps-1380a",
    storageBucket: "notifierps-1380a.appspot.com",
    messagingSenderId: "320524792223",
    appId: "1:320524792223:web:e63aa897adb325cc574daa",
    measurementId: "G-J0N9EQF32S"
};

const defaultConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true,
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

