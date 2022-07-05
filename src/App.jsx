import {useContext} from 'react';
import DropDown from './components/DropDown';
import Weather from './components/Weather';


import './App.css';

const App = () => {

  return (
    <main>
   
   <DropDown />

  <Weather/>
    </main>
  );
}

export default App;

