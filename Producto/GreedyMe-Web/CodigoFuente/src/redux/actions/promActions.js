export const crearPromocion = (promocion) => {
  return (dispatch, getState) => {
    //codigo asincrono
    dispatch({ type: "CREAR_PROMOCION", promocion });
  };
};
