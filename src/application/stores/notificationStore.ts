//src/application/stores/notificationStore.ts
import { create } from 'zustand';
import { NotifView } from '../../domain/entities/Notif';
import DI from '../../di/ioc';

interface NotificationStore {
  notifList: NotifView[];
  setNotifList: (newNotifList: NotifView[]) => void;
  updateNotif: (newList: NotifView[]) => void;
  addNotif: (newNotif: NotifView) => void;
  removeNotif: (notifId: number) => void;
};

export const useNotificationStore = create<NotificationStore>((set) => {
  const fetchNotifications = async () => {
    const notifs = await DI.resolve('notifGetViewModel')();
    set({ notifList: notifs });
    console.log('notifListStore', notifs)
  };
  fetchNotifications();
  return {
    notifList: [],
    setNotifList: (newNotifList: NotifView[]) => set({ notifList: newNotifList }),
    addNotif: (newNotif: NotifView) =>
      set((state) => ({ notifList: [...state.notifList, newNotif] })),

    updateNotif: (newList: NotifView[]) =>
      set((state) => {
        state.notifList.map((notif) => {
          const find = newList.find((newNotif) => (newNotif.id === notif.id && newNotif.element === notif.element && new Date(newNotif.updatedAt).getTime() > new Date(notif.updatedAt).getTime()));
          find ? state.notifList.push(find) : null;
        })
        return { notifList: newList }
      }),

    removeNotif: (notifId: number) =>
      set((state) => {
        const notifIndex = state.notifList.findIndex((notif) => notif.id === notifId);
        if (notifIndex !== -1) {
          state.notifList[notifIndex].read = true;
        }
        return { notifList: state.notifList };
      })
  }
})


