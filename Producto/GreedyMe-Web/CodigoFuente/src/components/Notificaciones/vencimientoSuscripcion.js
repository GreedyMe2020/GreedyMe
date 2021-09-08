import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { editarSuscripcion } from '../../redux/actions/comActions';

function VencimientoSuscripcion(props) {
  const [diasRestantes, setDiasRestantes] = useState(0);
  const [load, setLoad] = useState(false);
  const [fechaVencimiento, setFechaVencimiento] = useState(
    props.profile.fechaVencimiento.toDate(),
  );
  const [formData, setFormData] = React.useState({
    id: props.auth.uid,
    web: props.profile.web,
    sucursal: props.profile.sucursal,
    rubro: props.profile.rubro,
    telefono: props.profile.telefono,
    instagram: props.profile.instagram,
    facebook: props.profile.facebook,
    direccion: props.profile.direccion,
    tipoSuscripcion: props.profile.tipoSuscripcion,
    fechaVencimiento: props.profile.fechaVencimiento,
    cantidadNotificaciones: props.profile.cantidadNotificaciones,
  });

  const calcularDias = () => {
    let fechaActual = new Date();

    let mseg_dia = 1000 * 60 * 60 * 24; //Defino los mseg por dia debido a que cuando resto las fechas el resultado queda en mseg
    let calculoDiasRestantes = Math.floor(
      (((fechaVencimiento - fechaActual) / mseg_dia) * 10) / 10,
    );

    if (calculoDiasRestantes <= 0) {
      if (props.profile.tipoSuscripcion !== 0) {
        formData.tipoSuscripcion = 0;
        setFormData({ ...formData });
        handleSubmit();
      }
      setDiasRestantes(0);
    } else {
      console.log(calculoDiasRestantes);
      setDiasRestantes(calculoDiasRestantes);
    }
    setLoad(true);
  };

  const handleSubmit = () => {
    props.editarSuscripcion(formData);
    setSubmitted({ submitted: true }, () => {
      setTimeout(() => setSubmitted({ submitted: false }), 5000);
    });
  };

  useEffect(() => {
    calcularDias();
  }, []);

  return (
    <div>
      {load ? (
        <div className="vencimiento">
          <Card className="contenedor-card-pequeña-vencimiento">
            <CardContent className="cont-card-pequeña-vencimiento">
              <div className="texto-1-vencimiento">
                <p
                  className="inicio-titulo"
                  style={{ marginBottom: 10 }}
                >
                  Tu plan vence en
                  <span className="cantidad-dias">
                    {' '}
                    {diasRestantes}{' '}
                  </span>
                  días
                </p>
              </div>
              <div className="texto-3-vencimiento">
                <Link
                  to={'/main/' + props.auth.uid + '/suscripciones'}
                  className="link"
                  onClick={() => {
                    props.setSeleccionado(7);
                  }}
                >
                  <Button
                    variant="contained"
                    className="btn-vencimiento"
                    type="submit"
                  >
                    Actualizar plan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editarSuscripcion: (datos) => dispatch(editarSuscripcion(datos)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VencimientoSuscripcion);
