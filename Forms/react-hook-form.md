# React Hook Form

## Installation

Installing React Hook Form only takes a single command and you're ready to roll.
```javascript
    npm install react-hook-form
```
### `Register fields`
One of the key concepts in React Hook Form is to register your component into the hook. This will make its value available for both the form validation and submission.

```javascript
    import React from "react";
    import { useForm } from "react-hook-form";

    export default function App() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} />
        <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
        </select>
        <input type="submit" />
        </form>
    );
    }
```
### `Apply validation`
List of validation:
- required
- min & max
- minLength & maxLength
- pattern
- validate

```javascript
    import React from "react";
    import { useForm } from "react-hook-form";

    export default function App() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName", { required: true, maxLength: 20 })} />
        <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        <input type="number" {...register("age", { min: 18, max: 99 })} />
        <input type="submit" />
        </form>
    );
    }
```
### `Form errors`
You can get the form errors by using the hook.

```javascript
    import React from "react";
    import { useForm } from "react-hook-form";

    export default function App() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName", { required: true })} />
            {errors.firstName?.type === 'required' && "First name is required"}
        
            <input {...register("lastName", { required: true })} />
            {errors.lastName && "Last name is required"}
        
            <input type="submit" />
        </form>
        );
    }
```
### `Schema Validation`
You can also use your own schema validation function.

```javascript
    import React from "react";
    import { useForm } from "react-hook-form";

    export default function App() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    
    const schema = {
        firstName: {
            required: true,
            minLength: 5,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i
        },
        lastName: {
            required: true,
            minLength: 5,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i
        },
        age: {
            required: true,
            min: 18,
            max: 99
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register(schema)} />
        <input type="submit" />
        </form>
    );
    }
```
### `Custom validation`
You can also use your own validation function.

```javascript
    import React from "react";
    import { useForm } from "react-hook-form";

    export default function App() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    
    const validateFirstName = value => value !== "admin" && "First name is not admin";
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register({ name: "firstName", validate: validateFirstName })} />
        <input type="submit" />
        </form>
    );
    }
```
### `Custom validation with async`
You can also use your own validation function.

```javascript
    import React from "react";
    import { useForm } from "react-hook-form";

    export default function App() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    
    const validateFirstName = async value => {
        const result = await fetch("https://api.github.com/users/" + value);
        const user = await result.json();
        return user.message === "Not Found" && "User not found";
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register({ name: "firstName", validate: validateFirstName })} />
        <input type="submit" />
        </form>
    );
    }
```
### `Custom validation with async and debounce and delay and error`
You can also use your own validation function.

```javascript
    import React from "react";
    import { useForm } from "react-hook-form";

    export default function App() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    
    const validateFirstName = async value => {
        const result = await fetch("https://api.github.com/users/" + value);
        const user = await result.json();
        return user.message === "Not Found" && "User not found";
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register({ name: "firstName", validate: validateFirstName, debounce: 1000, delay: 1000, error: "User not found" })} />
        <input type="submit" />
        </form>
    );
    }
```
### `Task`
- create a form with validation and submit
- create a form with custom validation

### `FAQ`
