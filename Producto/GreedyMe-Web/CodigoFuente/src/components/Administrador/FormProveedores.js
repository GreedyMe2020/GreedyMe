import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DialogComponent from "../Dialog";
import { TextField, MenuItem } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import {
  ValidatorForm,
  SelectValidator,
  TextValidator,
} from "react-material-ui-form-validator";

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  cruz: {
    position: "absolute",
    right: theme.spacing(1),
    top: "8px",
    color: theme.palette.grey[500],
  },
  inline: {
    display: "block",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FormProveedores(props) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    tipoProveedor: "",
    valueProveedor: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.tipoProveedor === "Club") {
      console.log("club");
    } else if (formData.tipoProveedor === "Tarjetas de débito") {
      console.log("Tarjetas de debito");
    } else if (formData.tipoProveedor === "Tarjetas de crédito") {
      console.log("tarjetas de credito");
    } else if (formData.tipoProveedor === "Cartera Digital") {
      console.log("cartera digital");
    }
  };

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const form = React.createRef();
  return (
    <div className="contenedorTodo">
      <Card className="cardPromo">
        <CardContent className="cardContentePromo">
          <ValidatorForm
            className={classes.root}
            ref={form}
            onSubmit={handleSubmit}
          >
            <div className="col-subgrid">
              <SelectValidator
                className="select-tipopromo"
                fullWidth
                label="Tipo de proveedor"
                onChange={handleChange}
                name="tipoProveedor"
                required
                value={formData.tipoProveedor}
                variant="outlined"
                validators={["required"]}
                errorMessages={["*Este campo es obligatorio"]}
              >
                {props.proveedores &&
                  props.proveedores.map((option) => (
                    <MenuItem key={option.tipo} value={option.tipo}>
                      {option.tipo}
                    </MenuItem>
                  ))}
              </SelectValidator>
              <TextValidator
                variant="outlined"
                id="outlined-basic"
                label="Ingresa aqui el nuevo proveedor"
                fullWidth
                required
                onChange={handleChange}
                name="valueProveedor"
                value={formData.valueProveedor}
              />
              <Button
                variant="contained"
                id="btnAdminPerfil"
                className="btnAdminPerfil"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Guardar
              </Button>
            </div>
          </ValidatorForm>
        </CardContent>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    proveedores: state.firestore.ordered.proveedorServicio,
    tipoPromo: state.firestore.ordered.tipoPromocion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "proveedorServicio" },
    { collection: "tipoPromocion" },
  ])
)(FormProveedores);
