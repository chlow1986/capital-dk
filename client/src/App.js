import React, {useState} from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Menu from './components/Menu';
import List from './components/List';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
  const [menuShow, setMenuShow] = useState(false);
  const toggleMenu = ()=>{
    setMenuShow(prev=>!prev);
  }

  return (
    <Router>
      <div className="App">
        <Menu menuShow={menuShow}/>
        <div className="app-content">
          <div className="menu" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <Switch>
            <Route exac path="/analytics">
              <Dashboard />
            </Route>
            <Route exac path="/list">
              <List />
            </Route>
            <Route exac path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
