//src/application/stores/notificationStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { NotifView } from '../../domain/entities/Notif';

interface NotificationStore {
  notifList: NotifView[];
  setNotifList: (newNotifList: NotifView[]) => void;
  updateNotif: (newList: NotifView[]) => void;
  addNotif: (newNotif: NotifView) => void;
  removeNotif: (notifId: number) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      notifList: [],
      setNotifList: (newNotifList: NotifView[]) => set({ notifList: newNotifList }),
      addNotif: (newNotif: NotifView) =>
        set((state) => ({ notifList: [...state.notifList, newNotif] })),
      updateNotif: (newList: NotifView[]) =>
        set((state) => {
          const updatedList = state.notifList.map((notif) => {
            const find = newList.find(
              (newNotif) =>
                newNotif.id === notif.id &&
                newNotif.element === notif.element &&
                new Date(newNotif.updatedAt).getTime() > new Date(notif.updatedAt).getTime()
            );
            return find ? find : notif;
          });
          return { notifList: updatedList };
        }),
      removeNotif: (notifId: number) =>
        set((state) => {
          const notifIndex = state.notifList.findIndex((notif) => notif.id === notifId);
          if (notifIndex !== -1) {
            state.notifList[notifIndex].read = true;
          }
          return { notifList: state.notifList };
        }),
    }),
    {
      name: 'notification',
      storage: createJSONStorage(() => localStorage),
    }
  )
);


