import { AlertValues } from "../entities/Error";

export interface AlertStoreRepositoryBase {
    setAlertValues(alertValues: AlertValues): void;

}

