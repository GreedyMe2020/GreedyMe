import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { Card, CardContent, CardActions, Typography } from "@material-ui/core";
import CardAyuda from "./card-ayuda";

export function AyudaYSoporte() {
  return (
    <div>
      <div className="prom-title-container">
        <h1>Ayuda y soporte técnico</h1>
      </div>
      <div className="contenedor-ayuda-todo">
        <div className="card-ayuda">
          <CardAyuda />
        </div>
        <div className="img-ayuda">
          <img src={require("../../../../Multimedia/Sistema-svg/ayuda.svg")} />
        </div>
        <div className="card-ponte-contacto">
          <Card className="contenedor-card-ayuda">
            <CardContent className="contacto-ayuda">
              <h6>¿No encontraste lo que buscabas?</h6>
              <CardActions>
                <Typography>
                  <Link to="" className="link-ayuda">
                    Ponte en contacto con nuestro servicio de soporte.
                  </Link>
                </Typography>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(AyudaYSoporte);
