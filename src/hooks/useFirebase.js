import * as firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAeQR76Q28e6ER5YGKZKOjpvn1e87Xv6Lk',
  authDomain: 'spotify-collaborative-queue.firebaseapp.com',
  databaseURL: 'https://spotify-collaborative-queue.firebaseio.com',
  projectId: 'spotify-collaborative-queue',
  storageBucket: 'spotify-collaborative-queue.appspot.com',
  messagingSenderId: '201649952735',
  appId: '1:201649952735:web:a2971fa23b4832f0',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
