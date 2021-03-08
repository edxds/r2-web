import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { NotFound } from './NotFound';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
