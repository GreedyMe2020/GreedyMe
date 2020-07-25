import React from "react";
import Button from "@material-ui/core/Button";

export function ButtonEj({ text, style }) {
  return (
    <div>
      <Button variant="outlined" id={style}>
        {text}
      </Button>
    </div>
  );
}
