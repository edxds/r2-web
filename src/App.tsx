import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { NotificationsContainer } from './components/Notifications';
import { authRoutes } from './features/auth/routes';
import { homeRoutes } from './features/home/routes';
import { NotFound } from './NotFound';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          {authRoutes}
          {homeRoutes}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      <NotificationsContainer />
    </QueryClientProvider>
  );
}
