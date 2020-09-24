import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Router, Link } from "@reach/router";

export default function ListItemCustomAdmin({
  text,
  src1,
  src2,
  id,
  className,
  seleccionado,
  setSeleccionado,
  elementIndex,
}) {
  const [color, setColor] = React.useState(false);

  React.useEffect(() => {
    if (seleccionado === elementIndex) {
      setColor(true);
    } else {
      setColor(false);
    }
  }, [seleccionado]);

  const handleClick = (e) => {
    e.preventDefault();
    setSeleccionado(elementIndex);
  };

  const styles = {
    display: color ? "block" : "none",
    ":hover": { display: "block" },
  };

  const styleso = {
    display: color ? "none" : "block",
  };

  const fontstyles = {
    color: color ? "#f7941e" : "#868686",
  };

  const borderstyle = {
    borderLeft: color ? "5px solid #f7941e" : "5px solid #ececec",
  };

  return (
    <div
      id={id}
      className={className}
      onClick={handleClick}
      style={borderstyle}
    >
      <Link to={"/admin/" + id} className="link" style={fontstyles}>
        <ListItem button>
          <ListItemIcon>
            <img
              width="22px"
              height="22px"
              src={src1}
              className="image-o"
              style={styleso}
            />
            <img
              width="22px"
              height="22px"
              src={src2}
              className="image-t"
              style={styles}
            />
          </ListItemIcon>

          <ListItemText primary={text} />
        </ListItem>
      </Link>
    </div>
  );
}
