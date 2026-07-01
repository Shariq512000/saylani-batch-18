import { useState } from 'react';
import './App.css';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import RightBar from './components/RightBar';
import { Navigate, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div className='app'>
      {isLoggedIn ? 
        <>
          <Header />
          <div className='inner-content'>
            <Aside />
            <Main />
            <RightBar />
          </div>
          <Footer />
        </>
        :
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Navigate to={"/login"} />} />
        </Routes>
      }
    </div>
  );
}

export default App;
