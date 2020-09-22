import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Avatar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import FormTipoPromocion from "./FormTipoPromocion";
import FormPromocion from "./FormPromocion";
import ModalAdministradorPr from "../modal-admin-pr";

//esta es la funcion que trae los datos, tipo crea un array trae todos las promociones
//y la va acumulando en el array

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

function ListaPromocion(props) {
  const classes = useStyles();

  //const { tipoPromo } = props;
  //Estado del dialog (abierto/cerrado)
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    tipoPromo: "",
    valuePromo: "",
    otraPromo: "",
    tipoProveedor: "",
    valueProveedor: "",
    otroProveedor: "",
    descripcion: "",
    photoURL: "",
  });
  const [valorPromo, setValorPromo] = React.useState([]);

  useEffect(() => {
    setValorPromo([]);
    setFormData({
      ...formData,
      valuePromo: "",
      otraPromo: "",
    });
    //esto no corre en el primer render, se ejecuta luego del return
    if (formData.tipoPromo === "Descuento") {
      setValorPromo(props.tipoPromo[0].lista);
    } else if (formData.tipoPromo === "Promoción") {
      setValorPromo(props.tipoPromo[1].lista);
    }
  }, [formData.tipoPromo, setFormData]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleMouseDownPromo = (event) => {
    event.preventDefault();
  };

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleSubmit = () => {
    console.log("perrekeeeeeeeeee");
  };
  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    if (event.target.name === "valueProveedor") {
      valorProveedor.map((option) => {
        if (option.nombre === event.target.value) {
          formData.photoURL = option.photoURL;
        }
      });
      /*valorBanco.map((option) => {
        if (option.nombre === event.target.value) {
          formData.photoURL = option.photoURL;
        }
      });*/
    }
    setFormData({ ...formData });
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const form = React.createRef();
  return (
    <div>
      <ModalAdministradorPr
        title="Promociones"
        button="Cargar promoción"
        button2="Cargar tipo promoción"
        titleModal="Cargar nueva promoción"
        titleModal2="Cargar nuevo tipo de promoción"
        openContent={<FormPromocion />}
        openContent2={<FormTipoPromocion />}
        placeholder="Buscar promoción…"
      />
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <List>
                  {props.tipoPromo &&
                    props.tipoPromo.map((item) => {
                      return (
                        <ListItem key={item.id}>
                          <ListItemAvatar>
                            <Avatar
                              variant="square"
                              src={require("../../../../Multimedia/Sistema-svg/credit-card.svg")}
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
                                <React.Fragment>
                                  <Typography className={classes.inline}>
                                    {item.tipo}
                                  </Typography>
                                  {item.lista.map((ite) => {
                                    return ite.valor;
                                  })}
                                </React.Fragment>
                              }
                            />
                          </div>
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
)(ListaPromocion);
