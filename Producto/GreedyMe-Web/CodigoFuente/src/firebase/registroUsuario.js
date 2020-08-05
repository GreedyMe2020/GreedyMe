import { db } from "./config";
import "regenerator-runtime/runtime";

export const loginUsuario = async (data) => {
  try {
    return await db.collection("").doc().set(data);
  } catch (error) {
    console.log(error);
  }
};
