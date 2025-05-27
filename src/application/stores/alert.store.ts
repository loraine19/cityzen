import { create } from 'zustand';
import { AlertValues } from '../../domain/entities/Error';

interface alertStore {
    open: boolean;
    setOpen: (open: boolean) => void;
    alertValues: AlertValues;
    setAlertValues: (alertValues: Partial<AlertValues>) => void;
    handleApiError: (error: any, returnFunction?: () => void) => void;
}


export const useAlertStore = create<alertStore>((set) => {
    return {
        open: false,
        setOpen: (open: boolean) => set({ open: open }),
        alertValues: new AlertValues(),
        setAlertValues: (newAlertValues: Partial<AlertValues>) => set((state) => ({
            alertValues: { ...state.alertValues, ...newAlertValues }
        })),
        handleApiError: (error: any, returnFunction?: () => void) => {
            set({
                open: true,
                alertValues: new AlertValues({
                    title: 'Cette action n\'a pas pu être effectuée',
                    element: error?.message as string ?? 'Une erreur est survenue, veuillez réessayer plus tard.',
                    disableConfirm: true,
                    confirmString: 'Ok',
                    handleConfirm: () => {
                        set({ open: false })
                        returnFunction && returnFunction()
                    }
                })
            })
        }
    };
});
