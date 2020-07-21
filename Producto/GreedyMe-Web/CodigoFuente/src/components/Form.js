import React from "react";
import { Row, Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

export const FormLanding = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs="12" md="6">
          <label htmlFor="nombre">Nombre</label>
          <input
            name="nombre"
            type="text"
            placeholder="Nombre"
            ref={register({ required: true })}
          ></input>
        </Col>
        <Col xs="12" md="6">
          <label htmlFor="apellido">Apellido</label>
          <input
            name="apellido"
            type="text"
            placeholder="Apellido"
            ref={register({ required: true })}
          ></input>
        </Col>
      </Row>

      <Row>
        <Col xs="12" md="6">
          <label htmlFor="telefono">Telefono</label>
          <input
            name="telefono"
            type="number"
            placeholder="Telefono"
            ref={register({ required: true })}
          ></input>
        </Col>
        <Col xs="12" md="6">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            ref={register({ required: true })}
          ></input>
        </Col>
      </Row>

      <Row>
        <Col xs="12" md="6">
          <label htmlFor="comercio">Nombre del comercio</label>
          <input
            name="comercio"
            type="text"
            placeholder="Comercio"
            ref={register({ required: true })}
          ></input>
        </Col>
        <Col xs="12" md="6">
          <label htmlFor="web">Sitio web</label>
          <input
            name="web"
            type="text"
            placeholder="Web"
            ref={register({ required: true })}
          ></input>
        </Col>
      </Row>

      <Row>
        <Col xs="12" md="6">
          <label htmlFor="sucursal">Sucursal</label>
          <input
            name="sucursal"
            type="text"
            placeholder="Sucursal"
            ref={register({ required: true })}
          ></input>
        </Col>
        <Col xs="12" md="6">
          <label htmlFor="rubro">Rubro</label>
          {/* ACA PUEDO TRAER LAS RUBROS DE LA BD Y HACER UN .MAP CON ESO PARA MOSTRALOS COMO OPCIONES */}
          <input
            name="rubro"
            type="text"
            list="rubros"
            placeholder="--Rubros--"
            ref={register({ required: true })}
          />
          <datalist id="rubros" name="rubros">
            <option value="Gastronomia" />
            <option value="Entretenimiento" />
            <option value="Indumentaria" />
            <option value="Io que se" />
            <option value="Otro" />
          </datalist>
        </Col>
      </Row>

      <Row>
        <Col xs="12" md="12">
          <label htmlFor="dudas">Dudas</label>
          <input
            name="dudas"
            type="textarea"
            placeholder="Ingrese sus dudas"
            ref={register}
          />
        </Col>
      </Row>

      <Row>
        <Col xs="9" md="6">
          <input
            type="checkbox"
            name="terminos"
            value="Acepto los terminos y condiciones"
            ref={register({ required: true })}
          ></input>
        </Col>
        <Col xs="3" md="6">
          <Button
            type="submit"
            style={{ float: "right" }}
            ref={register({ required: true })}
          >
            Enviar
          </Button>
        </Col>
      </Row>
    </form>
  );
};
