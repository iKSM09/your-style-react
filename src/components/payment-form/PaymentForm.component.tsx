import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "../_ui/button/Button.styles";
import { styled } from "styled-components";
import { FormEvent, useState } from "react";
import useCurrentUser from "../../hooks/useAuthStateChange";

export const PaymentFormContainer = styled.div`
  height: 300px;
`;

export const FormContainer = styled.form`
  height: 100px;
  /* min-width: 500px; */
  /* display: flex; */
  /* gap: 1rem; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */

  div {
    width: 100%;
  }
`;

type PaymentFormTypes = {
  amount: number;
};

const PaymentForm = ({ amount }: PaymentFormTypes) => {
  const user = useCurrentUser();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent ", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const { client_secret } = response.paymentIntent;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: user ? user.displayName : "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Sucessful");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <h2>Credit Card Payment:</h2>
      <FormContainer onSubmit={paymentHandler}>
        <div>
          <CardElement />
        </div>

        <Button disabled={isProcessingPayment} $outlined $curved>
          {isProcessingPayment ? "Processing..." : "Pay now"}
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
