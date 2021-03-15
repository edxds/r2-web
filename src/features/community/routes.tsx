import { Route } from 'react-router';

import { CreateCommunity } from './CreateCommunity';

export const communityRoutes = [
  <Route exact path="/feed/community/create" key="/feed/community/create">
    <CreateCommunity />
  </Route>,
];
