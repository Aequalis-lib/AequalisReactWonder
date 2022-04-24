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
