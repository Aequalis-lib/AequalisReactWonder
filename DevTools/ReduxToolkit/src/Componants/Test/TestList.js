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