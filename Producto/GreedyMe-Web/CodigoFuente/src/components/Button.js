import React from "react";
import Button from "@material-ui/core/Button";

export function ButtonEj({ text, style, onClick }) {
  return (
    <div>
      <Button variant="outlined" id={style} onClick={onClick}>
        {text}
      </Button>
    </div>
  );
}
