import { AlertValues } from "../../domain/entities/Error";
import { AlertStoreRepositoryBase } from "../../domain/repositoriesBase/AlertStoreRepositoryBase";
import DI from "../../di/ioc"


export class ErrorService {

    private alertStoreRepository: AlertStoreRepositoryBase;

    constructor() {
        this.alertStoreRepository = DI.resolve<AlertStoreRepositoryBase>('alertStoreRepository');
    }

    handleErrors(error: any) {


        const errorValues: AlertValues = new AlertValues({
            title: 'Une erreur est survenue',
            element: typeof error.message === 'string' ? error.message : 'Veuillez réessayer plus tard',
        });
        console.error('error', error, errorValues);
        this.alertStoreRepository.setAlertValues(errorValues);
    }

}