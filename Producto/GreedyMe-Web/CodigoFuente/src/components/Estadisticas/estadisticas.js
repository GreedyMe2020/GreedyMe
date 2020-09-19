import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton } from "@material-ui/core";
import GetApp from "@material-ui/icons/GetApp";
import Refresh from "@material-ui/icons/Refresh";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Estadistica from "../../../Multimedia/Sistema-svg/data-estadisticas.svg";

const currencies = [
  {
    value: "2020",
  },
  {
    value: "2019",
  },
  {
    value: "2018",
  },
  {
    value: "2017",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Estadisticas(props) {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div>
      <div className="prom-title-container">
        <h1>Estadísticas</h1>
      </div>
      <div id="subtitulo-container">
        <div className="est-filtros-cont">
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="est-input-mes"
                select
                label="Seleccione un mes"
                value={currency}
                onChange={handleChange}
                variant="outlined"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="est-input-mes"
                select
                label="Seleccione un año"
                value={currency}
                onChange={handleChange}
                variant="outlined"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </form>
        </div>
        <div className="est-icons-cont">
          <Tooltip title="Refrescar" arrow>
            <IconButton
              aria-label="Refrescar"
              onClick={() => {
                console.log("esto anda refrsh");
              }}
            >
              <Refresh fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Descargar" arrow>
            <IconButton
              aria-label="Descargar"
              onClick={() => {
                console.log("esto anda getapp");
              }}
            >
              <GetApp fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="est-cards-container">
        <Card id="est-card">
          <CardContent id="est-card-content">
            <h1>{props.cantPromos}</h1>
            <p className="est-titulo">Promociones cargadas</p>
          </CardContent>
        </Card>

        <Card id="est-card">
          <CardContent id="est-card-content">
            <h1>120</h1>
            <p className="est-titulo">Cupones usados</p>
          </CardContent>
        </Card>

        <Card id="est-card">
          <CardContent id="est-card-content">
            <h2>Club Personal</h2>
            <p className="est-titulo">Promoción más utilizada</p>
          </CardContent>
        </Card>
      </div>
      <div className="est-container">
        <Card className="est-estadisticas">
          <CardContent id="est-card-content">
            <img src={Estadistica} alt="Estadistica" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
