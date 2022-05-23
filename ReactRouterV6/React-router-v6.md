---
Author: "VINOTHKUMAR S"
Source: "reactrouter.com"
DATE: "2022-05-23"
EstimatedTime: 1.5hrs
---

# React-Router

**React Router** is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.

## Installation

> npm install react-router-dom@6

## Configuring Routes

### Connect the URL

we want to connect your app to the browser's URL, import `BrowserRouter` and render it around your whole app (root component).

```javascript
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### Links

`Links` are used to navigate us to the required paths/set browser url as we want.

```javascript
import { Link } from "react-router-dom";

<Link to="/about">About</Link>
<Link to="/gallery">Gallery</Link>
```

`<NavLink>`is a special kind of `<Link>` that knows whether or not it is "**active**". This is useful when building a navigation menu such as a breadcrumb or a set of tabs where you'd like to show which of them is currently selected. It also provides useful context for assistive technology like screen readers.

```javascript
<NavLink
  to="about"
  style={({ isActive }) =>
    isActive ? activeStyle : undefined
  }
>
  About
</NavLink>
<NavLink
  to="gallery"
  className={({ isActive }) =>
    isActive ? activeClassName : undefined
  }
>
  Gallery
</NavLink>
<NavLink to="tasks">
    {({ isActive }) => (
      <span
        className={
          isActive ? activeClassName : undefined
        }
      >
        Tasks
      </span>
    )}
  </NavLink>
```

> style and className prop's call-backs in NavLink will only give isActive as props.

### Navigating Programmatically

Most of the time the URL changes is in response to the user clicking a link. But sometimes you, the programmer, want to change the URL. A very common use case is after a data update like creating or deleting a record.

Let's add a button and add navigation to it.

```javascript
<button
  onClick={() => {
    delete user.id;
    navigate("/" + location.search);
  }}
>
  Delete
</button>
```

The above code will redirect our page to home.

> Note : Notice we used **useLocation** again to persist the query string by adding **location.search** to the navigation link.

### Routes

`Route` is an element where you can define the rendering component when the browser URL is match with the URL you set to `links/NavLinks`.

Whenever the location changes, `<Routes>` looks through all its children `<Route>` elements to find the best match and renders that branch of the UI. `<Route>` elements may be nested to indicate nested UI, which also correspond to nested URL paths.

> Note : You should declare `<Route>` tag always inside the `<Routes>` tag.

```javascript
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./routes/About";
import Gallery from "./routes/Gallery";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="About" element={<About />} />
      <Route path="Gallery" element={<Gallery />} />
    </Routes>
  </BrowserRouter>
);
```

We should declare the component (which we gonna render) to the element prop and it must be in JSX format.

Here paths are relative to parent components so that you dont need to specify `'/'` symbol before the path string.

### Nested Routes

Repeating shared layouts is a pain in the neck. We've learned that most UI is a series of nested layouts that almost always map to segments of the URL so this idea is baked right in to React Router.

Let's get some automatic, persistent layout handling by doing just two things:

- Nest the routes inside of the App route
- Render an Outlet

```javascript
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./routes/About";
import Gallery from "./routes/Gallery";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
```

Here you can notice that about and gallery are written inside the `<Route path='/' element={<App/>}></Route>` tag.Which means about and gallery are childrens (nested routes).

### Outlet

We should notify the browser that where should we render about and gallery component inside the `<App/>` for that purpose we using `<Outlet/>`tag.

```javascript
import { Outlet, Link } from "react-router-dom";

