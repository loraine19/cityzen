import io, { Socket } from 'socket.io-client';
import { ApiService } from './apiService';
import { Message } from '../../../domain/entities/Message';

export type SocketServiceI = {
    connect: (nameSpace?: string) => void;
    disconnect: () => void;
    sendMessage: (userIdRec: number, message: string) => Promise<boolean>;
    onConnect: (callback: () => void) => void;
    onConnectError: (callback: (error: Error) => void) => void;
    onNewMessage: (callback: (message: any) => void) => void; // Changed return type to void
    onError: (callback: (error: Error) => void) => void;
}

class SocketService {
    private socket: Socket | null = null;
    private connectionPromise: Promise<void> | null = null;
    private connectCallbacks: (() => void)[] = [];
    private connectErrorCallbacks: ((error: Error) => void)[] = [];
    private newMessageCallbacks: ((message: Message) => void)[] = [];
    private errorCallbacks: ((error: Error) => void)[] = [];
    private api: ApiService;

    constructor() { this.api = new ApiService(); }

    connect = (nameSpace?: string): void => {
        if (!this.connectionPromise) {
            this.connectionPromise = this.initializeConnection(nameSpace);
        }
    }

    private initializeConnection = async (nameSpace?: string): Promise<void> => {
        const serverUrl = import.meta.env.PROD ? import.meta.env.VITE_WS_URL : import.meta.env.VITE_WS_URL_DEV;
        this.socket = io(serverUrl, {
            withCredentials: true,
            autoConnect: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        console.log('[SocketService] Socket instance created:', this.socket);

        this.socket.on('connect', () => {
            console.log('[SocketService] Connected to WebSocket server ' + nameSpace);
            this.connectCallbacks.forEach((cb) => cb());
        });

        this.socket.on('connect_error', (error: any) => {
            console.error('[SocketService] WebSocket connection error:', error);
            this.connectionPromise = null;
            this.connectErrorCallbacks.forEach((cb) => cb(error));
        });

        this.socket.on('newMessage', (message: any) => { // Changed type of message to any
            console.log('[SocketService] New message received:', message);
            this.newMessageCallbacks.forEach(cb => cb(message));
        });

        this.socket.on('error', async (error: any) => { // Changed type of error to any
            console.error('[SocketService] WebSocket error:', error);
            if (error === 'Unauthorized') {
                try {
                    await this.api.refreshAccess();
                    console.log('[SocketService] Reconnecting WebSocket after token refresh...');
                    this.socket!.connect();
                } catch (refreshError) {
                    console.error("[SocketService] Failed to refresh token", refreshError)
                }
            }
            this.errorCallbacks.forEach((cb) => cb(error));
        });

        this.socket.on('disconnect', (reason) => {
            console.log('[SocketService] Disconnected from WebSocket server. Reason:', reason);
            this.connectionPromise = null;
        });

        this.socket.connect();

        return new Promise((resolve, reject) => {
            this.socket!.once('connect', resolve);
            this.socket!.once('connect_error', reject);
        });
    };

    sendMessage = async (userIdRec: number, message: string): Promise<boolean> => {
        try {
            await this.connectionPromise;
            if (this.socket && this.socket.connected) {
                this.socket.emit('sendMessage', { userIdRec, message });
            } else {
                console.warn('[SocketService] SocketService.sendMessage() called, but not connected. Reconnecting...');
                this.connect();
                return this.sendMessage(userIdRec, message);
            }
            console.log('[SocketService] Message sent:', message);
            return true;
        } catch (error) {
            console.error("[SocketService] Error sending message:", error);
            return false;
        }
    };

    disconnect = (): void => {
        console.log('[SocketService] disconnect() called');
        if (this.socket) {
            this.socket.disconnect();
            this.connectionPromise = null;
            console.log('[SocketService] Disconnected from WebSocket server.');
        }
    };

    onConnect = (callback: () => void): void => {
        console.log('[SocketService] onConnect() registered callback');
        if (this.socket && this.socket.connected) {
            callback();
        }
        this.connectCallbacks.push(callback);
    };

    onConnectError = (callback: (error: any) => void): void => { // Changed type of error to any
        console.log('[SocketService] onConnectError() registered callback');
        this.connectErrorCallbacks.push(callback);
    };
    onNewMessage = (callback: (message: any) => void): void => {
        console.log('[SocketService] onNewMessage() registered callback');
        this.newMessageCallbacks.push(callback);

        //Important: Register the listener here
        if (this.socket) {
            this.socket.on('newMessage', callback);
        }
    };

    onError = (callback: (error: any) => void): void => {  // Changed type of error to any
        console.log('[SocketService] onError() registered callback');
        this.errorCallbacks.push(callback);
    };
}

export default SocketService;
