import React, { Component } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './components/auth/SignIn';
import Signup from './components/auth/SignUp';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Navbar} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <Redirect to='/' />
      </Switch>
    );
  }
}

export default App;
