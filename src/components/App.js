import { useEffect, useState } from 'react';
import './App.css';
import AppRouter from 'components/Router';
import {authService} from "fbase";
import Navigation from './Navigation';

function App() {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }

      setInit(true);
    });
  }, []);


  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..." }
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </div>
  );
}

export default App;
