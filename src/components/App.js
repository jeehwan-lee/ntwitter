import { useState } from 'react';
import './App.css';
import AppRouter from 'components/Router';
import {authService} from "fbase";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  setInterval(()=> console.log(authService.currentUser), 2000);

  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </div>
  );
}

export default App;
