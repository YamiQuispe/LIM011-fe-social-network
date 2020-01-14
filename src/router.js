import { components } from './view/index.js';

export const viewChange = (hash) => {
  const sectionMain = document.getElementById('root');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '#/iniciasesion':
      return sectionMain.appendChild(components.login());
    case '#/creacuenta':
      return sectionMain.appendChild(components.createAccount());
    case '#/home':
      return sectionMain.appendChild(components.home());
    default:
      return sectionMain.appendChild(components.different());
  }
};


const viewInitial = (hash) => {
  if (hash === '#/' || hash === '' || hash === '#') return viewChange('#/iniciasesion');

  if (hash === '#/iniciasesion') return viewChange(hash);

  return viewChange(hash);
};


export const initRouter = () => {
  window.addEventListener('load', viewInitial(window.location.hash));

  if (('onhashchange' in window)) window.onhashchange = () => viewInitial(window.location.hash);
};
