import * as React from "react";
import AccordionPreguntas from "./accordion-preguntas";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "30px",
  },
}));

function PreguntasBeneficios(props) {
  const classes = useStyles();
  return (
    <div>
      <div className="prom-title-container">
        <h1>Ayuda y soporte técnico</h1>
      </div>
      <Link
        to={"/main/" + props.auth.uid + "/ayuda-y-soporte"}
        className="ayuda-link-volver"
      >
        Volver
      </Link>
      <div className={classes.root}>
        <AccordionPreguntas
          pregunta="Quiero cargar un beneficio nuevo"
          respuesta="Para cargar un beneficio nuevo, deberás dirigirte a la sección Mis beneficios desde la barra lateral de la pantalla.
          Una vez en dicha sección, seleccionas la opción “Nuevo Beneficio” que se encuentra en la esquina superior derecha de la misma. Se abrirá un formulario donde podrás registrar los datos de tu beneficio, como ser el tipo (promoción, descuento), el proveedor (tarjeta de crédito/debito, banco, club de beneficios, etc.), los días que aplica, el medio de pago con el que se aplica y alguna descripción opcional o aclaración.
          Por último, al completar todos los datos, seleccionas la opción “Guardar beneficio” y el mismo podrá visualizarse en tu perfil y tablero de beneficios. Debés tener en cuenta que al momento de cargar un nuevo beneficio,
          el mismo se cargará como Oculto en la aplicación. Para hacerlo visible para todos los usuarios, deberás hacer clic en ícono de ojo que se encuentra a la derecha hasta que éste no figure como tachado"
        />
        <AccordionPreguntas
          pregunta="No está el proveedor del beneficio que deseo registrar"
          respuesta="Si al cargar un beneficio no se encuentra como opción el proveedor que deseas, solo deberás seleccionar la opción “Otro” y se habilitara un campo donde podrás ingresar el proveedor deseado.
          El mismo se reflejará en tu perfil tal como fue escrito, por lo que recomendamos prestar atención a la ortografía.
          "
        />
        <AccordionPreguntas
          pregunta="No está el tipo de beneficio que deseo registrar"
          respuesta="Si al cargar un beneficio no se encuentra como opción el tipo de beneficio que deseas, solo deberás seleccionar la opción “Otro” y se habilitara un campo donde podrás ingresar el tipo deseado.
          El mismo se reflejará en tu perfil tal como fue escrito, por lo que recomendamos prestar atención a la ortografía.
          "
        />
        <AccordionPreguntas
          pregunta="No está definido el porcentaje de descuento que deseo registrar"
          respuesta="Si al cargar un beneficio no se encuentra como opción el porcentaje de descuento que deseas, solo deberás seleccionar la opción “Otro” y se habilitara un campo donde podrás ingresar el porcentaje deseado.
          El mismo se reflejará en tu perfil tal como fue escrito, por lo que recomendamos prestar atención a la ortografía e incluir el símbolo de “%”.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero cambiar los datos de un beneficio"
          respuesta="Para modificar los datos de un beneficio ya existente en tu perfil, deberás dirigirte a la sección Mis Beneficios desde la barra lateral de la pantalla.
          Una vez en dicha sección, deberás localizar el beneficio que deseas modificar, así sea escribiendo alguna palabra clave de este por medio del buscador o localizándolo manualmente. Al lado de cada beneficio se encuentra un icono de “lápiz”, el cual te llevara a la edición de éste luego de seleccionarlo.
          Al modificar un beneficio deberás tener en cuenta las mismas consideraciones que al registrar uno nuevo, completando todos los campos obligatorios con datos válidos.
          Por último, seleccionar la opción “Guardar cambios” para que los cambios sean guardados en tu perfil.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero cambiar la visualización de un beneficio en mi perfil"
          respuesta="Un beneficio puede estar visible en tu perfil dentro de la plataforma u oculto.
          Para modificar la visualización o no de un beneficio ya existente en tu perfil, deberás dirigirte a la sección Mis beneficios desde la barra lateral de la pantalla.
          Una vez en dicha sección, deberás localizar el beneficio que deseas modificar, así sea escribiendo alguna palabra clave de este por medio del buscador o localizándolo manualmente. Al lado de cada beneficio se encuentra un icono de “ojo”, el cual llevara a cabo la acción luego de seleccionarlo.
          Si el icono se encuentra tachado quiere decir que ese beneficio se encuentra oculto de tu perfil, es decir, que los clientes que ingresen a la plataforma no podrán verlo hasta que sea habilitado nuevamente. Por otro lado, si se encuentra sin tachar, dicho beneficio es visible desde tu perfil."
        />
        <AccordionPreguntas
          pregunta="Quiero buscar un beneficio determinado en mi tablero de beneficios"
          respuesta="Para buscar un beneficio determinadao ya existente en tu perfil, deberás dirigirte a la sección Mis beneficios desde la barra lateral de la pantalla.
          Una vez en dicha sección, deberás localizar el beneficio deseado, así sea escribiendo alguna palabra clave de este por medio del buscador o localizándolo manualmente. Por ejemplo: podes buscar beneficios por tipo (2x1, 25%, 3x2) o por nombre de proveedor (VISA, MasterCard, American Express).
          "
        />
        <AccordionPreguntas
          pregunta="Quiero eliminar un beneficio de mi perfil"
          respuesta="Para eliminar un beneficio ya existente en tu perfil, deberás dirigirte a la sección Mis beneficios desde la barra lateral de la pantalla.
          Una vez en dicha sección, deberás localizar el beneficio que deseas modificar, así sea escribiendo alguna palabra clave de este por medio del buscador o localizándolo manualmente. Al lado de cada beneficio se encuentra un icono de “cesto de basura”, el cual te llevara a la eliminación de este luego de seleccionarlo.
          Por último, deberás confirmar la acción mediante el cuadro de dialogo que se mostrara. Esta acción es irreversible, si eliminas un beneficio por error, deberás cargarlo nuevamente. Al eliminar un beneficio, se invalidarán todos los cupones vinculados al mismo de las cuentas de los clientes.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero saber qué sucede con mis beneficios no vigentes"
          respuesta="Cuando un beneficio registrado no se encuentra más dentro de la fecha de vigencia establecida al momento de su registro, el mismo pasa automáticamente a encontrarse Oculto de tu perfil de comercio.
          En el caso que desees reactivar dicho beneficio y establecerlo como Visible, primero deberás editarlo y colocarle una fecha de vigencia válida. Una vez editado, podrás establecerlo como Visible desde el ícono de ojo ubicado a la derecha del mismo."
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(PreguntasBeneficios);
