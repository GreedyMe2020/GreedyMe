import secondaryApp from "../../firebase/configSecondary";

export const crearPromocion = (
  promocion,
  id,
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
      .doc(id)
      .set({
        tipoPromo: promocion.tipoPromo,
        valuePromo: promocion.valuePromo,
        otraPromo: promocion.otraPromo,
        tipoProveedor: promocion.tipoProveedor,
        valueProveedor: promocion.valueProveedor,
        otroProveedor: promocion.otroProveedor,
        desdeVigencia: desdeVigencia,
        hastaVigencia: hastaVigencia,
        visible: false,
        descripcion: promocion.descripcion,
        photoURL: promocion.photoURL,
        diaAplicacion: dias,
        medioPago: value,
      })
      .then(() => {
        const bd = secondaryApp.firestore();
        bd.collection("promociones").doc(id).set({
          idComercio: promocion.id,
          tipoPromo: promocion.tipoPromo,
          valuePromo: promocion.valuePromo,
          otraPromo: promocion.otraPromo,
          tipoProveedor: promocion.tipoProveedor,
          valueProveedor: promocion.valueProveedor,
          otroProveedor: promocion.otroProveedor,
          desdeVigencia: desdeVigencia,
          hastaVigencia: hastaVigencia,
          visible: false,
          descripcion: promocion.descripcion,
          photoURL: promocion.photoURL,
          diaAplicacion: dias,
          medioPago: value,
        });
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
      .doc(promocion.idProm)
      .update({
        tipoPromo: promocion.tipoPromo,
        valuePromo: promocion.valuePromo,
        otraPromo: promocion.otraPromo,
        tipoProveedor: promocion.tipoProveedor,
        valueProveedor: promocion.valueProveedor,
        otroProveedor: promocion.otroProveedor,
        desdeVigencia: desdeVigencia,
        hastaVigencia: hastaVigencia,
        descripcion: promocion.descripcion,
        photoURL: promocion.photoURL,
        diaAplicacion: dias,
        medioPago: value,
      })
      .then(() => {
        const bd = secondaryApp.firestore();
        bd.collection("promociones").doc(promocion.idProm).update({
          tipoPromo: promocion.tipoPromo,
          valuePromo: promocion.valuePromo,
          otraPromo: promocion.otraPromo,
          tipoProveedor: promocion.tipoProveedor,
          valueProveedor: promocion.valueProveedor,
          otroProveedor: promocion.otroProveedor,
          desdeVigencia: desdeVigencia,
          hastaVigencia: hastaVigencia,
          descripcion: promocion.descripcion,
          photoURL: promocion.photoURL,
          diaAplicacion: dias,
          medioPago: value,
        });
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
        const bd = secondaryApp.firestore();
        bd.collection("promociones").doc(promocion.idProm).delete();
      })
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
        visible: promocion.visible,
      })
      .then(() => {
        const bd = secondaryApp.firestore();
        bd.collection("promociones").doc(promocion.idProm).update({
          visible: promocion.visible,
        });
      })
      .then(() => {
        dispatch({ type: "CAMBIAR_VISIBILIDAD" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_VISIBILIDAD", error });
      });
  };
};
