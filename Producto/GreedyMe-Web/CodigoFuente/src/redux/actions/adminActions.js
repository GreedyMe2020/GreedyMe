export const signUp = (nuevoUsuario) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        nuevoUsuario.email,
        nuevoUsuario.contraseña
      )
      .then((resp) => {
        return firestore.collection("usuarioComercio").doc(resp.user.uid).set({
          email: nuevoUsuario.email,
          CUIT: nuevoUsuario.CUIT,
          direccion: "",
          facebook: nuevoUsuario.facebook,
          instagram: nuevoUsuario.instagram,
          nombreComercio: nuevoUsuario.nombreComercio,
          rubro: nuevoUsuario.rubro,
          sucursal: nuevoUsuario.sucursal,
          telefono: nuevoUsuario.telefono,
          photoUrl: null,
          tipoSuscripcion: 0,
          web: nuevoUsuario.web,
          fechaCreacion: new Date(),
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

export const cargarDescuento = (descuento) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection("tipoPromocion")
      .doc("NjuUuaTR5sP6En3G5hSG")
      .set({
        lista: {},
      })
      .then(() => {
        dispatch({ type: "CARGAR_DESCUENTO" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_DESCUENTO", error });
      });
  };
};

export const cargarPromocion = (promocion) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection("tipoPromocion")
      .doc("NjuUuaTR5sP6En3G5hSG")
      .set({
        lista: {},
      })
      .then(() => {
        dispatch({ type: "CARGAR_DESCUENTO" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_DESCUENTO", error });
      });
  };
};
