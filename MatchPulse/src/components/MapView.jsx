import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";


const icons = {
  LEAGUE: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/685/685655.png",
    iconSize: [25, 25],
    iconAnchor: [12, 24],
    popupAnchor: [0, -20],
  }),
  CUP: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2972/2972246.png",
    iconSize: [25, 25],
    iconAnchor: [12, 24],
    popupAnchor: [0, -20],
  }),
  default: new L.Icon.Default(),
};

function MapView({ competitions }) {
    const areaCenters = {
      Africa: [1.3, 17.3],
      Europe: [50, 14],
      Asia: [34, 100],
      Argentina: [-38, -65],
      "South America": [-15, -58],
      "North America": [40, -100],
    };
      

  
  useEffect(() => {
    setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
  }, []);

  return (
    <div className="relative">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: "450px", width: "100%" }}
        className="rounded-xl shadow-xl z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {competitions.map((comp) => {
          const center = areaCenters[comp.area.name];
          if (!center) return null;

          const icon =
            comp.type === "LEAGUE"
              ? icons.LEAGUE
              : comp.type === "CUP"
              ? icons.CUP
              : icons.default;

          return (
            <Marker key={comp.id} position={center} icon={icon}>
              <Popup>
                <div className="text-sm">
                  <strong className="text-indigo-600">{comp.name}</strong>
                  <br />
                  <span className="text-gray-600">{comp.area.name}</span>
                  <br />
                  Type: <strong>{comp.type}</strong>
                  <br />
                  Seasons: {comp.numberOfAvailableSeasons}
                  <br />
                  Matchday: {comp.currentSeason?.currentMatchday ?? "N/A"}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapView;
