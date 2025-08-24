import { create } from 'zustand';
interface ConnectedUsersStore {
    connectedUsers: number[];
    setConnectedUsers: (users: number[]) => void;
}


export const connectedUsersStore = create<ConnectedUsersStore>((set) => {
    return {
        connectedUsers: [],
        setConnectedUsers: (users: number[]) => set({ connectedUsers: [...users] }),

    };
});
