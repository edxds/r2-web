import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TextareaAutosize from 'react-textarea-autosize';
import clsx from 'clsx';

import { useSize } from '@r2/hooks/useSize';
import { Button } from '@r2/components/Button';

import { useCreatePost } from './hooks';

export interface CreatePostProps extends ComponentPropsWithoutRef<'div'> {
  communityId: number;
  parentPostId?: number;
  anchorRef?: HTMLElement | null;
  onHeightChange?(height: number): any;
}

export function CreatePost({
  communityId,
  parentPostId,
  anchorRef,
  onHeightChange,
  className,
  ...props
}: CreatePostProps) {
  const [content, setContent] = useState('');
  const [anchorRect, setAnchorRect] = useState(anchorRef?.getBoundingClientRect());
  const [anchorLeft, setAnchorLeft] = useState(anchorRef?.offsetLeft);

  const [createPost, { isLoading }] = useCreatePost({ onSuccess: () => setContent('') });

  const containerRef = useRef<HTMLDivElement>(null);
  const size = useSize(containerRef);

  const updateAnchorBounds = useCallback(() => {
    setAnchorRect(anchorRef?.getBoundingClientRect());
    setAnchorLeft(anchorRef?.offsetLeft);
  }, [anchorRef]);

  const handleSend = () => {
    if (isLoading || !content) return;
    createPost({ communityId, parentPostId, content });
  };

  useLayoutEffect(() => {
    updateAnchorBounds();
  }, [updateAnchorBounds]);

  useEffect(() => {
    window.addEventListener('resize', updateAnchorBounds);
    return () => {
      window.removeEventListener('resize', updateAnchorBounds);
    };
  }, [updateAnchorBounds]);

  useEffect(() => {
    size?.height && onHeightChange?.(size.height);
  }, [size?.height, onHeightChange]);

  return (
    <div
      ref={containerRef}
      className={clsx('fixed bottom-0 mb-14 md:mb-0', className)}
      style={{ left: anchorLeft, width: anchorRect?.width }}
      {...props}
    >
      <div
        className={clsx(
          'w-full flex flex-col bg-white rounded-t-xl border-gray-200 shadow-xl border-t p-2 space-y-2',
          'md:rounded-xl md:mb-6 md:border',
        )}
      >
        <TextareaAutosize
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="block self-stretch outline-none border-none resize-none rounded-xl text-gray-800"
          placeholder="Digitar novo post..."
          disabled={isLoading}
          onKeyDown={({ key, shiftKey }) => key === 'Enter' && !shiftKey && handleSend()}
        />
        <AnimatePresence>
          {content && (
            <motion.div
              className="self-end"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Button weight="medium" color="primary" onClick={handleSend}>
                Postar
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
