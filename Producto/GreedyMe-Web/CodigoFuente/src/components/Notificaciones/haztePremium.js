import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "@reach/router";
import { connect } from "react-redux";


function HacermePremium(props) {
  const handleClose = (elementIndex) => (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    props.setSeleccionado(elementIndex);
    setOpen(false);
  };

  return (
    <div className="hacerme-premium">
      <Card className="contenedor-card-pequeña-premium">
        <CardContent className="cont-card-pequeña-premium">
          <div className="texto-1-premium">
            <p>¡Hacete Premium!</p>
          </div>
          <div className="texto-premium">
            <p>
              Y enviá mas notificaciones a tus clientes acerca de todos los
              beneficios de tu tienda
            </p>
          </div>
          <div className="texto-3-premium">
            <Link
              to={"/main/" + props.auth.uid + "/suscripciones"}
              className="link"
              onClick={() => {
                props.setSeleccionado(7);
              }}
            >
              <Button variant="contained" className="btn-premium" type="submit">
                Actualizar plan
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(HacermePremium);