export default const App=()=> {
  return (
    <div>
      <h1>Aequalisis</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/about">About</Link> |{" "}
        <Link to="/gallery">Gallery</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

### Adding a "No Match" Route

That didn't go as you might have expected. If you click those links the page goes blank! That's because none of the routes we've defined match a URL like the ones we're linking to: "/gallery/123".

```javascript
<Routes>
  <Route path="/" element={<App />}>
    <Route path="about" element={<About />} />
    <Route path="gallery" element={<Gallery />} />
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

The `"*"` has special meaning here. It will match only when no other routes do.

### Index Routes

Right now you're probably looking at one of the images. Click on the "Gallery" link in the global nav of your app. Notice that the main content area goes blank! We can fix this with an `"index"` route.

```javascript
<Routes>
  <Route path="/" element={<App />}>
    <Route path="about" element={<About />} />
    <Route path="gallery" element={<Gallery />}>
      <Route
        index
        element={
          <main style={{ padding: "1rem" }}>
            <p>Select an Image</p>
          </main>
        }
      />
      <Route path=":imageId" element={<Image />} />
    </Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

Now the index route fills the empty space!

Notice it has the **index** prop instead of a **path**. That's because the index route shares the path of the parent. That's the whole point--it doesn't have a path.

There are a few ways we try to answer the question **"what is an index route?"**.

- Index routes render in the parent routes outlet at the parent route's path.
- Index routes match when a parent route matches but none of the other children match.
- Index routes are the default child route for a parent route.
- Index routes render when the user hasn't clicked one of the items in a navigation list yet.

### Reading URL Params

```javascript
//Image component
export default const Image=()=> {
  return <h2>Image #???</h2>;
}
```

We'd like to render the image number/id instead of `"???"`. Normally in React you'd pass this as a prop: `<Invoice imageId="123" />`, but you don't control that information because it comes from the URL.

Let's define a route that will match these kinds of URLs and enable us to get the image number/id from it.

```javascript
<Routes>
  <Route path="/" element={<App />}>
    <Route path="about" element={<About />} />
    <Route path="gallery" element={<Gallery />}>
      <Route path=":imageId" element={<Image />} />
    </Route>
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>;

//Image component
export default function Image() {
  return <h2>Image #???</h2>;
}
```

> A couple things to note :

- We just created a route that matches urls like `"/gallery/2005"` and `"/gallery/1998"`. The `:imageId` part of the path is a `"URL param"`, meaning it can match any value as long as the pattern is the same.
- The `<Route>` adds a second layer of route nesting when it matches:<br/>
  `<App><Gallery><Image /></Gallery></App>`. Because the `<Route>` is nested the UI will be nested too.

```javascript
import { Link, Outlet } from "react-router-dom";
import images from './constants';

export default const Gallery=()=> {
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {images.map((image) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/gallery/${image.id}`}
            key={image.id}
          >
            {image.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
```

```javascript
import { useParams } from "react-router-dom";

export default const Image=()=> {
  let params = useParams();
  return <h2>Image: {params.imageId}</h2>;
}
```

> Note that the key of the param on the params object is the same as the dynamic segment in the route path:<br/><br/> > **:imageId -> params.imageId**

### Search Params

`Search params` are like URL params but they sit in a different position in the URL. Instead of being in the normal URL segments separated by `/`, they are at the end after a `?`. You've seen them across the web like "/login?success=1" or `"/shoes?brand=nike&sort=asc&sortby=price"`.

**React Router** makes it easy to read and manipulate the search params with **useSearchParams**. It works a lot like **React.useState()** but stores and sets the state in the URL search params instead of in memory.

### Process

```javascript
import {useSearchParams} from "react-router-dom";

//Inside the functional component
let [searchParams, setSearchParams] = useSearchParams();

//accessing date from searchParams
const status=searchParams.get("status");

//set data to searchParams
setSearchParams({ 'status=success' }
```

## Getting Help

If you're having trouble, check out the [Resources](https://reactrouter.com/docs/en/v6/getting-started/installation) page to get help. Good luck!

## Assessment :

1. Create nav-bar with sports and about links.
2. By default ('/home' or '/') should render form page where you can add sport name to the sports group.<br/>
   `2(a)-->`Should show count of each sport group above the sport form,get the count data from search params.
3. Form elements are sport name,group(ex:indoor,outdoor)
4. On successful addition of new sport you should show sport count of each group in url as searchparams (ex:indoor=3)
   > Now you can understand point 2(a).
5. On clicking sports tab redirect the page to '/sports' and show two cards named indoor and outdoor
6. On clicking, one of those cards should render the list of sport names(ex:chess for indoor and cricket for outdoor) comes under that particular group below that card.
7. On clicking one of the sports name that rendered below the card you should render images relevent to that particular sport/game below the sport name.
   8.Points 5,6,7 should render on same page(nested).
8. On clicking about page you should render definition of each sport.
