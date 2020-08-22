import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function ListItemCustom({ text, src }) {
  return (
    <ListItem button>
      <ListItemIcon>
        <img width="22px" height="22px" src={src} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}
