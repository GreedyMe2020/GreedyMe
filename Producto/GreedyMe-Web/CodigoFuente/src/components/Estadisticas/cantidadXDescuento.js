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
        //Necesito contar los codigos por idCupon.
        arrayCupones.forEach((cupon) => {
          var repeats = arrayCupones.filter((cupon) => {
            return cupon.id;
          });
        });

        //Guardo la cantidad de condigos en general
        setCantidadCupones(arrayCupones.length);
        //Guardo todos los codigos en el estado "codigosCupòn"
        setCodigosCupon(arrayCupones);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerCantidadComprasXDescuento();
  }, []);

  const handleAnio = (event) => {
    setAnio(event.target.value);
  };

  const handleMes = (event) => {
    setMes(event.target.value);
  };

  const handleCupon = (event) => {
    setMes(event.target.value);
  };

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
              <TextField
                id="est-input-mes"
                select
                label="Seleccione un mes"
                value={mes}
                onChange={handleMes}
                variant="outlined"
              >
                {meses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="est-input-mes"
                select
                label="Seleccione un año"
                value={anio}
                onChange={handleAnio}
                variant="outlined"
              >
                {anios.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="est-input-descuento"
                select
                label="Seleccione un descuento"
                value={cupon}
                onChange={handleCupon}
                variant="outlined"
              >
                {anios.map((option) => (
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
            <h1>{cantidadCupones}</h1>
            <p className="est-titulo">Cantidad de compras</p>
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

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(CantidadXDescuento);
