import { db } from "./config";
import "regenerator-runtime/runtime";

export const registrarSolicitud = async (data) => {
  try {
    return await db.collection("solicitudComercio").doc().set(data);
  } catch (error) {
    console.log(error);
  }
};
