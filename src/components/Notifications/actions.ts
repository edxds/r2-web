import { NotificationStore, useNotificationStore } from './store';

export const setNotificationOptions: NotificationStore['setOptions'] = (options) =>
  useNotificationStore.getState().setOptions(options);

export const notify: NotificationStore['show'] = (payload) =>
  useNotificationStore.getState().show(payload);

export const closeNotification: NotificationStore['close'] = (id) =>
  useNotificationStore.getState().close(id);

export const closeAllNotifications: NotificationStore['closeAll'] = () =>
  useNotificationStore.getState().closeAll();
