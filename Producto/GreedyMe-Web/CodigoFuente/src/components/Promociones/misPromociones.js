import React, { useState } from "react";
import { connect } from "react-redux";
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

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

function MisPromociones(props) {
  const classes = useStyles();
  return (
    <div>
      <div className="prom-title-container">
        <h1>Mis promociones</h1>
      </div>
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <List>
                  {generate(
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          variant="square"
                          src={require("../../../Multimedia/Sistema-svg/credit-card.svg")} //aca enrealidad tengo que variar el icono segun el tipo de promocion que sea
                        ></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Aca iria todo el texto traido del otro lado"
                        //secondary={secondary ? "Secondary text" : null}
                      />
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
                  )}
                </List>
              </div>
            </Grid>
            {/* <img
              width="40px"
              height="40px"
              src={require("../../../Multimedia/Sistema-svg/credit-card.svg")}
            />
            <p></p>
            <Divider />
            <img
              width="40px"
              height="40px"
              src={require("../../../Multimedia/Sistema-svg/store.svg")}
            />
            <p></p>
            <Divider />
            <img
              width="40px"
              height="40px"
              src={require("../../../Multimedia/Sistema-svg/percentage (1).svg")}
            />
            <p></p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
{
  /* 
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
              } */
}
export default MisPromociones;
