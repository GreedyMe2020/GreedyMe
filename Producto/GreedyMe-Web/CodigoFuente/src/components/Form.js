import React, { Component } from "react";
import { Row, Button, Col } from "react-bootstrap";

const validNameRegex = RegExp(
  "^([a-zA-Z]{2,}s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}s?([a-zA-Z]{1,})?)"
);
const validEmailRegex = RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
);
const validTelefonoRegex = RegExp(
  "/^(?:(?:00)?549?)?0?(?:11|[2368]d)(?:(?=d{0,2}15)d{2})??d{8}$/"
);
const validWebRegex = RegExp(
  "/^(?:(?:00)?549?)?0?(?:11|[2368]d)(?:(?=d{0,2}15)d{2})??d{8}$/A"
);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
};

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach((val) => val.length > 0 && (count = count + 1));
  return count;
};

export class FormLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      errors: {
        nombre: "",
        apellido: "",
        email: "",
        comercio: "",
        telefono: "",
        web: "",
        sucursal: "",
        rubro: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "nombre":
        errors.nombre = validNameRegex.test(value)
          ? "Ingrese un nombre válido"
          : "";
        break;
      case "apellido":
        errors.apellido = validNameRegex.test(value)
          ? "Ingrese un apellido válido"
          : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "El email no es valido";
        break;
      case "telefono":
        errors.telefono = validTelefonoRegex.test(value)
          ? ""
          : "El teléfono no es valido.";
        break;
      case "comercio":
        errors.comercio = validNameRegex.test(value)
          ? "Ingrese un comercio válido"
          : "";
        break;
      case "web":
        errors.web = validWebRegex.test(value) ? "" : "La web no es válida.";
        break;
      case "sucursal":
        errors.sucursal = value > 5 ? "" : "*Este campo es obligatorio.";
        break;
      case "rubro":
        errors.rubro = value ? "" : "*Elija una sucursal";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ formValid: validateForm(this.state.errors) });
    this.setState({ errorCount: countErrors(this.state.errors) });
  };

  render() {
    const { errors, formValid } = this.state;
    return (
      <form className="form-contacto" onSubmit={this.handleSubmit} noValidate>
        <Row>
          <Col xs="12" md="6">
            <label htmlFor="nombre">Nombre</label>
            <input
              name="nombre"
              type="text"
              placeholder="Nombre"
              onChange={this.handleChange}
              noValidate
            ></input>
            {errors.nombre.length > 0 && (
              <span className="form-validator">{errors.nombre}</span>
            )}
          </Col>
          <Col xs="12" md="6">
            <label htmlFor="apellido">Apellido</label>
            <input
              name="apellido"
              type="text"
              placeholder="Apellido"
              onChange={this.handleChange}
              noValidate
            ></input>
            {errors.apellido.length > 0 && (
              <span className="form-validator">{errors.apellido}</span>
            )}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            <label htmlFor="telefono">Telefono</label>
            <input
              name="telefono"
              type="number"
              placeholder="Telefono"
              onChange={this.handleChange}
              noValidate
            ></input>
            {errors.telefono.length > 0 && (
              <span className="form-validator">{errors.telefono}</span>
            )}
          </Col>
          <Col xs="12" md="6">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={this.handleChange}
              noValidate
            ></input>
            {errors.email.length > 0 && (
              <span className="form-validator">{errors.email}</span>
            )}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            <label htmlFor="comercio">Nombre del comercio</label>
            <input
              name="comercio"
              type="text"
              placeholder="Comercio"
              onChange={this.handleChange}
              noValidate
            ></input>
            {errors.comercio.length > 0 && (
              <span className="form-validator">{errors.comercio}</span>
            )}
          </Col>
          <Col xs="12" md="6">
            <label htmlFor="web">Sitio web</label>
            <input
              name="web"
              type="text"
              placeholder="Web"
              onChange={this.handleChange}
              noValidate
            ></input>
            {errors.web.length > 0 && (
              <span className="form-validator">{errors.web}</span>
            )}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6">
            <label htmlFor="sucursal">Sucursal</label>
            <input
              name="sucursal"
              type="text"
              placeholder="Sucursal"
              onChange={this.handleChange}
              noValidate
            ></input>
            {errors.sucursal.length > 0 && (
              <span className="form-validator">{errors.sucursal}</span>
            )}
          </Col>
          <Col xs="12" md="6">
            <label htmlFor="rubro">Rubro</label>
            {/* ACA PUEDO TRAER LAS RUBROS DE LA BD Y HACER UN .MAP CON ESO PARA MOSTRALOS COMO OPCIONES */}
            <input
              name="rubro"
              type="text"
              list="rubros"
              placeholder="--Rubros--"
              onChange={this.handleChange}
              noValidate
            />
            <datalist id="rubros" name="rubros">
              <option value="Gastronomia" />
              <option value="Entretenimiento" />
              <option value="Indumentaria" />
              <option value="Io que se" />
              <option value="Otro" />
            </datalist>
            {errors.rubro.length > 0 && (
              <span className="form-validator">{errors.rubro}</span>
            )}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12">
            <label htmlFor="dudas">Dudas</label>
            <input
              name="dudas"
              type="textarea"
              placeholder="Ingrese sus dudas"
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12">
            <Button
              className="btn-round"
              name="submit"
              type="submit"
              style={{ float: "right" }}
            >
              Enviar
            </Button>
            {this.state.errorCount !== null ? (
              <p className="form-status">
                El form es
                {formValid ? "válido ✅" : "invalido ❌"}
              </p>
            ) : (
              "El form no fue enviado"
            )}
          </Col>
        </Row>
      </form>
    );
  }
}
