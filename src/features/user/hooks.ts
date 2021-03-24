import { useQuery } from 'react-query';
import { useHistory } from 'react-router';

import { getJoinedCommunities, getUserInfo } from './service';

export function useUser(args?: { dontRedirect?: boolean }) {
  const history = useHistory();
  const query = useQuery('user', getUserInfo);

  if (query.isError && !args?.dontRedirect) {
    history.replace('/welcome');
  }

  return [query.data, query] as const;
}

export function useJoinedCommunities() {
  const query = useQuery('joined-communities', getJoinedCommunities);
  return [query.data, query] as const;
}
