
// Usuario:
// currentUser: Permite obtener el usuario que accedió.
export const user = () => firebase.auth().currentUser;


export const setUser = (userId, userObject) => (
  firebase.firestore().collection('users').doc(userId).set(userObject));


export const getUser = () => firebase.firestore().collection('users').get();


// Sesión:

export const inicioSesion = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password));


export const loginFb = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};


export const registro = (email, password) => (
  firebase.auth().createUserWithEmailAndPassword(email, password));


export const signOut = () => firebase.auth().signOut();


// Posts:
export const addNote = objectPost => firebase.firestore().collection('notes').add(objectPost);


export const getNotes = callback => firebase.firestore().collection('notes').orderBy('datePost', 'desc')
  .onSnapshot((querySnapshot) => {
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        name: 'nombre',
        note: doc.data().note,
        date: doc.data().datePost,
      });

      console.log(doc.id);
    });

    console.log(data);

    callback(data);
  });


export const deleteNote = idNote => firebase.firestore().collection('notes').doc(idNote).delete();
