import React, { useState } from "react";
import { Link } from "@reach/router";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { NavBarSup } from "../../components/Principal/navBarSuperior";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {
  MenuItem,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  Divider,
  Grid,
  Avatar,
} from "@material-ui/core";
import {
  ValidatorForm,
  SelectValidator,
} from "react-material-ui-form-validator";
import { crearPromocion } from "../../redux/actions/promActions";

function MisPromociones(props) {
  return (
    <div>
      <div className="prom-title-container">
        <h1>Mis promociones</h1>
      </div>
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Avatar
              src1={require("../../../Multimedia/Sistema-svg/home-grey.svg")}
              src2={require("../../../Multimedia/Sistema-svg/home-grey.svg")}
              src3={require("../../../Multimedia/Sistema-svg/home-grey.svg")}
            />
            <p>
              {/* 
              { {
                (tipoPromo,
                proveedor,
                dias,
                "desde",
                desdeVigencia,
                "hasta",
                hastaVigencia,
                descripcion,
                efectivo) }
              } */}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MisPromociones;
