# Flutterwave and React

- For integrating flutterwave into our app here we use flutterwave-react-v3 plugin.
  [flutterwave](https://www.npmjs.com/package/flutterwave-react-v3)
- flutterwave-react-v3 is a react package for implementing Flutterwave gateway with different payment methods.

### installation

```
npm install flutterwave-react-v3
```

- you can get your API key from flutterwave dashboard.
  use the below link [flutterwave quickstart](https://developer.flutterwave.com/docs/quickstart).
- you can integrate flutterwave in two ways
  - using Hooks
  - using component

### Using Hooks

```javascript
import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

export default function App() {
  const config = {
    public_key: "FLWPUBK-**************************-X", //public key
    tx_ref: Date.now(),
    amount: 100, //amount value
    currency: "NGN", //currency type
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phonenumber: "07064586146",
      name: "joel ugwumadu",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <h1>Hello Test user</h1>

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button>
    </div>
  );
}
```

- in above code snippet in config you need to provide your flutterwave public key.

### using component

```javascript
import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export default function App() {
  const config = {
    public_key: "FLWPUBK-**************************-X", //public key
    tx_ref: Date.now(),
    amount: 100, // amount value
    currency: "NGN", // currency type
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phonenumber: "07064586146",
      name: "joel ugwumadu",
    },
    customizations: {
      title: "My store",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div className="App">
      <h1>Hello Test user</h1>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}
```

---
