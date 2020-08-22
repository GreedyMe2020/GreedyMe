export const signIn = (usuario) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(usuario.email, usuario.contraseña)
      .then(() => {
        dispatch({ type: "INICIO_CORRECTO" });
      })
      .catch((error) => {
        dispatch({ type: "INICIO_FALLIDO", error });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SESION_CERRADA" });
      });
  };
};

export const forgotPass = (usuario) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(usuario.email)
      .then(() => {
        dispatch({ type: "CONTRASEÑA_REESTABLECIDA" });
      })
      .catch((error) => {
        dispatch({ type: "EMAIL_INVALIDO", error });
      });
  };
};

export const signUp = (nuevoUsuario) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth
      .createUserWithEmailAndPassword(nuevoUsuario.email, nuevoUsuario.password)
      .then((resp) => {
        return firestore.collection("usuarioComercio").doc(resp.user.uid).set({
          //datos adentro de la base de datos
        });
      })
      .then(() => {
        dispatch({ type: "USUARIO_CREADO" });
      })
      .catch((error) => {
        dispatch({ type: "FALLO_CREACION", error });
      });
  };
};
