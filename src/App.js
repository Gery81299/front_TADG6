//Jair Llican 24-09
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Importa los componentes necesarios
import { Profile } from './components/profile';
//---------
import './App.css';
import { Login } from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <switch>
          <Route exact path="/" component={Login}/> {/* Ruta para la página de inicio (login) */}
          <Route path="/" component={Profile} /> {/* Ruta para la página de perfil */}
        </switch>
      </Router>
    </div>
  );
}

export default App;
