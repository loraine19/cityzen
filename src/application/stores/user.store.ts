// src/application/stores/userStore.ts
import { create } from 'zustand';
import DI from '../../di/ioc';
import { User } from '../../domain/entities/User';
import { Profile } from '../../domain/entities/Profile';

interface UserStore {
    user: User;
    setUser: (user: User) => void;
    removeUser: () => void;
    setUserProfile: (profile: Profile) => void;
    fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => {
    const fetchUser = async () => {
        const user = await DI.resolve('userUseCase').getUserMe();
        !user.Profile && window.location.replace('/signup_details');
        set({ user: user });
    };
    !window.location.pathname.includes('/sign') && fetchUser();
    return {
        user: {} as User,
        setUser: (user: User) => set({ user: user }),
        setUserProfile: (profile: Profile) => { set({ user: { ...get().user, Profile: profile } }); fetchUser(); },
        removeUser: () => set(() => ({ user: {} as User })),
        fetchUser,
    };
});
