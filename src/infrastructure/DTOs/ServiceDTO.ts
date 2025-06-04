import { Service, ServiceCategory, ServiceType, SkillLevel, HardLevel, ServiceStep } from "../../domain/entities/Service";

export class ServiceDTO implements Partial<Service> {
    description?: string = '';
    image?: string | File;
    title?: string;
    category?: ServiceCategory;
    userIdResp?: number;
    type?: ServiceType;
    skill?: SkillLevel = SkillLevel.LEVEL_0;
    hard?: HardLevel = HardLevel.LEVEL_0;
    status?: ServiceStep = ServiceStep.STEP_0;
    groupId?: number;
    blob?: string;
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