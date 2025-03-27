// AlertStoreFunctions.ts

import { useAlertStore } from "../../application/stores/alert.store";
import { AlertValues } from "../../domain/entities/Error";

export class AlertStoreFunctions {
    private functions: any | null = null; // Autoriser null

    initialize(): void {
        this.functions = useAlertStore(); // Initialiser dans une méthode
    }

    setAlertValues(alertValues: AlertValues): void {
        if (this.functions) {
            this.functions.setAlertValues(alertValues);
        }
    }
}