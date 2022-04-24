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

export const testPost = createAsyncThunk(
  `${namespace}/testPost`,
  async () => {
    let fname = "logesh";
    let  lname = "kumar";
    let  occupation = "IT Employee";  
    const response = [fname, lname, occupation];
    return await response;
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
    test:['click the button'],
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
    [deletePost.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [deletePost.fulfilled](state, actions) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data = actions.payload;
    },
    [deletePost.rejected](state, { error }) {
      state.loading = HTTP_STATUS.REJECTED;
      state.errorMessage = error.message;
    },
    [testPost.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [testPost.fulfilled](state, actions) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.test = actions.payload;
    },
    [testPost.rejected](state, { error }) {
      state.loading = HTTP_STATUS.REJECTED;
      state.errorMessage = error.message;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;


