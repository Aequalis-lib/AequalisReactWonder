# Styled Components:

- styled-components utilises tagged template literals to style your components. It removes the mapping between components and styles. This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it.

## Pros and Cons of styled components:
- Pros:
    - Reusable
    - Pure CSS
    - Dynamic styling
    - Out-of-the-box theme support
    - Better performance
    - unique class names
- Cons:
    - Polluting the react DOM
    - unsusual approach

### Installation:

```javascript
npm install --save styled-components
```

### First styled component:

```javascript
//you can style your components like this
const Headline = styled.h1`
  color: green;
`;

function App() {
  return <Headline>The Headline</Headline>; //Wrap your children using those custom styled component.
}
```

- you can add more styles for that component
  ex:

```javascript
const Headline = styled.h1`
  color: green;
  font-size: 25px;
  margin: 0;
`;
```

### Extending styles:

- you don't need to write same styling for multiple components. you can use one component styles to another component.

```javascript
//Initial component
const Headline = styled.h1`
  color: green;
`;

//this component contains font style + Headline component stylings also
const HeadlineItalic = styled(Headline)`
  font-style: italic;
`;
```

> Note : You can also use thirdparty components to extend styles;

```javascript
import Button from "@mui/system";
const CustomBtn = styled(Button)`
  background: transparent;
`;
```

### Using props:

```javascript
//can get props from a component
const Headline = styled.h1`
  color: ${(props) => props.color};
`;

function App() {
  return <Headline color="red">Text</Headline>;
}
```

- you can also use props as conditionals.

```javascript
//below snippet we got props.show value we used that value for showing headline.
const Headline = styled.h1`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;

function App() {
  return <Headline show={false}>Text</Headline>;
}
```

### Theme Props :

- you can also provide and get themes.
  example code :

```javascript
import styled, { ThemeProvider } from "styled-components"; //import necessary packages

//you can get the theme values from props
const Head = styled.h1`
  color: ${(props) => props.theme.main};
`;
const theme = {
  main: "#14114a",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Head>Headline</Head>
    </ThemeProvider>
  );
}
```

### Styling existing components:

```javascript
const Headline = ({ className, children }) => (
  <h1 className={className}>{children}</h1>
);

const HeadlineStyled = styled(Headline)`
  color: red;
`;
```

> Note : You can use Styled objects alternatively for template literals

```javascript
const Headline = styled.h1({
  color: "red",
  fontSize: "50px",
});

//above code snippet is equal to below code snippet
const Headline = styled.h1`
  color: "red";
  font-size: "50px";
`;
```

> use css format for template literals , use CSS in JS for objects

### Connecting components:

- In the below snippet we connected wrapper component for hover effect.

```javascript
const Wrapper = styled.div`
  height: 400px;
  width: 400px;
  background-color: green;
`
const Text = styled.div`
  color: red;
  ${Wrapper}:hover & {
    color: blue;
}`
<Wrapper>
  <Text>Some Text</Text>
</Wrapper>
```

### Animations:

- To do animations initially you need to create keyframes for that animation.

```javascript
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
```

- Use the keyframe in animation property.

```javascript
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
`;
```

- then render it normally

```javascript
render(<Rotate>This text will rotate</Rotate>);
```

## Assessment for personal evaluation:

- Create a simple React app with navbar and theming toggle functionality using styled components.

## FAQ :

1.I have lot of custom components in a single file it feels like uncomfortable when project developing bigger and bigger, is there any solution for Optimising it?
You can store those stylings in seperate file. one style file for one component. then you can store common styings in seperate file it will help in code reusability
