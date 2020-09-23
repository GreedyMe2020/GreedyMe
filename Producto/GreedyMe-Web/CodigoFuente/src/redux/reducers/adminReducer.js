const initState = {
  usuarioCreado: null,
  usuarioFalla: null,
  usuarioModificado: null,
  errorModificacion: null,
  usuarioEliminado: null,
  errorEliminacion: null,
  tipoPromo: null,
  tipoPromoFalla: null,
  tipoPromoEliminada: null,
  tipoPromoEliminacionFalla: null,
  tipoProveedor: null,
  tipoProveedorFalla: null,
  tipoProveedorEliminada: null,
  tipoProveedorEliminacionFalla: null,
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case "USUARIO_CREADO":
      console.log("se creo");
      return {
        ...state,
        usuarioCreado: "Se creo un nuevo usuario",
      };
    case "FALLO_CREACION":
      console.log("fallo");
      return {
        ...state,
        usuarioFalla: action.error.message,
      };
    case "USUARIO_MODIFICADO":
      console.log("se modifico");
      return {
        ...state,
        usuarioModificado: "Se modifico el usuario usuario",
      };
    case "FALLO_MODIFICACION":
      console.log("fallo la modificacion");
      return {
        ...state,
        errorModificacion: "fallo la modificacion de usuario",
      };
    case "USUARIO_ELIMINADO":
      console.log("se elimino el usuario");
      return {
        ...state,
        usuarioEliminado: "se elimino el usuario",
      };
    case "FALLO_ELIMINACION":
      console.log("fallo la eliminacion");
      return {
        ...state,
        errorEliminacion: "La eliminacion del usuario ha fallado",
      };
    case "CARGAR_TIPO_PROMOCION":
      console.log("se creo el nuevo tipo");
      return {
        ...state,
        tipoPromo: "Se creo una nueva promo ",
      };
    case "ERROR_TIPO_PROMOCION":
      console.log("fallo el nuevo tipo");
      return {
        ...state,
        tipoPromoFalla: "fallo la nueva promo",
      };
    case "TIPO_PROMOCION_ELIMINADO":
      console.log("se elimino el tipo promo");
      return {
        ...state,
        tipoPromoEliminada: "Se elimino la promo ",
      };
    case "FALLO_ELIMINACION_TIPO_PROMOCION":
      console.log("fallo la eliminacion tipo promo");
      return {
        ...state,
        tipoPromoEliminacionFalla: "fallo la eliminacion promo",
      };
    case "CARGAR_TIPO_PROVEEDOR":
      console.log("se creo el nuevo tipo proveedor");
      return {
        ...state,
        tipoProveedor: "Se creo una nueva promo ",
      };
    case "ERROR_TIPO_PROVEEDOR":
      console.log("fallo el nuevo tipo proveedor");
      return {
        ...state,
        tipoProveedorFalla: "fallo la nueva promo",
      };
    case "TIPO_PROVEEDOR_ELIMINADO":
      console.log("se elimino el tipo proveedor");
      return {
        ...state,
        tipoProveedorEliminada: "Se elimino la proveedor ",
      };
    case "FALLO_ELIMINACION_TIPO_PROVEEDOR":
      console.log("fallo la eliminacion tipo proveedor");
      return {
        ...state,
        tipoProveedorEliminacionFalla: "fallo la eliminacion proveedor",
      };
    default:
      return state;
  }
};

export default adminReducer;
