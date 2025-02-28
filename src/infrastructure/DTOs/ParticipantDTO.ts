export class ParticipantDTO {
    eventId: number = 0;
    userId?: number = 0;
    constructor(data?: ParticipantDTO) {
        if (data) {
            Object.assign(this, data);
        }
    }
}