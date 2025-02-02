class ErrorService {
    errorMessage: string | null = null; // Variable globale

    setErrorMessage(message: string | null) {
        this.errorMessage = message;
    }

    getErrorMessage() {
        return this.errorMessage;
    }
}

export const errorService = new ErrorService();