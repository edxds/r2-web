import clsx from 'clsx';
import { useHistory } from 'react-router';

import { Button } from '@r2/components/Button';
import { Spinner } from '@r2/components/Spinner';

import { useRevoke } from '../auth/hooks';

import { useUser } from './hooks';

export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  const history = useHistory();

  const [user] = useUser();
  const [revoke, { isLoading: isRevoking }] = useRevoke();

  if (!user) {
    return (
      <div className="grid flex-1 place-items-center">
        <Spinner className="text-brand text-2xl" />
      </div>
    );
  }

  const signOut = async () => {
    if (isRevoking) return;
    await revoke(undefined);
    history.push('/welcome');
  };

  return (
    <div className="flex flex-1 flex-col space-y-6 p-6 md:py-16">
      <header>
        <h1 className="font-black text-gray-800 text-2xl">@{user.username}</h1>
      </header>
      <section
        className={clsx(
          'flex flex-col items-stretch',
          'bg-white border-gray-200 border-t border-b',
          'md:rounded-xl md:border',
          'divide-y divide-gray-200',
        )}
      >
        <Button
          weight="medium"
          variant="text"
          className="text-red-500 py-4"
          isLoading={isRevoking}
          onClick={signOut}
        >
          <span>Sair da conta</span>
        </Button>
      </section>
    </div>
  );
}
