import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { authRoutes } from './features/auth/routes';
import { NotFound } from './NotFound';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        {authRoutes}
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
