import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardPlanes from "../CardPlanes";

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
              <h3>Compará los planes</h3>
              <p>
                GreedyMe te brinda una comparación entre los diferentes planes
                ofrecidos para que elijas el que mas se ajuste a tus
                necesidades.
              </p>
            </div>
            <div className="susc-body-container">
              <div className="susc-plan-uno">
                <CardPlanes
                  text={[
                    "Algo asi",
                    "algo asa",
                    "Este es el primero coso",
                    "algo asa",
                  ]}
                />
              </div>
              <div className="susc-plan-dos">
                <CardPlanes
                  text={[
                    "Aca va el segundo coso",
                    "Aca sigue el segundo coso",
                    "Aca sigue el segundo coso",
                    "Aca sigue el segundo coso",
                  ]}
                />
              </div>
              <div className="susc-plan-tres">
                <CardPlanes
                  text={[
                    "Blablablabla tercero",
                    "vevovevevove",
                    "vevovevevove",
                    "vevovevevove",
                  ]}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
