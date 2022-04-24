import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useAddPostMutation } from "../../Store/post/CreateApi";

const CreateTest = () => {
  const history = useHistory();
  const [addPost, { isLoading }] = useAddPostMutation();
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm();

  const postData = async (data) => {
    const params = {
          user_id: data.userId,
          title: data.title,
          body: data.body
        };
    console.log("params", params);
    await addPost(params)
    history.push("/testList");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

export default CreateTest;
