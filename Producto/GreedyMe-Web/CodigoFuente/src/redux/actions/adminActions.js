import _ from 'lodash';
import secondaryApp from '../../firebase/configSecondary';
export const signUp = (nuevoUsuario) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection('usuarioComercio')
      .get()
      .then((usuarios) => {
        const todosUsuarios = usuarios.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const indice = _.findIndex(todosUsuarios, function (o) {
          return o.CUIT === nuevoUsuario.CUIT;
        });
        if (indice !== -1) {
          dispatch({ type: 'FALLO_CUIT' });
          throw 'error'
        }
      })
      .then(() => {
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
                contra: nuevoUsuario.contraseña,
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
                fechaVencimiento: new Date(),
                estadisticasFavoritos: [],
                cantidadNotificaciones: 4,
              });
            const bd = secondaryApp.firestore();
            bd.collection('usuarioComercio').doc(resp.user.uid).set({
              email: nuevoUsuario.email,
              CUIT: nuevoUsuario.CUIT,
              direccion: '',
              contra: nuevoUsuario.contraseña,
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
              fechaVencimiento: new Date(),
              estadisticasFavoritos: [],
              cantidadNotificaciones: 4,
            });
          })
          .then(() => {
            dispatch({ type: 'USUARIO_CREADO' });
          })
          .catch((error) => {
            dispatch({ type: 'FALLO_CREACION', error });
          });
      })
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
    const listaPromocion2 = [];
    formData.lista.map((item) => {
      if (
        item.valor.toLowerCase() !== 'otro' &&
        item.valor.toLowerCase() !== 'todas' &&
        item.valor.toLowerCase() !== 'todos' &&
        item.valor !== ''
      ) {
        listaPromocion2.push({ name: item.valor });
      }
    });
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('tipoPromocion')
      .doc(formData.id)
      .update({
        lista: formData.lista,
      })
    const bd = secondaryApp.firestore();
    bd.collection('tipoPromocion')
      .doc(formData.id)
      .update({
        lista: listaPromocion2
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
    //consigo todas las promociones existentes
    const promociones = getState().firestore.ordered.tipoPromocion;
    //
    const indice = _.findIndex(promociones, function (o) {
      return o.tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === formData.tipoPromocion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    });

    if (indice !== -1) {
      dispatch({ type: 'FALLO_NOMBRE_TIPO_PROMOCION' });
      throw 'error'
    }

    var caracteres =
      'abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789';
    var identificacion = '';
    for (var i = 0; i < 20; i++) {
      identificacion += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length),
      );
    }
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('tipoPromocion')
      .doc(identificacion)
      .set({
        tipo: formData.tipoPromocion,
        lista: [],
      })
    const bd = secondaryApp.firestore();
    bd
      .collection('tipoPromocion')
      .doc(identificacion)
      .set({
        name: formData.tipoPromocion,
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
    const bd = secondaryApp.firestore();
    bd
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

export const eliminarPromocion = (promocion, idPromocion) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const promociones = getState().firestore.ordered.tipoPromocion;

    const indiceACambiar = _.findIndex(promociones, function (o) {
      return o.id === idPromocion;
    });

    const id = promociones[indiceACambiar].id;

    const lista = promociones[indiceACambiar].lista;
    const listaPromocionEliminado = lista.filter((item) => item.valor != promocion);
    const listaPromocionEliminado2 = [];

    listaPromocionEliminado.map((item) => {
      if (
        item.valor.toLowerCase() !== 'otro' &&
        item.valor.toLowerCase() !== 'todas' &&
        item.valor.toLowerCase() !== 'todos' &&
        item.valor !== ''
      ) {
        listaPromocionEliminado2.push({ name: item.valor });
      }
    });

    const firestore = getFirestore();
    firestore.collection('tipoPromocion')
      .doc(id)
      .update({
        lista: listaPromocionEliminado,
      });
    const bd = secondaryApp.firestore();
    bd.collection('tipoPromocion')
      .doc(id)
      .update({ lista: listaPromocionEliminado2 })
      .then(() => {
        dispatch({ type: 'ELIMINAR_PROMOCION_ADM' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_ELIMINAR_PROMOCION', error });
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
    //consigo todos los proveedores existentes
    const proveedores = getState().firestore.ordered.proveedorServicio;
    //
    const indice = _.findIndex(proveedores, function (o) {
      if (o.tipo) {
        return o.tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === formData.tipoProveedor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }
    });
    if (indice !== -1) {
      dispatch({ type: 'FALLO_NOMBRE_TIPO_PROVEEDOR' });
      throw 'error'
    }
    if (formData.tipoProveedor === 'Bancos' || formData.tipoProveedor === 'bancos') {
      dispatch({ type: 'FALLO_NOMBRE_TIPO_PROVEEDOR' });
      throw 'error'
    }
    var caracteres =
      'abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789';
    var identificacion = '';
    for (var i = 0; i < 20; i++) {
      identificacion += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length),
      );
    }
    //codigo asincrono
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

export const eliminarProveedor = (proveedor, idProveedor) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const proveedores = getState().firestore.ordered
      .proveedorServicio;

    const indiceACambiar = _.findIndex(proveedores, function (o) {
      return o.id === idProveedor;
    });

    const id = proveedores[indiceACambiar].id;

    const lista = proveedores[indiceACambiar].lista;
    const listaProveedorEliminado = lista.filter((item) => item.nombre != proveedor);
    const listaProveedorEliminado2 = [];

    listaProveedorEliminado.map((item) => {
      if (
        item.nombre.toLowerCase() !== 'otro' &&
        item.nombre.toLowerCase() !== 'todas' &&
        item.nombre.toLowerCase() !== 'todos' &&
        item.nombre !== ''
      ) {
        listaProveedorEliminado2.push({ name: item.nombre });
      }
    });


    const firestore = getFirestore();
    firestore.collection('proveedorServicio').doc(id).update({
      lista: listaProveedorEliminado,
    });
    const bd = secondaryApp.firestore();
    bd.collection('proveedorServicio')
      .doc(id)
      .update({ lista: listaProveedorEliminado2 })
      .then(() => {
        dispatch({ type: 'ELIMINAR_PROVEEDOR' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_ELIMINAR_PROVEEDOR', error });
      });
  };
};

export const eliminarProveedorBanco = (banco) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const proveedores = getState().firestore.ordered.proveedorServicio;

    const indiceACambiar = _.findIndex(proveedores, function (o) {
      return o.id === 'ndbKpkm6GorM0g5kHNkF';
    });

    const lista = proveedores[indiceACambiar].bancos;

    const listaProveedorEliminado = lista.filter((item) => item.nombre != banco);

    const listaProveedorEliminado2 = [];
    listaProveedorEliminado.map((item) => {
      if (
        item.nombre.toLowerCase() !== 'otro' &&
        item.nombre.toLowerCase() !== 'todas' &&
        item.nombre.toLowerCase() !== 'todos'
      ) {
        listaProveedorEliminado2.push({ name: item.nombre });
      }
    });

    const firestore = getFirestore();
    firestore
      .collection('proveedorServicio')
      .doc('ndbKpkm6GorM0g5kHNkF')
      .update({
        bancos: listaProveedorEliminado,
      });
    const bd = secondaryApp.firestore();
    bd.collection('proveedorServicio')
      .doc('ndbKpkm6GorM0g5kHNkF')
      .update({ lista: listaProveedorEliminado2 })
      .then(() => {
        dispatch({ type: 'ELIMINAR_BANCO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_ELIMINAR_BANCO', error });
      });
  };
};

export const resetearValoresCreacionComercio = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: 'RESETEAR_VALORES_CREACION_COMERCIO' });
  };
};

