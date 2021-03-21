import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import uniqBy from 'lodash/uniqBy';
import io from 'socket.io-client';

import { notify } from '@r2/components/Notifications';

import { PostDto } from './dto';
import { sortPostsByDate } from './utils';
import { createPost, deletePost } from './service';

export function useDeletePost() {
  const client = useQueryClient();
  const mutation = useMutation(deletePost, {
    onSuccess: (post) => {
      client.invalidateQueries(['community', post.communityId]);
    },
  });

  return [mutation.mutateAsync, mutation] as const;
}

export function useCreatePost({ onSuccess }: { onSuccess: () => any }) {
  const mutation = useMutation(createPost, {
    onSuccess,
    onError: (error: AxiosError) => {
      let message = 'Um erro ocorreu e não foi possível fazer sua postagem';
      if (error.response?.data.message) {
        message = error.response.data.message;
      }

      notify({ title: 'Oops!', body: message });
    },
  });
  return [mutation.mutateAsync, mutation] as const;
}

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
