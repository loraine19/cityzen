import { AlertValues } from "../entities/Error";

export interface AlertStoreRepositoryBase {
    setAlertValues(alertValues: AlertValues): void;
    setOpen(open: boolean): void
    initialize(): void

}

