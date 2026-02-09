import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { locationsConfig } from "../../config/locations.js";

const { stores: storeLocations } = locationsConfig;

// Kakao Maps configuration
const KAKAO_MAPS_CONFIG = {
  defaultLevel: 7,
  markerSize: {
    width: 60,
    height: 100,
  },
  mapHeight: "400px",
  markerImages: {
    active: "/images/for_map.png",
    inactive: "/images/for_map_gray.png",
  },
};

function Locations() {
  const avgLat =
    storeLocations.reduce((sum, loc) => sum + loc.lat, 0) /
    storeLocations.length;
  const avgLng =
    storeLocations.reduce((sum, loc) => sum + loc.lng, 0) /
    storeLocations.length;

  const [selectedLocationId, setSelectedLocationId] = useState(
    storeLocations[0]?.id
  );

  return (
    <div className="">
      <div className="mb-6 flex flex-col items-center gap-2">
        <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
          locations
        </h2>
        <span className="h-1 w-16 rounded-full bg-pink-600" />
      </div>
      <div className="mt-10 md:grid md:grid-cols-2">
        <div>
          <ul>
            {storeLocations.map((location) => (
              <li
                key={location.id}
                className="text-md mb-8 ml-6 mr-6 flex cursor-pointer flex-col border-b-[1px] border-stone-200"
                onClick={() => setSelectedLocationId(location.id)}
              >
                <span
                  className={`${selectedLocationId === location.id ? "text-pink-600" : "text-stone-800"} font-bold hover:text-pink-600`}
                >
                  {location.name}
                </span>
                {location.address}
              </li>
            ))}
          </ul>
        </div>
        <div className="mr-8 hidden md:block">
          <Map
            center={{ lat: avgLat, lng: avgLng }}
            style={{ width: "100%", height: KAKAO_MAPS_CONFIG.mapHeight }}
            level={KAKAO_MAPS_CONFIG.defaultLevel}
          >
            {storeLocations.map((location) => (
              <MapMarker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
                onClick={() => setSelectedLocationId(location.id)}
                image={{
                  src:
                    selectedLocationId === location.id
                      ? KAKAO_MAPS_CONFIG.markerImages.active
                      : KAKAO_MAPS_CONFIG.markerImages.inactive,
                  size: KAKAO_MAPS_CONFIG.markerSize,
                }}
              ></MapMarker>
            ))}
          </Map>
        </div>
      </div>
    </div>
  );
}

export default Locations;
