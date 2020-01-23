import MockFirebase from 'mock-cloud-firestore';

import { user } from '../src/controller/firebase-controller.js';

const userData = {
  __collection__: {
    users: {
      __doc__: {
        user001: {
          idUser: 'user001',
          email: '',
          name: 'amapola',
        },
        user002: {
          idUser: 'user001',
          note: 'Mi segunda nota.',
          name: 'amapola',
        },
        user003: {
          idUser: 'user002',
          name: 'girasol',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(userData, { isNaiveSnapshotListenerEnabled: true });


describe('Autenticacion de usuario', () => {
  it('Debería ser una función.', () => {
    expect(typeof user).toBe('function');
  });
});
