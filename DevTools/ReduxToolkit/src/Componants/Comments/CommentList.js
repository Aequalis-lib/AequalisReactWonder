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
