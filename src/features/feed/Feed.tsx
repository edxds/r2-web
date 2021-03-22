import { Redirect } from 'react-router';

import { Spinner } from '@r2/components/Spinner';

import { useUser } from '../user/hooks';

import { FeedMenu } from './FeedMenu';
import { FeedSection } from './FeedSection';
import { FeedAllCommunities } from './FeedAllCommunities';
import { FeedJoinedCommunities } from './FeedJoinedCommunities';

export interface FeedProps {}

export function Feed() {
  const [user, userQuery] = useUser();

  if (userQuery.isError) {
    return <Redirect to="/sign-in" />;
  }

  if (userQuery.isLoading || !user) {
    return (
      <div className="flex flex-1">
        <Spinner className="text-brand text-2xl m-auto" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center bg-gray-50 p-6 md:py-16">
      <div className="flex-1 max-w-screen-md space-y-6">
        <header className="flex items-center justify-between space-x-4">
          <h1 className="text-2xl text-gray-800 font-black">
            <span className="block text-base text-gray-500 font-normal">Boas-vindas,</span>
            {user.username}
          </h1>
          <FeedMenu />
        </header>
        <FeedJoinedCommunities />
        <FeedAllCommunities />
      </div>
    </div>
  );
}
