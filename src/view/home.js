import {
  addNoteOnSubmit, deleteNoteOnClick, signOutEvent, updateNoteOnClick,
} from '../view-controller.js';
import { getNotes, user } from '../controller/firebase-controller.js';


const headerHome = () => {
  const header = document.createElement('header');
  header.id = 'headerVistaHome';

  console.log(user());

  header.innerHTML = `
      <button>${user().displayName}&nbsp &nbsp &nbsp<i class="fas fa-user"></i></button>
      <h3>Bienvenido a tu red social</h3>
      <button id='botonSignOut'>Cierra sesión &nbsp &nbsp<i class="fas fa-puzzle-piece"></i></button>`;

  header.querySelector('#botonSignOut').addEventListener('click', signOutEvent);

  return header;
};


const itemNote = (objNote) => {
  const liElement = document.createElement('li');

  liElement.innerHTML = `
        <article id="articlePost-${objNote.id}" style="width:300px; height: 150px; background: white">
          <section>
          <div><img src="${objNote.photo}" style="width: 30px"></img></div>
            <span><a href="#">${objNote.name}</a></span>
            <button id="buttonUpdate-${objNote.id}"><i class="far fa-edit"></i></button>
            <button id="buttonDelete-${objNote.id}"><i class="far fa-trash-alt"></i></button>
          </section>
          <span id="spanDate-${objNote.id}">
            <p>${objNote.date}</p>
          </span>
          <span id="spanNote-${objNote.id}">
            <p>${objNote.note}</p>
          </span>
          <input class="hide" type="text" id="inputEdited-${objNote.id}" value="${objNote.note}"></input>
            <br>
            <button class="hide" id="saveUpdate-${objNote.id}">Guardar</button>
            <button class="hide" id="cancelUpdate-${objNote.id}">Cancelar</button>
          <section id="sectionLikesComents-${objNote.id}">
          </section>
        </article>
        <br>
      `;

  return liElement;
};


const sectionNotes = (notes) => {
  const sectionContainer = document.createElement('section');
  sectionContainer.id = 'sectionNotes';

  const homeContent = `
    <!-- Formulario -->
    <section>
      <form>
        <input type="text" id="input-new-note" placeholder="¿Qué quieres compartir?">
        <button><i class="far fa-image"></i></button>
        <button id="boton-add-note">Publicar</button>
      </form>
    </section>

    <!-- Sección notas -->
    <section>
      <ul id="notes-list"></ul>
    </section>
  `;

  sectionContainer.innerHTML = homeContent;

  const buttonAddNote = sectionContainer.querySelector('#boton-add-note');
  console.log(buttonAddNote);
  const ul = sectionContainer.querySelector('#notes-list');

  notes.forEach((note) => {
    ul.appendChild(itemNote(note));

    const articlePost = sectionContainer.querySelector(`#articlePost-${note.id}`);
    const spanDate = articlePost.querySelector(`#spanDate-${note.id}`);
    const spanNote = articlePost.querySelector(`#spanNote-${note.id}`);
    const sectionLikesComents = articlePost.querySelector(`#sectionLikesComents-${note.id}`);
    const inputEdited = articlePost.querySelector(`#inputEdited-${note.id}`);
    const buttonSave = ul.querySelector(`#saveUpdate-${note.id}`);
    const buttonCancel = ul.querySelector(`#cancelUpdate-${note.id}`);

    const buttonDeleteNote = sectionContainer.querySelector(`#buttonDelete-${note.id}`);
    const buttonUpdateNote = sectionContainer.querySelector(`#buttonUpdate-${note.id}`);

    if (user().displayName !== note.name) {
      console.log((user().displayName));
      buttonUpdateNote.classList.add('hide');
      buttonDeleteNote.classList.add('hide');
    }

    const buttonUpdate = () => {
      const noteValue = spanNote.childNodes[1].innerHTML;
      console.log(noteValue);

      spanDate.classList.add('hide');
      spanNote.classList.add('hide');
      sectionLikesComents.classList.add('hide');

      inputEdited.classList.remove('hide');
      buttonSave.classList.remove('hide');
      buttonCancel.classList.remove('hide');
    };

    buttonSave.addEventListener('click', () => {
      const inputUpdate = inputEdited.value;
      const userPost = user();
      const dataNote = {
        note: inputUpdate,
        name: userPost.displayName,
        photo: userPost.photoURL,
      };

      updateNoteOnClick(note.id, dataNote);
    });

    buttonCancel.addEventListener('click', () => {
      inputEdited.classList.add('hide');
      buttonSave.classList.add('hide');
      buttonCancel.classList.add('hide');

      spanDate.classList.remove('hide');
      spanNote.classList.remove('hide');
      sectionLikesComents.classList.remove('hide');
    });

    buttonUpdateNote.addEventListener('click', buttonUpdate);
    buttonDeleteNote.addEventListener('click', () => deleteNoteOnClick(note));
  });

  buttonAddNote.addEventListener('click', addNoteOnSubmit);

  return sectionContainer;
};


export default () => {
  const divHome = document.createElement('div');
  divHome.id = 'divVistaHome';

  divHome.appendChild(headerHome());

  getNotes((notes) => {
    // Condición si el elemento ya existe:
    if (document.getElementById('sectionNotes')) {
      document.getElementById('sectionNotes').remove();
    }

    divHome.appendChild(sectionNotes(notes));
  });

  return divHome;
};
