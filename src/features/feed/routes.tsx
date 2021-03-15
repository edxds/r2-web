import { Route } from 'react-router';

import { Feed } from './Feed';

export const feedRoutes = [
  <Route exact path="/feed" key="feed">
    <Feed />
  </Route>,
];
