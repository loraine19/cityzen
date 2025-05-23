export class Error {
    message?: string;
    code?: number;

    constructor(data?: any) {
        this.message = data?.message || 'erreur inconnue';
        this.code = data?.code || 500;
    }
}

export class AlertValues {
    handleConfirm: () => void = () => { };
    title: string = 'Une erreur est survenue';
    element: string | JSX.Element = ''
    disableConfirm?: boolean = false;
    confirmString?: string = 'Ok';
    button2?: { text: string, onClick: () => void } = undefined;
    isOpen?: boolean = false;
    close?: () => void = () => { };
    notif?: string = '';

    constructor(init?: any) {
        this.element = init?.message || init?.error?.message || init?.error || '-';
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof Event];
                }
            });
        }
    }

}
// 