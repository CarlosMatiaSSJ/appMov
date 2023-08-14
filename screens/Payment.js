import React, { useState, useContext } from 'react';
import { View, Button, Text } from 'react-native';
import {
  StripeProvider,
  CardField,
  useStripe,
} from '@stripe/stripe-react-native';
import axios from 'axios';
import CartContext from './CartProvider';

const Payment = (props) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');
  const { clearCart } = useContext(CartContext);
  const { confirmPayment } = useStripe();

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/procesar-pago', {
        token: 'tok_visa', // El token de la tarjeta generado por Stripe en el frontend
        amount: $valorTotal * 100,
        currency: 'mxn', // Divisa
      });

      // Pago exitoso
      alert('Pago realizado');
      clearCart();
      props.navigation.navigate('Lista');
    } catch (error) {
      console.log('Error al procesar el pago:', error);
    }
  };

  return (
    <StripeProvider
      publishableKey='pk_test_51NJPrxIwaO31y7BiWXfUS0Bc7yYtBOPyeBK2dp0oHqiYWpF5MTjrVQBteGWJlS3aMBiu0Gq6ku13rT8n8mBmkQeJ00NpkmiJYJ'
      debug={true}
    >
      <View>
        <Text>Ingresa los detalles de tu tarjeta:</Text>
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: 'Número de tarjeta',
            expiration: 'MM/AA',
            cvc: 'CVC',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 10,
          }}
          onCardChange={({ number, expMonth, expYear, cvc }) => {
            setCardNumber(number);
            setExpMonth(expMonth);
            setExpYear(expYear);
            setCvc(cvc);
          }}
        />
        <Text>Total a pagar: {$valorTotal}</Text>
        <Button title='Pagar' onPress={handlePayment} />
      </View>
    </StripeProvider>
  );
};

export default Payment;
