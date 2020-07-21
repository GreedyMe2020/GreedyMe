import { db } from "./config";
import "regenerator-runtime/runtime";

export const registrarSolicitud = async (data) => {
  return await db.collection("solicitudComercio").doc().set(data);
};
