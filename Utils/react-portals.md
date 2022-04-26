# React portal:

- we are going to create a modal using react portal.
- What is React portal ?
  React portal is just a way to render a components outside the normal DOM.

### Modal using React portal :

- Create a react project and do some cleanup
- Creat a reusable modal UI with state

```javascript
function Component() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        Fancy Modal
      </Modal>
    </div>
  );
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  );
}
```

> In the above snippet we are rendered the modal in the normal DOM. here the problem is that in the outputted HTML the modal is inside the component HTML.

- Now fix that issue using React portal.

- create a div in index.html with id of portal 

```jsx
    <div id="root"></div>
    <div id="portal"></div>
```

```javascript
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    //here we use createportal
    <div className="modal">
      <button onClick={onClose}>Close</button>
      {children}
    </div>,
    document.getElementById("portal") // rendered the content in the portal
  );
}
```

> Normally we render the component in root element (document.getElementById("root")). In the above code we rendered that modal un portal(document.getElementById("root")).

## Assessment for personal evaluation:

- Create a simple react app, create a button in onClick event show a modal.(modal should be rendered outside the normal DOM using react portal) 

## FAQ :

1.May i need to give element id in html file as Portal?
    No, you can give what id value you want. That is like normal id. 

