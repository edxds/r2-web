import { motion } from 'framer-motion';

import { NotificationType, useNotificationStore } from './store';

const DRAG_VELOCITY_THRESHOLD = -150;
const DRAG_OFFSET_THRESHOLD = -32;

export interface NotificationProps extends NotificationType {}

export function Notification(props: NotificationProps) {
  const close = useNotificationStore((store) => store.close);

  return (
    <motion.li
      drag="y"
      dragConstraints={{
        top: -16,
        bottom: 8,
      }}
      onDragEnd={(_, info) => {
        if (info.velocity.y < DRAG_VELOCITY_THRESHOLD || info.offset.y < DRAG_OFFSET_THRESHOLD) {
          close(props.id);
        }
      }}
      layout="position"
      initial={{ opacity: 0, y: -32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -32 }}
      className="pointer-events-auto bg-gray-600 text-white rounded-xl shadow-xl m-4 p-4"
    >
      <main className="mb-2">
        <h6 className="opacity-75 text-sm tracking-wider uppercase">{props.title}</h6>
        <p className="opacity-95 text-base mt-0.5">{props.body}</p>
      </main>
      <div className="rounded-full h-1 bg-gray-500 w-1/4 mx-auto" />
    </motion.li>
  );
}
