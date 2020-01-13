import { divVistaLogin } from './login.js';
import { divVistaRegistro } from './registro.js';
import divVistaHome from './home.js';
import Different from './404.js';


const components = {
  login: divVistaLogin,
  createAccount: divVistaRegistro,
  home: divVistaHome,
  different: Different,
};

export { components };
