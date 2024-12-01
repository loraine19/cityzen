import { useState, useEffect, useRef } from 'react';
// import { createRoot } from 'react-dom/client';
import {
    APIProvider,
    ControlPosition,
    MapControl,
    AdvancedMarker,
    Map,
    useMap,
    useMapsLibrary,
    useAdvancedMarkerRef,
    // AdvancedMarkerRef
} from '@vis.gl/react-google-maps';

const API_KEY: any = "AIzaSyDNjhPXdHwsECXX68PZ_P3LikGEUdYNBNA"

export default function MapPickUpComp() {

    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <APIProvider
            apiKey={API_KEY}
            solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>
            <Map
                mapId={'bf51a910020fa25a'}
                defaultZoom={3}
                defaultCenter={{ lat: 0, lng: 0 }}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
                <AdvancedMarker ref={markerRef} position={null} />
            </Map>
            <MapControl position={ControlPosition.TOP}>
                <div className="autocomplete-control">
                    <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                </div>
            </MapControl>
            <MapHandler place={selectedPlace} marker={marker} />
        </APIProvider>
    );
};

interface MapHandlerProps {
    place: google.maps.places.PlaceResult | null;
    marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
    const map = useMap();
    useEffect(() => {
        if (!map || !place || !marker) return;
        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
        }
        marker.position = place.geometry?.location;
    }, [map, place, marker]);

    return null;
};

interface PlaceAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');

    useEffect(() => {
        if (!places || !inputRef.current) return;
        const options = {
            fields: ['geometry', 'name', 'formatted_address']
        };
        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);


    useEffect(() => {
        if (!placeAutocomplete) return;
        placeAutocomplete.addListener('place_changed', () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete]);


    return (
        <div className="flex justify-center flex-col gap-4 h-full w-full rounded-full bg-transparent">
            <input className='p-4 rounded-full ' ref={inputRef} />
            <p className='bg-white p-5'>{inputRef.current?.value} </p>
        </div>
    );
};


