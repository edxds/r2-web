import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useUser } from '../user/hooks';

import { CommunityDto, getCommunity, joinCommunity, leaveCommunity } from './service';

export function useCommunity(id?: number) {
  const query = useQuery<CommunityDto, AxiosError>(['community', id], () => getCommunity(id!), {
    enabled: !!id,
  });

  return [query.data, query] as const;
}

export function useToggleMembership(communityId?: number) {
  const [user] = useUser({ dontRedirect: true });
  const [community] = useCommunity(communityId);

  const isMember = community?.members.some((u) => u.id === user?.id);

  const client = useQueryClient();
  const mutation = useMutation(
    async () => {
      if (!user?.id) throw new Error('Você precisa fazer login primeiro!');
      if (!communityId || !community) throw new Error('A comunidade não foi encontrada!');

      return isMember ? leaveCommunity(communityId) : joinCommunity(communityId);
    },
    {
      onMutate: async () => {
        await client.cancelQueries(['community', communityId]);

        const previousCommunityData = client.getQueryData<CommunityDto | undefined>([
          'community',
          communityId,
        ]);

        client.setQueryData<CommunityDto>(['community', communityId], (old) => ({
          ...old!,
          members: isMember
            ? old!.members.filter((u) => u.id !== user!.id)
            : [...old!.members, user!],
        }));

        return { previousCommunityData };
      },
      onError: (_, __, context) => {
        client.setQueryData(['community', communityId], context?.previousCommunityData);
      },
      onSettled: () => {
        client.invalidateQueries(['community', communityId]);
      },
    },
  );

  return [mutation.mutate, mutation] as const;
}
