const initState = {
  editData: null,
  dataError: null,
  foto: null,
  fotoError: null,
  password: null,
  passwordError: null,
  consulta: null,
  errorConsulta: null,
  codigo: null,
  codigoError: null,
  notificacionesTodos: null,
  errorNotificacionesTodos: null,
  notificacionesFav: null,
  errorNotificacionesFav: null,
  actualizacionNotificacion: null,
  erroractualizacionNotificacion: null,
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
    case "ENVIAR_CONSULTA":
      console.log("se envio la consulta");
      return {
        ...state,
        consulta: "se envio la consulta",
      };
    case "ERROR_CONSULTA":
      console.log("no se envio la consulta");
      return {
        ...state,
        consultaError: "Ocurrio algun error en el envio de la consulta",
      };
    case "GUARDAR_CODIGO":
      console.log("se guardo el codigo");
      return {
        ...state,
        codigo: "se guardo el codigo",
        codigoError: null,
      };
    case "ERROR_CODIGO":
      console.log("no se guardo el codigo");
      return {
        ...state,
        codigo: null,
        codigoError: "Ocurrio algun error al guardar el codigo",
      };
    case "RESETEAR_VALORES_CAMBIAR_PASSWORD":
      console.log("se resetearon");
      return {
        ...state,
        password: null,
        passwordError: null
      };
    case "ENVIAR_TODOSNOTIF":
      console.log("se envio las notificaciones a todos");
      return {
        ...state,
        notificacionesTodos: 'Se envio las notif a todos'
      };
    case "ERROR_TODOSNOTIF":
      console.log("Hubo un error al enviar a todos las notificaciones");
      return {
        ...state,
        errorNotificacionesTodos: 'Error al enviar notif a todos'
      };
    case "ENVIAR_FAVNOTIF":
      console.log("se envio las notificaciones a favoritos");
      return {
        ...state,
        notificacionesFav: 'Se envio las notif a favoritos'
      };
    case "ERROR_FAVNOTIF":
      console.log("Hubo un error al enviar a favoritos las notificaciones");
      return {
        ...state,
        errorNotificacionesFav: 'Error al enviar notif a favoritos'
      };
    case "ACTUALIZACION_NOTIFICACION":
      console.log("Se actualizo correctamente la notificacion");
      return {
        ...state,
        actualizacionNotificacion: 'Se actualizo correctamente la notificacion'
      };
    case "ERROR_ACTUALIZACION_NOTIFICACION":
      console.log("Hubo un error al actualizar la notificacion");
      return {
        ...state,
        errorActualizacionNotificaciones: 'Error al actualizar la notificacion'
      };
    default:
      return state;
  }
};

export default comReducer;
