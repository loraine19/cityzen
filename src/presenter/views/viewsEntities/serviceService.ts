//src/infrastructure/services/serviceService.ts
import { Flag } from "../../../domain/entities/Flag";
import { HardLevel, Service, ServiceCategory, ServiceStep, ServiceType, ServiceView, SkillLevel, } from "../../../domain/entities/Service"
import { AssistanceLevel, Profile } from "../../../domain/entities/Profile";

interface serviceServiceI {
    getInfosInServices(services: Service[], userId: number): ServiceView[];
    getInfosInService(service: Service, userId: number): ServiceView;
}
export class ServiceService implements serviceServiceI {
    constructor() { }

    private isLate = (date: Date, days: number) => new Date(date) < new Date((new Date().getTime() - days * 24 * 60 * 60 * 1000))


    private GetPoints = (service: Service, user?: Profile): number[] => {
        const userResp = service.UserResp ? service.UserResp?.Profile : null
        const userP = user ? user : service.User?.Profile
        const hard = parseInt(HardLevel[service.hard])
        const skill = parseInt(SkillLevel[service.skill])
        const userPoints = parseInt(AssistanceLevel[userP.assistance as keyof typeof AssistanceLevel])
        const userRespPoints: number = userResp ? parseInt(AssistanceLevel[userResp.assistance as keyof typeof AssistanceLevel]) : 0
        const base = Number(((hard / 2 + skill / 2) + 1).toFixed(1))
        const points =
            userResp && [base + userRespPoints / 2] ||
            ServiceType[service.type as string as keyof typeof ServiceType] === ServiceType.DO && [base + userPoints / 2] ||
            [base, (base + 1.5)]
        return points
    }


    private mapServiceToServiceView(service: Service, userId: number): ServiceView {
        if (!service) return {} as ServiceView;
        return {
            ...service,
            IResp: service.userIdResp ? service.userIdResp === userId : false,
            flagged: service.Flags ? service?.Flags?.some((flag: Flag) => flag.userId === userId) : false,
            mine: service.userId === userId,
            typeS: ServiceType[service.type as string as keyof typeof ServiceType],
            isLate: service.createdAt ? this.isLate(service.createdAt, 15) : false,
            points: this.GetPoints(service, service.User?.Profile),
            categoryS: ServiceCategory[service.category as string as keyof typeof ServiceCategory],
            statusS: ServiceStep[service.status as unknown as keyof typeof ServiceStep],
        }
    }

    //// FOR VIEW
    getInfosInServices(services: Service[] | Service[][] | undefined, userId: number): ServiceView[] {
        if (!services) return [];
        if (Array.isArray(services[0])) {
            const serviceArray = (services as Service[][]).map(serviceArray => serviceArray.map(service => this.mapServiceToServiceView(service, userId)));
            return serviceArray.flat();
        }
        return (services as Service[]).map(service => this.mapServiceToServiceView(service, userId));
    }

    getInfosInService(service: Service, userId: number): ServiceView {
        if (!service) return {} as ServiceView;
        return this.mapServiceToServiceView(service, userId);
    }
}
