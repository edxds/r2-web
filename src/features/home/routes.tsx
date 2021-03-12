import { Route } from 'react-router';

import { Home } from './Home';

export const homeRoutes = [
  <Route exact path="/home" key="home">
    <Home />
  </Route>,
];
