import firebase from 'firebase'

export const appName = `react-application-220519`;

export const firebaseConfig = {
    apiKey: `AIzaSyBcVNIAqt7X9_wIxjO7mqFpEsxfa2vxZWY`,
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: `376317820874`,
    appId: `1:376317820874:web:8b7ebf03f58a8eeb`
};

firebase.initializeApp(firebaseConfig);