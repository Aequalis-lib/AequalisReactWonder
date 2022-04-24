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
