// src/application/stores/notificationStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { cryptedStorage } from '../../infrastructure/services/storageService';
import DI from '../../di/ioc';
import { NotifView } from '../../presenter/views/viewsEntities/notifViewEntity';

interface NotificationStore {
  notifList: NotifView[];
  updateNotif: () => void;
  removeNotif: (notifId: number) => void;
  fetchNotif: () => Promise<void>;
  unReadMsgNotif: number;
  setUnReadMsgNotif: (value: number) => void;
}

const storage = new cryptedStorage();

export const useNotificationStore = create<NotificationStore, [['zustand/persist', NotificationStore]]>(
  persist((set) => {
    const getNewNotif = async () => {
      const notifs = await DI.resolve('getNotifUseCase').execute() as NotifView[];
      return notifs
    }
    const fetchNotif = async () => {
      if (!window.location.pathname.includes('/sign')) {
        const notif = await getNewNotif();
        set({ notifList: notif });
        storage.setItem('notifications', notif);
      }
    }
    return {
      unReadMsgNotif: 0,
      setUnReadMsgNotif: (value: number) => set({ unReadMsgNotif: value }),
      notifList: [],
      addNotif: (newNotif: NotifView) => {
        set((state) => ({ notifList: [...state.notifList, newNotif] }));
      },
      updateNotif: async () => {
        const newNotifs = await getNewNotif();
        set((state) => {
          const updatedList = newNotifs.map((notif: any) => {
            const find = state.notifList.find(
              (newNotif: any) =>
                newNotif.id === notif.id &&
                newNotif.element === notif.element &&
                new Date(newNotif.updatedAt).getTime() > new Date(notif.updatedAt).getTime()
            );
            return find ? find : notif;
          })
          return { notifList: updatedList };
        });
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
