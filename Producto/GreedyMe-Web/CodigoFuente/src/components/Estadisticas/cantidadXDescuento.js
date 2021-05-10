import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import GetApp from '@material-ui/icons/GetApp';
import Refresh from '@material-ui/icons/Refresh';
import firebase from '../../firebase/config';
import { connect } from 'react-redux';
import { Bar } from '@reactchartjs/react-chart.js';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '38ch',
    },
  },
}));

function CantidadXDescuento(props) {
  const classes = useStyles();
  //Estado para el reporte de cantidad total de compras por descuento
  const [cupon, setCupon] = React.useState('');

  //Estado para cantidad de codigos en general
  const [cantidadCupones, setCantidadCupones] = React.useState(0);

  //Estado para guardar todos los codigos y despues reprocesarlos segun parametros
  const [codigosCupon, setCodigosCupon] = React.useState([]);

  //Estado de los beneficios para filtrar cantidad de compras
  const [beneficios, setBeneficios] = React.useState([]);
  // Estado para el gráfico
  const [chartData, setChartData] = React.useState({});
  // Estado para la visualización el gráfico
  const [flagChart, setFlagChart] = React.useState(true);

  //Estados para cada datePicker
  const [desdeReporte, handleDesdeReporte] = React.useState(
    new Date(),
  );
  const [hastaReporte, handleHastaReporte] = React.useState(
    new Date(),
  );

  const chart = (beneficios, arrayData) => {
    //eje "x" beneficios, eje "y" cantidad
    setChartData({
      labels: beneficios,
      datasets: [
        {
          label: 'Cantidad de compras',
          data: arrayData,
          //backgroudColor: ['rgba(75,192,192,0.2'],
          borderColor: '#76b39d',
          backgroundColor: 'rgb(118, 179, 157,0.3)',
          borderWidth: 2,
        },
      ],
    });
  };

  React.useEffect(() => {
    const obtenerCantidadComprasXDescuento = async () => {
      const firestore = firebase.firestore();
      try {
        const cupones = await firestore
          .collection('usuarioComercio')
          .doc(props.auth.uid)
          .collection('codigoCupon')
          .get();
        const arrayCupones = cupones.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const nombreBarChart = [];
        const countBarChart = [];
        const nombreSplitBarChart = [];

        for (let i = 0; i < arrayCupones.length; i++) {
          if (i === 0) {
            nombreBarChart.push(arrayCupones[i].detalle);
            nombreSplitBarChart.push(
              arrayCupones[i].detalle.split(',')[0],
            );
            countBarChart.push(1);
          } else {
            let existe = 0;
            for (let j = 0; j < nombreBarChart.length; j++) {
              if (arrayCupones[i].detalle === nombreBarChart[j]) {
                countBarChart[j]++;
                existe++;
              }
            }
            if (existe === 0) {
              nombreBarChart.push(arrayCupones[i].detalle);
              nombreSplitBarChart.push(
                arrayCupones[i].detalle.split(',')[0],
              );
              countBarChart.push(1);
            }
          }
        }
        chart(nombreSplitBarChart, countBarChart);

        //Guardo la cantidad de condigos en general
        setCantidadCupones(arrayCupones.length);
        //Guardo todos los codigos en el estado "codigosCupòn"
        setCodigosCupon(arrayCupones);
      } catch (error) {
        console.log(error);
      }
    };

    const obtenerPromociones = async () => {
      const firestore = firebase.firestore();
      try {
        const promociones = await firestore
          .collection('usuarioComercio')
          .doc(props.auth.uid)
          .collection('promociones')
          .get();
        const arrayPromociones = promociones.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const beneficios = [];
        arrayPromociones.map((promo) => {
          beneficios.push({
            id: promo.id,
            name:
              promo.tipoPromo +
              ' ' +
              (promo.valuePromo === 'Otro'
                ? promo.otraPromo
                : promo.valuePromo) +
              ' ' +
              (promo.valueProveedor === 'Otro'
                ? promo.otroProveedor
                : promo.valueProveedor === 'Todos'
                ? 'Todos los Bancos'
                : promo.valueProveedor) +
              ' ' +
              (promo.tipoProveedor === 'Tarjetas de crédito' ||
              promo.tipoProveedor === 'Tarjetas de débito'
                ? promo.otroProveedor + ' '
                : '') +
              ' ' +
              (promo.otroProveedor === 'Todas'
                ? 'las Tarjetas '
                : ''),
          });
        });
        setBeneficios(beneficios);
        //chart();
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPromociones();

    obtenerCantidadComprasXDescuento();
    chart();
  }, []);

  const handleCupon = (event) => {
    //Guardo el id del beneficio para poder contar la cantidad.
    setCupon(event.target.value);
  };

  const temaCombo = createMuiTheme({
    overrides: {
      MuiInputBase: {
        input: {
          backgroundColor: 'white',
          margin: '2px',
        },
      },
    },
  });

  const handleRefresh = () => {
    setFlagChart(false);
    //FALTA EL IF SI SE SELECCIONÓ O NO EL DESCUENTO.
    //Tengo que usar cupon que es el "parametro"cupon + codigosCupon que es el array donde estan todos + cantidadCupones
    let contador = 0;
    if (cupon) {
      for (let i = 0; i < codigosCupon.length; i++) {
        if (
          codigosCupon[i].fechaCreacion.toDate() <= hastaReporte &&
          codigosCupon[i].fechaCreacion.toDate() >= desdeReporte &&
          codigosCupon[i].idCupon === cupon
        ) {
          contador++;
        }
      }
    } else {
      for (let i = 0; i < codigosCupon.length; i++) {
        if (
          codigosCupon[i].fechaCreacion.toDate() <= hastaReporte &&
          codigosCupon[i].fechaCreacion.toDate() >= desdeReporte
        ) {
          contador++;
        }
      }
    }
    setCantidadCupones(contador);
  };

  return (
    <div>
      <div className="tittle-discount">
        <div className="t-discount">
          <p class="tittle-d">
            Cantidad total de compras por beneficio
          </p>
          <div className="number-est">
            <p className="number-d">{cantidadCupones}</p>
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
      <div className="content-discount">
        <form className="form-d" noValidate autoComplete="off">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={temaCombo}>
              <DatePicker
                autoOk
                disableToolbar
                className="select"
                inputVariant="outlined"
                name="desdeReporte"
                label="Fecha desde"
                minDate={new Date('2020/01/01')}
                maxDate={new Date()}
                format="dd/MM/yyyy"
                value={desdeReporte}
                variant="inline"
                onChange={(data) => handleDesdeReporte(data)}
              />
              <DatePicker
                autoOk
                disableToolbar
                className="select"
                inputVariant="outlined"
                name="hastaReporte"
                label="Fecha hasta"
                minDate={desdeReporte}
                maxDate={new Date()}
                format="dd/MM/yyyy"
                value={hastaReporte}
                variant="inline"
                onChange={(data) => handleHastaReporte(data)}
              />
            </ThemeProvider>
          </MuiPickersUtilsProvider>
          <TextField
            className="select"
            select
            label="Seleccione un descuento"
            value={cupon}
            onChange={handleCupon}
            variant="outlined"
          >
            {beneficios.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </form>
        {flagChart ? (
          <div className="est-container">
            <Bar
              data={chartData}
              options={{
                scales: {
                  yAxes: [
                    {
                      display: true,
                      ticks: {
                        beginAtZero: true,
                        min: 0,
                      },
                    },
                  ],
                },
              }}
            />
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

export default connect(mapStateToProps)(CantidadXDescuento);
