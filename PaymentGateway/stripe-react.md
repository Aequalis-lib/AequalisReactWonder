# Stripe payment gateway integration in React

- Stripe is one of the leading payment gateways, and it allows businesses and individuals to accept payment through the use of their robust APIs and tools.

## Server

- For integrate stripe into our app we need an server.

- create a folder for server.

```
npm init -y
npm i stripe express body-parser cors dotenv
```

- create a index.js file in the root of our project.

```javascript
const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY); //stripe secret key
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());]wd8i9,8

app.use(cors()); //it will remove the cors error

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount, //amount value
      currency: "USD", // currency type
      description: "Aeq payment",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.listen(process.env.PORT || 4242, () => {
  console.log("Sever is listening on port 4242");
});
```

- for server you need an secret key. you can get that in stripe developer dashboard. in above code we get that from env (process.env.REACT_APP_STRIPE_SECRET_KEY)

- run the server using the command:

```
node index.js
```

- your server will running on port 4242.

## Client

### The Elements provider

- The Elements provider is a component that allows any components nested in it to use the Element components and the Hooks provided by React Stripe.js.
- Elements has two props: stripe and options. Normally, stripe takes in a Stripe object or a promise that resolves to a Stripe object. To initialize a Stripe object, you can use the loadStripe function from the stripe-js module.

### Installation

```
npm install @stripe/react-stripe-js @stripe/stripe-js
```

- create a js file (StripeContainer.js)

```javascript
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY; // stripe public key

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm /> //It contains payment form
    </Elements>
  );
}
```

in the above file we need stripe public key. you can get that in stripe developer dashboard.

- create a form file (PaymentForm.js)

```javascript
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Button } from "reactstrap";

const CARD_OPTIONS = {
  iconStyle: "solid",
  //styling
  style: {
    base: {
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;

        fetch("http://localhost:4242/payment", {
          //url to fetch payment intent
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 1000, //amount value
            id, //unique payment method id from stripe
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data, "maindata");
            console.log("Successful payment");
            setSuccess(true);
          });
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <div className="text-center mt-4">
            <Button type="submit" color="danger">
              Pay
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <h2>
            Payment Successful! <br />
          </h2>
        </div>
      )}
    </>
  );
}
```

---
