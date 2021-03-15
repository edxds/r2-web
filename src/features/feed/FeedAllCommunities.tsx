import { useQuery } from 'react-query';

import { Spinner } from '@r2/components/Spinner';
import { Button } from '@r2/components/Button';

import { getAllCommunities } from '../community/service';

import { FeedSection } from './FeedSection';

export interface FeedAllCommunitiesProps {}

export function FeedAllCommunities(props: FeedAllCommunitiesProps) {
  const query = useQuery('communities', getAllCommunities);

  const content = (() => {
    if (query.isLoading) {
      return (
        <div className="grid place-content-center h-32 text-brand text-2xl">
          <Spinner />
        </div>
      );
    }

    if (query.isError) {
      return (
        <div className="grid place-content-center h-32 space-y-2">
          <p className="text-sm text-gray-600">Houve um erro ao carregar os items</p>
          <Button variant="text" color="primary" weight="medium" onClick={() => query.refetch()}>
            Tentar novamente
          </Button>
        </div>
      );
    }

    return (
      <div className="divide-gray-200 divide-y">
        {query.data?.data.map((community) => (
          <div key={community.id} className="px-6 py-4">
            <h4 className="text-base text-gray-800 font-medium leading-relaxed">
              {community.title}
            </h4>
            <p className="text-sm text-gray-600">{community.desc}</p>
          </div>
        ))}
      </div>
    );
  })();

  return <FeedSection title="Todas as comunidades">{content}</FeedSection>;
}
