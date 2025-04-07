// AlertStoreFunctions.ts

import { useAlertStore } from "../../application/stores/alert.store";

export class AlertStoreFunctions {
    private functions: any | null = null; // Autoriser null

    initialize(): void {
        this.functions = useAlertStore(); // Initialiser dans une méthode
    }

    setAlertValues(alertValues: any): void {
        if (this.functions) {
            this.functions.handleApiError(alertValues);
        }
    }

    setOpen(open: boolean): void {
        if (this.functions) {

            this.functions.setOpen(open);
        }
    }
}