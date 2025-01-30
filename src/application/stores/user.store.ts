import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import DI from '../../di/ioc';
import { User } from '../../domain/entities/User';
import { Profile } from '../../domain/entities/Profile';
import { cryptedStorage } from '../../infrastructure/services/storageService';



interface UserStore {
    user: User;
    profile: Profile;
    setUser: (user: User) => void;
    removeUser: () => void;
    setUserProfile: (profile: Profile) => void;
    fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore, [['zustand/persist', UserStore]]>(
    persist((set) => {
        const fetchUser = async () => {
            if (!window.location.pathname.includes('/sign')) {
                const user = await DI.resolve('getUserMeUseCase').execute() as User;
                !user.Profile && window.location.replace('/signup_details');
                set({ user: user });
                set({ profile: user.Profile });
            }
        }
        return {
            user: {} as User,
            profile: {} as Profile,
            setUser: (user: User) => set({ user: user }),
            setUserProfile: (profile: Profile) => set((state) => ({ user: { ...state.user, Profile: profile } })),
            removeUser: () => set(() => ({ user: {} as User })),
            fetchUser,
        };
    },
        {
            name: 'user-storage',
            storage: createJSONStorage(() => new cryptedStorage()),
        }
    )
);
