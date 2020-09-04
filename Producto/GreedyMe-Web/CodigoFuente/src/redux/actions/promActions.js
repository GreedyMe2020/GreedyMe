export const crearPromocion = (
  promocion,
  dias,
  value,
  desdeVigencia,
  hastaVigencia
) => {
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
        desdeVigencia: desdeVigencia,
        hastaVigencia: hastaVigencia,
        visible: false,
        descripcion: promocion.descripcion,
        diaAplicacion: dias,
        medioPago: value,
      })
      .then(() => {
        dispatch({ type: "CREAR_PROMOCION" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_PROMOCION", error });
      });
  };
};

export const actualizarPromocion = (
  promocion,
  dias,
  efectivo,
  desdeVigencia,
  hastaVigencia
) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("usuarioComercio")
      .doc(promocion.id)
      .collection("promociones")
      .doc()
      .update({
        tipoPromo: promocion.tipoPromo,
        proveedor: promocion.proveedor,
        desdeVigencia: desdeVigencia,
        hastaVigencia: hastaVigencia,
        descripcion: promocion.descripcion,
        diaAplicacion: dias,
        efectivo: efectivo.efectivo,
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

export const cambiarVisibilidad = (promocion) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("usuarioComercio")
      .doc(promocion.id)
      .collection("promociones")
      .doc(promocion.idProm)
      .update({
        visible: !promocion.visible,
      })
      .then(() => {
        dispatch({ type: "CAMBIAR_VISIBILIDAD" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_VISIBILIDAD", error });
      });
  };
};
