//src/application/stores/notificationStore.ts
import { create } from 'zustand';
import DI from '../../di/ioc';
import { User } from '../../domain/entities/User';
import { Profile } from '../../domain/entities/Profile';

interface UserStore {
    user: User
    setUser: (user: User) => void
    removeUser: () => void
    setUserProfile: (profile: Profile) => void
};

export const useUserStore = create<UserStore>((set, get) => {
    const fetch = async () => {
        const user = await DI.resolve('userUseCase').getUserMe();
        set({ user: user });
    };
    fetch();
    return {
        user: {} as User,
        setUser: (user: User) => set({ user: user }),
        setUserProfile: (profile: Profile) => set({ user: { ...get().user, Profile: profile } }),
        removeUser: () => set(() => { return { user: {} as User } })
    }
})


