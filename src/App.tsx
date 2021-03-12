import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { authRoutes } from './features/auth/routes';
import { NotFound } from './NotFound';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Switch>
        {authRoutes}
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
    </QueryClientProvider>
  );
}
