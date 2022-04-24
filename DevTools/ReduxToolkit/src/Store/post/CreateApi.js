import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const Post = [
//   {
//     id: "",
//     name: "",
//   },
// ];

// export const api = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://jsonplaceholder.typicode.com",
//   }),
//   tagTypes: ["Post"],
//   endpoints: (build) => ({
//     getPosts: build.query({
//       query: () => "/posts",
//       providesTags: (result, error, arg) =>
//         result
//           ? [...result.map(({ id }) => ({ type: "Post", id })), "Post"]
//           : ["Post"],
//     }),
//     getPost: build.query({
//       query: () => "/posts",
//       providesTags: (result, error, id) => [{ type: "Post", id }],
//     }),
//   }),
// });


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