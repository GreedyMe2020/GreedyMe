import React from 'react';
import ProgramarNotificaciones from './programarNotif';
import LateralNotificaciones from './cardLateralNotif';
import HacermePremium from './haztePremium';
import { connect } from 'react-redux';

function Notificaciones(props) {
  return (
    <div>
      <div className="prom-title-container">
        <h1>Notificaciones</h1>
      </div>
      <div className="subtitulo-notif">
        <h6>
          Gestioná las notificaciones push que enviás a los usuarios
        </h6>
      </div>
      <div className="contenedor-notificaciones-todo">
        <div className="card-programar">
          <ProgramarNotificaciones />
        </div>
        <div className="contenedor-cards-lateral">
          <div className="card-lateral">
            <LateralNotificaciones />
          </div>
          <div className="card-lateral-vencimiento">
            {props.profile.fechaVencimiento &&
            props.profile.tipoSuscripcion !== 0 ? (
              <VencimientoSuscripcion
                setSeleccionado={props.setSeleccionado}
              />
            ) : null}
          </div>
          <div className="card-lateral-premium">
            {props.profile.tipoSuscripcion === 2 ? null : (
              <HacermePremium
                setSeleccionado={props.setSeleccionado}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Notificaciones);