export const resetearValoresTipoPromocion = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: 'RESETEAR_VALORES_TIPO_PROMOCION' });
  };
};

export const resetearValoresTipoProveedor = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: 'RESETEAR_VALORES_TIPO_PROVEEDOR' });
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

// -------------------------- CANJES

export const modificarCanje = (producto) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('productosCanjeadosGeneral')
      .doc(producto.id)
      .update({
        apellidoUsuario: producto.apellido,
        nombreUsuario: producto.nombre,
        estado: producto.estado,
        nombreProducto: producto.producto,
        fecha: new Date(),
      })
      /*.then(() => {
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio').doc(usuario.id).collection('productosCanjeados').doc(usuario.idDoc).delete();
      })*/
      .then(() => {
        dispatch({ type: 'CANJE_MODIFICADO' });
      })
      .catch((error) => {
        dispatch({ type: 'FALLO_MODIFICACION_CANJE', error });
      });
  };
};

export const eliminarCanje = (producto) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('productosCanjeadosGeneral')
      .doc(producto.id)
      .delete()
      /*.then(() => {
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio').doc(usuario.id).collection('productosCanjeados').doc(usuario.idDoc).delete();
      })*/
      .then(() => {
        dispatch({ type: 'CANJE_ELIMINADO' });
      })
      .catch((error) => {
        dispatch({ type: 'FALLO_ELIMINACION_CANJE', error });
      });
  };
};


