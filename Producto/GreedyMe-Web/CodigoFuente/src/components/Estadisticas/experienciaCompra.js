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
import { Pie } from '@reactchartjs/react-chart.js';
import _ from 'lodash';
import { MuiPickersUtilsProvider, DatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";

const anios = [
  {
    value: '2020',
  },
  {
    value: '2019',
  },
  {
    value: '2018',
  },
  {
    value: '2017',
  },
];

const meses = [
  {
    value: 'Enero',
  },
  {
    value: 'Febrero',
  },
  {
    value: 'Marzo',
  },
  {
    value: 'Abril',
  },
  {
    value: 'Mayo',
  },
  {
    value: 'Junio',
  },
  {
    value: 'Julio',
  },
  {
    value: 'Agosto',
  },
  {
    value: 'Septiembre',
  },
  {
    value: 'Octubre',
  },
  {
    value: 'Noviembre',
  },
  {
    value: 'Diciembre',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function ExperienciaCompra(props) {
  const classes = useStyles();
  //Estado para el reporte de cantidad total de compras por descuento
  const [anio, setAnio] = React.useState('');
  const [mes, setMes] = React.useState('');

  //ESTADO PARA GUARDAR LOS COMENTARIOS
  const [comentarios, setComentarios] = React.useState([]);

  //Estado para datePicker
  const [anioElegido, handleAnioElegido] = React.useState(new Date()); 

  const [cantidadPromos, setCantidadPromos] = React.useState(0);
  //Gráfico de atención al vendedor
  const [
    chartDataAtencionVendedor,
    setChartAtencionVendedor,
  ] = React.useState({});

  const chartAtencionVendedor = (
    countMala,
    countRegular,
    countBuena,
    countMuyBuena,
    countExcelente,
  ) => {
    setChartAtencionVendedor({
      labels: ['Mala', 'Regular', 'Buena', 'Muy Buena', 'Excelente'],
      datasets: [
        {
          data: [
            countMala,
            countRegular,
            countBuena,
            countMuyBuena,
            countExcelente,
          ],
          backgroundColor: [
            '#FF6384',
            '#63FF84',
            '#84FF63',
            '#8463FF',
            '#6384FF',
          ],
        },
      ],
    });
  };

  //Gráfico de atención al vendedor
  const [
    chartDataCoincideEsperado,
    setChartCoincideEsperado,
  ] = React.useState({});

  const chartCoincideLoEsperado = (countSi, countNo) => {
    setChartCoincideEsperado({
      labels: ['Si', 'No'],
      datasets: [
        {
          data: [countSi, countNo],
          backgroundColor: ['#63FF84', '#FF6384'],
        },
      ],
    });
  };

  const [
    chartDataUtilizoBeneficio,
    setChartUtilizoBeneficio,
  ] = React.useState({});

  const chartUtilizoElBeneficio = (countSi, countNo) => {
    setChartUtilizoBeneficio({
      labels: ['Si', 'No'],
      datasets: [
        {
          data: [countSi, countNo],
          backgroundColor: ['#63FF84', '#FF6384'],
        },
      ],
    });
  };

  React.useEffect(() => {
    //RESEÑA
    const obtenerReseña = async () => {
      const firestore = firebase.firestore();
      try {
        const reseñasOriginales = await firestore
          .collection('usuarioComercio')
          .doc(props.auth.uid)
          .collection('reseñas')
          .get();

        let contadorMala = 0;
        let contadorRegular = 0;
        let contadorBueno = 0;
        let contadorMuyBueno = 0;
        let contadorExcelente = 0;
        let contadorEsperadoSi = 0;
        let contadorEsperadoNo = 0;
        let contadorBeneficioSi = 0;
        let contadorBeneficioNo = 0;

        reseñasOriginales.docs.map((doc) => {
          comentarios.push(doc.data().comentario);
          if (doc.data().atencionVendedor === 'mala') {
            contadorMala++;
          } else if (doc.data().atencionVendedor === 'regular') {
            contadorRegular++;
          } else if (doc.data().atencionVendedor === 'buena') {
            contadorBueno++;
          } else if (doc.data().atencionVendedor === 'muyBuena') {
            contadorMuyBueno++;
          } else if (doc.data().atencionVendedor === 'excelente') {
            contadorExcelente++;
          }
          if (doc.data().coincideLoEsperado === 'si') {
            contadorEsperadoSi++;
          } else if (doc.data().coincideLoEsperado === 'no') {
            contadorEsperadoNo++;
          }
          if (doc.data().utilizoBeneficio === 'si') {
            contadorBeneficioSi++;
          } else if (doc.data().utilizoBeneficio === 'no') {
            contadorBeneficioNo++;
          }
        });
        chartAtencionVendedor(
          contadorMala,
          contadorRegular,
          contadorBueno,
          contadorMuyBueno,
          contadorExcelente,
        );

        chartCoincideLoEsperado(
          contadorEsperadoSi,
          contadorEsperadoNo,
        );
        chartUtilizoElBeneficio(
          contadorBeneficioSi,
          contadorBeneficioNo,
        );
      } catch (error) {
        console.log(error);
      }
    };

    obtenerReseña();
  }, []);

  const handleAnio = (event) => {
    setAnio(event.target.value);
  };

  const handleMes = (event) => {
    setMes(event.target.value);
  };

  const temaCombo = createMuiTheme({
    overrides: {
      MuiInputBase: {
        input: {
         backgroundColor:'white',
         margin:'4px',
        }
      }
    }
  });

  return (
    <div>
      <div className="prom-title-container">
        <h1>Experiencia de compra del usuario</h1>
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
                        views={['year']}
                        inputVariant="outlined"
                        name="anioElegido"
                        label="Seleccione un año:"
                        minDate={new Date('2020')}
                        maxDate={new Date()}
                        format="yyyy"
                        value={anioElegido}
                        variant="inline"
                        onChange={(data) => handleAnioElegido(data)}
                      />
                      </ThemeProvider>
              </MuiPickersUtilsProvider>
            </div>
          </form>
        </div>
        <div className="est-icons-cont">
          <Tooltip title="Refrescar" arrow>
            <IconButton
              aria-label="Refrescar"
              onClick={() => {
                console.log('esto anda refrsh');
              }}
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
            <h1>{cantidadPromos}</h1>
            <p className="est-titulo">Beneficios cargados</p>
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
            <p className="est-titulo">Beneficio más utilizado</p>
          </CardContent>
        </Card>
      </div>
      <div className="est-container">
        <h5>Atención del vendedor</h5>
        <Card className="est-estadisticas">
          <CardContent id="est-card-content">
            <Pie data={chartDataAtencionVendedor} />
          </CardContent>
        </Card>
      </div>
      <div className="est-container">
        <h5>Coincide con lo esperado</h5>
        <Card className="est-estadisticas">
          <CardContent id="est-card-content">
            <Pie data={chartDataCoincideEsperado} />
          </CardContent>
        </Card>
      </div>
      <div className="est-container">
        <h5>Utilizó beneficio</h5>
        <Card className="est-estadisticas">
          <CardContent id="est-card-content">
            <Pie data={chartDataUtilizoBeneficio} />
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

export default connect(mapStateToProps)(ExperienciaCompra);
