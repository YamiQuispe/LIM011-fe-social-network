import { addNoteOnSubmit, deleteNoteOnClick, signOutEvent } from '../view-controller.js';
import { getNotes } from '../controller/firebase-controller.js';

const headerHome = () => {
  const header = document.createElement('header');
  header.id = 'headerVistaHome';

  header.innerHTML = `
    <button>Mi perfil</button>
    <h3>Bienvenido a tu red social</h3>
    <button id='botonSignOut'>Cierra sesión</button>`;

  header.querySelector('#botonSignOut').addEventListener('click', signOutEvent);

  return header;
};


const itemNote = (objNote) => {
  const liElement = document.createElement('li');
  console.log(objNote);

  liElement.innerHTML = `
        <article id="articlePost" style="width:300px; height: 150px; background: white">
          <section>
            <span><a href="#">Mi nombre</a></span>
            <button><i class="far fa-edit"></i></button>
            <button id="buttonDelete-${objNote.id}"><i class="far fa-trash-alt"></i></button>
          </section>
          <span>
            <p>${objNote.date}</p>
          </span>
          <span>
            <p>${objNote.note}</p>
          </span>
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
  const ul = sectionContainer.querySelector('#notes-list');

  notes.forEach((note) => {
    ul.appendChild(itemNote(note));

    const buttonDeleteNote = sectionContainer.querySelector(`#buttonDelete-${note.id}`);

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
