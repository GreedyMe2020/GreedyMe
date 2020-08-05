import { db } from "./config";
import "regenerator-runtime/runtime";

export const registrarPromocion = async (data) => {
  try {
    return await db.collection("promociones").doc().set(data);
  } catch (error) {
    console.log(error);
  }
};

export const borrarPromocion = async (id) => {
  try {
    return await db.collection("promociones").doc(id).delete();
  } catch (error) {
    console.log(error);
  }
};

export const ActualizarPromocion = async (id, data) => {
  try {
    return await db.collection("promociones").doc(id).update(data);
  } catch (error) {
    console.log(error);
  }
};
