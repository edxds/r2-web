import { Route } from 'react-router';

import { PostScreen } from './PostScreen';

export const postRoutes = [
  <Route exact path="/feed/post/:id" key="/feed/post/:id">
    {({ match }) => (
      <PostScreen id={match ? parseInt(match.params.id) : undefined} key={match!.params.id} />
    )}
  </Route>,
];
