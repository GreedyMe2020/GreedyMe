export const crearPromocion = (promocion) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("usuarioComercio")
      .doc(promocion.id)
      .collection("promociones")
      .doc()
      .set({
        tipoPromo: promocion.tipoPromo,
        proveedor: promocion.proveedor,
        diaVigencia: promocion.diaVigencia,
        mesVigencia: promocion.mesVigencia,
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

export const eliminarPromocion = (promocion) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("usuarioComercio")
      .doc(promocion.id)
      .collection("promociones")
      .doc(promocion.idProm)
      .delete()
      .then(() => {
        dispatch({ type: "ELIMINAR_PROMOCION" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_ELIMINACION", error });
      });
  };
};
