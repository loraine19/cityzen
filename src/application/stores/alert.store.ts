import { create } from 'zustand';
import { AlertValues } from '../../domain/entities/Error';

interface alertStore {
    open: boolean;
    setOpen: (open: boolean) => void;
    alertValues: AlertValues;
    setAlertValues: (alertValues: Partial<AlertValues>) => void;
}


export const useAlertStore = create<alertStore>((set) => {
    return {
        open: false,
        setOpen: (open: boolean) => set({ open: open }),
        alertValues: new AlertValues(),
        setAlertValues: (newAlertValues: Partial<AlertValues>) => set((state) => ({
            alertValues: { ...state.alertValues, ...newAlertValues }
        })),
    };
});
