import * as firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyChLKmr3hQeA6c1BJuZiQEHlXn5MxNttfg',
  authDomain: 'bharat-b4a57.firebaseapp.com',
  databaseURL: 'https://bharat-b4a57.firebaseio.com',
  projectId: 'bharat-b4a57',
  storageBucket: 'bharat-b4a57.appspot.com',
  messagingSenderId: '675514461582'
})

export {firebase, firebaseApp}
