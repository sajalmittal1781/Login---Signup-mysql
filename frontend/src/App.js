import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Dummy from './components/Dummy';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/dummy-page" component={Dummy}/>
        <Redirect  to="/login"/>
      </Switch>
    </Router>
  );
}

export default App;
