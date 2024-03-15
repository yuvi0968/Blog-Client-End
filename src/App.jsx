import { useState, useEffect } from 'react';
import './App.css'
import { Header, Footer } from './components/index';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((response) => {
        if (response) {
          dispatch(login({ response }));
        } else {
          dispatch(logout());
        };

      }).catch((error) => {
        console.log("Error getCurrent User : ", error)
      })
      .finally(() =>
        setLoading(false));

  }, [])

  return !loading ? (
    <div className=' min-h-screen flex flex-wrap
    content-between bg-gray-400  '>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        < Footer />
      </div>

    </div>


  ) : <h2>Data is loading...</h2>
}

export default App
