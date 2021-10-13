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
  LineSeries,
  AreaSeries,
} from 'react-vis';
import Button from '@material-ui/core/Button';
import Print from '@material-ui/icons/Print';
import 'react-vis/dist/style.css';
import {
  formatoRubros,
  formatoSuscripciones,
  formatoRubrosFiltro,
  formatoSuscripcionesFiltro,
} from './Funciones';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import Refresh from '@material-ui/icons/Refresh';
import Visibility from '@material-ui/icons/Visibility';
import Search from '@material-ui/icons/Search';

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
  const gruposRubrosOriginal = formatoRubros(usuarios);
  const gruposSuscripcionesOriginal = formatoSuscripciones(usuarios);

  //Estados para cada datePicker
  const [desdeReporte, handleDesdeReporte] = React.useState(
    new Date(),
  );
  const [hastaReporte, handleHastaReporte] = React.useState(
    new Date(),
  );

  const [desdeReporte2, handleDesdeReporte2] = React.useState(
    new Date(),
  );
  const [hastaReporte2, handleHastaReporte2] = React.useState(
    new Date(),
  );

  const [gruposRubros, setGruposRubros] = React.useState(
    gruposRubrosOriginal,
  );

  const [
    gruposSuscripciones,
    setGruposSuscripciones,
  ] = React.useState(gruposSuscripcionesOriginal);

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

  const printPDF = () => {
    window.print();
  };

  const handleRefresh = () => {
    const gruposRubrosFiltro = formatoRubrosFiltro(
      usuarios,
      desdeReporte,
      hastaReporte,
    );
    setGruposRubros(gruposRubrosFiltro);
  };

  const handleTodo = () => {
    const gruposRubrosFiltro = formatoRubros(usuarios);
    setGruposRubros(gruposRubrosFiltro);
  };

  const handleRefresh2 = () => {
    const gruposSuscripcionesFiltro = formatoSuscripcionesFiltro(
      usuarios,
      desdeReporte,
      hastaReporte,
    );
    setGruposSuscripciones(gruposSuscripcionesFiltro);
  };

  const handleTodo2 = () => {
    const gruposSuscripcionesFiltro = formatoSuscripciones(usuarios);
    setGruposSuscripciones(gruposSuscripcionesFiltro);
  };

  return (
    <div>
      <div
        className="prom-title-container"
        id="subtitulo-container"
        style={{ marginTop: 35 }}
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

      <div className="container-discount">
        <div className="tittle-discount">
          <div className="t-discount">
            <p className="tittle-d">
              Cantidad total de compras por beneficio
            </p>
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
            <Button
              variant="contained"
              onClick={handleRefresh}
              endIcon={<Search fontSize="medium" />}
              id="actualizar-reporte"
              style={{ backgroundColor: '#76b39d', color: 'white' }}
            >
              Filtrar
            </Button>
            <Button
              variant="contained"
              onClick={handleTodo}
              id="actualizar-reporte"
              endIcon={<Visibility />}
              style={{
                backgroundColor: '#76b39d',
                color: 'white',
              }}
            >
              Ver todo
            </Button>
          </form>
          <div className="est-container">
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
        </div>
      </div>

      <div className="container-discount">
        <div>
          <div className="tittle-discount">
            <div className="t-discount">
              <p className="tittle-d">
                Cantidad de comercios por tipo de suscripción
              </p>
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
                    value={desdeReporte2}
                    variant="inline"
                    onChange={(data) => handleDesdeReporte2(data)}
                  />
                  <DatePicker
                    autoOk
                    disableToolbar
                    className="select"
                    inputVariant="outlined"
                    name="hastaReporte"
                    label="Fecha hasta"
                    minDate={desdeReporte2}
                    maxDate={new Date()}
                    format="dd/MM/yyyy"
                    value={hastaReporte2}
                    variant="inline"
                    onChange={(data) => handleHastaReporte2(data)}
                  />
                </ThemeProvider>
              </MuiPickersUtilsProvider>

              <Button
                variant="contained"
                onClick={handleRefresh}
                endIcon={<Search fontSize="medium" />}
                id="actualizar-reporte"
                style={{ backgroundColor: '#76b39d', color: 'white' }}
              >
                Filtrar
              </Button>
              <Button
                variant="contained"
                onClick={handleTodo}
                id="actualizar-reporte"
                endIcon={<Visibility />}
                style={{
                  backgroundColor: '#76b39d',
                  color: 'white',
                }}
              >
                Ver todo
              </Button>
            </form>
            <div className="est-container">
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
        </div>
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
