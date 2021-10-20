import React, { useRef, useEffect } from 'react';
import { editarSuscripcion } from '../../redux/actions/comActions';
import { connect } from 'react-redux';

const PaypalCheckoutButton = (props) => {
  const [submitted, setSubmitted] = React.useState(false);

  const [formData, setFormData] = React.useState({
    id: props.auth.uid,
    web: props.profile.web,
    sucursal: props.profile.sucursal,
    rubro: props.profile.rubro,
    telefono: props.profile.telefono,
    instagram: props.profile.instagram,
    facebook: props.profile.facebook,
    direccion: props.profile.direccion,
    tipoSuscripcion: props.profile.tipoSuscripcion,
    fechaVencimiento: props.profile.fechaVencimiento,
    cantidadNotificaciones: props.profile.cantidadNotificaciones,
  });
  const [plan, setPlan] = React.useState(formData.tipoSuscripcion);

  function handlePlan(number) {
    setPlan(number);
    const fechaActual = new Date();

    fechaActual.setDate(fechaActual.getDate() + 30);
    formData.fechaVencimiento = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      fechaActual.getDate(),
    );
    if (number === 1) {
      formData.cantidadNotificaciones = 8;
    } else {
      formData.cantidadNotificaciones = 30;
    }
    formData.tipoSuscripcion = number;
    setFormData({ ...formData });
    handleSubmit();
  }

  const handleSubmit = () => {
    props.editarSuscripcion(formData);
    setSubmitted({ submitted: true }, () => {
      setTimeout(() => setSubmitted({ submitted: false }), 5000);
    });
  };

  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          height: 36
        },
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: props.description,
                amount: {
                  currency_code: 'USD',
                  value: props.value,
                },
                no_shipping: 1,
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          handlePlan(props.tipoPlan);
          props.handleClickSuccess();
          console.log('Successful order:' + order);
        },

        onError: (err) => {
          props.handleClickError();
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editarSuscripcion: (datos) => dispatch(editarSuscripcion(datos)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaypalCheckoutButton);
