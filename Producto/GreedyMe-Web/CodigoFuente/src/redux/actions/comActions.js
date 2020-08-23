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
