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
