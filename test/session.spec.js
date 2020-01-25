
import {
  user, inicioSesion, registro, loginFb, loginGoogle, signOut,
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
});


// Testeo de Login

describe('Testeo de Login en firebase', () => {
  it('Debería ser una función', () => {
    expect(typeof inicioSesion).toBe('function');
  });

  it('Debería poder iniciar sesion', () => inicioSesion('amapola@gmail.com', 'amapola12')
    .then((newuser) => {
      expect(newuser.email).toBe('amapola@gmail.com');
    }));
});


describe('Testeo de Registro en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof registro).toBe('function');
  });

  it('Debería poder crear cuenta.', () => registro('amapola@gmail.com', 'amapola12')
    .then((newuser) => {
      expect(newuser.email).toBe('amapola@gmail.com');
    }));
});


describe('Testeo de Login con Facebook en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof loginFb).toBe('function');
  });

  it('Debería poder loguearme con Facebook.', () => loginFb()
    .then((newuser) => {
      expect(newuser.isAnonymous).toBe(false);
    }));
});


describe('Testeo de Login con Google en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('Debería poder loguearme con Google.', () => loginGoogle()
    .then((newuser) => {
      expect(newuser.isAnonymous).toBe(false);
    }));
});


describe('Testeo de cerrar sesión en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof signOut).toBe('function');
  });

  it('Debería poder cerrar sesión.', () => signOut()
    .then((newuser) => {
      expect(newuser).toBe(undefined);
    }));
});
