import { ParticipantRepositoryBase } from "../../domain/repositoriesBase/ParticipantRepositoryBase";
import { Participant, ParticipantDTO } from "../../domain/entities/Participant";

interface IData extends ParticipantRepositoryBase {
    api: any;
    dataType: any;
}

export class ParticipantRepositoryImpl implements ParticipantRepositoryBase {
    private participantData: IData;
    constructor({ participantData }: { participantData: IData }) { this.participantData = participantData }

    public async getParticipants(): Promise<Participant[]> {
        return this.participantData.getParticipants();
    }

    public async postParticipant(dataDTO: ParticipantDTO): Promise<Participant> {
        return this.participantData.postParticipant(dataDTO);
    }

    public async deleteParticipant(eventId: number): Promise<void> {
        return this.participantData.deleteParticipant(eventId);
    }
}
