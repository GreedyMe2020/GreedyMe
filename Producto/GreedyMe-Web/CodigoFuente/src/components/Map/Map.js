import React, { useEffect } from "react";
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

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: -31.4212352,
  lng: -64.1826816,
};

export default function Map(props) {
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  /*
  const panTo = () => {
    mapRef.current.panTo({ ubicacion.lat, ubicacion.lng });
    mapRef.current.setZoom(14);
  };
*/
  /*const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ address, lat, lng });
    mapRef.current.setZoom(14);
    setMapData({ address, lat, lng });
  }, []);*/

  return (
    <div>
      {props.lat ? (
        <GoogleMap
          id="map"
          zoom={14}
          center={{ lat: props.lat, lng: props.lng }}
          options={options}
          onLoad={onMapLoad}
        >
          <Marker position={{ lat: props.lat, lng: props.lng }} />
        </GoogleMap>
      ) : (
        <GoogleMap
          id="map"
          zoom={11}
          center={center}
          options={options}
          onLoad={onMapLoad}
        ></GoogleMap>
      )}
    </div>
  );
}
