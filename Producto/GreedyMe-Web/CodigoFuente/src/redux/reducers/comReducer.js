const initState = {
  editData: null,
  dataError: null,
};

const comReducer = (state = initState, action) => {
  switch (action.type) {
    case "EDITAR_DATOS":
      return {
        ...state,
        editData: "se edito correctamente",
      };
    case "ERROR_DATOS":
      return {
        ...state,
        dataError: "Ocurrio algun error",
      };
    default:
      return state;
  }
};

export default comReducer;
