import { Subject, Observable, fromEvent, takeUntil } from 'rxjs';

export interface WebSocketConfig {
    url: string;
    reconnectInterval?: number;
}

export class WebSocketService {
    private socket: WebSocket | null = null;
    private isConnected: boolean = false;
    private readonly destroy$ = new Subject<void>();
    private reconnectTimeout: NodeJS.Timeout | null = null;
    private namespace: string = '';

    constructor(private readonly config: WebSocketConfig) {
        this.config = config;
    }

    connect(namespace: string = ''): void {
        this.namespace = namespace;
        const url = this.config.url + namespace;
        if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
            this.socket = new WebSocket(url);

            this.socket.onopen = () => {
                this.isConnected = true;
                console.log(`WebSocket connecté au namespace : ${this.namespace}`);
                if (this.reconnectTimeout) {
                    clearTimeout(this.reconnectTimeout);
                }
            };

            this.socket.onerror = (error: Event) => {
                console.error('WebSocket error:', error);
            };

            this.socket.onclose = () => {
                this.isConnected = false;
                console.log(`WebSocket déconnecté du namespace : ${this.namespace}`);
                this.reconnect();
            };
        }
    }

    private reconnect() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
        this.reconnectTimeout = setTimeout(() => {
            console.log(`Tentative de reconnexion au namespace : ${this.namespace}`);
            this.connect(this.namespace);
        }, this.config.reconnectInterval || 1000);
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
        this.namespace = '';
    }

    setIsConnected(): boolean {
        return this.isConnected;
    }

    sendMessage(event: string, data: any): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ event, data }));
        } else {
            console.warn(`WebSocket n'est pas connecté, impossible d'envoyer ${event}`, data);
            // Tu peux choisir de mettre en place une logique de mise en attente ou de tampon.
        }
    }

    on(event: string): Observable<any> {
        if (!this.socket) {
            return new Observable((observer) => {
                const subscription = this.destroy$.subscribe(() => {
                    observer.complete();
                });
                return () => {
                    subscription.unsubscribe();
                };
            });
        }
        return fromEvent<MessageEvent>(this.socket, 'message').pipe(
            takeUntil(this.destroy$),
            (source) =>
                new Observable((observer) => {
                    const subscription = source.subscribe({
                        next: (message: MessageEvent) => {
                            try {
                                const { event: receivedEvent, data } = JSON.parse(message.data);
                                if (receivedEvent === event) {
                                    observer.next(data);
                                }
                            } catch (error) {
                                observer.error(error);
                            }
                        },
                        error: (err) => observer.error(err),
                        complete: () => observer.complete(),
                    });
                    return () => {
                        subscription.unsubscribe();
                    };
                })
        );
    }
}

