# React router V6

- Create a sample project using CRA
- install the basic dependencies

```javascript
npm install react-router-dom
```

> If you need to use the old version commands in this new version you need to install the history package

```javascript
npm install react-router-dom@6 history@5
```

> Note : Mostly you will not need to use the history package.

- Do some cleanup
- Create a home component
- import browserrouter and routes from react-router-dom then wrap the home component using browser router.

```javascript
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

<Router>
  <Routes>
    <Route />
  </Routes>
</Router>;
```

> all of your routes should be encapsulated inside the Router

- initialize route component it take some params
  path = path for that component
  element = component for that page (or) you can write jsx inside this

```javascript
<Route path="/" element={<Home />} />
```

- create another component name Learn.jsx
- render that element in route

```javascript
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/myapps" element={<Learn />} />
  </Routes>
</Router>
```

> Note : React router v6 has full of hooks

## Navigate

- it will navigate the page to another page when the route is accessed.

```javascript
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/myapps" element={<Navigate replace to="learn" />} />
  <Route path="/learn" element={<Learn />} />
</Routes>;
```

## Link

> Diff between Link and A tag :<br /> when we use a tag it will reload the whole page that's why we are using the link tag

```javascript
import {
  BrowserRouter as Router,Bundle
Bundle
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

<Link to="/learn/course">courses</Link>
<Link to="/learn/bundle">bundle</Link>
```

- You can nest routes inside a route in react-router-dom version 6.

## Outlet

- Outlet actually defines precisely that where inside component should actually appear.

```javascript
<div>
  <h1>Learn</h1>
  <h1>All courses are listed here</h1>
  <Link to="/learn/course">courses</Link> |
  <Link to="/learn/bundle">bundle</Link>
  <Outlet />
</div>
```

- in the above code the child component will render in the outlet.

## useParams

- You can get URL params using useParams hook. when you use :id syntax in your route path.

```javascript
<Route path="/learn" element={<Learn />}>
  <Route path="course" element={<Courses />}>
    <Route path=":courseid" element={<CourseId />} />
  </Route>
  <Route path="bundle" element={<Bundles />} />
</Route>;

function CourseId() {
  const { courseid } = useParams();
  return (
    <div>
      <h1>URL Params is : {courseid}</h1>
    </div>
  );
}
```

## useNavigate

- use Link or Navlink to let the user change the URL. useNavigate to do it in code.

```jsx
import { useNavigate } from "react-router-dom";

function Invoices() {
  let navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          navigate(`/about`);
        }}
      >
        Go to about page{" "}
      </Button>
    </div>
  );
}
```

## Navlink

- Navlink is same as Link component. In couple of instances it is actually different.
  It have two more properties than normal Link component.

```javascript
<NavLink
  to={`/learn/course/${randomCourseName}`}
  style={({ isActive }) => {
    return {
      backgroundColor: isActive ? "pink" : "yellow",
    };
  }}
>
  {randomCourseName}
</NavLink>
```

- You can get isActive value from NavLink, you can use that value for conditionally update the active link styling.

## NotFoundRoute

- When no other route matches the URL, you can render a "not found" route using path="*".

```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

## Assessment for personal evaluation:

- Create a simple React app.
  - create a home page with navbar. show about,products,contact links in navbar.
  - when clicking the link it will redirect to the page
  - add the notfound page when the route is not available 
  - style the active link using Navlink

## FAQ :

