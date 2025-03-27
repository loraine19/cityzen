import { AlertValues } from "../../domain/entities/Error";
import { AlertStoreRepositoryBase } from "../../domain/repositoriesBase/AlertStoreRepositoryBase";
import { AlertStoreFunctions } from "../adaptaters/alertStoreFunctions";

export class AlertStoreRepositoryImpl implements AlertStoreRepositoryBase {
    private alertStoreFunctions: AlertStoreFunctions;

    constructor({ alertStoreFunctions }: { alertStoreFunctions: AlertStoreFunctions }) {
        this.alertStoreFunctions = alertStoreFunctions;
    }

    public setAlertValues(alertValues: AlertValues): void {
        return this.alertStoreFunctions.setAlertValues(alertValues);
    }


}
