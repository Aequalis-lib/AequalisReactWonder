# Redux-Toolkit

The `Redux Toolkit` package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:
- Configuring a Redux store is too complicated
- I have to add a lot of packages to get Redux to do anything useful
- Redux requires too much boilerplate code

## Installation

You can install redux toolkit and react-redux with NPM or Yarn

### `npm`

```javascript 
 $ npm i @reduxjs/toolkit react-redux
 # or
 $ yarn add @reduxjs/toolkit react-redux
```

### `Create a Redux Store​`

- Create a file named src/Store/index.js. Import the configureStore API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it:
```javascript
    import { configureStore } from '@reduxjs/toolkit'

    export const store = configureStore({
        reducer: {},
    })
```

```javascript
    import { configureStore } from "@reduxjs/toolkit";
    import postReducer from "./post/postSlice";
    import commentReducer from "./comment/commentSlice";
    import counterReducer from "./counter/counterSlice";
    import { api } from "./post/CreateApi";

    const store = configureStore({
    reducer: {
        posts: postReducer,
        comments: commentReducer,
        counter: counterReducer,
        [api.reducerPath]: api.reducer,
    },
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(api.middleware),
    });

    export default store;
```
### `Redux toolkit provider​`
- Import the Redux store we just created, put a <Provider> around your <App>, and pass the store as a prop:

```javascript
    import React from 'react'
    import ReactDOM from 'react-dom'
    import './index.css'
    import App from './App'
    import { store } from './app/store'
    import { Provider } from 'react-redux'

    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
    )
```
### `Create a Redux State Slice`
Add a new file named src/store/counter/counterSlice.js. In that file, import the createSlice API from Redux Toolkit.

```javascript
    import { createSlice } from '@reduxjs/toolkit'

    const initialState = {
    value: 0,
    }

    export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
        state.value += 1
        },
        decrement: (state) => {
        state.value -= 1
        },
        incrementByAmount: (state, action) => {
        state.value += action.payload
        },
    },
    })

    // Action creators are generated for each case reducer function
    export const { increment, decrement, incrementByAmount } = counterSlice.actions

    export default counterSlice.reducer
```
### `Add Slice Reducers to the Store​`

```javascript
    import { configureStore } from "@reduxjs/toolkit";
    import counterReducer from "./counter/counterSlice";

    const store = configureStore({
    reducer: {
        counter: counterReducer,
        }
     });

    export default store;
```
### `Use Redux State and Actions in React Components`
- Now we can use the React-Redux hooks to let React components interact with the Redux store. We can read data from the store with useSelector, and dispatch actions using useDispatch. 
``` javascript 
    import React from 'react'
    import { useSelector, useDispatch } from 'react-redux'
    import { decrement, increment } from './counterSlice'

    export function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
        <div>
            <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
            >
            Increment
            </button>
            <span>{count}</span>
            <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
            >
            Decrement
            </button>
        </div>
        </div>
    )
    }
```

### `Add createAsyncThunk to the Store​`
 createAsyncThunk will generate three Redux action creators using createAction : pending , fulfilled , and rejected . Each lifecycle action creator will be attached to the returned thunk action creator so that your reducer logic can reference the action types and respond to the actions when dispatched. 

 create a thunk in store/comment/commentSlice.js.js file:
 ```javascript
 import { createAsyncThunk } from '@reduxjs/toolkit'

export const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchCommet = createAsyncThunk(
  `comments/fetchCommet`,
  async ({ limit },{signal}) => {
    const response = await fetch(`${API_URL}/comments?_limit=${limit}`, {
      signal,
    }).then((res) => res.json());
    return response;
  }
);
 ```
 - #### Parameters 
    createAsyncThunk accepts three parameters: a string action type value, a payloadCreator callback, and an options object.
    - type - pending, fulfilled, rejected
    - payloadCreator :
        - arg - dispatch(fetchUsers({status: 'active', sortBy: 'name'}))
        - thunkAPI - dispatch, getState, extra, requestId, signal, rejectWithValue, fulfillWithValue
