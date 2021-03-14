import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Switch } from 'react-router-dom';

import { NotificationsContainer } from './components/Notifications';
import { authRoutes } from './features/auth/routes';
import { FluidNavigation } from './features/navigation';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          {authRoutes}
          <FluidNavigation />
        </Switch>
      </BrowserRouter>
      <NotificationsContainer />
    </QueryClientProvider>
  );
}
