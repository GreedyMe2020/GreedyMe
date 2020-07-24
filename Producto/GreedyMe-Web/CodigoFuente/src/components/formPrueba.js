import React from "react";
import { Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function FormLanding() {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <Row>
          <Col md="6">
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              variant="outlined"
            />
          </Col>
          <Col md="6">
            <TextField
              disabled
              id="outlined-disabled"
              label="Disabled"
              defaultValue="Hello World"
              variant="outlined"
            />
          </Col>
        </Row>
      </div>
    </form>
  );
}
