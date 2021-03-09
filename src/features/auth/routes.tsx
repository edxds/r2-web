import { Route } from 'react-router';

import { Login } from './Login';

export const authRoutes = [
  <Route exact path="/sign-in" key="/sign-in">
    <Login />
  </Route>,
];
