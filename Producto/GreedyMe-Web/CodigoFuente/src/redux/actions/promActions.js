export const crearPromocion = (promocion) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("usuarioComercio")
      .doc(promocion.id)
      .collection("promociones")
      .doc()
      .set({
        tipoPromocion: promocion.tipoPromocion,
      })
      .then(() => {
        dispatch({ type: "CREAR_PROMOCION" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_PROMOCION", error });
      });
  };
};

export const actulizarPromocion = (promocion) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("usuarioComercio")
      .doc(promocion.id)
      .collection("promociones")
      .doc()
      .update({
        tipoPromocion: promocion.tipoPromocion,
      })
      .then(() => {
        dispatch({ type: "ACTUALIZAR_PROMOCION", promocion });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_ACTUALIZACION", error });
      });
  };
};
