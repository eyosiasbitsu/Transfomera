import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { getGeocode, getLatLng } from "use-places-autocomplete";

interface LocationPickerProps {
  lat: number;
  setLat: (lat: number) => void;
  lng: number;
  setLng: (lng: number) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({lat, lng, setLat, setLng}) => {
  const [placeClickedOnMap, setPlaceClickedOnMap] = useState("");

  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading map...</p>;
  }

  

  return (
    <div>
      {/* render Places Auto Complete and pass custom handler which updates the state */}
      <PlacesAutocomplete
        onAddressSelect={(address) => {
      
          getGeocode({ address: address }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            setLat(lat);
            setLng(lng);
            
          });
        }}
        clickedMapPlace={placeClickedOnMap}
      />
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "100%", height: "400px" }}
        onLoad={() => console.log("Map Component Loaded...")}
        onClick={(e: google.maps.MapMouseEvent) => {
          const geocoder = new window.google.maps.Geocoder();

          geocoder.geocode(
            {
              location: {
                lat: e.latLng?.lat() as number,
                lng: e.latLng?.lng() as number,
              },
            },
            (results, status) => {
              if (status === "OK") {
                if (results && results[0]) {
                  
                  setPlaceClickedOnMap(results[0].formatted_address);
                } 
              } 
            }
          );

  

          setLat(e.latLng?.lat() as number);
          setLng(e.latLng?.lng() as number);
        }}
      >
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log("Marker Loaded")}
        />
      </GoogleMap>
    </div>
  );
};

export default LocationPicker;
