import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { useContext } from 'react';
import { authorizationContext } from './Contexts/TokenAuth';

function App() {
  const {isAuthorized,setIsAuthorized} = useContext(authorizationContext)
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/project' element={<Project/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
