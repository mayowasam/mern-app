import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import LandingPage from './LandingPage';
import NewUser from './NewUser';
import UpdateUser from './UpdateUser';

function App() {
  
  return (
    <div className="app">
      <Router>
        <Switch>
        <Route exact path="/updateuser"> <UpdateUser/></Route>
        <Route exact path="/newuser"> <NewUser/></Route>
          <Route exact path="/"><LandingPage/></Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
