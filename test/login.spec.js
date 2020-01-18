
import {
  inicioSesion, registro, loginFb, loginGoogle, signOut,
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


// Testeo de Login

describe('Testeo de Login en firebase', () => {
  it('Debería ser una función', () => {
    expect(typeof inicioSesion).toBe('function');
  });

  it('Debería poder iniciar sesion', () => inicioSesion('amapola@gmail.com', 'amapola12')
    .then((user) => {
      expect(user.email).toBe('amapola@gmail.com');
    }));
});


describe('Testeo de Registro en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof registro).toBe('function');
  });

  it('Debería poder crear cuenta.', () => registro('amapola@gmail.com', 'amapola12')
    .then((user) => {
      expect(user.email).toBe('amapola@gmail.com');
    }));
});


describe('Testeo de Login con Facebook en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof loginFb).toBe('function');
  });

  it('Debería poder loguearme con Facebook.', () => loginFb()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});


describe('Testeo de Login con Google en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('Debería poder loguearme con Google.', () => loginGoogle()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});


describe('Testeo de cerrar sesión en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof signOut).toBe('function');
  });

  it('Debería poder cerrar sesión.', () => signOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});
