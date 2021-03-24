import { Route } from 'react-router';

import { Login } from './Login';
import { Register } from './Register';
import { Welcome } from './Welcome';

export const authRoutes = [
  <Route exact path="/welcome" key="/welcome">
    <Welcome />
  </Route>,
  <Route exact path="/sign-in" key="/sign-in">
    <Login />
  </Route>,
  <Route exact path="/sign-up" key="/sign-up">
    <Register />
  </Route>,
];
