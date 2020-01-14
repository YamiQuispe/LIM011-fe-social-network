import {
  inicioSesion, registro, user, addNote, deleteNote, loginFb, loginGoogle, setUser, signOut,
} from './controller/firebase-controller.js';

const changeHash = (hash) => {
  window.location.hash = hash;
};


export const signInOnSubmit = (event) => {
  event.preventDefault();

  const botonRegistro = event.target;
  const email = botonRegistro.closest('form').querySelector('input[type=email]');
  const password = botonRegistro.closest('form').querySelector('input[type=password]');
  const textEmail = botonRegistro.closest('form').querySelector('span[name=messageEmail]');
  const textPassword = botonRegistro.closest('form').querySelector('span[name=messagePassword]');
  console.log(email);

  if (email.value !== '' && password.value !== '') {
    inicioSesion(email.value, password.value)
      .then(() => changeHash('/home'))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/invalid-email') {
          email.value = '';
          textPassword.value = '';
          textEmail.innerHTML = `
        <p style="font-size: 10px; margin: 3px; color: blue">El correo ingresado no es válido.</p>`;
        }

        if (errorCode === 'auth/user-disabled') {
          email.value = '';
          textPassword.value = '';
          textPassword.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">El correo ingresado ha sido deshabilitado.</p>`;
          textPassword.value = '';
        }

        if (errorCode === 'auth/user-not-found') {
          email.value = '';
          textPassword.value = '';
          textEmail.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue; float: center">El correo ingresado no pertenece a ningún<br> usuario.</p>`;
        }

        if (errorCode === 'auth/wrong-password') {
          password.value = '';
          textEmail.value = '';
          textPassword.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">La contraseña ingresada es incorrecta.</p>`;
        }

        return errorMessage;
      });
  } else if (email.value === '' && password.value !== '') {
    textPassword.value = '';
    textEmail.innerHTML = `
      <p style="font-size: 10px; margin: 3px; color: blue; float: center">Por favor, ingrese una dirección de correo<br> electrónico.</p>`;
  } else if (email.value !== '' && password.value === '') {
    password.value = '';
    textEmail.value = '';
    textPassword.innerHTML = `
      <p style="font-size: 10px; margin: 3px; color: blue">Por favor, ingrese una contraseña.</p>`;
  } else {
    textEmail.innerHTML = `
      <p style="font-size: 10px; margin: 3px; color: blue; float: center">Por favor, ingrese una dirección de correo<br> electrónico.</p>`;
    textPassword.innerHTML = `
      <p style="font-size: 10px; margin: 3px; color: blue">Por favor, ingrese una contraseña.</p>`;
  }
};


export const accountRegistration = (event) => {
  event.preventDefault();

  const botonLogin = event.target;
  const name = botonLogin.closest('form').querySelectorAll('input[type=text]')[0];
  const lastName = botonLogin.closest('form').querySelectorAll('input[type=text]')[1];
  const email = botonLogin.closest('form').querySelector('input[type=email]');
  const password = botonLogin.closest('form').querySelector('input[type=password]');
  const textName = botonLogin.closest('form').querySelector('span[name=messageName]');
  const textLastName = botonLogin.closest('form').querySelector('span[name=messageLastName]');
  const textEmail = botonLogin.closest('form').querySelector('span[name=messageEmailRegistro]');
  const textPassword = botonLogin.closest('form').querySelector('span[name=messagePasswordRegistro]');

  if (name.value !== '' && lastName.value !== '' && email.value !== '' && password.value !== '') {
    registro(email.value, password.value)
      .then(() => changeHash('/home'))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/email-already-in-use') {
          email.value = '';
          textEmail.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">La dirección de correo electrónico ya existe.</p>`;
        }
        if (errorCode === 'auth/invalid-email') {
          email.value = '';
          textEmail.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">La dirección de correo electrónico no es válida.</p>`;
        }
        if (errorCode === 'auth/operation-not-allowed') {
          email.value = '';
          password.value = '';
          textPassword.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">La dirección de correo electrónico o contraseña no se encuentra habilitada.</p>`;
        }
        if (errorCode === 'auth/operation-not-allowed') {
          email.value = '';
          textEmail.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">La dirección de correo electrónico no es válida.</p>`;
        }
        if (errorCode === 'auth/weak-password') {
          password.value = '';
          textPassword.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">La contraseña es demasiado débil.</p>`;
        }

        return errorMessage;
      });
  } else {
    textName.innerHTML = `
      <p style="font-size: 10px; margin: 3px; color: blue">Por favor, ingrese un nombre.</p>`;
    textLastName.innerHTML = `
      <p style="font-size: 10px; margin: 3px; color: blue">Por favor, ingrese un apellido.</p>`;
  }
};


