import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Print from '@material-ui/icons/PRint';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import firebase from '../../firebase/config';
import { connect } from 'react-redux';
import CantidadXDescuento from './cantidadXDescuento';
import ExperienciaCompra from './experienciaCompra';
import ComerciosFavoritos from './comerciosFavoritos';
import Button from '@material-ui/core/Button';

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

function Estadisticas(props) {
  const classes = useStyles();
  const [cantidadCupones, setCantidadCupones] = React.useState(0);
  const [cantidadPromos, setCantidadPromos] = React.useState(0);
  const [cuponMasUsado, setCuponMasUsado] = React.useState('');

  React.useEffect(() => {
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
        setCantidadPromos(arrayPromociones.length);
      } catch (error) {
        console.log(error);
      }
    };

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

        //Array y función para guardar todos los beneficios por separado

        let arrayAuxCantidad = [];
        for (let i = 0; i < arrayCupones.length; i++) {
          arrayAuxCantidad.push(
            arrayCupones.filter(
              (x) => x.detalle == arrayCupones[i].detalle,
            ).length,
          );
        }
        let maximo = 0;
        let posicion = 0;
        for (let i = 0; i < arrayAuxCantidad.length; i++) {
          if (i === 0) {
            maximo = arrayAuxCantidad[i];
          }
          if (arrayAuxCantidad[i] > maximo) {
            maximo = arrayAuxCantidad[i];
            posicion = i;
          }
        }
        setCuponMasUsado(
          arrayCupones[posicion].detalle.split(',')[0],
        );

        //Guardo la cantidad de condigos en general
        setCantidadCupones(arrayCupones.length);
        //Guardo todos los codigos en el estado "codigosCupòn"
      } catch (error) {
        console.log(error);
      }
    };

    obtenerPromociones();
    obtenerCantidadComprasXDescuento();
  }, []);

  const printPDF = () => {
    window.print();
  };

  return (
    <div>
      <div
        className="prom-title-container"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <h1>Estadísticas</h1>
        <Button
          variant="contained"
          id="imprimir"
          style={{ backgroundColor: '#262262', color: 'white' }}
          onClick={printPDF}
          endIcon={<Print />}
        >
          Imprimir
        </Button>
      </div>
      <div className="est-cards-container">
        <Card id="est-card">
          <CardContent id="est-card-content">
            <h1>{cantidadPromos}</h1>
            <p>Beneficios cargados</p>
          </CardContent>
        </Card>
        <Card id="est-card">
          <CardContent id="est-card-content">
            <h1>{cantidadCupones}</h1>
            <p>Cupones usados</p>
          </CardContent>
        </Card>
        <Card id="est-card">
          <CardContent id="est-card-content">
            <h3>{cuponMasUsado}</h3>
            <p>Beneficio más utilizado</p>
          </CardContent>
        </Card>
      </div>

      {props.profile.tipoSuscripcion === 1 ? (
        <div class="container-discount">
          <ExperienciaCompra />
        </div>
      ) : null}
      {props.profile.tipoSuscripcion === 2 ? (
        <div>
          <div class="container-discount">
            <CantidadXDescuento />
          </div>
          <div class="container-discount">
            <ComerciosFavoritos />
          </div>
          <div class="container-discount">
            <ExperienciaCompra />
          </div>
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

export default connect(mapStateToProps)(Estadisticas);
