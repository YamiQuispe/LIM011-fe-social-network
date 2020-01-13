
import { inicioSesion } from '../src/controller/firebase-controller.js';

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


// Testeo de Login

describe('Testeo de Login en firebase', () => {
  it('Debería ser una función', () => {
    expect(typeof inicioSesion).toBe('function')});

  it('Debería poder iniciar sesion', () => inicioSesion('amapola@gmail.com', 'amapola12')
    .then((user) => {
      expect(user.email).toBe('amapola@gmail.com')});
    });
  });
