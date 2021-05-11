import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import GetApp from '@material-ui/icons/GetApp';
import Refresh from '@material-ui/icons/Refresh';
import { connect } from 'react-redux';
import { Line } from '@reactchartjs/react-chart.js';
import { createMuiTheme } from '@material-ui/core';
import firebase from '../../firebase/config';

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
          borderColor: '#262262',
          backgroundColor: 'rgb(38, 34, 98, 0.3)',
          borderWidth: 2,
        },
      ],
    });
  };

  const handleAnio = (event) => {
    setAnio(event.target.value);
  };

  const handleRefresh = () => {
    setFlagChart(true);
    let cantFavoritos = 0;
    let cantidadMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //Usar la variable anio y getAnio() -----> trae como resultado 120 (2020), 121 (2021), etc
    for (let i = 0; i < favoritos.length; i++) {
      if (
        favoritos[i].fecha.toDate().getFullYear().toString() === anio
      ) {
        //construir array de meses, insertar en la posicion y sumar +1 teniendo en cuenta que enero = [0], febrero = [1]a
        cantidadMes[favoritos[i].fecha.toDate().getMonth()]++;
        cantFavoritos++;
      }
    }
    console.log(cantFavoritos);
    setCantidadFavoritos(cantFavoritos);
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
    if (
      props.profile.estadisticasFavoritos !== undefined &&
      flagChart === false
    ) {
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
      <div className="tittle-discount">
        <div className="t-discount">
          <p class="tittle-d">
            Cantidad de clientes que los guardan como favoritos
          </p>
          <div
            className="number-est"
            style={{ backgroundColor: '#262262' }}
          >
            <p className="number-d">{cantidadFavoritos}</p>
          </div>
        </div>
        <div>
          <Tooltip title="Actualizar" arrow>
            <IconButton
              aria-label="Actualizar"
              onClick={handleRefresh}
            >
              <Refresh fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Descargar" arrow>
            <IconButton
              aria-label="Descargar"
              onClick={() => {
                console.log('esto anda getapp');
              }}
            >
              <GetApp fontSize="medium" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="content-discount" style={{ marginTop: 5 }}>
        <form className="form-d" noValidate autoComplete="off">
          <TextField
            className="select"
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
        </form>
        {flagChart ? (
          <div className="est-container">
            <Line data={chartData} />
          </div>
        ) : null}
      </div>
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
