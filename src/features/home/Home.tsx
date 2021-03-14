import { useQuery } from 'react-query';
import { Redirect } from 'react-router';

import { Spinner } from '@r2/components/Spinner';

import { getUserInfo } from '../user/service';

export interface HomeProps {}

export function Home() {
  const userQuery = useQuery('user', getUserInfo);
  const user = userQuery.data;

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
      <div className="flex-1 max-w-screen-md">
        <h1 className="text-2xl text-gray-800 font-black">
          <span className="block text-base text-gray-500 font-normal">Boas-vindas,</span>
          {user.username}
        </h1>
      </div>
    </div>
  );
}
