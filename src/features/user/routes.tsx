import { Route } from 'react-router';

import { Profile } from './Profile';

export const userRoutes = [
  <Route exact path="/profile" key="/path">
    <Profile />
  </Route>,
];
