import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const UseModal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div"); //Cada vez que se renderiza, se va a crear un div.
    elRef.current = div;
  }

  useEffect(() => {
    //Se va a cargar luego de cada render.
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current); //Esta funcion se comporta como "componentWillUnmount", se va a correr cuando el "modal root" se cierre.
  }, []); //El array vacio significa que el useEffect no tiene dependencias asi que queremos que corra solo 1 vez.

  return createPortal(<div>{children}</div>, elRef.current);
};

export default UseModal;
