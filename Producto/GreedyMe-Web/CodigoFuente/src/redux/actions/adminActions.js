import _ from 'lodash';
import secondaryApp from '../../firebase/configSecondary';
export const signUp = (nuevoUsuario) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        nuevoUsuario.email,
        nuevoUsuario.contraseña,
      )
      .then((resp) => {
        firestore
          .collection('usuarioComercio')
          .doc(resp.user.uid)
          .set({
            email: nuevoUsuario.email,
            CUIT: nuevoUsuario.CUIT,
            direccion: '',
            facebook: nuevoUsuario.facebook,
            instagram: nuevoUsuario.instagram,
            nombreComercio: nuevoUsuario.nombreComercio,
            rubro: nuevoUsuario.rubro,
            sucursal: nuevoUsuario.sucursal,
            telefono: nuevoUsuario.telefono,
            photoURL: null,
            tipoSuscripcion: 0,
            web: nuevoUsuario.web,
            fechaCreacion: new Date(),
            contadorPreguntas: 0,
            sumadorPreguntas: 0,
            tokensFavoritos: [],
          });
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio').doc(resp.user.uid).set({
          email: nuevoUsuario.email,
          CUIT: nuevoUsuario.CUIT,
          direccion: '',
          facebook: nuevoUsuario.facebook,
          instagram: nuevoUsuario.instagram,
          nombreComercio: nuevoUsuario.nombreComercio,
          rubro: nuevoUsuario.rubro,
          sucursal: nuevoUsuario.sucursal,
          telefono: nuevoUsuario.telefono,
          photoURL: null,
          tipoSuscripcion: 0,
          web: nuevoUsuario.web,
          fechaCreacion: new Date(),
          contadorPreguntas: 0,
          sumadorPreguntas: 0,
          tokensFavoritos: []
        });
      })
      .then(() => {
        dispatch({ type: 'USUARIO_CREADO' });
      })
      .catch((error) => {
        dispatch({ type: 'FALLO_CREACION', error });
      });
  };
};

export const modificarUsuarioComercio = (usuario) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('usuarioComercio')
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
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio').doc(usuario.id).update({
          email: usuario.email,
          CUIT: usuario.CUIT,
          facebook: usuario.facebook,
          instagram: usuario.instagram,
          nombreComercio: usuario.nombreComercio,
          rubro: usuario.rubro,
          sucursal: usuario.sucursal,
          telefono: usuario.telefono,
          web: usuario.web,
        });
      })
      .then(() => {
        dispatch({ type: 'USUARIO_MODIFICADO' });
      })
      .catch((error) => {
        dispatch({ type: 'FALLO_MODIFICACION', error });
      });
  };
};

export const eliminarUsuarioComercio = (usuario) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('usuarioComercio')
      .doc(usuario.id)
      .delete()
      .then(() => {
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio').doc(usuario.id).delete();
      })
      .then(() => {
        dispatch({ type: 'USUARIO_ELIMINADO' });
      })
      .catch((error) => {
        dispatch({ type: 'FALLO_ELIMINACION', error });
      });
  };
};

export const cargarPromocion = (formData) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('tipoPromocion')
      .doc(formData.id)
      .update({
        lista: formData.lista,
      })
      .then(() => {
        dispatch({ type: 'CARGAR_PROMOCION' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_PROMOCION', error });
      });
  };
};
export const cargarTipoPromocion = (formData) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('tipoPromocion')
      .doc()
      .set({
        tipo: formData.tipoPromocion,
        lista: [],
      })
      .then(() => {
        dispatch({ type: 'CARGAR_TIPO_PROMOCION' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_TIPO_PROMOCION', error });
      });
  };
};

export const eliminarTipoPromocion = (formData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('tipoPromocion')
      .doc(formData.id)
      .delete()
      .then(() => {
        dispatch({ type: 'TIPO_PROMOCION_ELIMINADO' });
      })
      .catch((error) => {
        dispatch({ type: 'FALLO_ELIMINACION_TIPO_PROMOCION', error });
      });
  };
};

