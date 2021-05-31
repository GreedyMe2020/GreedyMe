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
import jsPDF from 'jspdf';

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
      setFlagChart(false);
    } else {
      const nombreBarChart = [];
      const countBarChart = [];
      const nombreSplitBarChart = [];

      for (let i = 0; i < codigosCupon.length; i++) {
        if (
          codigosCupon[i].fechaCreacion.toDate() <= hastaReporte &&
          codigosCupon[i].fechaCreacion.toDate() >= desdeReporte
        ) {
          if (i === 0) {
            nombreBarChart.push(codigosCupon[i].detalle);
            nombreSplitBarChart.push(
              codigosCupon[i].detalle.split(',')[0],
            );
            countBarChart.push(1);
            contador++;
          } else {
            let existe = 0;
            for (let j = 0; j < nombreBarChart.length; j++) {
              if (codigosCupon[i].detalle === nombreBarChart[j]) {
                countBarChart[j]++;
                contador++;
                existe++;
              }
            }
            if (existe === 0) {
              nombreBarChart.push(codigosCupon[i].detalle);
              nombreSplitBarChart.push(
                codigosCupon[i].detalle.split(',')[0],
              );
              countBarChart.push(1);
              contador++;
            }
          }
        }
      }
      chart(nombreSplitBarChart, countBarChart);
    }

    setCantidadCupones(contador);
  };

  const print = (fechaDesde, fechaHasta, cupon, tabla) => {
    let cuponNombre = beneficios.filter(function (beneficio) {
      return beneficio.id === cupon;
    });
    const img = new Image();
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    let y = 5;
    const url = 'data:image/png;base64,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'
    img.src = url;
    console.log(img)
    pdf.setFontType('bold');
    pdf.addImage(img, 'png', y, y, 80, 80);
    pdf.setFontSize(16);
    pdf.text('Cantidad total de compras por beneficio', 92.0975, 20, {
      maxWidth: width - 105,
      align: 'justify'
    });
    pdf.line(92.0975, 37, width - 10, 37);
    pdf.setFontSize(12);
    pdf.setTextColor('#636666');
    pdf.text('Comercio: ', 92.0975, 57)
    pdf.setFontType('normal');
    pdf.text(props.profile.nombreComercio, 92.0975 + pdf.getTextWidth('Comercio: ') + 10, 57);
    pdf.setFontType('bold');
    pdf.text('Fecha desde: ', 92.0975, 72);
    pdf.setFontType('normal');
    pdf.text(fechaDesde.toLocaleString(), 92.0975 + pdf.getTextWidth('Fecha desde: ') + 10, 72);
    pdf.setFontType('bold');
    pdf.text('Fecha hasta: ', 92.0975, 87);
    pdf.setFontType('normal');
    pdf.text(fechaHasta.toLocaleString(), 92.0975 + pdf.getTextWidth('Fecha hasta: ') + 10, 87);
    pdf.setFontType('bold');
    pdf.text('Cupon: ', 92.0975, 102);
    pdf.setFontType('normal');
    pdf.text(cupon === "" ? 'Todos' : cuponNombre[0].name, 92.0975 + pdf.getTextWidth('Cupon: ') + 10, 102);
    pdf.line(10, 112, width - 10, 112);
    let posicion = 127
    for (var i = 0; i < tabla.labels.length; i++) {
      pdf.setFontType('bold');
      pdf.text("Total " + tabla.labels[i] + ": ", 92.0975, posicion);
      pdf.setFontType('normal');
      pdf.text(tabla.datasets[0].data[i].toString(), 92.0975 + pdf.getTextWidth("Total " + tabla.labels[i] + ": ") + 17, posicion);
      posicion += 17;
    }



    pdf.save('Compras por beneficio' + '.pdf');


  }

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
              onClick={() => { print(desdeReporte, hastaReporte, cupon, chartData) }}
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
