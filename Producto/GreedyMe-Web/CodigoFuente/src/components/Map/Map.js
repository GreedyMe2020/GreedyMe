import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

const libraries = ["places"];

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  /*const [mapData, setMapData] = React.useState({
    address: props.direccion,
    lat: props.lat,
    lng: props.lng,
  });*/
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ address, lat, lng }) => {
    mapRef.current.panTo({ address, lat, lng });
    mapRef.current.setZoom(14);
    setMapData({ address, lat, lng });
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        zoom={14}
        center={{ lat: -31.4214431, lng: -64.1961064 }}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker position={{ lat: -31.4214431, lng: -64.1961064 }} />
      </GoogleMap>
    </div>
  );
}
