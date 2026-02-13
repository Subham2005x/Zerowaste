"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in Next.js + Leaflet
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface Location {
    lat: number;
    lng: number;
    title: string;
    description?: string;
}

interface LeafletMapProps {
    center?: [number, number];
    zoom?: number;
    locations?: Location[];
    className?: string; // Allow passing Tailwind classes for height/width
}

function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
}

export default function LeafletMap({
    center = [12.9716, 77.5946], // Default: Bangalore
    zoom = 13,
    locations = [],
    className = "h-full w-full rounded-xl z-0",
}: LeafletMapProps) {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            className={className}
            style={{ zIndex: 0 }} // Ensure map stays below modals/dropdowns
        >
            {/* Dark Mode Tiles (CartoDB Dark Matter) */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            <MapUpdater center={center} />

            {locations.map((loc, i) => (
                <Marker key={i} position={[loc.lat, loc.lng]} icon={customIcon}>
                    <Popup className="custom-popup">
                        <div className="font-sans text-sm">
                            <strong className="block text-gray-900 mb-1">{loc.title}</strong>
                            {loc.description && <span className="text-gray-600">{loc.description}</span>}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
