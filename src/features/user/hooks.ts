import { useQuery } from 'react-query';
import { useHistory } from 'react-router';

import { getUserInfo } from './service';

export function useUser(args?: { dontRedirect?: boolean }) {
  const history = useHistory();
  const query = useQuery('user', getUserInfo);

  if (query.isError && !args?.dontRedirect) {
    history.push('/sign-in');
  }

  return [query.data, query] as const;
}
