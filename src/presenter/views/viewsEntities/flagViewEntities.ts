import { Flag, FlagReason, FlagTarget } from "../../../domain/entities/Flag";

export class FlagView extends Flag {
    targetS: string = '';
    reasonS: string = '';

    constructor(flag: Flag) {
        super(flag);
        this.targetS = FlagTarget[this.target as unknown as keyof typeof FlagTarget]
        this.reasonS = FlagReason[this.reason as unknown as keyof typeof FlagReason]
    }
}