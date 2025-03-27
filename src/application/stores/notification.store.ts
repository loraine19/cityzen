// src/application/stores/notificationStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { cryptedStorage } from '../../infrastructure/services/storageService';
import DI from '../../di/ioc';
import { NotifView } from '../../presenter/views/viewsEntities/notifViewEntity';
import { ElementNotif, Notif } from '../../domain/entities/Notif';

interface NotificationStore {
  notifList: NotifView[];
  notifListMap: NotifView[];
  notifListMessages: NotifView[];
  notifListNotMessages: NotifView[];
  updateNotif: () => void;
  removeNotif: (notifId: number) => void;
  fetchNotif: () => Promise<void>;
  unReadNotif: number;
  unReadMsgNotif: number;
  unReadNotMessages: number;
  setUnReadMsgNotif: (value: number) => void;
  setUnReadNotif: (value: number) => void;
  setUnReadNotMessages: (value: number) => void;

}

const storage = new cryptedStorage();

export const useNotificationStore = create<NotificationStore, [['zustand/persist', NotificationStore]]>(
  persist((set) => {

    const getNewNotif = async () => {
      const getNotifs = (filter?: string) => DI.resolve('getNotifUseCase').execute(0, filter);
      const getNotifsMap = () => DI.resolve('getNotifUseCase').execute(0, '', true);

      const { notifs, count } = await getNotifs();
      const messages = await getNotifs(ElementNotif.MESSAGE);
      const notMsg = await getNotifs(Object.keys(ElementNotif).filter((key) => key !== 'MESSAGE').join(','));
      const notifMap = await getNotifsMap();

      return { notifs, count, messages, notMsg, notifMap };
    }
    const fetchNotif = async () => {
      if (!window.location.pathname.includes('/sign')) {
        const { notifs, count, messages, notMsg, notifMap } = await getNewNotif();
        set({ notifList: notifs });
        set({ unReadMsgNotif: messages.count });
        set({ unReadNotMessages: notMsg.count });
        set({ unReadNotif: count });
        set({ notifListMessages: messages.notifs.map((notif: Notif) => new NotifView(notif)) });
        set({ notifListNotMessages: notMsg.notifs.map((notif: Notif) => new NotifView(notif)) });
        set({ notifListMap: notifMap.notifs.map((notif: Notif) => new NotifView(notif)) });
        storage.setItem('notifications', notifs);
      }
    }
    return {
      unReadNotif: 0,
      unReadMsgNotif: 0,
      unReadNotMessages: 0,
      setUnReadMsgNotif: (value: number) => set({ unReadMsgNotif: value }),
      setUnReadNotMessages: (value: number) => set({ unReadNotMessages: value }),
      setUnReadNotif: (value: number) => set({ unReadNotif: value }),
      notifListMessages: [],
      notifListNotMessages: [],
      notifListMap: [],
      notifList: [],
      addNotif: (newNotif: NotifView) => {
        set((state) => ({ notifList: [...state.notifList, newNotif] }));
      },
      updateNotif: async () => {
        const newNotifs = await getNewNotif();
        set({ notifList: newNotifs.notifs });
      },
      removeNotif: (notifId: number) => {
        set((state) => {
          const notifIndex = state.notifList.findIndex((notif) => notif.id === notifId);
          if (notifIndex !== -1) {
            state.notifList[notifIndex].read = true;
          }
          return { notifList: state.notifList };
        });
      },
      fetchNotif,
    };
  },
    {
      name: 'notifications',
      storage: createJSONStorage(() => storage),
    }
  )
);
