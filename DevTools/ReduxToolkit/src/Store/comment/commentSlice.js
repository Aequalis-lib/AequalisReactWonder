import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../../Componants/Helpers/help";

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
