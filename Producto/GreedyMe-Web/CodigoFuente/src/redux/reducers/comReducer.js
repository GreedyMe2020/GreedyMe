const initState = {
  editData: null,
  dataError: null,
  foto: null,
  fotoError: null,
  contraseña: null,
  contraseñaError: null,
};

const comReducer = (state = initState, action) => {
  switch (action.type) {
    case "EDITAR_DATOS":
      console.log("se actualizaron los datos");
      return {
        ...state,
        editData: "se edito correctamente",
      };
    case "ERROR_DATOS":
      console.log("no se actualizaron perrito malvadito brodersito");
      return {
        ...state,
        dataError: "Ocurrio algun error",
      };
    case "SUBIR_FOTO":
      console.log("se subio la foto");
      return {
        ...state,
        foto: "se subio la foto",
      };
    case "ERROR_FOTO":
      console.log("no se subio la foto");
      return {
        ...state,
        fotoError: "Ocurrio algun error en al foto",
      };
    case "CAMBIO_CONTRASEÑA":
      console.log("se cambio la contraseña");
      return {
        ...state,
        contraseña: "se subio la foto",
      };
    case "ERROR_CONTRASEÑA":
      console.log("no se cambio la contraseña");
      return {
        ...state,
        contraseñaError: "Ocurrio algun error en al foto",
      };
    default:
      return state;
  }
};

export default comReducer;
