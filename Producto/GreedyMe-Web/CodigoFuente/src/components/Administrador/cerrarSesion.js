import React from "react";
import ExitToAppRounded from "@material-ui/icons/ExitToAppRounded";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginRight: "0.3rem",
  },
  logout: {
    width: "30px",
    height: "30px",
  },
}));

function CerrarSesion(props) {
  const classes = useStyles();

  const handleCloseSesion = () => {
    props.signOut();
  };

  return (
    <div className={classes.root}>
      <Tooltip title="Cerrar sesión" arrow>
        <IconButton onClick={handleCloseSesion} color="inherit">
          <ExitToAppRounded className={classes.logout} />
        </IconButton>
      </Tooltip>
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
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CerrarSesion);
