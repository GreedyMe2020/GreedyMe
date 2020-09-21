const initState = {
  usuarioCreado: null,
  usuarioFalla: null,
  tipoPromo: null,
  tipoPromoFalla: null,
  tipoProveedor: null,
  tipoProveedorFalla: null,
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
    default:
      return state;
  }
};

export default adminReducer;
