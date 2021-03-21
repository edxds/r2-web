import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { CommunityDto, getCommunity } from './service';

export function useCommunity(id?: number) {
  const query = useQuery<CommunityDto, AxiosError>(['community', id], () => getCommunity(id!), {
    enabled: !!id,
  });

  return [query.data, query] as const;
}
