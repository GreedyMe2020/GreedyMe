const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "INICIO_FALLIDO":
      console.log("login errrrrrr f");
      return {
        ...state,
        authError: "Fallo el inicio de sesión",
      };
    case "INICIO_CORRECTO":
      console.log("login succes wachin");
      return {
        ...state,
        authError: null,
      };
    case "SESION_CERRADA":
      console.log("te fuiste");
      return state;
    default:
      return state;
  }
};

export default authReducer;
