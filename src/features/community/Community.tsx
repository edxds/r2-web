import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { Spinner } from '@r2/components/Spinner';
import { BackButton, Button } from '@r2/components/Button';
import { ReactComponent as WriteIcon } from '@r2/assets/icons/write.svg';

import { useUser } from '../user/hooks';
import { Post, PostList } from '../posts';
import { useLivePosts } from '../posts/hooks';

import { useCommunity } from './hooks';

export interface CommunityProps {
  id?: number;
}

export function Community({ id }: CommunityProps) {
  const history = useHistory();

  const [community, communityQuery] = useCommunity(id);
  const [user, { isLoading: isUserLoading }] = useUser();
  const livePosts = useLivePosts({
    communityId: community?.id,
    existingPosts: community?.posts ?? [],
  });

  const communityError = communityQuery.error;

  if (communityError?.response?.status === 404 || !id) {
    return <Community404 />;
  }

  if (!community || isUserLoading) {
    return <CommunityLoading />;
  }

  const isMember = user && community.members.some((u) => user.id === u.id);

  return (
    <div className="flex flex-col flex-1 p-6 md:py-16 space-y-6">
      <CommunityHeader
        title={community.title}
        description={community.desc}
        isMember={isMember}
        onGoBack={history.goBack}
      />
      <PostList className="-mx-6 md:mx-0">
        {livePosts.map((post) => (
          <Post
            key={post.id}
            author={post.author.username}
            content={post.content}
            createdAt={post.createdAt}
            replyCount={post.replies.length}
          />
        ))}
      </PostList>
    </div>
  );
}

function CommunityLoading() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6 space-y-4">
      <Spinner className="text-brand text-2xl m-auto" />
    </div>
  );
}

function Community404() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6 space-y-4">
      <p className="text-center text-xl text-gray-600">Parece que essa comunidade não existe</p>
      <Button as={Link} to="/feed" weight="medium" variant="text" color="primary">
        Voltar ao início
      </Button>
    </div>
  );
}

interface CommunityHeaderProps {
  title: string;
  description: string;
  isMember?: boolean;
  onGoBack?(): any;
  onNewPost?(): any;
  onToggleMembership?(): any;
}

function CommunityHeader({
  title,
  description,
  isMember,
  onGoBack,
  onNewPost,
  onToggleMembership,
}: CommunityHeaderProps) {
  return (
    <header className="space-y-4">
      <section className="flex justify-between item-center">
        <BackButton onClick={onGoBack} />
        <Button weight="medium" color="primary" variant="text">
          <span>Novo Post</span>
          <WriteIcon className="fill-current icon" />
        </Button>
      </section>
      <section className="flex flex-col space-y-1">
        <h1 className="text-gray-800 text-lg font-black">{title}</h1>
        <p className="text-gray-600 text-sm">{description}</p>
      </section>
      <section className="flex items-stretch space-x-2">
        <Button color="primary" weight="medium" className="flex-1" onClick={onToggleMembership}>
          {isMember ? 'Sair da comunidade' : 'Juntar-se'}
        </Button>
      </section>
    </header>
  );
}
