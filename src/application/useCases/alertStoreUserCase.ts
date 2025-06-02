import { create } from 'zustand';

// src/application/useCases/alertStoreUserCase.ts

type Alert = {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
};

type AlertStore = {
    alerts: Alert[];
    addAlert: (alert: Omit<Alert, 'id'>) => void;
    removeAlert: (id: string) => void;
    clearAlerts: () => void;
};

export const useAlertStore = create<AlertStore>((set) => ({
    alerts: [],
    addAlert: (alert) =>
        set((state) => ({
            alerts: [
                ...state.alerts,
                { ...alert, id: Math.random().toString(36).substr(2, 9) },
            ],
        })),
    removeAlert: (id) =>
        set((state) => ({
            alerts: state.alerts.filter((a) => a.id !== id),
        })),
    clearAlerts: () => set({ alerts: [] }),
}));