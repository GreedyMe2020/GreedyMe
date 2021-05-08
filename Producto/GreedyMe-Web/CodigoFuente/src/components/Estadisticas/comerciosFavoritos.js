import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import GetApp from '@material-ui/icons/GetApp';
import Refresh from '@material-ui/icons/Refresh';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Estadistica from '../../../Multimedia/Sistema-svg/data-estadisticas.svg';
import firebase from '../../firebase/config';
import { connect } from 'react-redux';
import { Line } from '@reactchartjs/react-chart.js';
import Moment from 'react-moment';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const anios = [
  {
    value: '2021',
    key: 121,
  },
  {
    value: '2020',
    key: 120,
  },
  {
    value: '2019',
    key: 119,
  },
  {
    value: '2018',
    key: 118,
  },
  {
    value: '2017',
    key: 117,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '35ch',
    },
  },
}));

function ComerciosFavoritos(props) {
  const classes = useStyles();
  //Estado para el reporte de cantidad total de compras por descuento
  const [anio, setAnio] = React.useState('');
  const [cantidadFavoritos, setCantidadFavoritos] = React.useState(0);
  const [favoritos, setFavoritos] = React.useState([]);

  const [cantidadPorMes, setCantidadPorMes] = React.useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);
  const [flagChart, setFlagChart] = React.useState(false);
  // Estado para el gráfico
  const [chartData, setChartData] = React.useState({});

  const chart = (data) => {
    setChartData({
      labels: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      datasets: [
        {
          label: 'Cantidad de favoritos',
          data: data,
          backgroudColor: ['rgba(75,192,192,0.2'],
          borderWidth: 4,
        },
      ],
    });
  };

  const handleAnio = (event) => {
    setAnio(event.target.value);
  };

  const handleRefresh = () => {
    setFlagChart(true);
    let cantidadMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //Usar la variable anio y getAnio() -----> trae como resultado 120 (2020), 121 (2021), etc
    for (let i = 0; i < favoritos.length; i++) {
      if (
        favoritos[i].fecha.toDate().getFullYear().toString() === anio
      ) {
        //construir array de meses, insertar en la posicion y sumar +1 teniendo en cuenta que enero = [0], febrero = [1]a
        cantidadMes[favoritos[i].fecha.toDate().getMonth()]++;
      }
    }
    setCantidadPorMes(cantidadMes);
    chart(cantidadMes);
  };

  const temaCombo = createMuiTheme({
    overrides: {
      MuiInputBase: {
        input: {
          backgroundColor: 'white',
          margin: '4px',
        },
      },
    },
  });

  React.useEffect(() => {
    if (props.profile.estadisticasFavoritos !== undefined) {
      //Guardo la cantidad de condigos en general
      setCantidadFavoritos(
        props.profile.estadisticasFavoritos.length,
      );
      //Guardo todos los codigos en el estado "codigosCupòn"
      setFavoritos(props.profile.estadisticasFavoritos);
    }
  });
  return (
    <div>
      <div className="prom-title-container">
        <h1>Cantidad de clientes favoritos</h1>
      </div>
      <div id="subtitulo-container">
        <div className="est-filtros-cont">
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="est-input-mes"
                select
                label="Seleccione un año"
                value={anio}
                onChange={handleAnio}
                variant="outlined"
              >
                {anios.map((option) => (
                  <MenuItem key={option.key} value={option.value}>
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
              onClick={handleRefresh}
            >
              <Refresh fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Descargar" arrow>
            <IconButton
              aria-label="Descargar"
              onClick={() => {
                console.log('esto anda getapp');
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
            <h1>{cantidadFavoritos}</h1>
            <p className="est-titulo">Cantidad de favoritos</p>
          </CardContent>
        </Card>
      </div>
      {flagChart ? (
        <div className="est-container">
          <Card className="est-estadisticas">
            <CardContent id="est-card-content">
              <Line data={chartData} />
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(ComerciosFavoritos);