export const signInFb = (event) => {
  event.preventDefault();

  loginFb()
    .then((result) => {
      const userId = result.user.uid;
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      setUser(userId, userData);

      changeHash('/home');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);

      const email = error.email;
      const credential = error.credential;

      console.log(email, credential);
    });
};


export const signInGoogle = (event) => {
  event.preventDefault();

  loginGoogle()
    .then((result) => {
      const userId = result.user.uid;
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      setUser(userId, userData);

      changeHash('/home');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);

      const email = error.email;
      const credential = error.credential;

      console.log(email, credential);
    });
};


export const signOutEvent = (event) => {
  event.preventDefault();

  signOut()
    .then(() => {
      changeHash('/iniciasesion');
    }).catch((error) => {
      console.log(error);
    });
};


const datePost = (date) => {
  const yearPost = date.getFullYear();
  const monthPost = date.getMonth() + 1;
  const dayPost = date.getDate();
  const hourPost = date.toLocaleTimeString();
  let completeDate;

  switch (monthPost) {
    case 1:
      completeDate = `${dayPost} de enero del ${yearPost} a las ${hourPost}`;
      break;
    case 2:
      completeDate = `${dayPost} de febrero del ${yearPost} a las ${hourPost}`;
      break;
    case 3:
      completeDate = `${dayPost} de marzo del ${yearPost} a las ${hourPost}`;
      break;
    case 4:
      completeDate = `${dayPost} de abril del ${yearPost} a las ${hourPost}`;
      break;
    case 5:
      completeDate = `${dayPost} de mayo del ${yearPost} a las ${hourPost}`;
      break;
    case 6:
      completeDate = `${dayPost} de junio del ${yearPost} a las ${hourPost}`;
      break;
    case 7:
      completeDate = `${dayPost} de julio del ${yearPost} a las ${hourPost}`;
      break;
    case 8:
      completeDate = `${dayPost} de agosto del ${yearPost} a las ${hourPost}`;
      break;
    case 9:
      completeDate = `${dayPost} de setiembre del ${yearPost} a las ${hourPost}`;
      break;
    case 10:
      completeDate = `${dayPost} de octubre del ${yearPost} a las ${hourPost}`;
      break;
    case 11:
      completeDate = `${dayPost} de noviembre del ${yearPost} a las ${hourPost}`;
      break;
    case 12:
      completeDate = `${dayPost} de diciembre del ${yearPost} a las ${hourPost}`;
      break;
    default:
      completeDate = 'Problemas para actualizar la hora y/o fecha.';
      break;
  }

  return completeDate;
};


export const addNoteOnSubmit = (event) => {
  event.preventDefault();

  const inputPost = document.getElementById('input-new-note');
  const userRed = user();
  const date = new Date();
  const dataPost = {
    note: inputPost.value,
    // nameUser: userRed.displayName,
    nameUser: 'name',
    datePost: datePost(date),
  };

  addNote(dataPost)
    .then(() => {
      inputPost.value = '';
      console.log('Nota agregada.');
    }).catch(() => {
      inputPost.value = '';
      console.log('Error.');
    });
};


export const deleteNoteOnClick = objNote => deleteNote(objNote.id)
  .then(() => {
    console.log('Post eliminado.');
  }).catch((error) => {
    console.error('Error: ', error);
  });
