# Redux - The Complete Guide

## What is Redux?

**Redux is a pattern and library for managing and updating application state, using events called "actions".** It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.

## Why Should I Use Redux?

Redux helps you manage **"global"** state - state that is needed across many parts of your application.

Redux is more useful when :

- You have large amounts of application state that are needed in many places in the app.
- The app state is updated frequently over time.
- The logic to update that state may be complex.
- The app has a medium or large-sized codebase, and might be worked on by many people.

## Installation

```javascript
# NPM
npm install redux

# Yarn
yarn add redux
```

For other installation methods you can use [go to installation page](https://redux.js.org/introduction/installation) link.

## Redux Libraries and Tools

### React-Redux

**`React-Redux`** is our official package that lets your React components interact with a Redux store by reading pieces of state and dispatching actions to update the store.

```javascript
# NPM
npm install react-redux

# Yarn
yarn add react-redux
```

### Redux DevTools Extension

The **`Redux DevTools Extension`** shows a history of the changes to the state in your Redux store over time. This allows you to debug your applications effectively, including using powerful techniques like **`"time-travel debugging"`**.

[get Redux Devtool Extension here.](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

## Redux Terms and Concepts

### State Management

```javascript
const Counter = () => {
  // State: a counter value
  const [counter, setCounter] = useState(0);

  // Action: code that causes an update to the state when something happens
  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  // View: the UI definition
  return (
    <div>
      Value: {counter} <button onClick={increment}>Increment</button>
    </div>
  );
};
```

`It is a self-contained app with the following parts :`

- **`The state,`** the source of truth that drives our app.
- **`The view,`** a declarative description of the UI based on the current state.
- **`The actions,`** the events that occur in the app based on user input, and trigger updates in the state.

`This is a small example of` **`"one-way data flow"`** :

- State describes the condition of the app at a specific point in time.
- The UI is rendered based on that state.
- When something happens (such as a user clicking a button), the state is updated based on what occurred.
- The UI re-renders based on the new state.

![one-way data flow image](./images/one-way-data-flow.png)

### Immutability

**"Mutable"** means **"changeable"**. If something is **"immutable"**, it can never be changed.

JavaScript objects and arrays are all **mutable** by default.

**Redux** expects that all state updates are done **immutably**.

> **In order to update values immutably, your code must make copies of existing objects/arrays, and then modify the copies.**

## Terminology

There are some important Redux terms.

### Actions

An **action** is a plain JavaScript object that has a `type` field. **You can think of an action as an event that describes something that happened in the application**.

The `type` field should be a string that gives this action a descriptive name, like **`"add-todo"`**.

An action object can have other fields with additional information about what happened. By convention, we put that information in a field called **`payload`**.

```javascript
const addTodoAction = {
  type: 'add-todo',
  payload: 'Nataraj pencil',
};
```

### Action Creators

An **_action creator_** is a function that creates and returns an action object. We typically use these so we don't have to write the action object by hand every time :

```javascript
const addTodo = (text) => {
  return {
    type: 'add-todo',
    payload: text,
  };
};
```

### Reducers

A **`reducer`** is a function that receives the current `state` and an `action` object, decides how to update the state if necessary, and returns the new state: `(state, action) => newState`. **You can think of a reducer as an event listener which handles events based on the received action (event) type**.

`Reducers must always follow some specific rules :`

- They should only calculate the new state value based on the `state` and `action` arguments.

- They are not allowed to modify the existing `state`. Instead, they must make immutable updates, by copying the existing `state` and making changes to the copied values.

- They must not do any asynchronous logic, calculate random values, or cause other `"side effects."`

```javascript
const initialState = { value: 0 };

const counterReducer = (state = initialState, action) => {
  // Check to see if the reducer cares about this action
  if (action.type === 'increment') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1,
    };
  }
  // otherwise return the existing state unchanged
  return state;
};
```

### Store

The current Redux application state lives in an object called the `store` .

```javascript
import { createStore } from 'redux';
import rootReducer from './reducers';

const initialState = {};

const store = createStore(rootReducer, initialState);

export default store;
```

The redux store has a methods called `getState` and `dispatch`.

**`store.getState()`** that returns the current state value.

The only way to update the state is to call **`store.dispatch()`** and pass in an action object.

```javascript
store.dispatch({ type: 'increment' });

console.log(store.getState());
// {value: 1}
```

`We typically call action creators to dispatch the right action :`

```javascript
const increment = () => {
  return {
    type: 'counter/increment',
  };
};

store.dispatch(increment());

console.log(store.getState());
// {value: 2}
```

## Redux Application Data Flow

- **`Initial setup`** :

  - A Redux store is created using a root reducer function.
  - The store calls the root reducer once, and saves the return value as its initial `state.`
  - When the UI is first rendered, UI components access the current state of the Redux store, and use that data to decide what to render. They also subscribe to any future store updates so they can know if the state has changed.

- **`Updates`** :

  - Something happens in the app, such as a user clicking a button.
  - The app code dispatches an action to the Redux store, like `dispatch({type: 'increment'})`.
  - The store runs the reducer function again with the previous `state` and the current `action`, and saves the return value as the new `state`.
  - The store notifies all parts of the UI that are subscribed that the store has been updated.
  - Each UI component that needs data from the store checks to see if the parts of the state they need have changed.
  - Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen.

  **`Here's what that data flow looks like visually :`**

  ![Redux work flow](./images/redux-flow.gif)

  ### Set-up

  Initialise and provide store to the components.

  ```javascript
  import { createStore } from 'redux';
  import rootReducer from './reducers';

  const initialState = {};

  const store = createStore(rootReducer, initialState);

  export default store;
  ```

  Here we can send another argument to createStore method which is middleware.

  ```javascript
  import { createStore, applyMiddleware } from 'redux';
  import thunk from 'redux-thunk';
  import rootReducer from '../reducers';

  const initialState = {};

  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

  export default store;
  ```

  ### Using Middleware to Enable Async Logic

  a `Redux store` doesn't know anything about async logic. It only knows how to synchronously dispatch actions, update the state by calling the root reducer function, and notify the UI that something has changed. Any asynchronicity has to happen outside the store.

  But, what if you want to have async logic interact with the store by dispatching or checking the current store state? That's where [Redux middleware](https://redux.js.org/tutorials/fundamentals/part-4-store#middleware) come in. They extend the store, and allow you to:

  - Execute extra logic when any action is dispatched (such as logging the action and state)
  - Pause, modify, delay, replace, or halt dispatched actions
  - Write extra code that has access to dispatch and getState
  - Teach `dispatch` how to accept other values besides plain action objects, such as functions and promises, by intercepting them and dispatching real action objects instead

  [The most common reason to use middleware is to allow different kinds of async logic to interact with the store](https://redux.js.org/faq/actions#how-can-i-represent-side-effects-such-as-ajax-calls-why-do-we-need-things-like-action-creators-thunks-and-middleware-to-do-async-behavior).

  This allows you to write code that can dispatch actions and check the store state, while keeping that logic separate from your UI.

  There are many kinds of async middleware for Redux, and each lets you write your logic using different syntax. The most common async middleware are:

  - [`redux-thunk`](https://github.com/reduxjs/redux-thunk), which lets you write plain functions that may contain async logic directly.
  - [`redux-saga`](https://github.com/redux-saga/redux-saga), which uses generator functions that return descriptions of behavior so they can be executed by the middleware.
  - [`redux-observable`](https://github.com/redux-observable/redux-observable/), which uses the RxJS observable library to create chains of functions that process actions.

  > If you do need to write data fetching logic yourself, we recommend using the **_Redux Thunk_** middleware as the standard approach, as it is sufficient for most typical use cases (such as basic AJAX data fetching). In addition, use of the **_async/await_** syntax in thunks makes them easier to read.

  ```javascript
  // Define a thunk that dispatches those action creators
  const fetchUsers = () => async (dispatch) => {
    dispatch(usersLoading());
    const response = await usersAPI.fetchAll();
    dispatch(usersReceived(response.data));
  };
  ```

  ### Redux devtool configuration & applying custom middlewares

  ```javascript
  import { createStore, applyMiddleware, compose } from 'redux';
  import rootReducer from './reducers';
  import thunk from 'redux-thunk';
  import { customMiddleware } from '../middlewares';

  const initialState = {};
  let middleware = applyMiddleware(thunk, customMiddleware);

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    const devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
    middleware = compose(middleware, devtools);
  }

  export default createStore(rootReducer, initialState, middleware);
  ```

  Once the store is created, we can make it available to our React components by putting a React-Redux `<Provider>` around our application in `src/App.js`. Import the Redux store we just created, put a `<Provider>` around your `<App>`, and pass the store as a prop:

  ```javascript
  import React from 'react';
  import { Provider } from 'react-redux';
  import store from '../store';

  const App = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

  export default App;
  ```

  ### Creating reducer

  ```javascript
  const initialState = {
    count: 0,
  };

  const CounterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'increment': {
        state = {
          ...state,
          count: state.count + 1,
        };
        break;
      }
      case 'decrement': {
        state = {
          ...state,
          count: state.count - 1,
        };
        break;
      }
      default:
        break;
    }

    return state;
  };

  export default CounterReducer;
  ```

### Creating actions

```javascript
const increment = () => ({ type: 'increment' });

const decrement = () => ({ type: 'increment' });
```

### Use Redux State and Actions in React Components

Now we can use the React-Redux hooks to let React components interact with the Redux store. We can read data from the store with `useSelector`, and dispatch actions using `useDispatch`. Create a `src/Counter.js` file with a `<Counter>` component inside, then import that component into `App.js` and render it inside of `<App>`.

```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './CounterReducerActions';

const Counter = () => {
  const count = useSelector((state) => state.CounterReducer.count);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
};
```

Now, any time you click the `"Increment"` and `"Decrement"` buttons:

- The corresponding Redux action will be dispatched to the store.
- The CounterReducer will see the actions and update its state.
- The `<Counter>` component will see the new state value from the store and re-render itself with the new data.

### When we have more than one reducer

Consider that we have two reducers called CounterReducer and UserReducer.

```javascript
import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import CounterReducer from './CounterReducer';

export default combineReducers({ UserReducer, CounterReducer });
```

you can import this file in store as rootReducer and provide to the components.

> **SUMMARY**<br> > **Create a Redux store with createStore**  
> createStore accepts a reducer function as a named argument.<br>  
> **Provide the Redux store to the React application components**
> Put a React-Redux `<Provider>` component around your `<App />`.  
> Pass the Redux store as `<Provider store={store}>`<br>  
> **Create and export actions/action creators**<br> > **Use the React-Redux useSelector/useDispatch hooks in React components**<br>
> Read data from the store with the `useSelector` hook
> Get the dispatch function with the `useDispatch` hook, and dispatch actions as needed.

## Assessment

Create a web app with user login page and user register page.<br>
`Login-screen -->` username and password inputs<br>
`Register-screen -->`User registration form with name,password,confirm password inputs.
Make the app private by sign-in the app using registered users only.

## FAQ
