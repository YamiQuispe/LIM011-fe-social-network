// import MockFirebase from 'mock-cloud-firestore';

import {
  setUser, getUser, getUsersAuth, inicioSesion,
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


const newUser = {
  idUser: 'user004',
  email: 'geranio@gmail.com',
  name: 'geranio',
  photoURL: 'fotogeranio.jpg',
};


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


describe('Testeo de almacenamiento de usuarios en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof setUser).toBe('function');
  });

  it('Deberia agregar un usuario.', done => setUser(newUser.idUser, newUser)
    .then(() => getUser('user004')
      .then((doc) => {
        expect(doc.id).toBe('user004');
        done();
      })));
});


describe('Testeo de documentos de usuarios en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof getUser).toBe('function');
  });

  it('Debería devolver el documento de usuario que coincida con el id del usuario.', done => (
    getUser('user001').then((docUser) => {
      expect(docUser.id).toBe('user001');
      done();
    })));
});


describe('Testeo de observador de inicio de sesión en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof getUsersAuth).toBe('function');
  });

  it('Debería cambiar la vista a #iniciasesion.', () => {
    getUsersAuth((userAuth) => {
      if (userAuth.isAnonymous === true) {
        expect(window.location.hash).toBe('/iniciasesion');
      }
    });
  });

  it('Debería detectar el usuario autenticado.', done => (
    inicioSesion('newuser@gmail.com', 'newuser').then(() => {
      getUsersAuth((userAuth) => {
        expect(userAuth.isAnonymous).toBe(false);
      });

      done();
    })));
});
