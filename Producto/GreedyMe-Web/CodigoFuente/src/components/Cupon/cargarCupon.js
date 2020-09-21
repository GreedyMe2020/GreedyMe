import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

function Cupon() {
  const beneficios = [
    { name: "3x2 Club Personal, válida desde el" },
    { name: "20% Nuevo club, válida desde el" },
    { name: "5*2 Club La Voz, válida desde el" },
    { name: "4x2 Talleres, válida desde el" },
    { name: "APEPE La Voz, válida desde el" },
    { name: "PEPE La Voz, válida desde el" },
    { name: "1x2 Club Personal, válida desde el" },
    { name: "4x2 OLA, válida desde el" },
    { name: "5*2 PEPE La Voz, válida desde el" },
  ];

  const options = beneficios.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? firstLetter : firstLetter,
      ...option,
    };
  });
  return (
    <div>
      <div className="prom-title-container">
        <h1>Cupones</h1>
      </div>
      <Card className="card-cupon">
        <CardContent className="card-content-cupon">
          <div className="input-buscador-beneficio">
            <h6 className="texto-beneficio">
              Cupón que va a utilizar su cliente:
            </h6>
            <Autocomplete
              className="buscador-ben"
              fullWidth
              validators={["required"]}
              errorMessages={["*Este campo es obligatorio"]}
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar beneficio"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div className="generar-cupon">
            <h6 className="texto-cupon">El código para este cupón es:</h6>
            <div className="generador-cupon">
              <TextField
                label="Código"
                className="input-cupon"
                variant="outlined"
                disabled
              ></TextField>
              <Button
                variant="contained"
                className="btn-generar-cup"
                type="submit"
              >
                Generar código
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Cupon;
