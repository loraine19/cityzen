//src/application/stores/notificationStore.ts
import { create } from 'zustand';
import { NotifView } from '../../domain/entities/Notif';
import DI from '../../di/ioc';
import { NotifApi } from '../../infrastructure/providers/http/notifApi';

interface NotificationStore {
  notifList: NotifView[];
  setNotifList: (newNotifList: NotifView[]) => void;
  addNotif: (newNotif: NotifView) => void;
  removeNotif: (notifId: number) => void;
}

const call = new NotifApi();
//const { notifs } = DI.resolve('notifViewModel')


export const useNotificationStore = create<NotificationStore>((set) => ({
  notifList: [],
  setNotifList: (newNotifList: NotifView[]) => set({ notifList: newNotifList }),
  addNotif: (newNotif: NotifView) => set((state) => ({ notifList: [...state.notifList, newNotif] })),
  removeNotif: (notifId: number) =>
    set((state) => ({
      notifList: state.notifList.filter((notif) => notif.id !== notifId),
    })),
}));


