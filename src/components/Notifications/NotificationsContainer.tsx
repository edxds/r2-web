import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

import { Notification } from './Notification';
import { NotificationOptions, useNotificationStore } from './store';

export interface NotificationsContainerProps {}

export function NotificationsContainer(props: NotificationOptions) {
  const notifications = useNotificationStore((store) => store.notifications);

  const notificationArray = useMemo(
    () => Array.from(notifications).map(([key, notification]) => notification),
    [notifications],
  );

  return (
    <motion.ul className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
        {notificationArray.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
