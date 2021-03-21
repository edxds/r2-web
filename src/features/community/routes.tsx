import { Route } from 'react-router';

import { CreateCommunity } from './CreateCommunity';
import { Community } from './Community';

export const communityRoutes = [
  <Route exact path="/feed/community/create" key="/feed/community/create">
    <CreateCommunity />
  </Route>,
  <Route exact path="/feed/community/:id" key="/feed/community/:id">
    {({ match }) => <Community id={match ? parseInt(match.params.id) : undefined} />}
  </Route>,
];
