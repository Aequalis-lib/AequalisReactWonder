import "./App.css";
import CreatePost from "./Componants/Post/CreatePost";
import PostList from "./Componants/Post/PostList";
import Footer from "./Componants/Footer/Footer";
import Header from "./Componants/Header/Header";
import { Switch, Route } from "react-router-dom";
import PostDetail from "./Componants/Post/PostDetail";
import CommetList from "./Componants/Comments/CommentList";
import TestList from "./Componants/Test/TestList";
import CreateTest from "./Componants/Test/CreateTest";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/create" component={CreatePost} />
        <Route path="/post/:id" component={PostDetail} />
        <Route path="/commets" component={CommetList} />
        <Route path="/test/create" component={CreateTest} />
        <Route path="/test" component={TestList} />
        <Route path="/" component={PostList} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