- #### Extra Reducers
    One of the key concepts of Redux is that each slice reducer "owns" its slice of state, and that many slice reducers can independently respond to the same action type.  extraReducers allows createSlice to respond to other action types besides the types it has generated.
- #### Extra Reducers notations
    There are two types of notations
    - builder callback notation
    - map object notation

    ```javascript 
        import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

        export const API_URL = "https://jsonplaceholder.typicode.com";

        export const HTTP_STATUS = Object.freeze({
        PENDING: "PENDING",
        FULFILLED: "FULFILLED",
        REJECTED: "REJECTED",
        });


        const namespace = "comments";

        export const fetchCommet = createAsyncThunk(
        `${namespace}/fetchCommet`,
            async ({ limit },{signal}) => {
                const response = await fetch(`${API_URL}/comments?_limit=${limit}`, {
                signal,
                }).then((res) => res.json());
                return response;
            }
        );

        const commentSlice = createSlice({
            name: namespace,
            initialState: {
                loading: null,
                data: null,
                errorMessage: null,
            },
            reducers: {},
            extraReducers: {
                [fetchCommet.pending](state) {
                state.loading = HTTP_STATUS.PENDING;
                },
                [fetchCommet.fulfilled](state, actions) {
                state.loading = HTTP_STATUS.FULFILLED;
                state.data = actions.payload;
                },
                [fetchCommet.rejected](state, { error }) {
                state.loading = HTTP_STATUS.REJECTED;
                state.errorMessage = error.message;
                },
            },
        });

        export const commentActions = commentSlice.actions;

        export default commentSlice.reducer;
    ```
    - Store Reducers

    ```javascript
        import { configureStore } from "@reduxjs/toolkit";
        import commentReducer from "./comment/commentSlice";

        const store = configureStore({
            reducer: {
                comments: commentReducer,
            },
        });

        export default store;
    ```
    - create a file name src/componants/comments/commentList.js

    ```javascript
        import React, { useEffect } from "react";
        import { useDispatch, useSelector } from "react-redux";
        import { fetchCommet } from "../../Store/comment/commentSlice";

        const CommetList = () => {
        const data = useSelector((state) => state.comments.data);
        const dispatch = useDispatch();

        useEffect(() => {
            const promise = dispatch(fetchCommet({ limit: 5 }));
            return () => {
            promise.abort();
            };
        }, [dispatch]);

        return (
            <div className="blogs content">
            <h2>
                All Comments &nbsp;&nbsp;&nbsp; No.of Comments : {data ? data.length : "0"}
            </h2>
            {data ? (
                data.map(({ id, postId, body, name, email }) => (
                <div className="single" key={id} >
                    <p className="snippet">PostId Id : {postId}</p>
                    <p className="snippet">Name : {name}</p>
                    <p className="snippet">Email Id : {email}</p>
                    <p className="snippet">Body : {body}</p>
                </div>
                ))
            ) : (
                <p>There are no comments to display...</p>
            )}
            </div>
        );
        };

        export default CommetList;

    ```
