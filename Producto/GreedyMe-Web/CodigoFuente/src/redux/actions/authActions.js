export const inicioSesion = (usuario) => {
  return (dispatch, getState) => {
    //codigo asincrono
    dispatch({ type: "INICIAR_SESION", usuario });
  };
};
