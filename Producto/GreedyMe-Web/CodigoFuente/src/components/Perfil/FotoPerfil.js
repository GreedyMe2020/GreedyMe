import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { subirFoto } from "../../redux/actions/comActions";

function FotoPerfil(props) {
  const handleUpload = (event) => {
    const file = event.target.files[0];
    props.subirFoto(file);
  };

  return (
    <div>
      <img
        src={props.picture}
        style={{ height: 200 + "px" }}
        alt="imagen usuario"
      ></img>
      <input type="file" onChange={handleUpload}></input>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    subirFoto: (file) => dispatch(subirFoto(file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FotoPerfil);
