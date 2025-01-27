//src/infrastructure/services/serviceService.ts
import { ServiceUseCase } from "../../application/useCases/service.usecase";
import { Flag } from "../../domain/entities/Flag";
import { Service, ServiceUpdate, ServiceView } from "../../domain/entities/Service";
import { ServiceRepositoryBase } from "../../domain/repositoriesBase/ServiceRepositoryBase";
import { serviceCategories, getLabel, serviceStatus } from './utilsService';
import DI from '../../di/ioc';

interface serviceServiceI {
    getInfosInServices(services: Service[], userId: number): ServiceView[];
    getInfosInservice(service: Service, userId: number): ServiceView;
}
export class ServiceService implements serviceServiceI {

    private serviceRepository: ServiceRepositoryBase;
    private serviceUseCase: ServiceUseCase;

    constructor({ serviceRepository, serviceUseCase }:
        { serviceRepository: ServiceRepositoryBase, serviceUseCase: ServiceUseCase }) {
        this.serviceRepository = DI.resolve('serviceUseCase');
        this.serviceUseCase = serviceUseCase;
        console.log('attente de la meilleure solution', serviceRepository, this.serviceUseCase)
    }

    private isLate = (date: Date, days: number) => new Date(date) < new Date((new Date().getTime() - days * 24 * 60 * 60 * 1000))

    private toggleResp = async (service: Service, userId: number) => {
        if (service.userIdResp === userId) {
            return this.serviceRepository.updateServiceStep(service.id, ServiceUpdate.CANCEL_RESP)
        }
        return this.serviceRepository.updateServiceStep(service.id, ServiceUpdate.POST_RESP)
    }


    private mapserviceToServiceView(service: Service, userId: number): ServiceView {
        if (!service) return {} as ServiceView;
        return {
            ...service,
            label: getLabel(service.category, serviceCategories),
            IResp: service.userIdResp ? service.userIdResp === userId : false,
            flagged: service.Flags ? service?.Flags?.some((flag: Flag) => flag.userId === userId) : false,
            mine: service.userId === userId,
            isLate: service.createdAt ? this.isLate(service.createdAt, 15) : false,
            toogleResp: async () => {
                const newservice = await this.toggleResp(service, userId);
                console.log(newservice);
                return this.mapserviceToServiceView(newservice, userId);
            },
            statusS: getLabel(service.status, serviceStatus),
        }
    }

    //// FOR VIEW
    getInfosInservices(services: Service[] | Service[][] | undefined, userId: number): ServiceView[] {
        if (!services) return [];
        if (Array.isArray(services[0])) {
            const serviceArray = (services as Service[][]).map(serviceArray => serviceArray.map(service => this.mapserviceToServiceView(service, userId)));
            return serviceArray.flat();
        }
        return (services as Service[]).map(service => this.mapserviceToServiceView(service, userId));
    }

    getInfosInservice(service: Service, userId: number): ServiceView {
        if (!service) return {} as ServiceView;
        return this.mapserviceToServiceView(service, userId);
    }
}
