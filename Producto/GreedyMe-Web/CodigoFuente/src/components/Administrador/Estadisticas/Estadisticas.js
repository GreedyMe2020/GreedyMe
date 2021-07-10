import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  VerticalBarSeries,
} from 'react-vis';
import Button from '@material-ui/core/Button';
import Print from '@material-ui/icons/Print';
import 'react-vis/dist/style.css';
import { formatoRubros, formatoSuscripciones } from './Funciones';

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  cruz: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '8px',
    color: theme.palette.grey[500],
  },
  inline: {
    display: 'block',
  },
}));

function Estadisticas(props) {
  const classes = useStyles();
  //Estado que contiene a los usuarios
  const [usuarios, setUsuarios] = React.useState(props.usuarios);
  //funciones que agrupan los usuarios por rubros y suscripciones
  const gruposRubros = formatoRubros(usuarios);
  const gruposSuscripciones = formatoSuscripciones(usuarios);

  const printPDF = () => {
    window.print();
  };

  return (
    <div>
      <div className="prom-title-container">
        <h1>Estadísticas</h1>
      </div>
      <div className="tittle-discount" style={{ margin: '0 5%' }}>
        <div className="t-discount">
          <p class="tittle-d">
            Cantidad total de compras por beneficio
          </p>
        </div>
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
      <div className="container-discount">
        <XYPlot width={900} height={300} xType="ordinal">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries
            color="#262262"
            data={
              gruposRubros &&
              Object.entries(gruposRubros).map((rubro) => {
                return {
                  x: rubro[0],
                  y: rubro[1].length,
                };
              })
            }
          />
        </XYPlot>
      </div>
      <div
        className="tittle-discount"
        style={{ margin: '20px 5% 0' }}
      >
        <div className="t-discount">
          <p class="tittle-d">
            Cantidad de comercios por tipo de suscripción
          </p>
        </div>
      </div>
      <div className="container-discount">
        <XYPlot width={880} height={300} xType="ordinal">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />

          <VerticalBarSeries
            color="#262262"
            data={
              gruposSuscripciones &&
              Object.entries(gruposSuscripciones).map(
                (suscripcion) => {
                  return {
                    x:
                      suscripcion[0] === '0'
                        ? 'Plan Básico'
                        : suscripcion[0] === '1'
                        ? 'Plan Estándar'
                        : suscripcion[0] === '2'
                        ? 'Plan Premium'
                        : null,
                    y: suscripcion[1].length,
                  };
                },
              )
            }
          />
        </XYPlot>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    usuarios: state.firestore.ordered.usuarioComercio,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'usuarioComercio' }]),
)(Estadisticas);
