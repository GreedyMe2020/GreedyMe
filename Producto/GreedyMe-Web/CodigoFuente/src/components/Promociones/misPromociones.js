/*import React from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";*/

/*function MisPromociones(props) {
  console.log(promociones);

  const { useState } = React;
  const [columns, setColumns] = useState([
    {
      title: "Tipo de pormoción",
      field: "tipoPromo",
      lookup: { 1: "10%", 2: "2x1" },
    },
    {
      title: "Proveedor de promoción",
      field: "proveedor",
      lookup: { 1: "Club Personal", 2: "Banco Galicia" },
    },
    { title: "Disponible desde", field: "vigenciaDesde", type: "date" },
    { title: "Disponible hasta", field: "vigenciaHasta", type: "date" },
    { title: "Efectivo", field: "efectivo", lookup: { 1: "Si", 2: "No" } },
    {
      title: "Dias que aplica",
      field: "dias",
      lookup: { 1: "Lunes", 2: "Martes" },
    },
    { title: "Descripción", field: "descripcion" },
  ]);

  const [data, setData] = useState([
    {
      tipoPromo: 1,
      proveedor: 2,
      vigenciaDesde: "",
      vigenciaHasta: "",
      efectivo: 1,
      dias: 1,
      descripcion: "sdsad",
    },
  ]);

   todos los iconos
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="Mis promociones"
      columns={columns}
      data={promociones.map((option) => ({
        tipoPromo: 1,
        proveedor: 2,
        vigenciaDesde: option.vigenciaDesde,
        vigenciaHasta: option.vigenciaHasta,
        efectivo: 1,
        dias: 1,
        descripcion: option.descripcion,
      }))}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
    />
  );
}*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Visibility from "@material-ui/icons/Visibility";
import { Grid, Avatar, IconButton } from "@material-ui/core";
import ModalPromos from "../../components/modal-button";
import {
  cambiarVisibilidad,
  actualizarPromocion,
  eliminarPromocion,
} from "../../redux/actions/promActions";
import firebase from "../../firebase/config";
import { connect } from "react-redux";
//esta es la funcion que trae los datos, tipo crea un array trae todos las promociones
//y la va acumulando en el array

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

let promociones = [];
const promocion = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const id = user.uid;
      const firestore = firebase.firestore();
      firestore
        .collection("usuarioComercio")
        .doc(id)
        .collection("promociones")
        .onSnapshot(function (snapShots) {
          promociones = [];
          snapShots.forEach((doc) => {
            const data = doc.data();
            promociones.push({
              ...data,
              id: doc.id,
            });
          });
        });
    }
  });
};
//y aca se ejecuta la fncion de arriba
promocion();

function MisPromociones(props) {
  console.log(promociones); //te dejo un console.log si queres ver como vienen las promos
  const classes = useStyles();

  return (
    <div>
      <ModalPromos />
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <List>
                  {promociones &&
                    promociones.map((promos) => {
                      return (
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              variant="square"
                              src={require("../../../Multimedia/Sistema-svg/credit-card.svg")}
                              /* src1={require("../../../Multimedia/Sistema-svg/credit-card.svg")}
                              src2={require("../../../Multimedia/Sistema-svg/store.svg")}
                              src3={require("../../../Multimedia/Sistema-svg/percentage (1).svg")}
                              proveedor={
                                promos.proveedor === 1
                                  ? src1
                                  : promos.proveedor === 2
                                  ? src2
                                  : src3
                              } */
                            ></Avatar>
                          </ListItemAvatar>
                          <div className="elementoListaProm">
                            <ListItemText
                              //asi podes ir accediendo a todos los datos asi los acomodas como quieras
                              primary={
                                promos.tipoPromo +
                                " " +
                                promos.proveedor +
                                " desde el " +
                                promos.desdeVigencia +
                                " hasta el " +
                                promos.hastaVigencia +
                                " " +
                                promos.diaAplicacion.checkedTD +
                                " " +
                                promos.descripcion
                              }
                              secondary={promos.efectivo ? "Efectivo" : null}
                            />
                          </div>
                          <ListItemSecondaryAction>
                            <IconButton aria-label="Editar">
                              <CreateIcon />
                            </IconButton>
                            <IconButton aria-label="Mostrar/Ocultar">
                              <Visibility />
                            </IconButton>
                            <IconButton edge="end" aria-label="Eliminar">
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                </List>
              </div>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actualizarPromocion: (
      promocion,
      dias,
      efectivo,
      desdeVigencia,
      hastaVigencia
    ) =>
      dispatch(
        actualizarPromocion(
          promocion,
          dias,
          efectivo,
          desdeVigencia,
          hastaVigencia
        )
      ),
    eliminarPromocion: (promocion) => dispatch(eliminarPromocion(promocion)),
    cambiarVisibilidad: (promocion) => dispatch(cambiarVisibilidad(promocion)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MisPromociones);
