import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useEffect, useState } from 'react'
import { adressGps } from '../../types/type'

type MapCompProps = {
    adressGpsEvent: adressGps
}

export function MapComp(props: MapCompProps) {
    const { adressGpsEvent } = props

    const containerStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '0.8rem',
        padding: '3rem',
        display: 'flex',
        flex: 1,
    }

    const [center, setCenter] = useState<adressGps>(adressGpsEvent)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDNjhPXdHwsECXX68PZ_P3LikGEUdYNBNA',
    })

    useEffect(() => {
        setCenter(adressGpsEvent);
    }, [adressGpsEvent])

    const [map, setMap] = useState(null)

    0 > 1 && console.log("avoid compile error ", map)

    const onLoad = useCallback(function callback(map: any) {
        if (adressGpsEvent) {
            map.setZoom(16)
            setMap(map)
        }
    }, [])

    const onUnmount = useCallback(function callback() {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap

            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <MarkerF position={center} />
            <></>
        </GoogleMap>
    ) : (
        <>
            Chargement de la carte....
        </>
    )
}
