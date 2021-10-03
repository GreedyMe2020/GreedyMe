const initState = {
  usuarioCreado: null,
  usuarioFalla: null,
  usuarioCuitFalla: null,
  usuarioModificado: null,
  errorModificacion: null,
  usuarioEliminado: null,
  errorEliminacion: null,
  tipoPromo: null,
  tipoPromoFalla: null,
  promo: null,
  promoFalla: null,
  tipoPromoEliminada: null,
  tipoPromoEliminacionFalla: null,
  tipoProveedor: null,
  tipoProveedorFalla: null,
  tipoProveedorEliminada: null,
  tipoProveedorEliminacionFalla: null,
  proveedor: null,
  proveedorFalla: null,
  premio: null,
  premioEliminado: null,
  premioFalla: null,
  premioModificado: null,
  errorModificacionPremio: null,
  puntoRetiro: null,
  puntoRetiroEliminado: null,
  puntoRetiroFalla: null,
  canjeEliminado: null,
  canjeModificado: null,
  canjeFalla: null,
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case 'USUARIO_CREADO':
      console.log('se creo');
      return {
        ...state,
        usuarioCreado: 'Se creo un nuevo usuario',
        usuarioFalla: null,
        usuarioCuitFalla: null,
      };
    case 'FALLO_CREACION':
      console.log('fallo');
      return {
        ...state,
        usuarioFalla: 'fallo la creacion de usuario',
        usuarioCreado: null,
        usuarioCuitFalla: null,
      };
    case 'FALLO_CUIT':
      console.log('fallo');
      return {
        ...state,
        usuarioCuitFalla: 'fallo la creacion de usuario por cuit',
        usuarioCreado: null,
        usuarioFalla: null,
      };
    case 'USUARIO_MODIFICADO':
      console.log('se modifico');
      return {
        ...state,
        usuarioModificado: 'Se modifico el usuario usuario',
      };
    case 'FALLO_MODIFICACION':
      console.log('fallo la modificacion');
      return {
        ...state,
        errorModificacion: 'fallo la modificacion de usuario',
      };
    case 'USUARIO_ELIMINADO':
      console.log('se elimino el usuario');
      return {
        ...state,
        usuarioEliminado: 'se elimino el usuario',
      };
    case 'FALLO_ELIMINACION':
      console.log('fallo la eliminacion');
      return {
        ...state,
        errorEliminacion: 'La eliminacion del usuario ha fallado',
      };
    case 'CARGAR_TIPO_PROMOCION':
      console.log('se creo el nuevo tipo');
      return {
        ...state,
        tipoPromo: 'Se creo un nuevo tipo promo ',
      };
    case 'ERROR_TIPO_PROMOCION':
      console.log('fallo el nuevo tipo');
      return {
        ...state,
        tipoPromoFalla: 'fallo la nueva tipo promo',
      };
    case 'CARGAR_PROMOCION':
      console.log('se creo nueva promocion');
      return {
        ...state,
        promo: 'Se creo una nueva promo ',
      };
    case 'ERROR_PROMOCION':
      console.log('fallo el nuevo promo');
      return {
        ...state,
        promoFalla: 'fallo la nueva promo',
      };
    case 'TIPO_PROMOCION_ELIMINADO':
      console.log('se elimino el tipo promo');
      return {
        ...state,
        tipoPromoEliminada: 'Se elimino la promo ',
      };
    case 'FALLO_ELIMINACION_TIPO_PROMOCION':
      console.log('fallo la eliminacion tipo promo');
      return {
        ...state,
        tipoPromoEliminacionFalla: 'fallo la eliminacion promo',
      };
    case 'CARGAR_TIPO_PROVEEDOR':
      console.log('se creo el nuevo tipo proveedor');
      return {
        ...state,
        tipoProveedor: 'Se creo una nueva promo ',
      };
    case 'ERROR_TIPO_PROVEEDOR':
      console.log('fallo el nuevo tipo proveedor');
      return {
        ...state,
        tipoProveedorFalla: 'fallo la nueva promo',
      };
    case 'TIPO_PROVEEDOR_ELIMINADO':
      console.log('se elimino el tipo proveedor');
      return {
        ...state,
        tipoProveedorEliminada: 'Se elimino la proveedor ',
      };
    case 'FALLO_ELIMINACION_TIPO_PROVEEDOR':
      console.log('fallo la eliminacion tipo proveedor');
      return {
        ...state,
        tipoProveedorEliminacionFalla:
          'fallo la eliminacion proveedor',
      };
    case 'CARGAR_PROVEEDOR':
      console.log('se creo nueva PROVEEDOR');
      return {
        ...state,
        proveedor: 'Se creo una nueva proveedor ',
      };
    case 'ERROR_PROVEEDOR':
      console.log('fallo el nuevo proveedor');
      return {
        ...state,
        proveedorFalla: 'fallo la nueva proveedor',
      };
    case 'RESETEAR_VALORES_CREACION_COMERCIO':
      console.log('se resetearon');
      return {
        ...state,
        usuarioCreado: null,
        usuarioFalla: null,
        usuarioCuitFalla: null,
      };
    //PREMIOS
    case 'CARGAR_PREMIO':
      console.log('se creo nuevo GREEDYPREMIO');
      return {
        ...state,
        premio: 'Se creo una nuevo premio',
      };
    case 'PREMIO_ELIMINADO':
      console.log('se elimino el premio');
      return {
        ...state,
        premioEliminado: 'Se elimino el premio ',
      };
    case 'ERROR_PREMIO':
      console.log('falló el nuevo premio');
      return {
        ...state,
        premioFalla: 'fallo el nuevo premio',
      };
    case 'FALLO_MODIFICACION_PREMIO':
      console.log('fallo la modificacion del premio');
      return {
        ...state,
        errorModificacionPremio: 'fallo la modificacion del premio',
      };
    case 'PREMIO_MODIFICADO':
      console.log('el premio se modifico correctamente');
      return {
        ...state,
        premioModificado: 'el premio se modifico correctamente',
      };
    //PUNTOS_ENTREGA

    case 'CARGAR_PUNTO_RETIRO':
      console.log('se creo nuevo punto de retiro');
      return {
        ...state,
        puntoRetiro: 'Se creo una nuevo punto de retiro',
      };
    case 'PUNTO_RETIRO_ELIMINADO':
      console.log('se elimino el punto de retiro');
      return {
        ...state,
        puntoRetiroEliminado: 'Se elimino el punto de retiro ',
      };
    case 'ERROR_PUNTO_RETIRO':
      console.log('falló el nuevo punto de retiro');
      return {
        ...state,
        puntoRetiroFalla: 'fallo el nuevo punto de retiro',
      };

    case 'CANJE_ELIMINADO':
      console.log('Se eliminó el canje del perfil del usuario');
      return {
        ...state,
        canjeEliminado: 'Se eliminó el canje del perfil del usuario',
      };
    case 'FALLO_ELIMINACION_CANJE':
      console.log('falló modificación canje');
      return {
        ...state,
        canjeFalla: 'falló modificación canje',
      };

    case 'CANJE_MODIFICADO':
      console.log('Se modificó el canje del perfil del usuario');
      return {
        ...state,
        canjeModificado: 'Se modificó el canje del perfil del usuario',
      };
    case 'FALLO_MODIFICACION_CANJE':
      console.log('falló modificación canje');
      return {
        ...state,
        canjeFalla: 'falló modificación canje',
      };

    default:
      return state;
  }
};

export default adminReducer;
