import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <div>
      <nav>
        <div className="site-title">
          <Link to="/">
            <h1>Redux Toolkit</h1>
          </Link>
          <p>A logeshkumar Site</p>
        </div>
        <ul>
          <li>
            <Link to="/">View Posts</Link>
          </li>
          <li>
            <Link to="/create">New Post</Link>
          </li>
          <li>
            <Link to="/commets">View Commets</Link>
          </li>
          <li>
            <Link to="/test">test</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
