import { Service, ServiceCategory, ServiceType, SkillLevel, HardLevel, ServiceStep } from "../../domain/entities/Service";

export class ServiceDTO implements Partial<Service> {
    description?: string = '';
    image?: string | File;
    title?: string;
    category?: ServiceCategory;
    userIdResp?: number;
    type?: ServiceType;
    skill?: SkillLevel;
    hard?: HardLevel;
    status?: ServiceStep;
    constructor(init?: Partial<ServiceDTO>) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof ServiceDTO];
                }
            });
        }
    }
}