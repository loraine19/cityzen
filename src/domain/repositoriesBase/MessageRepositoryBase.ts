// src/data/repositories/UserRepository.tsx
import { Message, MessagePage } from "../entities/Message";

export abstract class MessageRepositoryBase {
    abstract getMessages(page?: number): Promise<MessagePage[]>;
    abstract getConversation(withId: number, page?: number): Promise<MessagePage[]>;
    abstract readMessage(id: number): Promise<Message>;
    abstract sendMessage(message: Message): Promise<Message>;
    abstract deleteMessage(id: number): Promise<Message>;
    abstract updateMessage(message: Message): Promise<Message>;
    abstract readConversation(withId: number): Promise<Message[]>

}