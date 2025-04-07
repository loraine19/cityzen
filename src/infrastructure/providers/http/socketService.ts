import io, { Socket } from 'socket.io-client';
import { ApiService } from './apiService';
import { Message } from '../../../domain/entities/Message';

export type SocketServiceI = {
    connect: (nameSpace: string) => void;
    disconnect: () => void;
    sendMessage: (messageData: any, nameSpace: string) => Promise<boolean>;
    onConnect: (callback: () => void, nameSpace: string) => void;
    onConnectError: (callback: (error: Error) => void) => void;
    onNewMessage: (callback: (message: any) => void) => void;
    onError: (callback: (error: Error) => void) => void;
}

export class SocketService implements SocketServiceI {
    private socket: Socket | null = null;
    private connectionPromise: Promise<void> | null = null;
    private connectCallbacks: (() => void)[] = [];
    private connectErrorCallbacks: ((error: Error) => void)[] = [];
    private newMessageCallbacks: ((message: Message) => void)[] = [];
    private errorCallbacks: ((error: Error) => void)[] = [];
    private api: ApiService;

    constructor() { this.api = new ApiService(); }

    connect = (nameSpace: string): void => {
        if (!this.connectionPromise) {
            this.connectionPromise = this.initializeConnection(nameSpace);
        }
    }

    private initializeConnection = async (nameSpace?: string): Promise<void> => {
        const serverUrl = import.meta.env.PROD ? import.meta.env.VITE_WS_URL : import.meta.env.VITE_WS_URL_DEV;
        const url = nameSpace ? `${serverUrl}/${nameSpace}` : serverUrl;
        this.socket = io(url, {
            withCredentials: true,
            autoConnect: true,
            // reconnectionAttempts: Infinity, // Retry indefinitely
            reconnectionDelay: 2000, // Delay between reconnection attempts
            // reconnectionDelayMax: 5000, // Maximum delay between reconnections
            // timeout: 20000, // Timeout for connection attempts
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

        this.socket.on(`${nameSpace}-message`, (message: any) => {
            // console.log(`[SocketService] New message received ${nameSpace}`, message);
            this.newMessageCallbacks.forEach(cb => cb(message));
        });

        this.socket.on('error', async (error: any) => {
            console.error('[SocketService] WebSocket error:', error);
            if (error.message === 'Unauthorized') {
                try {
                    const token = await this.api.refreshAccess();

                    console.log(token ? '[SocketService] Token refreshed' : '[SocketService] Token not refreshed');
                    token && this.socket?.connect();
                } catch (refreshError) {
                    console.error("[SocketService] Failed to refresh token", refreshError);
                    this.disconnect();
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

    sendMessage = async (messageData: any, nameSpace: string): Promise<boolean> => {
        try {
            await this.connectionPromise;
            if (this.socket && this.socket.connected) {
                this.socket.emit(`${nameSpace}-message`, messageData);


            } else {
                console.warn('[SocketService] SocketService.sendMessage() called, but not connected. Reconnecting...');
                this.connect(nameSpace);
                return this.sendMessage(messageData, nameSpace);
            }
            console.log('[SocketService] Message sent:', messageData);
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

    onConnect = (callback: () => void, nameSpace: string): void => {
        console.log('[SocketService] onConnect() registered callback' + nameSpace);
        // if (this.socket && this.socket.connected) {
        //     callback();
        // }
        this.connectCallbacks.push(callback);
    };

    onConnectError = (callback: (error: any) => void): void => {
        console.log('[SocketService] onConnectError() registered callback');
        this.connectErrorCallbacks.push(callback);
    };

    onNewMessage = (callback: (message: any) => void): void => {
        console.log('[SocketService] onNewMessage() registered callback');
        this.newMessageCallbacks.push(callback);
    };

    onError = (callback: (error: any) => void): void => {
        console.log('[SocketService] onError() registered callback');
        this.errorCallbacks.push(callback);
    };
}

export default SocketService;


