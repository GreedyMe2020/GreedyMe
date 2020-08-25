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

export default function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBMSuKle9DYdzJxk9t2GPxL98Ms296DgLU",
    libraries,
  });

  const [mapData, setMapData] = React.useState({
    address: props.direccion,
    lat: props.lat,
    lng: props.lng,
  });
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
        center={{ lat: mapData.lat, lng: mapData.lng }}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker position={{ lat: mapData.lat, lng: mapData.lng }} />
      </GoogleMap>
    </div>
  );
}
