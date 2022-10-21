import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import {Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import About from './components/About';
import Signup from './components/Signup';
import Contact from './components/Contact';
import ErrorPage from './components/ErrorPage';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
         <Route exact path='/' element={<Home/>}/> 
         <Route exact path='/login' element={<Login/>}/> 
         <Route exact path='/about' element={<About/>}/> 
         <Route exact path='/contact' element={<Contact/>}/>
         <Route exact path='/signup' element={<Signup/>}/> 
         <Route path='/*' element={<ErrorPage/>}/>
      </Routes>
      
    </>
  );
}

export default App;
