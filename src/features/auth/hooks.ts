import { useMutation, useQueryClient } from 'react-query';

import { postRevoke } from './service';

export function useRevoke() {
  const client = useQueryClient();
  const mutation = useMutation(postRevoke, {
    onSuccess: () => {
      client.invalidateQueries('user');
    },
  });

  return [mutation.mutateAsync, mutation] as const;
}
