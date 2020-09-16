export const signIn = (usuario) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    if (usuario.email === "admin") {
      usuario.email = "greedyme.contacto@gmail.com";
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(usuario.email, usuario.password)
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


