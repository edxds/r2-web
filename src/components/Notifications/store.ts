import { ReactNode } from 'react';
import { nanoid } from 'nanoid';
import create, { State } from 'zustand';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type NotificationId = string;

export type NotificationOptions = {
  timeout?: number;
};

export type NotificationType = {
  id: NotificationId;
  title: ReactNode;
  body: ReactNode;
  options?: NotificationOptions;
};

export interface NotificationStore extends State {
  notifications: Map<NotificationId, NotificationType>;
  options: NotificationOptions;
  setOptions(options: NotificationOptions): void;
  show(payload: Optional<NotificationType, 'id'>): NotificationId;
  close(id: NotificationId): void;
  closeAll(): void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: new Map(),
  options: {
    timeout: 3.5 * 1000,
  },
  setOptions(options: NotificationOptions) {
    return set({ options });
  },
  show({ id, ...payload }) {
    const { options, close } = get();

    const notification = { id: id ?? nanoid(), ...payload };
    const notifications = new Map(get().notifications);
    !notifications.has(notification.id) && notifications.set(notification.id, notification);

    set({ notifications });

    const timeout = notification.options?.timeout ?? options.timeout;
    setTimeout(() => {
      close(notification.id);
    }, timeout);

    return notification.id;
  },
  close(id) {
    const notifications = new Map(get().notifications);
    notifications.delete(id);

    set({ notifications });
  },
  closeAll() {
    return set({ notifications: new Map() });
  },
}));
