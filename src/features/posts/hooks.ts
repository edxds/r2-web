import { useCallback, useEffect, useMemo, useState } from 'react';
import uniqBy from 'lodash/uniqBy';
import io from 'socket.io-client';

import { PostDto } from './dto';
import { sortPostsByDate } from './utils';

export function useLivePosts({
  existingPosts,
  communityId,
  parentPostId,
}: {
  existingPosts: PostDto[];
  communityId?: number;
  parentPostId?: number;
}) {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [newPosts, setNewPosts] = useState<PostDto[]>([]);
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set());

  const sortedExistingPosts = useMemo(() => sortPostsByDate(existingPosts), [existingPosts]);

  const handleOnPostCreated = useCallback((post: PostDto) => {
    setNewPosts((posts) => [post, ...posts]);
  }, []);

  const handleOnPostDeleted = useCallback(
    ({ postId }: { postId: number }) => {
      const newSet = new Set(deletedIds);
      newSet.add(postId);
      setDeletedIds(newSet);
    },
    [deletedIds],
  );

  useEffect(() => {
    const _socket = io('http://192.168.1.128:8080/posts');
    _socket.on('connect', () => {
      communityId && _socket.emit('join', { communityId, parentPostId });
    });

    setSocket(_socket);
    return () => {
      _socket.close();
      setSocket(undefined);
    };
  }, [communityId, parentPostId]);

  useEffect(() => {
    socket?.on('created', handleOnPostCreated);
    return () => {
      socket?.off('created', handleOnPostCreated);
    };
  }, [handleOnPostCreated, socket]);

  useEffect(() => {
    socket?.on('deleted', handleOnPostDeleted);
    return () => {
      socket?.off('deleted', handleOnPostDeleted);
    };
  }, [handleOnPostDeleted, socket]);

  return useMemo(() => {
    const filtered = [...newPosts, ...sortedExistingPosts].filter(({ id }) => !deletedIds.has(id));
    const unique = uniqBy(filtered, 'id');
    return sortPostsByDate(unique);
  }, [deletedIds, newPosts, sortedExistingPosts]);
}
