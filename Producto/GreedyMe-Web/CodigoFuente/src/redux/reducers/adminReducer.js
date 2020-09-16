const initState = {
  usuarioCreado: null,
  usuarioFalla: null,
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
    default:
      return state;
  }
};

export default adminReducer;