- #### `Send Data to backend useing usecreateAsyncThunk`
    ```javascript
        import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
        import { API_URL,HTTP_STATUS } from "../../Componants/Helpers/help";

        const namespace = "posts";

        export const createPost = createAsyncThunk(
        `${namespace}/createPost`,
            async (payload) => {
                console.log(payload)
                fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    userId: payload.userId,
                    title: payload.title,
                    body: payload.body,
                }),
                })
                .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err)=>console.log(err))
                
            }
        );

        const postSlice = createSlice({
        name: namespace,
        initialState: {
            loading: null,
            data: [],
            errorMessage: null,
        },
        reducers: {},
        extraReducers: {
            [createPost.pending](state) {
            state.loading = HTTP_STATUS.PENDING;
            },
            [createPost.fulfilled](state, actions) {
            state.loading = HTTP_STATUS.FULFILLED;
            state.data = actions.payload;
            },
            [createPost.rejected](state, { error }) {
            state.loading = HTTP_STATUS.REJECTED;
            state.errorMessage = error.message;
            },
        },
        });

        export const postActions = postSlice.actions;

        export default postSlice.reducer;
    ```
    - create a new file from components `src/components/post/createpost.js`

    ```javascript
         import React from "react";
        import { useForm } from "react-hook-form";
        import { useDispatch } from "react-redux";
        import { useHistory } from "react-router";
        import { createPost } from "../../Store/post/postSlice";

        const CreatePost = () => {
        const dispatch = useDispatch();
        const history = useHistory();
        const {
            register,
            handleSubmit,
            // setValue,
            formState: { errors },
        } = useForm();

        const postData = (data) => {
            const params = {
            userId: data.userId,
            title: data.title,
            body: data.body,
            };
            dispatch(createPost(params));
            // console.log("params", params);
            history.push("/");
        };
        
        return (
            <div className="create-blog content">
            <form
                onSubmit={handleSubmit((data) => {
                postData(data);
                })}
            >
                <label>User Id:</label>
                <input
                type="number"
                name="userId"
                {...register("userId", { required: true })}
                />
                {errors?.body && <p>User Id is required</p>}
                <label>Title:</label>
                <input
                type="text"
                name="title"
                {...register("title", { required: true })}
                />
                {errors?.title && <p>Title is required</p>}
                <label>Body:</label>
                <textarea name="body" {...register("body", { required: true })} />
                {errors?.body && <p>Body is required</p>}
                <button>Submit</button>
            </form>
            </div>
        );
        };

        export default CreatePost;
    ```
#### `Get data from backend use createAsyncThunk:`
```javascript
    import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
    import { API_URL,HTTP_STATUS } from "../../Componants/Helpers/help";

    const namespace = "posts";

    export const fetchPost = createAsyncThunk(
    `${namespace}/fetchPost`,
        async (obj,{ signal }) => {
            const response = await fetch(`${API_URL}/posts`, { signal }).then((res) =>
            res.json()
            );
            return response;
        }
    );

    export const fetchPostId = createAsyncThunk(
    `${namespace}/fetchPostId`,
        async (payload, { signal }) => {
            const response = await fetch(`${API_URL}/posts?id=${payload}`, {signal})
            .then((res) => res.json());
            return response;
        }
    );

    export const deletePost = createAsyncThunk(
    `${namespace}/deletePost`,
        async (id) => {
            console.log(id);
            fetch(`${API_URL}/posts/${id}`, {
                method: "DELETE",
            })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
        }
    );
        
    const postSlice = createSlice({
    name: namespace,
    initialState: {
        loading: null,
        data: [],
        errorMessage: null,
    },
    reducers: {},
    extraReducers: {
        [fetchPost.pending](state) {
        state.loading = HTTP_STATUS.PENDING;
        },
        [fetchPost.fulfilled](state, actions) {
        state.loading = HTTP_STATUS.FULFILLED;
        state.data = actions.payload;
        },
        [fetchPost.rejected](state, { error }) {
        state.loading = HTTP_STATUS.REJECTED;
        state.errorMessage = error.message;
        },
        [fetchPostId.pending](state) {
        state.loading = HTTP_STATUS.PENDING;
        },
        [fetchPostId.fulfilled](state, actions) {
        state.loading = HTTP_STATUS.FULFILLED;
        state.data = actions.payload;
        },
        [fetchPostId.rejected](state, { error }) {
        state.loading = HTTP_STATUS.REJECTED;
        state.errorMessage = error.message;
        },
    },
    });

    export const postActions = postSlice.actions;

    export default postSlice.reducer;
```
- create a new file from components `src/components/post/PostList.js`
```javascript
    import React, { useEffect } from "react";
    import {useDispatch, useSelector} from "react-redux";
    import { fetchPost } from "../../Store/post/postSlice";
    import { Link } from "react-router-dom";
    // import { unwrapResult } from "@reduxjs/toolkit";

    const PostList = () => {
    const data = useSelector((state) => state.posts.data);
    const dispatch = useDispatch(); 

        useEffect(() => {
        // dispatch(fetchPost())
        //   .then(unwrapResult)
        //   .then((obj) => console.log({ obj }))
        //   .catch((obj) => console.log({ objErr: obj }))
        const promise = dispatch(fetchPost());
        return () => {
            promise.abort();
        };
        }, [dispatch]);
    
    return (
        <div className="blogs content">
        <h2>
            All Posts &nbsp;&nbsp;&nbsp; 
            No.of post : {data ? data.length : "0"}
        </h2>
        {data ? (
            data.map(({ id, userId, title, body }) => (
            <Link
                className="single"
                key={id}
                to={`/post/${id}`}
                // onClick={() => history.push(`/post/${id}`)}
            >
                <h3 className="title">Title : {title}</h3>
                <p className="snippet">User Id : {userId}</p>
                <p className="snippet">Body : {body}</p>
            </Link>
            ))
        ) : (
            <p>There are no post to display...</p>
        )}
        </div>
    );
    };;

    export default PostList;

```

