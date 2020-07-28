import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#262262"),
    backgroundColor: "#262262",
    width: "170px",
    height: "50px",
    borderRadius: "50px",
    "&:hover": {
      backgroundColor: "#1e1b4d",
      color: "#FFFFFF",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  //const [email, setEmail] = React.useState();
  //const [password, setPassword] = React.useState();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [submitted, setSubmitted] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  /*   const handleChangeEmail = () => {
    const email = event.value;
    setEmail({ email });
  };

  const handleChangePass = () => {
    const password = event.value;
    setPassword({ password });
  }; */

  // const handleChange = (event) => {
  //   const evento = event.target.value;
  //   if (event.target.name === "email") {
  //     setEmail({ evento });
  //   }
  //   if (event.target.name === "password") {
  //     setPassword({ evento });
  //   }
  // };

  const handleSubmit = () => {
    setSubmitted({ submitted: true }, () => {
      setTimeout(() => setSubmitted({ submitted: false }), 5000);
    });
  };

  const form = React.createRef();

  return (
    <div>
      <div id="botonRegistarse">
        <ColorButton
          variant="contained"
          color="primary"
          className={classes.margin}
          onClick={handleClickOpen}
        >
          Registralo acá
        </ColorButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Suscribirse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <ValidatorForm
            className={classes.root}
            ref={form}
            onSubmit={handleSubmit}
          >
            <TextValidator
              label="Email"
              onChange={handleChange}
              name="email"
              value={formData.email}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
            <br />
            <TextValidator
              label="Password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={submitted}
            >
              {(submitted && "Your form is submitted!") ||
                (!submitted && "Submit")}
            </Button>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
/* 
export function MyModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Formulario de registro
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <FormLanding />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

 */
