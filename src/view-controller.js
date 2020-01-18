import {
  inicioSesion, registro, user, addNote, updateNote, deleteNote, loginFb, loginGoogle, setUser,
  signOut,
} from './controller/firebase-controller.js';

const changeHash = (hash) => {
  window.location.hash = hash;
};


export const datePost = (date) => {
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
  const date = botonLogin.closest('form').querySelector('input[type=date]');
  const textName = botonLogin.closest('form').querySelector('span[name=messageName]');
  const textLastName = botonLogin.closest('form').querySelector('span[name=messageLastName]');
  const textEmail = botonLogin.closest('form').querySelector('span[name=messageEmailRegistro]');
  const textPassword = botonLogin.closest('form').querySelector('span[name=messagePasswordRegistro]');

  if (name.value !== '' && lastName.value !== '' && email.value !== '' && password.value !== '') {
    registro(email.value, password.value)
      .then((result) => {
        const userId = result.user.uid;
        const userData = {
          idUser: user().uid,
          name: `${name.value} ${lastName.value}`,
          email: email.value,
          date: datePost(date.value),
        };

        setUser(userId, userData);

        return changeHash('/home');
      })
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

  const enlaceLogin = event.target;
  const spanErrorRed = enlaceLogin.closest('main').querySelector('span[name=messageLoginRedes]');

  loginFb()
    .then((result) => {
      const userId = result.user.uid;
      const userData = {
        idUser: userId,
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

      switch (errorCode) {
        case 'auth/account-exists-with-different-credential':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">Ya existe una cuenta con la dirección de correo<br> electrónico afirmada por la credencial.</p>`;
          break;
        case 'auth/auth-domain-config-required':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">No se proporciono la configuración de authDomain al<br> llamar a firebase.</p>`;
          break;
        case 'auth/cancelled-popup-request':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">Error: Se activaron sucesivas operaciones emergentes.<br> Solo se permite una solicitud emergente a la vez.</p>`;
          break;
        case 'auth/operation-not-allowed':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">La cuenta no se encuentra habilitada.</p>`;
          break;
        case 'auth/operation-not-supported-in-this-environment':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">Esta operación no es compatible con el entorno en<br> el que se ejecuta su aplicación. El protocolo debe <br>ser http o https.</p>`;
          break;
        case 'auth/popup-blocked':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">El navegador bloqueó la ventana emergente.</p>`;
          break;
        case 'auth/popup-closed-by-user':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">Error: Ha cerrado la ventana emergente sin <br>completar el inicio de sesión en el proveedor.</p>`;
          break;
        case 'auth/unauthorized-domain':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">El dominio de la aplicación no se encuentra<br> autorizado.</p>`;
          break;
        default:
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">Error no identificado.</p>`;
          break;
      }
    });
};


export const signInGoogle = (event) => {
  event.preventDefault();

  loginGoogle()
    .then((result) => {
      const userId = result.user.uid;
      const userData = {
        idUser: userId,
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

      const enlaceLogin = event.target;
      const spanErrorRed = enlaceLogin.closest('form').querySelector('span[name=messageLoginRedes]');

      switch (errorCode) {
        case 'auth/account-exists-with-different-credential':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">Ya existe una cuenta con la dirección de correo<br> electrónico afirmada por la credencial.</p>`;
          break;
        case 'auth/auth-domain-config-required':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">No se proporciono la configuración de authDomain al<br> llamar a firebase.</p>`;
          break;
        case 'auth/cancelled-popup-request':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">Error: Se activaron sucesivas operaciones emergentes.<br> Solo se permite una solicitud emergente a la vez.</p>`;
          break;
        case 'auth/operation-not-allowed':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">La cuenta no se encuentra habilitada.</p>`;
          break;
        case 'auth/operation-not-supported-in-this-environment':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">Esta operación no es compatible con el entorno en<br> el que se ejecuta su aplicación. El protocolo debe <br>ser http o https.</p>`;
          break;
        case 'auth/popup-blocked':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">El navegador bloqueó la ventana emergente.</p>`;
          break;
        case 'auth/popup-closed-by-user':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">Error: Ha cerrado la ventana emergente sin <br>completar el inicio de sesión en el proveedor.</p>`;
          break;
        case 'auth/unauthorized-domain':
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">El dominio de la aplicación no se encuentra<br> autorizado.</p>`;
          break;
        default:
          spanErrorRed.innerHTML = `
            <p style="font-size: 10px; margin: 3px; color: blue">Error no identificado.</p>`;
          break;
      }
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


export const addNoteOnSubmit = (event) => {
  event.preventDefault();

  const inputPost = document.getElementById('input-new-note');
  const userRed = user();
  const dateNote = new Date();
  const dataPost = {
    idUser: userRed.uid,
    note: inputPost.value,
    name: userRed.displayName,
    photo: userRed.photoURL,
    date: dateNote,
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


export const updateNoteOnClick = (idNote, note) => {
  updateNote(idNote, note)
    .then(() => {
      console.log('Nota modificada.');
    }).catch((error) => {
      console.log('Error:', error);
    });
};


export const deleteNoteOnClick = objNote => deleteNote(objNote.id)
  .then(() => {
    console.log('Post eliminado.');
  }).catch((error) => {
    console.error('Error: ', error);
  });
