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
