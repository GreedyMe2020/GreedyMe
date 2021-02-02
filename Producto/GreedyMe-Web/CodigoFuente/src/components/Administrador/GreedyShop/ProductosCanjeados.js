import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DialogComponent from "../../Dialog";
import Dialog from "@material-ui/core/Dialog";
import { Grid, Avatar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import ModalAdministrador from "../modal-admin";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
/* import ModalActualizarComercio from "../Comercios/modal-actualizar-comercio"; */
import {
  signUp,
  eliminarUsuarioComercio,
  modificarUsuarioComercio,
} from "../../../redux/actions/adminActions";
import FormProducto from "./FormProductos";
import Snackbar from "@material-ui/core/Snackbar";
import firebase from "../../../firebase/config";
import _ from "lodash";
//esta es la funcion que trae los datos, tipo crea un array trae todos las promociones
//y la va acumulando en el array
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table'

function createData(ape, nom, prod, est, fecha){
    return {ape, nom, prod, est, fecha}
}

const rows = [
  createData('Sanchez','Eduardo', 'Taza', 'Yendo', 4.3),
  createData('Messi', 'Pepe', 'Remera', 'En espera', 4.9),
  createData('Ertola', 'Carlos', 'Piluso', 'En espera', 6.0),
  createData('Fuseneco', 'Maria', 'Piluso', 'Yendo', 4.0),
  createData('Vaca', 'Laura', 'Taza', 'Entregado', 3.9),
  createData('Duje', 'Franca', 'Remera', 'Yendo', 6.5),
  createData('Zablosky', 'Juan', 'Gorra', 'Entregado', 4.3),
  createData('Perez', 'Pablo', 'Lapicera', 'Yendo', 0.0),
  createData('Albornós', 'Alberto', 'Microondas', 'Yendo', 7.0),
  createData('Falcucci', 'Dante', 'Tele', 'Yendo', 0.0),
  createData('Niclis', 'Yazimel', 'Plantita', 'Entregado', 2.0),
  createData('Cerutti', 'Manuel', 'Piluso', 'Yendo', 37.0),
  createData('Higuaín', 'Pipa', 'Arco', 'En espera', 4.0),
];


export default function ProductosCanjeados(){
    const theme = createMuiTheme({
        palette: {
          primary: {
            main: '#4caf50',
          },
          secondary: {
            main: '#ff9100',
          },
        },
    
      });

    return(
        <div>
            <div className="prom-title-container">
                <h1>Productos canjeados</h1>
            </div>
            <div className="contenedorTodo">
            <Card className="cardPromo">
                <CardContent className="cardContentePromo">
                    <MuiThemeProvider theme={theme}>
                        <MaterialTable
                            title="Styling with MuiThemeProvider Preview"
                            columns={[
                            {
                                title: 'Name', field: 'name',
                            },
                            { title: 'Surname', field: 'surname' },
                            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                            {
                                title: 'Birth Place',
                                field: 'birthCity',
                                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                            },
                            ]}
                            data={[
                            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                            { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                            ]}
                            options={{
                            selection: true
                            }}
                        />
                        </MuiThemeProvider>
                </CardContent>
            </Card>
            </div>
        </div>
    );
}