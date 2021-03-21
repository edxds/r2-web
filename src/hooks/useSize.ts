import { RefObject, useLayoutEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

export const useSize = (target: RefObject<HTMLElement>) => {
  const [size, setSize] = useState<DOMRect>();

  useLayoutEffect(() => {
    setSize(target.current?.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};
