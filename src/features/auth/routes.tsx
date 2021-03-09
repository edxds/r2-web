import { Route } from 'react-router';

import { Login } from './Login';
import { Register } from './Register';

export const authRoutes = [
  <Route exact path="/sign-in" key="/sign-in">
    <Login />
  </Route>,
  <Route exact path="/sign-up" key="/sign-up">
    <Register />
  </Route>,
];
