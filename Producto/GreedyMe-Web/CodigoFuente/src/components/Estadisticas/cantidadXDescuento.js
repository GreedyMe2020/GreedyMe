import React, { useEffect } from 'react';
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
import { MuiPickersUtilsProvider, DatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '30ch',
    },
  },
}));

function CantidadXDescuento(props) {
  const classes = useStyles();
  //Estado para el reporte de cantidad total de compras por descuento
  const [anio, setAnio] = React.useState('');
  const [mes, setMes] = React.useState('');
  const [cupon, setCupon] = React.useState('');

  //Estado para cantidad de codigos en general
  const [cantidadCupones, setCantidadCupones] = React.useState(0);

  //Estado para guardar todos los codigos y despues reprocesarlos segun parametros
  const [codigosCupon, setCodigosCupon] = React.useState([]);

  //Esto se queda?
  const [cantidadPromos, setCantidadPromos] = React.useState(0);
  //Estado de los beneficios para filtrar cantidad de compras
  const [beneficios, setBeneficios] = React.useState([]);
  // Estado para el gráfico
  const [chartData, setChartData] = React.useState({});

  //Estados para cada datePicker
  const [desdeReporte, handleDesdeReporte] = React.useState(new Date()); 
  const [hastaReporte, handleHastaReporte] = React.useState(new Date());

  const chart = () => {
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
          label: 'Cantidad de compras',
          data: [1, 1, 1, 1, 1, 1],
          backgroudColor: ['rgba(75,192,192,0.2'],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

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
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPromociones();

    obtenerCantidadComprasXDescuento();
  }, []);

  const handleCupon = (event) => {
    //Guardo el id del beneficio para poder contar la cantidad.
    setCupon(event.target.value);
  };

  const temaCombo = createMuiTheme({
    overrides: {
      MuiInputBase: {
        input: {
         backgroundColor:'white',
         margin:'2px',
        }
      }
    }
  });

  const handleRefresh = () => {
    //FALTA EL IF SI SE SELECCIONÓ O NO EL DESCUENTO.
    //Tengo que usar cupon que es el "parametro"cupon + codigosCupon que es el array donde estan todos + cantidadCupones
    let contador = 0;
    for (let i = 0; i < codigosCupon.length; i++) {
      if (codigosCupon[i].idCupon === cupon) {
        /*if (
          codigosCupon[i].fechaCreacion <= fechaHasta &&
          codigosCupon[i].fechaCreacion >= FechaDesde
        ) {
          contador++;
        }*/
        contador++;
      }
    }
    setCantidadCupones(contador);

    /*for (let i = 0; i < beneficios.length; i++) {
      for (let j = 0; j < codigosCupon.length; j++) {
        if (beneficios[i].id === codigosCupon[j].id) {
          null;
        }
      }
    }*/
  };

  // CONFIGURACION PARA EL GRAFICO

  /*const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart - Multi Axis',
        },
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
    },
  };*/


  return (
    <div>
      <div className="prom-title-container">
        <h1>Cantidad total de compras por descuento</h1>
      </div>
      <div id="subtitulo-container">
        <div className="est-filtros-cont">
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={temaCombo}>
                      <DatePicker
                        autoOk
                        disableToolbar
                        fullWidth
                        inputVariant="outlined"
                        name="desdeReporte"
                        label="Fecha desde:"
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
                        fullWidth
                        inputVariant="outlined"
                        name="hastaReporte"
                        label="Fecha hasta:"
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
                id="est-input-mes"
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
            <h1>{cantidadCupones}</h1>
            <p className="est-titulo">Cantidad de compras</p>
          </CardContent>
        </Card>
      </div>
      <div className="est-container">
        <Card className="est-estadisticas">
          <CardContent id="est-card-content">
            <Line data={chartData} />
          </CardContent>
        </Card>
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
