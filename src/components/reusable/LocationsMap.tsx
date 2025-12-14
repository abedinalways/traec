"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import locations from "../../../public/data/locations-with-coords.json";


L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LocationsMap() {
  const markers = Object.values(locations).flat();

  return (
    <div className="w-full h-[420px] rounded-xl overflow-hidden border">
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((city) => (
          <Marker key={city.name} position={[city.lat, city.lng]}>
            <Popup>
              <strong>{city.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
