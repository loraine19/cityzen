//src/infrastructure/repositoriesImpl/UserRespositoryImpl.tsx
import { Message, MessagePage } from "../../domain/entities/Message";
import { MessageRepositoryBase } from "../../domain/repositoriesBase/MessageRepositoryBase";
import { ApiServiceI } from "../providers/http/apiService";


interface IData extends MessageRepositoryBase {
    api: ApiServiceI;
    dataType: string;
}

export class MessageRepositoryImpl implements MessageRepositoryBase {
    private messageData: IData;
    constructor({ messageData }: { messageData: IData }) { this.messageData = messageData }

    public async getMessages(page?: number): Promise<MessagePage[]> {
        return this.messageData.getMessages(page);
    }

    public async getConversation(withId: number, page?: number): Promise<MessagePage[]> {
        return this.messageData.getConversation(withId, page);
    }

    public async readMessage(id: number): Promise<Message> {
        return this.messageData.readMessage(id);
    }

    public async sendMessage(message: Message): Promise<Message> {
        return this.messageData.sendMessage(message);
    }

    public async deleteMessage(id: number): Promise<Message> {
        return this.messageData.deleteMessage(id);
    }

    public async updateMessage(message: Message): Promise<Message> {
        return this.messageData.updateMessage(message);
    }

    public async readConversation(withId: number): Promise<Message[]> {
        return this.messageData.readConversation(withId);
    }

    public async removeMessage(id: number): Promise<Message> {
        return this.messageData.removeMessage(id);
    }

}
