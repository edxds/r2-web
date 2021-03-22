import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Spinner } from '@r2/components/Spinner';
import { BackButton, Button } from '@r2/components/Button';

import { useUser } from '../user/hooks';
import { Post, PostList } from '../posts';
import { CreatePost } from '../posts/CreatePost';
import { useDeletePost, useLivePosts } from '../posts/hooks';

import { useCommunity } from './hooks';

export interface CommunityProps {
  id?: number;
}

export function Community({ id }: CommunityProps) {
  const history = useHistory();

  const createPostAnchorRef = useRef<HTMLDivElement>(null);
  const [createPostHeight, setCreatePostHeight] = useState(0);

  const [community, communityQuery] = useCommunity(id);
  const [user, { isLoading: isUserLoading }] = useUser();

  const communityError = communityQuery.error;

  if (communityError?.response?.status === 404 || !id) {
    return <Community404 />;
  }

  if (!community || isUserLoading) {
    return <CommunityLoading />;
  }

  const isMember = user && community.members.some((u) => user.id === u.id);

  return (
    <>
      <div
        ref={createPostAnchorRef}
        className="flex flex-col flex-1 p-6 md:py-16 space-y-6"
        style={{ paddingBottom: createPostHeight + 24 }}
      >
        <CommunityHeader
          title={community.title}
          description={community.desc}
          isMember={isMember}
          onGoBack={history.goBack}
        />
        <CommunityPosts communityId={id} />
      </div>
      <CreatePost
        className="md:px-10"
        communityId={community.id}
        onHeightChange={setCreatePostHeight}
        anchorRef={createPostAnchorRef.current}
      />
    </>
  );
}

function CommunityPosts({ communityId }: { communityId: number }) {
  const [community] = useCommunity(communityId);
  const livePosts = useLivePosts({
    communityId: community?.id,
    existingPosts: community?.posts ?? [],
    rootOnly: true,
  });

  const [postsBeingDeleted, setPostsBeingDeleted] = useState<Set<number>>(new Set());

  const [deletePost] = useDeletePost();
  const handleDeletePost = async (id: number) => {
    const newSet = new Set(postsBeingDeleted);
    newSet.add(id);
    setPostsBeingDeleted(newSet);

    await deletePost(id);
  };

  return (
    <PostList className="-mx-6 md:mx-0">
      {livePosts.map((post) => (
        <Post
          clampContent
          key={post.id}
          postId={post.id}
          authorId={post.authorId}
          author={post.author.username}
          content={post.content}
          createdAt={post.createdAt}
          replyCount={post.replies.length}
          isBeingDeleted={postsBeingDeleted.has(post.id)}
          onDelete={() => handleDeletePost(post.id)}
        />
      ))}
    </PostList>
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
