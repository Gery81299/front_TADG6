import logo from './logo.svg';
import './App.css';

import { Login } from './components/login';
import  Profile  from './components/profile';
import Projects from './components/projects';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <Projects/>
    </div>
  );
}

export default App;
