export const editarDatos = (datos) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection("usuarioComercio")
      .doc(datos.id)
      .update({
        web: datos.web,
        sucursal: datos.sucursal,
        rubro: datos.rubro,
        telefono: datos.telefono,
        instagram: datos.instagram,
        facebook: datos.facebook,
        direccion: datos.direccion,
      })
      .then(() => {
        dispatch({ type: "EDITAR_DATOS" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_DATOS", error });
      });
  };
};

export const subirFoto = (downloadURL) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("usuarioComercio")
      .doc(downloadURL.id)
      .update({
        photoURL: downloadURL.url,
      })
      .then(() => {
        dispatch({ type: "SUBIR_FOTO" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_FOTO", error });
      });
  };
};

export const eliminarFoto = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("usuarioComercio")
      .doc(id.id)
      .update({
        photoURL: null,
      })
      .then(() => {
        dispatch({ type: "ELIMINAR_FOTO" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_ELIMINAR", error });
      });
  };
};

export const cambiarContraseña = (nuevaContraseña) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        user
          .updatePassword(nuevaContraseña.nuevaContraseña)
          .then(function () {
            dispatch({ type: "CAMBIO_CONTRASEÑA" });
          })
          .catch(function (error) {
            dispatch({ type: "ERROR_CONTRASEÑA", error });
          });
      } else {
        // No user is signed in.
      }
    });
  };
};
