// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix missing default icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// const UserLocationMap = () => {
//   const [position, setPosition] = useState([20.5937, 78.9629]); // Default: India
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setPosition([pos.coords.latitude, pos.coords.longitude]);
//           setLoading(false);
//         },
//         (err) => {
//           console.error("Geolocation error:", err);
//           setLoading(false);
//         }
//       );
//     } else {
//       console.error("Geolocation not supported");
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <div style={{ height: "500px", width: "100%" }}>
//       {!loading ? (
//         <MapContainer
//           center={position}
//           zoom={13}
//           style={{ height: "100%", width: "100%" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
//           />
//           <Marker position={position}>
//             <Popup>You are here!</Popup>
//           </Marker>
//         </MapContainer>
//       ) : (
//         <p>Loading map...</p>
//       )}
//     </div>
//   );
// };

// export default UserLocationMap;
// src/components/UserLocationMap.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import L from "leaflet";
import CoordContext from "../context/coordinates/coordsContext";
import ServiceContext from "../context/service/serviceRoute";

// Component to fix the broken tile issue
const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
};

// Custom Icons
const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}`,
    iconSize: [30, 50],
    iconAnchor: [15, 50],
    popupAnchor: [0, -40],
  });

const userIcon = createIcon("007bff"); // Blue for user
const fireIcon = createIcon("ff0000"); // Red for Fire
const policeIcon = createIcon("000000"); // Black for Police
const hospitalIcon = createIcon("28a745"); // Green for Hospital
const medicineIcon = createIcon("ffc107"); // Yellow for Medicine

const UserLocationMap = () => {
  const userCoord = useContext(CoordContext); // {lat, lng}
  const service = useContext(ServiceContext); // selected service
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default: India
  const [hasLocation, setHasLocation] = useState(false);

  // Simulate nearby service locations (you can replace this with API or DB data)
  const serviceLocations = {
    fire: [
      { name: "Fire Station 1", coords: [20.6, 78.9] },
      { name: "Fire Station 2", coords: [20.62, 78.96] },
    ],
    police: [
      { name: "Police Station 1", coords: [20.61, 78.95] },
      { name: "Police Station 2", coords: [20.64, 78.98] },
    ],
    hospital: [
      { name: "City Hospital", coords: [20.59, 78.94] },
      { name: "Care Clinic", coords: [20.58, 78.93] },
    ],
    medicine: [
      { name: "Pharmacy 1", coords: [20.57, 78.91] },
      { name: "Pharmacy 2", coords: [20.56, 78.92] },
    ],
  };

  // Detect user location (or use context)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setPosition(coords);
          setHasLocation(true);
        },
        (err) => console.error(err)
      );
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={position} zoom={14} style={{ height: "100%", width: "100%" }}>
        <ResizeMap />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User Marker */}
        {hasLocation && (
          <Marker position={position} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Dynamic Service Markers */}
        {service && serviceLocations[service] &&
          serviceLocations[service].map((loc, index) => (
            <Marker
              key={index}
              position={loc.coords}
              icon={
                service === "fire"
                  ? fireIcon
                  : service === "police"
                  ? policeIcon
                  : service === "hospital"
                  ? hospitalIcon
                  : medicineIcon
              }
            >
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default UserLocationMap;