export const cargarProveedor = (formData) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const proveedores = getState().firestore.ordered
      .proveedorServicio;

    const indiceACambiar = _.findIndex(proveedores, function (o) {
      return o.tipo === formData.tipoProveedor;
    });

    const id = proveedores[indiceACambiar].id;

    const lista = proveedores[indiceACambiar].lista;
    const listaLimpia = [];
    lista.map((item) => {
      if (item.nombre.toLowerCase() !== '') {
        listaLimpia.push({
          nombre: item.nombre,
          photoURL: item.photoURL,
        });
      }
    });

    const lista2 = [];
    lista.map((item) => {
      if (
        item.nombre.toLowerCase() !== 'otro' &&
        item.nombre.toLowerCase() !== 'todas' &&
        item.nombre.toLowerCase() !== 'todos' &&
        item.nombre !== ''
      ) {
        lista2.push({ name: item.nombre });
      }
    });

    const listaNueva = _.concat(listaLimpia, {
      nombre: formData.valueProveedor,
      photoURL: formData.downloadURL,
    });

    const listaNueva2 = _.concat(lista2, {
      name: formData.valueProveedor,
    });

    const firestore = getFirestore();
    firestore.collection('proveedorServicio').doc(id).update({
      lista: listaNueva,
    });
    const bd = secondaryApp.firestore();
    bd.collection('proveedorServicio')
      .doc(id)
      .update({ lista: listaNueva2 })
      .then(() => {
        dispatch({ type: 'CARGAR_PROVEEDOR' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_PROVEEDOR', error });
      });
  };
};

export const cargarBanco = (formData) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const proveedores = getState().firestore.ordered
      .proveedorServicio;
    const indiceACambiar = _.findIndex(proveedores, function (o) {
      return o.id === 'ndbKpkm6GorM0g5kHNkF';
    });

    const lista = proveedores[indiceACambiar].bancos;

    const listaNueva = _.concat(lista, {
      nombre: formData.valueProveedor,
      photoURL: null,
    });

    const lista2 = [];
    lista.map((item) => {
      if (
        item.nombre.toLowerCase() !== 'otro' &&
        item.nombre.toLowerCase() !== 'todas' &&
        item.nombre.toLowerCase() !== 'todos'
      ) {
        lista2.push({ name: item.nombre });
      }
    });
    const listaNueva2 = _.concat(lista2, {
      name: formData.valueProveedor,
    });
    console.log(listaNueva2);

    const firestore = getFirestore();
    firestore
      .collection('proveedorServicio')
      .doc(formData.id)
      .update({
        bancos: listaNueva,
      });
    const bd = secondaryApp.firestore();
    bd.collection('proveedorServicio')
      .doc(formData.id)
      .update({ lista: listaNueva2 })
      .then(() => {
        dispatch({ type: 'CARGAR_BANCO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_BANCO', error });
      });
  };
};

export const cargarTipoProveedor = (formData) => {
  return (dispatch, getState, { getFirestore }) => {
    var caracteres =
      'abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789';
    var identificacion = '';
    for (var i = 0; i < 20; i++) {
      identificacion += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length),
      );
    }
    //codigo asincrono
    console.log(identificacion);
    const firestore = getFirestore();
    firestore
      .collection('proveedorServicio')
      .doc(identificacion)
      .set({
        tipo: formData.tipoProveedor,
        lista: [{ nombre: '', photoURL: '' }],
      });
    const bd = secondaryApp.firestore();
    bd.collection('proveedorServicio')
      .doc(identificacion)
      .set({
        name: formData.tipoProveedor,
        lista: [{ name: '' }],
      })
      .then(() => {
        dispatch({ type: 'CARGAR_TIPO_PROVEEDOR' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_TIPO_PROVEEDOR', error });
      });
  };
};

