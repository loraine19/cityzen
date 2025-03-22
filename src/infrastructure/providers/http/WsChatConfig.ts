// /home/loraine/Mes_Projects/Collectif/Front/src/infrastructure/providers/http/WsChatConfig.ts

import { WebSocketConfig, WebSocketService } from "./WsService";

export class WebSocketManager {
    private socketService: WebSocketService;

    constructor(private namespace: string) {
        const serverUrl = import.meta.env.PROD ? import.meta.env.VITE_WS_URL : import.meta.env.VITE_WS_URL_DEV;
        const config: WebSocketConfig = {
            url: serverUrl,
            reconnectInterval: 2000,
        };
        this.socketService = new WebSocketService(config);
    }

    connect() {
        this.socketService.connect(this.namespace);
    }

    sendMessage(event: string, message: any) {
        this.socketService.sendMessage(event, message);
    }

    on(event: string) {
        return this.socketService.on(event);
    }

    isConnected() {
        return this.socketService.setIsConnected();
    }

    disconnect() {
        this.socketService.disconnect();
    }
}

// const wsManager = new WebSocketManager('/my-namespace');
// wsManager.connect();
// wsManager.sendMessage('my-event', { message: 'Hello, WebSocket!' });

// const myEventObservable = wsManager.on('my-event');
// myEventObservable.subscribe((data) => {
//     console.log('Données reçues sur my-event:', data);
// });

// console.log('Est connecté:', wsManager.isConnected());

