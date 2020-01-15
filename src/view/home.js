import {
  addNoteOnSubmit, deleteNoteOnClick, signOutEvent, updateNoteOnClick,
} from '../view-controller.js';
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

  liElement.innerHTML = `
        <article id="articlePost-${objNote.id}" style="width:300px; height: 150px; background: white">
          <section>
          <div><img src="${objNote.photo}" style="width: 40px"></img></div>
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
  const ul = sectionContainer.querySelector('#notes-list');

  notes.forEach((note) => {
    ul.appendChild(itemNote(note));

    const buttonDeleteNote = sectionContainer.querySelector(`#buttonDelete-${note.id}`);
    const buttonUpdateNote = sectionContainer.querySelector(`#buttonUpdate-${note.id}`);

    const buttonUpdate = () => {
      const articlePost = sectionContainer.querySelector(`#articlePost-${note.id}`);
      const articlePostTemplate = articlePost.innerHTML;

      const spanDate = ul.querySelector(`#spanDate-${note.id}`);
      const spanNote = ul.querySelector(`#spanNote-${note.id}`);
      const sectionLikesComents = ul.querySelector(`#sectionLikesComents-${note.id}`);

      const noteValue = spanNote.childNodes[1].innerHTML;

      /* spanDate.setAttribute('style', 'display: none');
      spanNote.setAttribute('style', 'display: none');
      sectionLikesComents.setAttribute('style', 'display: none'); */

      spanDate.remove();
      spanNote.remove();
      sectionLikesComents.remove();

      articlePost.innerHTML = `
        <section>
          <span><a href="#">Mi nombre</a></span>
          <button id="buttonUpdate-${note.id}"><i class="far fa-edit"></i></button>
          <button id="buttonDelete-${note.id}"><i class="far fa-trash-alt"></i></button>
        </section>
        <span id="spanDate-${note.id}">
          <p>${note.date}</p>
        </span>
        <section>
          <input type="text" id="inputEdited" value="${noteValue}"></input><br>
          <button id="saveUpdate">Guardar</button>
          <button id="cancelUpdate">Cancelar</button>
        </section>
        <section id="sectionLikesComents-${note.id}">
        </section>`;

      articlePost.querySelector('#saveUpdate').addEventListener('click', () => {
        const inputUpdate = articlePost.querySelector('#inputEdited').attributes[2].value;
        console.log(inputUpdate);
        const dataNote = {
          date: new Date(),
          name: 'nombre',
          note: inputUpdate,
        };
        updateNoteOnClick(note.id, dataNote);

        articlePost.innerHTML = `
        <section>
          <span><a href="#">Mi nombre</a></span>
          <button id="buttonUpdate-${note.id}"><i class="far fa-edit"></i></button>
          <button id="buttonDelete-${note.id}"><i class="far fa-trash-alt"></i></button>
        </section>
          <span id="spanDate-${note.id}">
            <p>${note.date}</p>
          </span>
        <span id="spanNote-${note.id}">
          <p>${inputUpdate}</p>
        </span>
        </span>
        <section id="sectionLikesComents-${note.id}">
        </section>`;
      });

      articlePost.querySelector('#cancelUpdate').addEventListener('click', () => {
        /* spanDate.setAttribute('style', 'display: block');
        spanNote.setAttribute('style', 'display: block');
        sectionLikesComents.setAttribute('style', 'display: block'); */

        articlePost.innerHTML = articlePostTemplate;
      });
    };

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
