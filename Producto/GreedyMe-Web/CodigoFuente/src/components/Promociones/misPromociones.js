import React from "react";
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
import ViewColumn from "@material-ui/icons/ViewColumn";

function MisPromociones() {
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
      descripcion: "Hola que tal aca va la descrip",
    },
  ]);

  // todos los iconos
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
      data={data}
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
}
export default MisPromociones;

// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import ListItemText from "@material-ui/core/ListItemText";
// import DeleteIcon from "@material-ui/icons/Delete";
// import CreateIcon from "@material-ui/icons/Create";
// import Visibility from "@material-ui/icons/Visibility";
// import { Grid, Avatar, IconButton } from "@material-ui/core";
// import { firestoreConnect } from "react-redux-firebase";
// import { compose } from "redux";
// import { cambiarVisibilidad } from "../../redux/actions/promActions";
// import firebase from "../../firebase/config";

// const useStyles = makeStyles((theme) => ({
//   demo: {
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     })
//   );
// }

// function MisPromociones(props) {
//   const promociones = [];
//   const promocion = () => {
//     const firestore = firebase.firestore();
//     firestore
//       .collection("usuarioComercio")
//       .doc(props.auth.uid)
//       .collection("promociones")
//       .get()
//       .then((snapShots) => {
//         snapShots.forEach((doc) => {
//           const data = doc.data();
//           promociones.push({
//             ...data,
//             id: doc.id,
//           });
//         });
//       });
//   };
//   promocion();
//   console.log(promociones);
//   const classes = useStyles();
//   return (
//     <div>
//       <div className="prom-title-container">
//         <h1>Mis promociones</h1>
//       </div>
//       <div className="contenedorTodo">
//         <Card className="cardPromo">
//           <CardContent className="cardContentePromo">
//             <Grid item xs={12} md={12}>
//               <div className={classes.demo}>
//                 <List>
//                   {generate(
//                     <ListItem>
//                       <ListItemAvatar>
//                         <Avatar
//                           variant="square"
//                           src={require("../../../Multimedia/Sistema-svg/credit-card.svg")} //aca enrealidad tengo que variar el icono segun el tipo de promocion que sea
//                         ></Avatar>
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary="gol"
//                         //secondary={secondary ? "Secondary text" : null}
//                       />
//                       <ListItemSecondaryAction>
//                         <IconButton aria-label="Editar">
//                           <CreateIcon />
//                         </IconButton>
//                         <IconButton aria-label="Mostrar/Ocultar">
//                           <Visibility />
//                         </IconButton>
//                         <IconButton edge="end" aria-label="Eliminar">
//                           <DeleteIcon />
//                         </IconButton>
//                       </ListItemSecondaryAction>
//                     </ListItem>
//                   )}
//                 </List>
//               </div>
//             </Grid>
//             {/* <img
//               width="40px"
//               height="40px"
//               src={require("../../../Multimedia/Sistema-svg/credit-card.svg")}
//             />
//             <p></p>
//             <Divider />
//             <img
//               width="40px"
//               height="40px"
//               src={require("../../../Multimedia/Sistema-svg/store.svg")}
//             />
//             <p></p>
//             <Divider />
//             <img
//               width="40px"
//               height="40px"
//               src={require("../../../Multimedia/Sistema-svg/percentage (1).svg")}
//             />
//             <p></p> */}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     auth: state.firebase.auth,
//     //promociones: state.firestore.data.usuarioComercio
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     acturalizarPromocion: (
//       promocion,
//       dias,
//       efectivo,
//       desdeVigencia,
//       hastaVigencia
//     ) =>
//       dispatch(
//         actualizarPromocion(
//           promocion,
//           dias,
//           efectivo,
//           desdeVigencia,
//           hastaVigencia
//         )
//       ),
//     eliminarPromocion: (promocion) => dispatch(eliminarPromocion(promocion)),
//     cambiarVisibilidad: (promocion) => dispatch(cambiarVisibilidad(promocion)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MisPromociones);
/*
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [`usuarioComercio/${props.auth.uid}/promociones`])
)(MisPromociones);*/
