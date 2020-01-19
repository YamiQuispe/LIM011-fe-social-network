
import MockFirebase from 'mock-cloud-firestore';
import { getNotes, updateNote } from '../src/controller/firebase-controller.js';

const noteData = {
  __collection__: {
    notes: {
      __doc__: {
        note001: {
          idUser: 'user001',
          note: 'Mi primera nota.',
          name: 'amapola',
          photo: 'mifoto.jpg',
          date: '15 de enero del 2020',
        },
        note002: {
          idUser: 'user001',
          note: 'Mi segunda nota.',
          name: 'amapola',
          photo: 'mifoto.jpg',
          date: '16 de enero del 2020',
        },
        note003: {
          idUser: 'user002',
          note: 'Soy una nota.',
          name: 'girasol',
          photo: 'foto.jpg',
          date: '17 de enero del 2020',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(noteData, { isNaiveSnapshotListenerEnabled: true });

/* const dateNote = {
  idUser: 'user003',
  note: 'Mi nota.',
  name: 'azucena',
  photo: 'nuevafoto.jpg',
  date: '18 de enero del 2020',
}; */

const newNote = {
  note: 'Mi nota modificada.',
  name: 'girasol',
  photo: 'foto.jpg',
};


/* describe('Testeo de almacenamiento de posts en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof addNote).toBe('function');
  });

  it('Deberia agregar un post.', done => addNote(dateNote).then(() => getNotes((notes) => {
    const result = notes.find(note => note.note === 'Mi segunda nota.');

    expect(result.note).toBe('Mi segunda nota.');

    done();
  })));
}); */


/* describe('Testeo de lectura de posts en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof getNotes).toBe('function');
  });

  it('Debería devolver un array de posts que coincida con el id del usuario.', done => (
    getNotes((notes) => {
    const arrayPostsUser = notes.filter(note => note.idUser === 'user001');

    expect(arrayPostsUser).toHaveLength(2);

    done();
  )}));
}); */

/*
describe('Testeo de eliminación de posts en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof deleteNote).toBe('function');
  });

  it('Deberia poder eliminar un post mediante el id asignado.', done => deleteNote('note002')
    .then(() => {
      getNotes((notes) => {
        const result = notes.find(note => note.id === 'note002');

        expect(result).toBe(undefined);

        done();
      });
    }));
});
*/

describe('Testeo de modificación de posts en firebase', () => {
  it('Debería ser una función.', () => {
    expect(typeof updateNote).toBe('function');
  });

  it('Deberia poder actualizar el mensaje de un post.', done => updateNote('note001', newNote).then(() => {
    getNotes((notes) => {
      const result = notes.find(note => note.id === 'note001');

      expect(result.note).toBe('Mi nota modificada.');

      done();
    });
  }));
});
