import React from "react";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    color: theme.palette.getContrastText("#e1e1e1"),
    backgroundColor: "#e1e1e1",
    float: "right",
    "&:hover": {
      backgroundColor: "#c5c5c5",
    },
  },
}));

export function Footer() {
  const classes = useStyles();
  const [showScroll, setShowScroll] = React.useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  window.addEventListener("scroll", checkScrollTop);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer">
      <div className="textoFooter">
        <p>Terminos y condiciones</p>
        <p>Politica de privacidad</p>
      </div>
      <div>
        <IconButton
          variant="contained"
          aria-label="delete"
          className={classes.margin}
          onClick={scrollTop}
        >
          <KeyboardArrowUp />
        </IconButton>
      </div>
      <div className="logoFooter">
        <span style={{ color: "rgb(255, 255, 255)" }}>g r e</span>
        <span style={{ color: "#76B39D" }}> e d y</span>
        <span style={{ color: "rgba(247,148,30,1)" }}> m e</span>
      </div>
    </div>
  );
}
