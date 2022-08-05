---
Author: "VINOTHKUMAR S"
Source: "Google"
DATE: "2022-04-07"
EstimatedTime: 1.5hrs
---

# Magic Auth

## What is Magic?

**Magic** is a developer **SDK** that integrates with your application to enable **passwordless Web3 onboarding** (no seed phrases) and **authentication using magic links** (similar to Slack and Medium).

Magic enables blazing-fast, hardware-secured, **passwordless login**, Web3 onboarding, and access to over **20 blockchains** with a few lines of code — even if you have an existing auth solution.

[referal link](https://magic.link/docs/home/welcome)

## products

- [Magic connect](https://magic.link/docs/connect/overview)
- [Magic Auth](https://magic.link/docs/auth/overview)

## Magic Auth

- Email Magic Link
- SMS Login
- Social Logins
- More auth features
- Blockchains

### Email Magic Link

Offer a smooth, secure alternative to login credentials with an **emailed magic link**.

### SMS Login

Allow users to log in using a **one-time code** sent to their mobile device.

### Installation

The `Magic SDK` for client-side JavaScript is your entry-point to secure, passwordless authentication for your web-based app.

```javascript
//NPM

npm install --save magic-sdk
```

```javascript
//Yarn

yarn add magic-sdk
```

```javascript
//CDN

<script src="https://auth.magic.link/sdk"></script>
```

```javascript
import { Magic } from "magic-sdk";
const m = new Magic("API_KEY");
```

### Email login

```javascript
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Stack, TextField, Typography, Button } from "@mui/material";
const { Magic } = require("magic-sdk");

const LoginPage = () => {
  //creating magic instance
  const m = new Magic(process.env.REACT_APP_MAGIC_KEY);

  const [verfiedUser, setVerfiedUser] = useState(null);
  const [email, setEmail] = useState("");

  //   using email
  const onLogin = async () => {
    try {
      await m.auth.loginWithMagicLink({ email });
      setVerfiedUser(email);
    } catch (err) {
      console.log("onLogin error -->", err);
    }
  };

  const onLogout = async () => {
    try {
      await m.user.logout();
      setVerfiedUser(null);
    } catch (err) {
      console.log("onLogout error -->", err);
    }
  };

  /**
   * If user is logged in, get data and display it
   */
  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await m.user.isLoggedIn();

      if (isLoggedIn) {
        //using email
        const { email } = await m.user.getMetadata();
        setVerfiedUser(email);

        //Add this just for test
        const token = await getToken();
        console.log("checkUserLoggedIn token", token);
      }
    } catch (err) {
      console.log("checkUserLoggedIn error -->", err);
    }
  };

  /**
   * Retrieve Magic Issued Bearer Token
   * This allows User to make authenticated requests
   */
  const getToken = async () => {
    try {
      const token = await m.user.getIdToken();
      return token;
    } catch (err) {
      console.log("getToken error -->", err);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <Container spacing={4}>
      <P>MAGIC AUTH</P>
      {verfiedUser ? (
        <Stack spacing={4}>
          <Success>Logged successfuly by {verfiedUser}</Success>
          <Button variant="contained" onClick={onLogout}>
            Logout
          </Button>
        </Stack>
      ) : (
        <>
          <TextField
            variant="outlined"
            value={email}
            label="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" onClick={onLogin}>
            Login
          </Button>
        </>
      )}
    </Container>
  );
};

const Container = styled(Stack)`
  width: 31.25rem;
  height: 250px;
  border-radius: 1.25rem;
  background-color: #99e8ae;
  margin: auto;
  padding: 2rem;
`;

const P = styled(Typography)`
  font-size: 2rem;
  color: #5375d4;
  text-align: center;
  letter-spacing: 0.1rem;
  font-weight: bold;
`;

const Success = styled(Typography)`
  font-size: 1.2rem;
  color: #5375d4;
  text-align: center;
  letter-spacing: 0.1rem;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default LoginPage;
```

### SMS login

```javascript
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Stack, TextField, Typography, Button } from "@mui/material";
const { Magic } = require("magic-sdk");

const LoginPage = () => {
  //creating magic instance
  const m = new Magic(process.env.REACT_APP_MAGIC_KEY);

  const [verfiedUser, setVerfiedUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  //using phonenumber
  const onLogin = async () => {
    try {
      const DID = await m.auth.loginWithSMS({
        phoneNumber: `+91${phoneNumber}`,
      });
      console.log("DID token", DID);
      const { phoneNumber } = await m.user.getMetadata();
      setVerfiedUser(phoneNumber);
    } catch (err) {
      console.log("onLogin error -->", err);
    }
  };

  const onLogout = async () => {
    try {
      await m.user.logout();
      setVerfiedUser(null);
    } catch (err) {
      console.log("onLogout error -->", err);
    }
  };

  /**
   * If user is logged in, get data and display it
   */
  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await m.user.isLoggedIn();

      if (isLoggedIn) {
        //        using phoneNumber
        const { phoneNumber } = await m.user.getMetadata();
        setVerfiedUser(phoneNumber);

        //Add this just for test
        const token = await getToken();
        console.log("checkUserLoggedIn token", token);
      }
    } catch (err) {
      console.log("checkUserLoggedIn error -->", err);
    }
  };

  /**
   * Retrieve Magic Issued Bearer Token
   * This allows User to make authenticated requests
   */
  const getToken = async () => {
    try {
      const token = await m.user.getIdToken();
      return token;
    } catch (err) {
      console.log("getToken error -->", err);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <Container spacing={4}>
      <P>MAGIC AUTH</P>
      {verfiedUser ? (
        <Stack spacing={4}>
          <Success>Logged successfuly by {verfiedUser}</Success>
          <Button variant="contained" onClick={onLogout}>
            Logout
          </Button>
        </Stack>
      ) : (
        <>
          <TextField
            variant="outlined"
            value={phoneNumber}
            label="Enter your phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button variant="contained" onClick={onLogin}>
            Login
          </Button>
        </>
      )}
    </Container>
  );
};

const Container = styled(Stack)`
  width: 31.25rem;
  height: 250px;
  border-radius: 1.25rem;
  background-color: #99e8ae;
  margin: auto;
  padding: 2rem;
`;

const P = styled(Typography)`
  font-size: 2rem;
  color: #5375d4;
  text-align: center;
  letter-spacing: 0.1rem;
  font-weight: bold;
`;

const Success = styled(Typography)`
  font-size: 1.2rem;
  color: #5375d4;
  text-align: center;
  letter-spacing: 0.1rem;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default LoginPage;
```

## Getting Help

If you're having trouble, check out the [Resources](https://magic.link/docs/home/welcome) page to get help. Good luck!

## Assessment :

Create one login page which have both email and SMS login using magic and redirect the page to authenticated page.
