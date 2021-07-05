import React, { useRef, useEffect } from 'react';
import paypal from 'paypal-checkout';
import ReactDOM from 'react-dom';

const PaypalCheckoutButton = () => {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'Suscripcion',
                amount: {
                  currency_code: 'USD',
                  value: 500.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log('Successful order:' + order);
        },

        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  /*
  const paypalConf = {
    currency: 'USD',
    env: 'sandbox',
    client: {
      sandbox:
        'AUqIjXeftgci48AcB5SybC4WVhy2voVQEz7Gun1qf0PkQPZW0CT9QOOImIbWG7tRaDsKmZ2RyldE3bXT',
      production: '-- id--',
    },
    style: {
      label: 'pay',
      size: 'medium',
      shape: 'rect',
      color: 'gold',
    },
  };

  const PayPalButton = paypal.Button.driver('react', {
    React,
    ReactDOM,
  });

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: order.total,
            currency: paypalConf.currency,
          },
          description: 'Paga tu suscripción',
          custom: order.customer || '',
          item_list: {
            items: order.items,
          },
        },
      ],
      note_to_payer: 'Contáctanos para cualquier aclaración',
    };
    return actions.payment.create({ payment });
  };

  const onAuthorize = (data, actions) => {
    return actions.payment
      .execute()
      .then((response) => {
        console.log(response);
        alert(
          `El pago fue procesado correctamente, ID: ${response.id}`,
        );
      })
      .catch((error) => {
        console.log(error);
        alert('Ocurrió un error al procesar el pago con PayPal');
      });
  };

  const onError = (error) => {
    console.log(error);
    alert('El pago no fue realizado, vuelva a intentarlo');
  };

  const onCancel = (data, actions) => {
    alert('Pago no realizado, el usuario canceló el proceso');
  };
*/
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default PaypalCheckoutButton;
