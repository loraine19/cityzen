export const handleError = (error: unknown, prefix: string, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (error instanceof Error) {
        setError(`${prefix}: ${error.message}`);
    } else {
        setError(`${prefix}: une erreur s'est produite`);
    }
}