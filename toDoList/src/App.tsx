import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppContext from './context/AppContext';
import { getUserData } from './services/user-service';

function App() {

  const [context, setContext] = useState({
    user: null,
    userData: null,
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then(snapshot => {
          if (snapshot.exists()) {
            setContext({ user, userData: snapshot.val()[Object.keys(snapshot.val())[0]] });
          }
        })
    }
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={{ ...context, setContext }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>

    </>
  )
}

export default App
