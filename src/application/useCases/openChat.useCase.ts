// src/application/use-cases/chat/OpenChatUseCase.ts

import SocketService from "../../infrastructure/providers/http/socketService";

class OpenChatUseCase {
    private socketService: SocketService;

    constructor() {
        this.socketService = new SocketService(); // SIMPLIFICATION : Instanciation directe (pour l'instant)
    }
    execute = () => {
        console.log('OpenChatUseCase (React): execute() called');
        this.socketService.connect();
    };
    disconnect = () => {
        this.socketService.disconnect()
    }
    onConnect = (callback: () => void) => {
        this.socketService.onConnect(callback)
    }
    onConnectError = (callback: (error: any) => void) => {
        this.socketService.onConnectError(callback)
    }
    onNewMessage = (callback: (message: any) => void) => {
        this.socketService.onNewMessage(callback)
    }
    onError = (callback: (error: any) => void) => {
        this.socketService.onError(callback)
    }
    sendMessage = (message: string, userIdRec: number) => {
        console.log('OpenChatUseCase ', message, userIdRec)
        this.socketService.sendMessage(userIdRec, message)
    }
}

export default OpenChatUseCase;