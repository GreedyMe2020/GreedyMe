import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { subirFoto } from "../../redux/actions/comActions";

function FotoPerfil(props) {
  const [picture, setPicture] = useState(props.auth.photoURL);

  useEffect(() => {
    console.log("cambie la foto bro");
  }, [picture]);

  const handleUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    props.subirFoto(file).then(() => {
      setPicture(props.auth.photoURL);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleUpload}></input>
      <img
        src={picture}
        style={{ height: 30 + "px" }}
        alt="imagen usuario"
      ></img>
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
