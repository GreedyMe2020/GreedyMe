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
        redesSociales: datos.redesSociales,
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
