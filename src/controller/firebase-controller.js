
// Usuario:

export const user = () => {
  if (!firebase.auth().currentUser) {
    window.location.hash = '/iniciasesion';
  }

  return firebase.auth().currentUser;
};


export const setUser = (userId, userObject) => (
  firebase.firestore().collection('users').doc(userId).set(userObject));


export const getUser = userId => (firebase.firestore()
  .collection('users').where('idUser', '==', userId).get());


// Sesión:

export const inicioSesion = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password));


export const loginFb = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};


export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};


export const registro = (email, password) => (
  firebase.auth().createUserWithEmailAndPassword(email, password));


export const signOut = () => firebase.auth().signOut();


// Posts:
export const addNote = objectPost => firebase.firestore().collection('notes').add(objectPost);


export const getNotes = callback => firebase.firestore().collection('notes').orderBy('date', 'desc')
  .onSnapshot((querySnapshot) => {
    const data = [];

    querySnapshot.forEach((doc) => {
      console.log(doc);
      data.push({
        id: doc.id,
        idUser: doc.data().idUser,
        name: doc.data().name,
        photo: doc.data().photo,
        note: doc.data().note,
        date: doc.data().date,
      });
    });

    callback(data);
  });


export const updateNote = (idNote, noteObject) => firebase.firestore().collection('notes').doc(idNote).update(noteObject);


export const deleteNote = idNote => firebase.firestore().collection('notes').doc(idNote).delete();
