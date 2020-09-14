const initState = {
  usuarioCreado: null,
  usuarioFalla: null,
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case "USUARIO_CREADO":
      return {
        ...state,
        usuarioCreado: "Se creo un nuevo usuario",
      };
    case "FALLO_CREACION":
      return {
        ...state,
        usuarioFalla: action.error,
      };
    default:
      return state;
  }
};

export default adminReducer;
