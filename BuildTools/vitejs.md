
# Introduction to Vite Js

  Vite impressingly fast. It took me 55 secs to install and run on local server. Vite is a no bundler DEV environment for react. js, created by Evan You.

- ##### Why should I use Vite?

  Vite improves the dev server start time by first dividing the modules in an application into two categories: dependencies and source code. Dependencies are mostly plain JavaScript that do not change often during development.

- ##### Why Vite JS is so fast?

  Vite is really fast, because it leverages native ES modules and doesn't need to rebuild the whole bundle when something changes. This makes it fast, regardless of the size of your application.

##### Create Vite Project

```sh
$ npm create vite@latest
# or
$ yarn create vite
# or
$ pnpm create vite
```

template:

```sh
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
```

Open package.json and add the following scripts:

```sh
{
  "scripts": {
    "dev": "vite", // start dev server, aliases: `vite dev`, `vite serve`
    "build": "vite build", // build for production
    "preview": "vite preview" // locally preview production build
  }
}
```

- ##### Run Comment

```sh
npm install
npm run dev
```

- ##### One last thing about importing files

  I have noticed that out the box this setup does not allow for absolute paths. With create-react-app, you can do

  ```sh
  import x from 'components/x'
  ```

   With Vite, you have to do the relative pathing, like

  ```sh
  import x from '../../../'
  ```

  To fix this we need to change the vite.config.js file, which looks like this:

  ```javaScript
    import { defineConfig } from 'vite' 
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
        plugins: [react()]
    })
  ```

  add an extra setting to resolve the path,

    ```javaScript
    import { defineConfig } from 'vite' 
    import react from '@vitejs/plugin-react'
    import path from 'path'

    // https://vitejs.dev/config/
    export default defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
            '@': path.resolve(__dirname, './src'),
            "components": path.resolve(__dirname, "./src/components"),
            },
        },
    })
  ```

  and this will allow us to refer to paths as

  ```sh
  import x from '@/component/x'
  import x from 'component/x'
  ```

#### server Options

- ##### server.port

  - Type: number
  - Default: 4173
  - example :

```javascript
export default defineConfig({
  server: {
    port: 3030
  }
})
```

- ##### server.host

  - Type: string | boolean
  - Default: '127.0.0.1'
  - example :

```javascript
export default defineConfig({
  server: {
    port: 3030,
    host: true
  }
})
```

- ##### server.proxy

  - Type: Record<string, string | ProxyOptions>
  - example :

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/': {
        target: 'http://localhost:8080/'
      },

      '/admin': {
        target: 'http://localhost:8081/'
      }
    }
  }
})
```

- ##### server.strictPort

  - Type: string | boolean
  - Set to true to exit if port is already in use, instead of automatically try the next available port.

#### Preview Options

- ##### preview.port

  - Type: number
  - Default: 4173
  - example :

```javascript
export default defineConfig({
  preview: {
    port: 3030
  }
})
```

- ##### preview.host

  - Type: string | boolean
  - Default: server.host
  - example :

```javascript
export default defineConfig({
  preview: {
    port: 3030,
    host: true
  }
})
```

- ##### preview.strictPort

  - Type: string | boolean
  - Default: server.strictPort
  - Set to true to exit if port is already in use, instead of automatically try the next available port.
  
- ##### preview.proxy

  - Type: Record<string, string | ProxyOptions>
  - Default: server.proxy
  - example :

```javascript
export default defineConfig({
  preview: {
    proxy: {
      '/': {
        target: 'http://127.0.0.1:5050'
      },

      '/admin': {
        target: 'http://localhost:8081/'
      }
    }
  }
})
```
