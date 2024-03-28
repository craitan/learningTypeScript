import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppContext from './context/AppContext';
import { getUserData } from './services/user-service';
import Register from './views/Register';
import LogIn from './views/LogIn';
import NavBar from './components/NavBar';



function App() {

  const [context, setContext] = useState<{ user: object | null, userData: object | null }>({
    user: null,
    userData: null,
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((snapshot) => {
        if (snapshot.exists()) {
          setContext({
            user,
            userData: snapshot.val()[Object.keys(snapshot.val())[0]],
          });
        }
      });
    }
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={{ ...context, setContext }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<LogIn />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>

    </>
  )
}

export default App
