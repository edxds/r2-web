import { useRef, useState } from 'react';
import { useHistory } from 'react-router';

import { BackButton, Button } from '@r2/components/Button';
import { Spinner } from '@r2/components/Spinner';

import { useDeletePost, useLivePosts, usePost } from './hooks';
import { CreatePost } from './CreatePost';
import { PostParent } from './PostParent';
import { PostList } from './PostList';
import { Post } from './Post';

export interface PostScreenProps {
  id?: number;
}

export function PostScreen({ id }: PostScreenProps) {
  const history = useHistory();

  const createPostAnchorRef = useRef<HTMLDivElement>(null);
  const [createPostHeight, setCreatePostHeight] = useState(0);

  const [post, { error: postError }] = usePost(id);
  const [deletePost, { isLoading: isDeleting }] = useDeletePost();
  const [postsBeingDeleted, setPostsBeingDeleted] = useState<Set<number>>(new Set());

  const liveReplies = useLivePosts({
    sort: 'asc',
    communityId: post?.communityId,
    parentPostId: post?.id,
    existingPosts: post?.replies ?? [],
  });

  const handleDelete = async (deleteId: number) => {
    const newSet = new Set(postsBeingDeleted);
    newSet.add(deleteId);
    setPostsBeingDeleted(newSet);

    await deletePost(deleteId);
    deleteId === id && history.goBack();
  };

  if (postError?.response?.status === 404 || !id) {
    return <Post404 />;
  }

  if (!post) {
    return <PostLoading />;
  }

  return (
    <>
      <div
        ref={createPostAnchorRef}
        className="flex flex-col flex-1 p-6 md:py-16 space-y-6"
        style={{ paddingBottom: createPostHeight + 24 }}
      >
        <header className="space-y-4">
          <BackButton onClick={history.goBack} />
          <PostParent
            content={post.content}
            authorId={post.authorId}
            author={post.author.username}
            communityName={post.community!.title}
            createdAt={post.createdAt}
            isBeingDeleted={isDeleting}
            onDelete={() => handleDelete(post.id)}
          />
        </header>
        <PostList className="-mx-6">
          {liveReplies.map((post) => (
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
              onDelete={() => handleDelete(post.id)}
            />
          ))}
        </PostList>
      </div>
      <CreatePost
        className="md:px-10"
        anchorRef={createPostAnchorRef.current}
        communityId={post.community!.id}
        parentPostId={post.id}
        onHeightChange={setCreatePostHeight}
      />
    </>
  );
}

function PostLoading() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6 space-y-4">
      <Spinner className="text-brand text-2xl m-auto" />
    </div>
  );
}

function Post404() {
  const history = useHistory();

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6 space-y-4">
      <p className="text-center text-xl text-gray-600">Parece que esse post não existe</p>
      <Button weight="medium" variant="text" color="primary" onClick={() => history.goBack()}>
        Voltar
      </Button>
    </div>
  );
}
