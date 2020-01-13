
import { initRouter } from './router.js';

const init = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAHYd_wPzROTqcHicMCcvNeGKlM0FnOs9I',
    authDomain: 'social-network-42ae7.firebaseapp.com',
    databaseURL: 'https://social-network-42ae7.firebaseio.com',
    projectId: 'social-network-42ae7',
    storageBucket: 'social-network-42ae7.appspot.com',
    messagingSenderId: '788626957504',
    appId: '1:788626957504:web:85c6ca422b32f7cc433925',
    measurementId: 'G-PYGE45NH4C',
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  initRouter();
};

window.addEventListener('load', init);
