import logo from './logo.svg';
import './App.css';
import { auth, signInWithGoogle } from './firebase/config';
import {useEffect, useState} from 'react';

function App() {
  const [currentUser,setCurrentUser] = useState(null);

  useEffect(() => {
    const checkUser = () => auth.onAuthStateChanged(user => setCurrentUser(user))
    return checkUser();
  },[])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {
          currentUser ?
          <button onClick={() => auth.signOut()}>Sign Out</button> 
          :
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        }
      </header>
    </div>
  );
}

export default App;
