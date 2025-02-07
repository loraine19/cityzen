// src/application/stores/notificationStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { NotifView } from '../../domain/entities/Notif';
import { cryptedStorage } from '../../infrastructure/services/storageService';
import DI from '../../di/ioc';
import { useUserStore } from './user.store';

interface NotificationStore {
  notifList: NotifView[];
  updateNotif: () => void;
  addNotif: (newNotif: NotifView) => void;
  removeNotif: (notifId: number) => void;
  fetchNotif: () => Promise<void>;
}

const storage = new cryptedStorage();

export const useNotificationStore = create<NotificationStore, [['zustand/persist', NotificationStore]]>(
  persist((set) => {
    const getNewNotif = async () => {
      const notifs = await DI.resolve('getNotifUseCase').execute() as NotifView[];
      const userId = useUserStore.getState().user.id;
      const notif = DI.resolve('notifService').getInfosInNotifs(notifs, userId);
      return notif
    }
    const fetchNotif = async () => {
      if (!window.location.pathname.includes('/sign')) {
        const notif = await getNewNotif();
        set({ notifList: notif });
        storage.setItem('notifications', notif);
      }
    }

    return {
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
          });
          console.log('updatedList', updatedList);
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
