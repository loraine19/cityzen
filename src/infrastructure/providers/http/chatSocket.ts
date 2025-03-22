import SocketService, { SocketServiceI } from "./socketService";


export class ChatWS {
    private readonly nameSpace: string = 'chat';
    private readonly socket: SocketServiceI;
    constructor() { this.socket = new SocketService(); }



    connect = () => {
        this.socket.connect(this.nameSpace)
    }

    disconnect = () => {
        this.socket.disconnect()
    }
    onConnect = (callback: () => void) => {
        this.socket.onConnect(callback)
    }
    onConnectError = (callback: (error: any) => void) => {
        this.socket.onConnectError(callback)
    }
    onNewMessage = (callback: (message: any) => void) => {
        this.socket.onNewMessage(callback)
    }
    onError = (callback: (error: any) => void) => {
        this.socket.onError(callback)
    }

    sendMessage = async (userIdRec: number, message: string) => {
        return await this.socket.sendMessage(userIdRec, message)
    }




}
