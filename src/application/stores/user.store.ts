import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import DI from '../../di/ioc';
import { User } from '../../domain/entities/User';
import { Profile } from '../../domain/entities/Profile';
import { cryptedCookie } from '../../infrastructure/services/cookiService';
import { ProfileView } from '../../presenter/views/viewsEntities/profileViewEntity';

interface UserStore {
    user: User;
    profile: Profile;
    setUser: (user: User) => void;
    removeUser: () => void;
    setUserProfile: (profile: Profile) => void;
    fetchUser: () => Promise<void>;
    setIsLoggedIn: (value: boolean) => void;
    isLoggedIn: boolean;
    connected: boolean;
    setConnected: (value: boolean) => void;
}

export const useUserStore = create<UserStore, [['zustand/persist', UserStore]]>(
    persist((set) => {
        const fetchUser = async () => {
            let userUpdated: User = {} as User;
            let loggedIn = true
            if (!window.location.pathname.includes('/sign')) {
                try {
                    userUpdated = await DI.resolve('getUserMeUseCase').execute() as User;
                    loggedIn = userUpdated ? true : false;
                }
                catch (error) {
                    console.error('Error fetching user:', error);
                    throw new Error(error as string ?? 'Failed to fetch user');
                }
                //  if (!userUpdated?.Profile) { window.location.replace('/profile/create') };
                set({ user: userUpdated });
                set({ profile: new ProfileView(userUpdated?.Profile) });
                set({ isLoggedIn: loggedIn });
            }
        }

        return {
            user: {} as User,
            profile: {} as Profile,
            setUser: (user: User) => set({ user: new User(user) }),
            setUserProfile: (profile: Profile) => set((state) => ({ user: { ...state.user, Profile: new ProfileView(profile) } })),
            removeUser: () => set(() => ({ user: {} as User })),
            fetchUser,
            isLoggedIn: false,
            setIsLoggedIn: (value: boolean) => set(() => ({ isLoggedIn: value })),
            connected: false,
            setConnected: (value: boolean) => set(() => ({ connected: value })),
        }
    },
        {
            name: 'user',
            storage: createJSONStorage(() => new cryptedCookie()),
        }
    )
);
