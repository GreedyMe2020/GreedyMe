import React, { useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import { makeStyles } from "@material-ui/core/styles";

const libraries = ["places"];
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Search({ obtenerDireccion, actual }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -31.4212352, lng: () => -64.1826816 },
      radius: 100 * 1000,
    },
  });
  const classes = useStyles();
  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
    e.target.value ? null : obtenerDireccion([]);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    obtenerDireccion({ address });
  };

  const handleLoad = () => {
    actual ? setValue(actual, false) : null;
  };

  useEffect(() => {
    //esto no corre en el primer render, se ejecuta luego del return
    handleLoad();
  }, [actual]); //lista de dependencias de react, cosa de que se refresque el campo una vez y luego cada vez que se actualizan los elementos de la lista

  return (
    <div onLoad={handleLoad}>
      <Combobox onSelect={handleSelect}>
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
