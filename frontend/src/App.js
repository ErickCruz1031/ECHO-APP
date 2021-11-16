import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/Signin/Signin'
import {useState, useEffect} from 'react';
import {BrowserRouter as Router,
  Routes, Route, Link, Redirect, withRouter} from 'react-router-dom';
import Signin from './components/Signin/Signin';


const App = () =>{
  return (
      <Routes>
        <Route exact path='/' element={<Signin/>} />
        <Route exact path='/home' element={<Dashboard/>} />
      </Routes>
 
  );
}

export default App;

/*


   <div className="App">
      <Dashboard />
    </div>

    */
