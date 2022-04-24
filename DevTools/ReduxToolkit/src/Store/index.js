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
