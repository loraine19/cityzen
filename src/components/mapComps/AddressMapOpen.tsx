import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Address } from '../../types/class';
import L from 'leaflet';

function FlyToMarker({ position }: { position: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        const currentCenter = map.getCenter();
        if (currentCenter.lat !== position[0] || currentCenter.lng !== position[1]) {
            map.flyTo(position, 16, {
                animate: true,
                duration: 1,
            });
        }
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
        <div className='Map z-50 !min-h-32 mb-2 rounded-xl shadow'>
            <MapContainer center={position} zoom={16} scrollWheelZoom={false}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '0.8rem',
                    display: 'flex',
                    flex: 1,
                    backgroundColor: 'white'
                }}>
                {/* <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />  <TileLayer
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                /> */}
                <TileLayer
                    url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
                />
                <Marker
                    position={position}
                    icon={L.icon({
                        iconUrl: '/marker.svg',
                        iconSize: [60, 60],
                        iconAnchor: [30, 60],
                        popupAnchor: [0, -50],
                    })}
                >
                    <Popup >
                        {message || Address?.address + " " + Address?.city}
                    </Popup>
                </Marker>
                {!message && <FlyToMarker position={position} />}
            </MapContainer>
        </div>
    );
}
