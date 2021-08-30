import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';

function LateralNotificaciones(props) {
  return (
    <div className="lateral-notif">
      <Card className="contenedor-card-pequeña">
        <CardContent className="cont-card-pequeña">
          <div className="texto-1">
            <p className="texto-noti">Te quedan</p>
          </div>
          <div className="cantidad-notif">
            <p className="texto-noti">
              {props.profile.cantidadNotificaciones}
            </p>
          </div>
          <div className="texto-3">
            <p className="texto-noti">
              Notificaciones disponibles para enviar este mes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(LateralNotificaciones);
