//src/application/useCases/notif/getNotifs.usecase.ts
import { Message, MessagePage } from "../../domain/entities/Message";
import { MessageRepositoryBase } from "../../domain/repositoriesBase/MessageRepositoryBase";


export class GetMessagesUseCase {
    private messageRepository: MessageRepositoryBase;

    constructor({ messageRepository }: { messageRepository: MessageRepositoryBase }) {
        this.messageRepository = messageRepository;
    }
    public async execute(page?: number): Promise<MessagePage[]> {
        return this.messageRepository.getMessages(page);
    }

}

export class GetConversationUseCase {
    private messageRepository: MessageRepositoryBase;

    constructor({ messageRepository }: { messageRepository: MessageRepositoryBase }) {
        this.messageRepository = messageRepository;
    }
    public async execute(withId: number, page?: number): Promise<MessagePage[]> {
        return this.messageRepository.getConversation(withId, page);
    }
}

export class ReadMessageUseCase {
    private messageRepository: MessageRepositoryBase;

    constructor({ messageRepository }: { messageRepository: MessageRepositoryBase }) {
        this.messageRepository = messageRepository;
    }
    public async execute(id: number): Promise<Message> {
        return this.messageRepository.readMessage(id);
    }
}

export class SendMessageUseCase {
    private messageRepository: MessageRepositoryBase;

    constructor({ messageRepository }: { messageRepository: MessageRepositoryBase }) {
        this.messageRepository = messageRepository;
    }
    public async execute(message: Message): Promise<Message> {
        return this.messageRepository.sendMessage(message);
    }
}

export class DeleteMessageUseCase {
    private messageRepository: MessageRepositoryBase;

    constructor({ messageRepository }: { messageRepository: MessageRepositoryBase }) {
        this.messageRepository = messageRepository;
    }
    public async execute(id: number): Promise<Message> {
        return this.messageRepository.deleteMessage(id);
    }
}

export class UpdateMessageUseCase {
    private messageRepository: MessageRepositoryBase;

    constructor({ messageRepository }: { messageRepository: MessageRepositoryBase }) {
        this.messageRepository = messageRepository;
    }
    public async execute(message: Message): Promise<Message> {
        return this.messageRepository.updateMessage(message);
    }
}


export class ReadConversationUseCase {
    private messageRepository: MessageRepositoryBase;

    constructor({ messageRepository }: { messageRepository: MessageRepositoryBase }) {
        this.messageRepository = messageRepository;
    }
    public async execute(id: number): Promise<Message[]> {
        return this.messageRepository.readConversation(id);
    }
}

export class RemoveMessageUseCase {
    private messageRepository: MessageRepositoryBase;

    constructor({ messageRepository }: { messageRepository: MessageRepositoryBase }) {
        this.messageRepository = messageRepository;
    }
    public async execute(id: number): Promise<Message> {
        return this.messageRepository.removeMessage(id);
    }
}
