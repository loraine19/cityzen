import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Address } from '../../types/class';
import L from 'leaflet';

function FlyToMarker({ position }: { position: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(position, 17, {
            animate: true,
            duration: 2,
        });
    }, [position, map]);

    return null;
}

export default function AddressMapOpen(props: { address: Address, message?: string }) {
    const { message } = props;
    const Address = props.address;
    const [position, setPosition] = useState<[number, number]>([Address?.lat, Address?.lng]);

    useEffect(() => {
        setPosition([Address.lat, Address.lng]);
    }, [Address]);

    return (
        <div className='Map z-50 !min-h-36 mb-2 rounded-xl shadow'>
            <MapContainer center={position} zoom={17} scrollWheelZoom={true}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '0.8rem',
                    display: 'flex',
                    flex: 1,
                    backgroundColor: 'white',
                }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // pane='tilePane'
                />
                <Marker
                    position={position}
                    icon={L.icon({
                        iconUrl: '/src/assets/marker.svg',
                        iconSize: [50, 50],
                        iconAnchor: [25, 50],
                        // shadowUrl: '/src/assets/marker.svg', // Add shadow URL
                        // shadowSize: [60, 60], // Adjust shadow size
                        // shadowAnchor: [30, 60] // Adjust shadow anchor
                    })}
                >
                    <Popup>
                        {message || Address?.address + " " + Address?.city}
                    </Popup>
                </Marker>
                <FlyToMarker position={position} />
            </MapContainer>
        </div>
    );
}