export const eliminarTipoProveedor = (formData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('proveedorServicio')
      .doc(formData.id)
      .delete();
    const bd = secondaryApp.firestore();
    bd.collection('proveedorServicio')
      .doc(formData.id)
      .delete()
      .then(() => {
        dispatch({ type: 'TIPO_PROVEEDOR_ELIMINADO' });
      })
      .catch((error) => {
        dispatch({ type: 'FALLO_ELIMINACION_TIPO_PROVEEDOR', error });
      });
  };
};

export const resetearValoresCreacionComercio = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: 'RESETEAR_VALORES_CREACION_COMERCIO' });
  };
};

//ACÁ EMPIEZAN LOS PREMIOS ----------------------------------------------------------------

export const cargarPremio = (datos) => {
  return (dispatch, getState, { getFirestore }) => {
    var caracteres =
      'abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789';
    var identificacion = '';
    for (var i = 0; i < 20; i++) {
      identificacion += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length),
      );
    }
    const firestore = getFirestore();
    firestore.collection('greedyPremio').doc(identificacion).set({
      nombre: datos.nombre,
      greedyPoints: datos.greedypoints,
      descripcion: datos.descripcion,
      photoURL: datos.photoURL,
    });
    const bd = secondaryApp.firestore();
    bd.collection('greedyPremio')
      .doc(identificacion)
      .set({
        nombre: datos.nombre,
        greedyPoints: datos.greedypoints,
        descripcion: datos.descripcion,
        photoURL: datos.photoURL,
      })
      .then(() => {
        dispatch({ type: 'CARGAR_PREMIO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_PREMIO', error });
      });
  };
};

export const eliminarPremio = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('greedyPremio').doc(id).delete();
    const bd = secondaryApp.firestore();
    bd.collection('greedyPremio')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'PREMIO_ELIMINADO' });
      })
      .catch((error) => {
        dispatch({ type: 'FALLO_ELIMINACION_PREMIO', error });
      });
  };
};

export const modificarPremio = (id, formData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('greedyPremio').doc(id).update({
      nombre: formData.nombre,
      greedyPoints: formData.greedypoints,
      descripcion: formData.descripcion,
      photoURL: formData.photoURL,
    });
    const bd = secondaryApp.firestore();
    bd.collection('greedyPremio')
      .doc(id)
      .update({
        nombre: formData.nombre,
        greedyPoints: formData.greedypoints,
        descripcion: formData.descripcion,
        photoURL: formData.photoURL,
      })
      .then(() => {
        dispatch({ type: 'PREMIO_MODIFICADO' });
      })
      .catch((error) => {
        dispatch({ type: 'FALLO_MODIFICACION_PREMIO', error });
      });
  };
};

// PUNTOS DE RETIRO

export const cargarPuntoRetiro = (datos) => {
  return (dispatch, getState, { getFirestore }) => {
    var caracteres =
      'abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789';
    var identificacion = '';
    for (var i = 0; i < 20; i++) {
      identificacion += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length),
      );
    }
    const firestore = getFirestore();
    firestore.collection('puntoRetiro').doc(identificacion).set({
      direccion: datos.direccion,
      localidad: datos.localidad,
      provincia: datos.provincia,
      pais: datos.pais,
    });
    const bd = secondaryApp.firestore();
    bd.collection('puntoRetiro')
      .doc(identificacion)
      .set({
        direccion: datos.direccion,
        localidad: datos.localidad,
        provincia: datos.provincia,
        pais: datos.pais,
      })
      .then(() => {
        dispatch({ type: 'CARGAR_PUNTO_RETIRO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_PUNTO_RETIRO', error });
      });
  };
};

export const eliminarPuntoRetiro = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('puntoRetiro').doc(id).delete();
    const bd = secondaryApp.firestore();
    bd.collection('puntoRetiro')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'PUNTO_RETIRO_ELIMINADO' });
      })
      .catch((error) => {
        dispatch({ type: 'FALLO_ELIMINACION_PUNTO_RETIRO', error });
      });
  };
};
