const initState = {
  promCreate: null,
  promError: null,
  promActualizacion: null,
  actualError: null,
  promElim: null,
  elimError: null,
};

const promReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREAR_PROMOCION":
      console.log("Se creo la promo bro");
      return {
        ...state,
        promCreate: "se creo la promocion",
      };
    case "ERROR_PROMOCION":
      console.log("no se creo bro");
      return {
        ...state,
        promError: "Ocurrio algun error en la creacion",
      };
    case "ACTUALIZAR_PROMOCION":
      return {
        ...state,
        promActualizacion: "se edito la promocion",
      };
    case "ERROR_ACTUALIZACION":
      return {
        ...state,
        actualError: "Ocurrio algun error en la edicion",
      };
    case "ELIMINAR_PROMOCION":
      return {
        ...state,
        promElim: "se elimino la promocion",
      };
    case "ERROR_ELIMINACION":
      return {
        ...state,
        elimError: "Ocurrio algun error en la eliminacion",
      };
    default:
      return state;
  }
};

export default promReducer;
