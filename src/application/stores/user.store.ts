import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import DI from '../../di/ioc';
import { User } from '../../domain/entities/User';
import { Profile } from '../../domain/entities/Profile';
import { cryptedCookie } from '../../infrastructure/services/cookiService';

interface UserStore {
    user: User;
    profile: Profile;
    setUser: (user: User) => void;
    removeUser: () => void;
    setUserProfile: (profile: Profile) => void;
    fetchUser: () => Promise<void>;
    setIsLoggedIn: (value: boolean) => void;
    isLoggedIn: boolean;
}

export const useUserStore = create<UserStore, [['zustand/persist', UserStore]]>(
    persist((set) => {
        const fetchUser = async () => {
            //if (!window.location.pathname.includes('/sign')) {
            const user = await DI.resolve('getUserMeUseCase').execute() as User;
            // if (!user.Profile) { window.location.replace('/profile/create') };
            set({ user: user });
            set({ profile: user.Profile });
            set({ isLoggedIn: true });

            // }
        }

        return {
            user: {} as User,
            profile: {} as Profile,
            setUser: (user: User) => set({ user: new User(user) }),
            setUserProfile: (profile: Profile) => set((state) => ({ user: { ...state.user, Profile: profile } })),
            removeUser: () => set(() => ({ user: {} as User })),
            fetchUser,
            isLoggedIn: Profile ? true : false,
            setIsLoggedIn: (value: boolean) => set(() => ({ isLoggedIn: value })),
        }
    },
        {
            name: 'user',
            storage: createJSONStorage(() => new cryptedCookie()),
        }
    )
);
