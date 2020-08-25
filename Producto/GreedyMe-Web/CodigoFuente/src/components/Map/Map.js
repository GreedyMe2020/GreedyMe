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
import { defaultProps } from "recompose";

const libraries = ["places"];

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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
/*
function Search({ panTo }, { props }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -31.4058194, lng: () => -64.1967167 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ address, lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="search">
      <Combobox onLoad={setValue(props)} onSelect={handleSelect}>
        <ComboboxInput value={value} onChange={handleInput} disabled={!ready} />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
*/
