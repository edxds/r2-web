import { Link } from 'react-router-dom';

import { Spinner } from '@r2/components/Spinner';
import { Button } from '@r2/components/Button';

import { useJoinedCommunities } from '../user/hooks';

import { FeedSection } from './FeedSection';

export interface FeedJoinedCommunitiesProps {}

export function FeedJoinedCommunities(props: FeedJoinedCommunitiesProps) {
  const [communities, { isError, refetch }] = useJoinedCommunities();

  const content = (() => {
    if (isError) {
      return (
        <div className="grid place-content-center h-32 space-y-2">
          <p className="text-sm text-gray-600">Houve um erro ao carregar os items</p>
          <Button variant="text" color="primary" weight="medium" onClick={() => refetch()}>
            Tentar novamente
          </Button>
        </div>
      );
    }

    if (!communities) {
      return (
        <div className="grid place-content-center h-32 text-brand text-2xl">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="divide-gray-200 divide-y">
        {communities.map((community) => (
          <Link
            key={community.id}
            className="block px-6 py-4"
            to={`/feed/community/${community.id}`}
          >
            <h4 className="text-base text-gray-800 font-medium leading-relaxed">
              {community.title}
            </h4>
            <p className="text-sm text-gray-600">{community.desc}</p>
          </Link>
        ))}
      </div>
    );
  })();

  return <FeedSection title="Suas comunidades">{content}</FeedSection>;
}
