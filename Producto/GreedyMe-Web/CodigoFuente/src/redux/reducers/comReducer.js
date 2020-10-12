const initState = {
  editData: null,
  dataError: null,
  foto: null,
  fotoError: null,
  password: null,
  passwordError: null,
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
    case "CAMBIO_PASSWORD":
      console.log("se cambio la password");
      return {
        ...state,
        password: "se cambio la password",
        passwordError: null
      };
    case "ERROR_PASSWORD":
      console.log("no se cambio la password");
      return {
        ...state,
        passwordError: "no se cambio la password",
        password: null
      };
    case "ELIMINAR_FOTO":
      console.log("se elimino la foto");
      return {
        ...state,
        foto: "se elimino la foto",
      };
    case "ERROR_ELIMINAR":
      console.log("no se cambio la password");
      return {
        ...state,
        fotoError: "Ocurrio algun error en la eliminacion de la foto",
      };
    case "RESETEAR_VALORES_CAMBIAR_PASSWORD":
      console.log("se resetearon");
      return {
        ...state,
        password: null,
        passwordError: null
      };
    default:
      return state;
  }
};

export default comReducer;
