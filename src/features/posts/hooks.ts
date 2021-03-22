import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import uniqBy from 'lodash/uniqBy';
import io from 'socket.io-client';

import { notify } from '@r2/components/Notifications';

import { PostDto } from './dto';
import { sortPostsByDate } from './utils';
import { createPost, deletePost, getPost } from './service';

export function usePost(id?: number) {
  const query = useQuery<PostDto, AxiosError>(['post', id], () => getPost(id!), { enabled: !!id });
  return [query.data, query] as const;
}

export function useDeletePost() {
  const client = useQueryClient();
  const mutation = useMutation(deletePost, {
    onSuccess: (post) => {
      client.invalidateQueries(['community', post.communityId]);
      client.invalidateQueries(['post', post.id]);
    },
    onError: () => {
      notify({ title: 'Oops!', body: 'Encontramos um erro e não foi possível apagar o seu post' });
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
  sort,
  existingPosts,
  communityId,
  parentPostId,
  rootOnly,
}: {
  sort?: 'asc' | 'desc';
  existingPosts: PostDto[];
  communityId?: number;
  parentPostId?: number;
  rootOnly?: boolean;
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
    const _socket = io(`${process.env.REACT_APP_API_BASE_URL}/posts`);
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
    const filtered = [...newPosts, ...sortedExistingPosts].filter(
      ({ id, parentPostId }) => !deletedIds.has(id) && (rootOnly ? !parentPostId : true),
    );
    const unique = uniqBy(filtered, 'id');
    return sortPostsByDate(unique, sort);
  }, [deletedIds, newPosts, rootOnly, sort, sortedExistingPosts]);
}
