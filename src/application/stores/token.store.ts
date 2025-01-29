import { create, } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { cryptedStorage } from '../../infrastructure/services/storageService';
import { AccessDTO } from '../../domain/entities/Auth';


const storage = new cryptedStorage()

interface TokenStore {
    access: AccessDTO;
    setAccess: (access: AccessDTO) => void;
    removeAccess: () => void;
}

export const useTokenStore = create<TokenStore, [['zustand/persist', TokenStore]]>(
    persist(
        (set) => {
            return {
                access: {} as AccessDTO,
                setAccess: (access: AccessDTO) => set({ access: access }),
                removeAccess: () => set(() => ({ access: {} as AccessDTO })),
            };
        },
        {
            name: 'access',
            storage: createJSONStorage(() => storage),
        }
    )
);
