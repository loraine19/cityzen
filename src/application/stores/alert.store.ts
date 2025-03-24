import { create } from 'zustand';
import { AlertModalProps } from '../../presenter/components/common/AlertModal';
interface alertStore {
    open: boolean;
    setOpen: (open: boolean) => void;
    alertValues: AlertModalProps;
    setAlertValues: (alertValues: Partial<AlertModalProps>) => void;
}


export const useAlertStore = create<alertStore>((set) => {
    return {
        open: false,
        setOpen: (open: boolean) => set({ open: open }),
        alertValues: {
            open: false,
            handleConfirm: () => { window.location.reload() },
            title: 'Désolé, Une erreur s\'est produite',
            element: 'Vous pouvez essayer de <a href="/">recharger la page</a>, revenir à la <a href="/">page d\'accueil</a> ou <button onclick="logout()">vous déconnecter</button>',
            confirmString: 'Recharger la page',
            disableConfirm: true
        },
        setAlertValues: (newAlertValues: Partial<AlertModalProps>) => set((state) => ({
            alertValues: { ...state.alertValues, ...newAlertValues }
        })),
    };
});
