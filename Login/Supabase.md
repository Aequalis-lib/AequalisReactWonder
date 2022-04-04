# Login and signup using supabase

- create a UI for signup and login.

### supabase

- Supabase is an open source Firebase alternative.
- It provides all the backend services you need to build a product. You can use it completely, or just the services you require

some of the services :

- Database
- Auth
- File storage
- Auth generated APIs.

For signup and login we are going to use supabase Auth functionality<br />
you can authenticate your users in several ways.

- Email & password
- Magic link (one-click login)
- Social Providers
- Phone logins

In here we are going to use Email & password authentication, Magic link and Social Providers.

Let's start.

- Go to [supabase](https://app.supabase.io/)
- Click on "New Project".
- Enter your project details.
- Wait for the new database to launch.

Now we are going to set up the database schema

1. Go to the "SQL" section.
2. Click "User Management Starter".
3. Click "Run".

Get the API keys:

1. Go to the "Settings" section.
2. Click "API" in the sidebar.
3. Find your API URL in this page.
4. Find your "anon" and "service_role" keys on this page.

create a react app

```
npx create-react-app supabase-react --use-npm
cd supabase-react
```

install the dependencies

```
npm install @supabase/supabase-js
```

create an .env files for storing our API keys locally.

```javascript
REACT_APP_SUPABASE_URL = YOUR_SUPABASE_URL;
REACT_APP_SUPABASE_ANON_KEY = YOUR_SUPABASE_ANON_KEY;
```

create a client file for consume supabase (src/supabaseClient.js)

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

here after you can use supabase client to interact with your database.

### Signup using email and password

- create a signup form with input fields.
- import supabase client in your signup form.

```javascript
import { supabase } from "./supabaseClient";
```

- in the submit function implement the below code snippet.

```javascript
const handleValidSubmit = async (values) => {
  setLoading(true);
  const { user, session, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });
  if (!error) {
    history.push("/login");
  } else {
    setError(error.message);
  }
};
```

above code will signup the user and redirect to login page. you can view signed users details in supabase dashboard in Authentication section.

### Login using email and password

- create a login form with input fields.
- import supabase client in your login form.

```javascript
const { user, session, error } = await supabase.auth.signIn({
  email: values.email,
  password: values.password,
});
```

### Signup and login using Magic link

- import supabase client in your login form.
- create a login form with a single input for getting user email.

```javascript
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    const { error } = await supabase.auth.signIn({ email });
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    alert(error.error_description || error.message);
  } finally {
    setLoading(false);
  }
};
```

note : you must need to confirm your mail address before you can login.

### Signup and login using Social Providers

### Facebook Login

- To enable Facebook Auth for your project, you need to set up a Facebook OAuth application and add the application credentials to your Supabase Dashboard.

- steps to follow

  - Create and configure a Facebook Application on the Facebook Developers Site
  - Add your Facebook keys to your Supabase Project
  - Add the login code to your Supabase JS Client App

    **1.Access your Facebook Developer account:**

  - Go to developers.facebook.com.
  - Click on Log In at the top right to log in.
  - Click on My Apps at the top right.
  - Click Create App near the top right.
  - Select your app type and click Continue.
  - Fill in your app information, then click Create App.
  - This should bring you to the screen: Add Products to Your App. (Alternatively you can click on Add Product in the left sidebar to get to this screen.)

    **2.Callback URI:**

  - Go to your Supabase Project Dashboard
  - Click on the Settings icon at the bottom of the left sidebar.
  - Click on API in the list.
  - Under Config / URL you'll find your API URL, you can click Copy to copy it to the clipboard.
  - Now just add /auth/v1/callback to the end of that to get your full OAuth Redirect URI.

    **3.Set up FaceBook Login for your Facebook App**
    From the Add Products to your App screen:

  - Click Setup under Facebook Login
  - Skip the Quickstart screen, instead, in the left sidebar, click Settings under Facebook Login
  - Enter your callback URI under Valid OAuth Redirect URIs on the Facebook Login Settings page
  - Enter this in the Valid OAuth Redirect URIs box
  - Click Save Changes at the bottom right

  **4.Copy your Facebook App ID and Secret**

  - Click Settings / Basic in the left sidebar
  - Copy your App ID from the top of the Basic Settings page
  - Under App Secret click Show then copy your secret
  - Make sure all required fields are completed on this screen.

  **Enter your Facebook App ID and Secret into your Supabase Project**

  - Go to your Supabase Project Dashboard
  - In the left sidebar, click the Authentication icon (near the top)
  - Click Settings from the list to go to the Authentication Settings page
  - Enter the final (hosted) URL of your app under Site URL (this is important)
  - Under External OAuth Providers turn Facebook Enabled to ON
  - Enter your Facebook client ID and Facebook secret saved in the previous step
  - Click Save

  **Add login code to your client app**

  ```javascript
  async function signInWithFacebook() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "facebook",
    });
  }
  ```

  Logout :

  ```javascript
  async function signout() {
    const { error } = await supabase.auth.signOut();
  }
  ```

you can integrate some of the social providers in your app. you can refer the below link
[Supabase Authentication Docs](https://supabase.com/docs/guides/auth/auth-email)

### Extra Notes

- In default you can't able to update the auth users table because of security issues. alternatively you can create a table in database for storing auth users.then insert the user details in this table.
- Create a table in database for storing auth users.

sample insert code snippet:

```javascript
const { data } = await supabase
  .from("profile")
  .insert([{ email: values.email, username: values.username, Refid: user.id }]);
```
