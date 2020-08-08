import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import InitialPage from "./containers/InitialPageContainer";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/adaptative-book">
            <InitialPage></InitialPage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
