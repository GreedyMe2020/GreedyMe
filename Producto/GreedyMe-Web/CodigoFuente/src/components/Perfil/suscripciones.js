import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function Suscripciones(props) {
  return (
    <div>
      <div className="prom-title-container">
        <h1>Mis suscripciones</h1>
      </div>
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <div className="susc-title-container">
              <h1>Compará los planes</h1>
              <p>
                GreedyMe te brinda una comparación entre los planes ofrecidos
                para que elijas el que mas se ajuste a tus necesidades.
              </p>
            </div>
            <div className="susc-container"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
