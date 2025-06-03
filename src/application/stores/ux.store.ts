// src/application/stores/UxStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { cryptedStorage } from '../../infrastructure/services/storageService';

interface UxStore {
  color: string;
  setColor: (color: string) => void;
  getColor: (path?: string) => void;
  navBottom: boolean;
  setNavBottom: (value: boolean) => void;
  hideNavBottom: boolean;
  setHideNavBottom: (value: boolean) => void;

}

const storage = new cryptedStorage();

export const useUxStore = create<UxStore, [['zustand/persist', UxStore]]>(
  persist((set) => {
    return {
      navBottom: true,
      setNavBottom: (value: boolean) => set(() => ({ navBottom: value })),
      hideNavBottom: false,
      setHideNavBottom: (value: boolean) => set(() => ({ hideNavBottom: value })),
      color: 'gray',
      setColor: (color: string) => set({ color }),
      getColor: (path?: string) => {
        let color = 'gray';
        if (path) {
          const type = new URLSearchParams(path.split("/")[1]).toString().replace("=", '');
          switch (type) {
            case 'service':
            case 'evenement':
              color = 'cyan';
              break;
            case 'annonce':
            case 'vote':
            case 'cagnotte':
            case 'sonadage':
              color = 'orange';
              break;
            default:
              color = 'gray';
          }
        }
        set({ color });
      }
    }
  },
    {
      name: 'ux',
      storage: createJSONStorage(() => storage),
    }
  )
);
