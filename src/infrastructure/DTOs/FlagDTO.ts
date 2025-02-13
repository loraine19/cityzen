import { FlagReason, FlagTarget } from "../../domain/entities/Flag";


export class FlagDTO {
    userId?: number;
    targetId?: number;
    target?: FlagTarget;
    reason?: FlagReason;

    constructor(init?: Partial<FlagDTO>) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof FlagDTO];
                }
            });
        }
    }
}