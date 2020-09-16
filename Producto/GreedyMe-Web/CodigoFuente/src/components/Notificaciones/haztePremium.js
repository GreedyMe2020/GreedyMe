import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

function HacermePremium() {
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
            <Button variant="contained" className="btn-premium" type="submit">
              Actualizar plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default HacermePremium;
