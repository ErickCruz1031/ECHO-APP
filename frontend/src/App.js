import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router,
  Routes, Route, Link, Redirect, withRouter} from 'react-router-dom';


const App = () =>{
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Dashboard/>} />
      </Routes>
    </Router>
 
  );
}

export default App;

/*


   <div className="App">
      <Dashboard />
    </div>

    */
