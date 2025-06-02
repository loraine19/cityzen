// /src/infrastructure/repositoriesImpl/AlertStoreRepositoryImpl.ts
import { AlertStoreRepositoryBase } from "../../domain/repositoriesBase/AlertStoreRepositoryBase";
import { AlertValues } from "../../domain/entities/Error";
import { create } from "zustand";

type AlertStoreState = {
    open: boolean;
    alertValues: AlertValues;
    setOpen: (open: boolean) => void;
    setAlertValues: (values: AlertValues) => void;
    handleApiError: (error: any) => void;
};

const useAlertStore = create<AlertStoreState>((set) => ({
    open: false,
    alertValues: {
        title: "Erreur",
        element: "Une erreur est survenue, veuillez réessayer plus tard.",
        type: "error",
        disableConfirm: true,
        confirmString: "Ok",
        handleConfirm: () => set({ open: false }),
    },
    setOpen: (open) => set({ open }),
    setAlertValues: (values) => set({ alertValues: values }),
    handleApiError: (error) =>
        set({
            open: true,
            alertValues: {
                title: "Cette action n'a pas pu être effectuée",
                element: error?.message || "Une erreur est survenue, veuillez réessayer plus tard.",
                disableConfirm: true,
                confirmString: "Ok",
                handleConfirm: () => set({ open: false }),
            },
        }),
}));

export class AlertStoreRepositoryImpl implements AlertStoreRepositoryBase {

    // Expose the zustand store for subscription or usage in components
    useStore = useAlertStore;

    get open() {
        return useAlertStore.getState().open;
    }
    setOpen(open: boolean) {
        useAlertStore.getState().setOpen(open);
    }
    get alertValues() {
        return useAlertStore.getState().alertValues;
    }
    setAlertValues(values: Partial<AlertValues>) {
        useAlertStore.getState().setAlertValues({ ...useAlertStore.getState().alertValues, ...values });
    }
    handleApiError(error: any) {
        useAlertStore.getState().handleApiError(error);
    }
}