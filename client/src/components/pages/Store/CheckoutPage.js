import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMoneyBillWave, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const CheckoutPage = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: { email },
    });

    if (error) {
      console.error(error);
    } else {
      const { id } = paymentMethod;
      try {
        await axios.post('/api/checkout', { id, amount });
        alert('Payment successful!');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
            <FormControl type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount (ZAR)</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text><FontAwesomeIcon icon={faMoneyBillWave} /></InputGroup.Text>
            <FormControl type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (ZAR)" required />
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Card Details</Form.Label>
          <CardElement className="form-control" />
        </Form.Group>
        <Button variant="primary" type="submit">
          <FontAwesomeIcon icon={faCreditCard} className="me-2" />
          Pay
        </Button>
      </Form>
    </div>
  );
};

export default CheckoutPage;
