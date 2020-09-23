import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function AccordionPreguntas({ pregunta, respuesta }) {
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{pregunta}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{respuesta}</Typography>
      </AccordionDetails>
    </div>
  );
}
