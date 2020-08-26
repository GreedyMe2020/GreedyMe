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
        fotoError: "Ocurrio algun error en la subida de la foto",
      };
    case "CAMBIO_CONTRASEÑA":
      console.log("se cambio la contraseña");
      return {
        ...state,
        contraseña: "se cambio la contraseña",
      };
    case "ERROR_CONTRASEÑA":
      console.log("no se cambio la contraseña");
      return {
        ...state,
        contraseñaError: "no se cambio la contraseña",
      };
    case "ELIMINAR_FOTO":
      console.log("se elimino la foto");
      return {
        ...state,
        foto: "se elimino la foto",
      };
    case "ERROR_CONTRASEÑA":
      console.log("no se cambio la contraseña");
      return {
        ...state,
        fotoError: "Ocurrio algun error en la eliminacion de la foto",
      };
    default:
      return state;
  }
};

export default comReducer;
