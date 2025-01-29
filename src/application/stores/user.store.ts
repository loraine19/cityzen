import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import DI from '../../di/ioc';
import { User } from '../../domain/entities/User';
import { Profile } from '../../domain/entities/Profile';
import { cryptedStorage } from '../../infrastructure/services/storageService';


const storage = new cryptedStorage()

interface UserStore {
    user: User;
    profile: Profile;
    setUser: (user: User) => void;
    removeUser: () => void;
    setUserProfile: (profile: Profile) => void;
    fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore, [['zustand/persist', UserStore]]>(
    persist(
        (set, get) => {
            const fetchUser = async () => {
                const user = await DI.resolve('userUseCase').getUserMe();
                !user.Profile && window.location.replace('/signup_details');
                set({ user: user });
                set({ profile: user.Profile });
            };
            !window.location.pathname.includes('/sign') && fetchUser();
            return {
                user: {} as User,
                profile: {} as Profile,
                setUser: (user: User) => set({ user: user }),
                setUserProfile: (profile: Profile) => { set({ user: { ...get().user, Profile: profile } }); fetchUser(); },
                removeUser: () => set(() => ({ user: {} as User })),
                fetchUser,
            };
        },
        {
            name: 'user-storage',
            storage: createJSONStorage(() => storage),
        }
    )
);
