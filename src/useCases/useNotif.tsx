import { useState, useCallback } from 'react';
import { NotifService } from '../domain/repositories/NotifRepository';
import { handleError } from './useCaseUtils';

export const useNotification = () => {
    const service = new NotifService();
    const [notifs, setNotifs] = useState<Notification[]>([]);
    const [loadingNotification, setLoadingNotification] = useState(false);
    const [errorNotification, setErrorNotification] = useState<string | null>(null);
    const labelEntity: string = 'notification';

    const getNotifs = useCallback(async () => {
        setLoadingNotification(true);
        try {
            const res = await service.getNotifs();
            setNotifs(res);
            console.log('res', res);
        } catch (error) {
            console.log('error', error);
            handleError(error, `lors de chargement des ${labelEntity}s`, setErrorNotification);
        } finally {
            setLoadingNotification(false);
        }
    }, [service]);

    return { getNotifs, notifs, loadingNotification, errorNotification };
};
