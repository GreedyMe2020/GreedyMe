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

export const modificarUsuarioComercio = (usuario) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("usuarioComercio")
      .doc(usuario.id)
      .update({
        email: usuario.email,
        CUIT: usuario.CUIT,
        facebook: usuario.facebook,
        instagram: usuario.instagram,
        nombreComercio: usuario.nombreComercio,
        rubro: usuario.rubro,
        sucursal: usuario.sucursal,
        telefono: usuario.telefono,
        web: usuario.web,
      })
      .then(() => {
        dispatch({ type: "USUARIO_MODIFICADO" });
      })
      .catch((error) => {
        dispatch({ type: "FALLO_MODIFICACION", error });
      });
  };
};

export const eliminarUsuarioComercio = (usuario) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("usuarioComercio")
      .doc(usuario.id)
      .delete()
      .then(() => {
        dispatch({ type: "USUARIO_ELIMINADO" });
      })
      .catch((error) => {
        dispatch({ type: "FALLO_ELIMINACION", error });
      });
  };
};
export const cargarTipoPromocion = (formData) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection("tipoPromocion")
      .doc()
      .set({
        tipo: formData.tipoPromocion,
        lista: [],
      })
      .then(() => {
        dispatch({ type: "CARGAR_TIPO_PROMOCION" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_TIPO_PROMOCION", error });
      });
  };
};

export const eliminarTipoPromocion = (formData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("tipoPromocion")
      .doc(formData.id)
      .delete()
      .then(() => {
        dispatch({ type: "TIPO_PROMOCION_ELIMINADO" });
      })
      .catch((error) => {
        dispatch({ type: "FALLO_ELIMINACION_TIPO_PROMOCION", error });
      });
  };
};

export const cargarTipoProveedor = (formData) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection("proveedorServicio")
      .doc()
      .set({
        tipo: formData.tipoProveedor,
        lista: [{ nombre: "", photoURL: "" }],
      })
      .then(() => {
        dispatch({ type: "CARGAR_TIPO_PROVEEDOR" });
      })
      .catch((error) => {
        dispatch({ type: "ERROR_TIPO_PROVEEDOR", error });
      });
  };
};

export const eliminarTipoProveedor = (formData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("proveedorServicio")
      .doc(formData.id)
      .delete()
      .then(() => {
        dispatch({ type: "TIPO_PROVEEDOR_ELIMINADO" });
      })
      .catch((error) => {
        dispatch({ type: "FALLO_ELIMINACION_TIPO_PROVEEDOR", error });
      });
  };
};
