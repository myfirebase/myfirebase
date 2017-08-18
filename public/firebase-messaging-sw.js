// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    'messagingSenderId': 'Your-sender-id'
});
const messaging = firebase.messaging();

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
messaging.setBackgroundMessageHandler(function(payload) {
    // Customize notification here
});