- create a new file from components `src/components/post/PostDetails.js`
```javascript
    //Get and delete data by id
    import React, { useEffect } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { deletePost, fetchPostId } from "../../Store/post/postSlice";
    import { useHistory } from "react-router";

    const PostDetail = (Props) => {
    const { match } = Props;
    const history = useHistory()
    const data = useSelector((state) => state.posts.data);
    const dispatch = useDispatch();

        useEffect(() => {
        dispatch(fetchPostId(match.params.id));
        }, [dispatch, match.params.id]);
        // console.log(data)
    
    return (
        <div>
        <button className="back-btn" onClick={() => history.goBack()}>
            &larr; Back
        </button>
        {data.map((post) => (
            <div className="details content" key={post.id}>
            <h3>Title : {post.title}</h3>
            <div className="content">
                <p>Id : {post.id}</p>
                <p>Content : {post.body}</p>
            </div>
            <span
                className="delete"
                onClick={() => {
                dispatch(deletePost(post.id));
                history.push("/");
                }}
            >
                delete
            </span>{" "}
            </div>
        ))}
        </div>
    );
    };

    export default PostDetail;

```
#### `createApi`

createApi is the core of RTK Query's functionality. It allows you to define a set of endpoints describe how to retrieve data from a series of endpoints, including configuration of how to fetch and transform that data.
- create a new file from components `src/components/post/CreateApi.js`
```javascript
    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

    export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com",
    }),
    tagTypes: ["Post"],
    endpoints: (build) => ({
        getPosts: build.query({
        query: () => "/posts",
        providesTags: (result, error, arg) =>
            result
            ? [...result.map(({ id }) => ({ type: "Post", id })), "Post"]
            : ["Post"],
        }),
        getPost: build.query({
        query: (id) => `/posts?id=${id}`,
        providesTags: (result, error, id) => [{ type: "Post", id }],
        }),
        addPost: build.mutation({
        query: (body) => ({
            url: `/posts`,
            method: "POST",
            body,
        }),
        invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),
    }),
    });

    export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation } = api;
    // export const postActions = postSlice.actions;

    // export default postSlice.reducer;
```
- create a new file from components `src/components/Test/TestList.js`

```javascript
    import React from 'react';
import { useGetPostsQuery } from "../../Store/post/CreateApi";
import { useHistory } from 'react-router';

const TestList = () => {
  const history  = useHistory();
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No Data found...</div>;
  }

  return (
    <div>
      <button onClick={() => history.push("/test/create")}>Add Test</button>
      {posts.map(({ id, userId, body }) => (
        <div className="single" key={id}>
          <p className="snippet">userId Id : {userId}</p>
          <p className="snippet">Body : {body}</p>
        </div>
      ))}
      {/* <div className="single">
        <p className="snippet">userId Id : {posts.data[0].user_id}</p>
        <p className="snippet">Body : {posts.data[0].body}</p>
      </div> */}
    </div>
  );
};

export default TestList;
```
#### `Task`
- create a sample app to get and get by id data from backend using create Async thunk? 

#### `FAQ`