
import { initRouter } from './router.js';

const init = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDAG4mnPi1pRHKO19EJYKjxnPjndVQQmZc',
    authDomain: 'food-network-3b56d.firebaseapp.com',
    databaseURL: 'https://food-network-3b56d.firebaseio.com',
    projectId: 'food-network-3b56d',
    storageBucket: 'food-network-3b56d.appspot.com',
    messagingSenderId: '23382895782',
    appId: '1:23382895782:web:8873e4f19d6774f61bd867',
    measurementId: 'G-Y7HLF43C4X',
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  initRouter();
};

window.addEventListener('load', init);
