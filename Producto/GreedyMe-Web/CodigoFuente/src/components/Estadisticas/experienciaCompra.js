import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Refresh from '@material-ui/icons/Refresh';
import firebase from '../../firebase/config';
import { connect } from 'react-redux';
import { Pie } from '@reactchartjs/react-chart.js';
import _ from 'lodash';

const anios = [
  {
    value: '2021',
  },
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

function ExperienciaCompra(props) {
  const classes = useStyles();

  //ESTADO PARA GUARDAR LOS COMENTARIOS
  const [comentarios, setComentarios] = React.useState([]);

  //Estado para datePicker
  const [anio, setAnio] = React.useState('');

  const [reseñas, setReseñas] = React.useState([]);
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
            '#1e1b4d',
            '#262262',
            '#76b39d',
            '#f7941e',
            '#fd5f00',
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
          backgroundColor: ['#76b39d', '#262262'],
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
          backgroundColor: ['#f7941e', '#262262'],
        },
      ],
    });
  };

  const handleRefresh = () => {
    let contadorMala = 0;
    let contadorRegular = 0;
    let contadorBueno = 0;
    let contadorMuyBueno = 0;
    let contadorExcelente = 0;
    let contadorEsperadoSi = 0;
    let contadorEsperadoNo = 0;
    let contadorBeneficioSi = 0;
    let contadorBeneficioNo = 0;
    setComentarios([]);
    for (let i = 0; i < reseñas.length; i++) {
      if (
        reseñas[i].fecha.toDate().getFullYear().toString() === anio
      ) {
        comentarios.push(reseñas[i].comentario);
        if (reseñas[i].atencionVendedor === 'mala') {
          contadorMala++;
        } else if (reseñas[i].atencionVendedor === 'regular') {
          contadorRegular++;
        } else if (reseñas[i].atencionVendedor === 'buena') {
          contadorBueno++;
        } else if (reseñas[i].atencionVendedor === 'muyBuena') {
          contadorMuyBueno++;
        } else if (reseñas[i].atencionVendedor === 'excelente') {
          contadorExcelente++;
        }
        if (reseñas[i].coincideLoEsperado === 'si') {
          contadorEsperadoSi++;
        } else if (reseñas[i].coincideLoEsperado === 'no') {
          contadorEsperadoNo++;
        }
        if (reseñas[i].utilizoBeneficio === 'si') {
          contadorBeneficioSi++;
        } else if (reseñas[i].utilizoBeneficio === 'no') {
          contadorBeneficioNo++;
        }
      }
    }

    chartAtencionVendedor(
      contadorMala,
      contadorRegular,
      contadorBueno,
      contadorMuyBueno,
      contadorExcelente,
    );

    chartCoincideLoEsperado(contadorEsperadoSi, contadorEsperadoNo);
    chartUtilizoElBeneficio(contadorBeneficioSi, contadorBeneficioNo);
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

        const arrayReseñas = reseñasOriginales.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReseñas(arrayReseñas);
        reseñasOriginales.docs.map((doc) => {
          //Guardo los comentarios en un array
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

  return (
    <div>
      <div className="tittle-discount">
        <p className="tittle-d">
          Experiencia de compra de los usuarios
        </p>
        <div>
          <Button
            variant="outlined"
            onClick={handleRefresh}
            id="actualizar-reporte"
            endIcon={<Refresh fontSize="medium" />}
          >
            Actualizar
          </Button>
        </div>
      </div>
      <div className="content-discount" style={{ marginTop: 0 }}>
        <form className="form-d" noValidate autoComplete="off">
          <TextField
            id="est-input-mes"
            select
            className="select"
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
        <div className="est-container">
          <p className="subtittle-d">Atención del vendedor</p>
          <Pie data={chartDataAtencionVendedor} />
        </div>
        <div className="graphic-exp">
          <div className="est-exp">
            <p className="subtittle-d">
              El cupón coincide con lo esperado
            </p>
            <Pie data={chartDataCoincideEsperado} />
          </div>
          <div className="est-exp">
            <p className="subtittle-d">
              El cliente pudo utilizar el beneficio
            </p>
            <Pie data={chartDataUtilizoBeneficio} />
          </div>
        </div>
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
