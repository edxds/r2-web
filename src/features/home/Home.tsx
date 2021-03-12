import { useQuery } from 'react-query';
import { Redirect } from 'react-router';

import { getUserInfo } from '../user/service';

export interface HomeProps {}

export function Home() {
  const userQuery = useQuery('user', getUserInfo);
  const user = userQuery.data;

  if (userQuery.isError) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div className="p-6">
      {userQuery.isLoading && <p className="w-full text-center text-gray-600">Carregando...</p>}
      {user && (
        <h1 className="text-2xl text-gray-800 font-black">
          <span className="block text-base text-gray-500 font-normal">Boas-vindas,</span>
          {user?.username}
        </h1>
      )}
    </div>
  );
}
