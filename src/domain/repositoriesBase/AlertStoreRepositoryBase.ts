import { AlertValues } from "../entities/Error";

export interface AlertStoreRepositoryBase {
    open: boolean;
    setOpen: (open: boolean) => void;
    alertValues: AlertValues;
    setAlertValues: (alertValues: Partial<AlertValues>) => void;
    handleApiError: (error: any, returnFunction?: () => void) => void;
}

