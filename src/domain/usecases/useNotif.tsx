import { useState, useCallback } from 'react';
import { NotifService } from '../repositories/NotifRepository';
import { handleError } from './useCaseUtils';

export const useNotification = (): UseNotificationReturn => {
    const notifService = new NotifService();
    const [notifs, setNotifs] = useState<Notification[]>([]);
    const [loadingNotification, setLoadingNotification] = useState(false);
    const [errorNotification, setErrorNotification] = useState<string | null>(null);
    const labelEntity: string = 'notification';

    const getNotifs = useCallback(async () => {
        setLoadingNotification(true);
        try {
            const res = await notifService.getNotifs();
            setNotifs(res);
        }
        catch (error) { handleError(error, `lors de chargement des ${labelEntity}s`, setErrorNotification) }
        finally { setLoadingNotification(false) }
    }, [notifService]);


    return { getNotifs, notifs, loadingNotification, errorNotification };
};

interface UseNotificationReturn {
    notifs: Notification[];
    getNotifs: () => Promise<void>;
    loadingNotification: boolean;
    errorNotification: string | null;
}