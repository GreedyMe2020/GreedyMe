import secondaryApp from '../../firebase/configSecondary';
export const editarDatos = (datos) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioComercio')
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
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio').doc(datos.id).update({
          web: datos.web,
          sucursal: datos.sucursal,
          rubro: datos.rubro,
          telefono: datos.telefono,
          instagram: datos.instagram,
          facebook: datos.facebook,
          direccion: datos.direccion,
        });
      })
      .then(() => {
        dispatch({ type: 'EDITAR_DATOS' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_DATOS', error });
      });
  };
};

export const subirFoto = (downloadURL) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('usuarioComercio')
      .doc(downloadURL.id)
      .update({
        photoURL: downloadURL.url,
      })
      .then(() => {
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio').doc(downloadURL.id).update({
          photoURL: downloadURL.url,
        });
      })
      .then(() => {
        dispatch({ type: 'SUBIR_FOTO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_FOTO', error });
      });
  };
};

export const eliminarFoto = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('usuarioComercio')
      .doc(id.id)
      .update({
        photoURL: null,
      })
      .then(() => {
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio').doc(id.id).update({
          photoURL: null,
        });
      })
      .then(() => {
        dispatch({ type: 'ELIMINAR_FOTO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_ELIMINAR', error });
      });
  };
};

export const editarSuscripcion = (datos) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioComercio')
      .doc(datos.id)
      .update({
        web: datos.web,
        sucursal: datos.sucursal,
        rubro: datos.rubro,
        telefono: datos.telefono,
        instagram: datos.instagram,
        facebook: datos.facebook,
        direccion: datos.direccion,
        tipoSuscripcion: datos.tipoSuscripcion,
      })
      .then(() => {
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio').doc(datos.id).update({
          web: datos.web,
          sucursal: datos.sucursal,
          rubro: datos.rubro,
          telefono: datos.telefono,
          instagram: datos.instagram,
          facebook: datos.facebook,
          direccion: datos.direccion,
          tipoSuscripcion: datos.tipoSuscripcion,
        });
      })
      .then(() => {
        dispatch({ type: 'EDITAR_SUSCRIPCION' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_SUSCRIPCION', error });
      });
  };
};

export const cambiarContraseña = (formData) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    //codigo asincrono
    const firebase = getFirebase();
    var user = firebase.auth().currentUser;
    if (user) {
      var credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        formData.contraseñaActual,
      );
      user
        .reauthenticateWithCredential(credentials)
        .then(() => {
          user.updatePassword(formData.nuevaContraseña);
        })
        .then(() => {
          dispatch({ type: 'CAMBIO_PASSWORD' });
        })
        .catch((error) => {
          dispatch({ type: 'ERROR_PASSWORD', error });
        });
    }
  };
};

export const resetearValoresCambiarContraseña = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: 'RESETEAR_VALORES_CAMBIAR_PASSWORD' });
  };
};

export const enviarConsulta = (datos) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('consulta')
      .doc()
      .set({
        nombreComercio: datos.nombreComercio,
        email: datos.email,
        consulta: datos.consulta,
      })
      .then(() => {
        dispatch({ type: 'ENVIAR_CONSULTA' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_CONSULTA', error });
      });
  };
};

export const generarCodigo = (codigo, idCupon, id, detalle) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('codigoCupon')
      .doc()
      .set({
        codigo: codigo,
        idCupon: idCupon,
        fechaCreacion: new Date(),
        validado: false,
      })
      .then(() => {
        dispatch({ type: 'GUARDAR_CODIGO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_CODIGO', error });
      });

    firestore
      .collection('usuarioComercio')
      .doc(id)
      .collection('codigoCupon')
      .doc()
      .set({
        codigo: codigo,
        idCupon: idCupon,
        fechaCreacion: new Date(),
        detalle: detalle,
      })
      .then(() => {
        dispatch({ type: 'GUARDAR_CODIGO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_CODIGO', error });
      });
  };
};
