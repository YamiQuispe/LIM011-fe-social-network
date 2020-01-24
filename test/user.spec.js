// import MockFirebase from 'mock-cloud-firestore';

import {
  user, inicioSesion, signOut,
} from '../src/controller/firebase-controller.js';


// Configurando firebase mock
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

/*
const userData = {
  __collection__: {
    users: {
      __doc__: {
        user001: {
          idUser: 'user001',
          email: 'amapola@gmail.com',
          name: 'amapola',
          photoURL: 'fotoamapola.jpg',
        },
        user002: {
          idUser: 'user002',
          email: 'girasol@gmail.com',
          name: 'girasol',
          photoURL: 'fotogirasol.jpg',
        },
        user003: {
          idUser: 'user003',
          email: 'rosa@gmail.com',
          name: 'rosa',
          date: '20-10-12',
        },
        user004: {
          idUser: 'user004',
          email: 'azucena@gmail.com',
          name: 'azucena',
          date: '20-11-12',
        },
      },
    },
  },
};
*/

// global.firebase = new MockFirebase(userData, { isNaiveSnapshotListenerEnabled: true });

global.window.location.hash = '';

firebase.firestore().collection('users').doc('user001').set({
  idUser: 'user001',
  email: 'amapola@gmail.com',
  name: 'amapola',
  photoURL: 'fotoamapola.jpg',
});

firebase.firestore().collection('users').doc('user002').set({
  idUser: 'user002',
  email: 'girasol@gmail.com',
  name: 'girasol',
  photoURL: 'fotogirasol.jpg',
});

firebase.firestore().collection('users').doc('user003').set({
  idUser: 'user003',
  email: 'rosa@gmail.com',
  name: 'rosa',
  date: '20-10-12',
});

/* const newUser = {
  idUser: 'user004',
  email: 'geranio@gmail.com',
  name: 'geranio',
  photoURL: 'fotogeranio.jpg',
};
*/

describe('Autenticacion de usuario', () => {
  it('Debería ser una función.', () => {
    expect(typeof user).toBe('function');
  });

  it('Debería autenticar al usuario.', () => {
    inicioSesion('girasol@gmail.com', 'girasol')
      .then(() => {
        expect(user().email).toBe('girasol@gmail.com');
      });
  });

  it('Debería cambiar la vista cuando el usuario no está autenticado.', () => {
    signOut()
      .then(() => {
        window.location.hash = '';
        user();
        window.location.hash = '/iniciasesion';
      });
  });
});

/*
describe('Testeo de almacenamiento de posts en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof addNote).toBe('function');
  });

  it('Deberia agregar un usuario.', done => setUser(newUser).then(() => getUser(('user004'))

    done();
  })));
}); */
