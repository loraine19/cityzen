import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { addressGps } from '../../types/type';
import { GM_API_KEY } from '../../../env.local';
import Skeleton from 'react-loading-skeleton';

export function MapComp(props: { addressGpsEvent?: addressGps }) {
    const { addressGpsEvent } = props;
    const containerStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '0.8rem',
        padding: '3rem',
        display: 'flex',
        flex: 1,
    };

    const [center, setCenter] = useState<addressGps>(addressGpsEvent ? addressGpsEvent : { lat: 0, lng: 0 });
    const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: GM_API_KEY });
    const [map, setMap] = useState<any>(null);
    console.log(map)
    const notLoad = addressGpsEvent?.lat === 0 && addressGpsEvent?.lng === 0;

    useEffect(() => {
        console.log('useEffect called', { addressGpsEvent, notLoad });
        if (addressGpsEvent && !notLoad) {
            setCenter(addressGpsEvent);
        }
    }, [addressGpsEvent, notLoad]);

    const onLoad = (map: any) => {
        console.log('onLoad called', { addressGpsEvent, notLoad });
        if (addressGpsEvent && !notLoad) {
            map.setZoom(16);
            setMap(map);
        }
    };

    const onUnmount = () => {
        setMap(null);
    };

    return isLoaded && !notLoad ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <MarkerF position={center} />
        </GoogleMap>
    ) : (
        <Skeleton count={1} className={'flex'} style={{ width: '100%', height: '100%', borderRadius: '0.8rem', padding: '3rem' }} />
    );
}
