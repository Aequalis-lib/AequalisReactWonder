# Formik

- Formik is a library that helps to deal with forms in react.
- It will help in three parts:
  - Manage the form data
  - Form submission
  - validation and display errors
- It is helpfull to deal with forms in a scalable, performant and easy way.

- installation

```javascript
    npm install formik
```

- create a simple form
- import useFormik hook

```javascript
import { useFormik } from "formik";

const formik = useFormik({});
```

### handling form state :

- initialize intial values for all input fields

```javascript
const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
    channel: "",
  },
});
```

- you can get input fields values from formik.values before you need to add value and onChange property to the input fields.

```javascript
        <input
          type="text"
          id="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          name="name"
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          name="email"
        />
```

### handling form submission

- add a submit function to the form

```javascript
    <form onSubmit={formik.handleSubmit}>
```

- add a onSubmit function in useFormik hook

```javascript
const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
    channel: "",
  },
  onSubmit: (values) => {
    console.log(values, "formData");
  },
});
```

### Validation :

- you can add validation functon to the useFormik hook like below.

```javascript
const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
    channel: "",
  },
  onSubmit: (values) => {
    console.log(values, "formData");
  },
  validate: (values) => {
    //values.name values.email values.channel
    //errors.name errors.email errors.channel
    //errors.name = "This field is required"
    let errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }

    if (!values.channel) {
      errors.channel = "Required";
    }

    return errors;
  },
});
```

### Schema validation with Yup

- Yup is a javascript schema builder for values parsing and validation
  installation

```
npm i yup
```

- import yup inside form

```javascript
import * as Yup from "yup";
```

- create a validate schema

```javascript
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});
```

so far :

- simple form
- useFormik hook
- managing form state, handling form submission and validation
- initialValues object + formik.handleChange
- onSubmit + formik.handleSubmit
- validate function
- validationSchema object
- formik.errors and formik.touched
- formik components - Formik,Form,Field and ErrorMessage

### some more concepts

- any additional props in the formfield component will be passed through to the input element

- you can render a different element other than input element

```javascript
<Field as="textarea" name="comments" id="comments" />
```

alternatively you can use the component property for as

- you can nest data in the form as object

```javascript
const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    fb: "",
    insta: "",
  },
};

<Field type="text" id="facebook" name="social.fb" />;
```

- and also you can nest data in the form as array

```javascript
const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    fb: "",
    insta: "",
  },
  phoneNumbers: ["", ""],
};

<Field type="text" id="phoneNUmbers" name="phoneNumbers[0]" />;
```

## Assessment for personal evaluation:

- Create a simple React app.
  - create a Login & signup forms with validation(use Yup for validation)
  - store the data in localstorage
  - show the stored data in home page

## FAQ :
