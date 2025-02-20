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
}