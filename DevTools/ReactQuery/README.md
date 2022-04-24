# React Query

React Query is often described as the missing data-fetching library for React, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your React applications a breeze.


## Installation

You can install React Query with NPM or Yarn

### `npm`

```javascript 
 $ npm i react-query
 # or
 $ yarn add react-query
```

### `cdn`

```javascript
 <script src="https://unpkg.com/react-query/dist/react-query.production.min.js"></script>
```

### `Devtools`

- No need to install
- do not support React Native. 
```javascript
 import { ReactQueryDevtools } from 'react-query/devtools'
```
- By default, React Query Devtools are only included in bundles when process.env.NODE_ENV === 'development'


```javascript
 import { ReactQueryDevtools } from 'react-query/devtools'
 
 function App() {
   return (
     <QueryClientProvider client={queryClient}>
       {/* The rest of your application */}
       <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
   )
 }

```
### `Queries`
- A query can be used to GET and POST methods to fetch data from a server.
- A unique key for the query
- A function that returns:
    - Resolves the data
    - Throws an error

    ```javascript
    import { useQuery } from 'react-query'
    
    const fetchSuperHero = ()=>{
        return axios.get("http://localhost:4000/superheroes");
    }

    export function RQSuperHeroesPage() {
        const { data:heros, isLoading, isError, error, isFetching } = useQuery("super-hero",fetchSuperHero);
        if (isLoading || isFetching) {
            return <span>Loading...</span>
         }
 
        if (isError) {
            return <span>Error: {error.message}</span>
        }
 
        return (
            <ul>
                {heros?.data.map((hero) => (
                <>
                <li key={hero.id}>
                    <div>Name : {hero.name}</div>
                    <div>AlterEgo : {hero.alterEgo}</div>
                </li>
                <br />
                 </>
                ))}
            </ul>
        )
    }
    ```
    - onSuccess & onError in useQuery
      - onSuccess & onError is optional
      - This function will fire any time the query successfully fetches new data or the cache is updated via setQueryData.
      - This function will fire if the query encounters an error and will be passed the error.
     ```javascript
        const { isLoading, isError, data, error ,isFetching,refetch} = useQuery(
            "super-hero",
            fetchSuperHero,
            {
                onSuccess:(data) => {
                    console.log("success", data);
                },
                onError:(error) => {
                    console.log("error", error);
                },
            }
        );
     
     ```     
     or
     ```javascript
        
        const onSuccess = (data) => {
            console.log("success", data);
        };
        const onError = (error) => {
            console.log("error", error);
        };
        
        const { isLoading, isError, data, error ,isFetching,refetch} = useQuery(
            "super-hero",
            fetchSuperHero,
            {
                onSuccess,
                onError
            }
        );
     
     ```
### `Query Key`
- String-Only Query Keys
    ```javascript
     // A list of todos
     useQuery('todos', ...) // queryKey === ['todos']
 
     // Something else, whatever!
     useQuery('somethingSpecial', ...) // queryKey === ['somethingSpecial']

    ```
- Array Keys
    ```javascript
      // An individual todo
     useQuery(['todo', 5], ...)
     // queryKey === ['todo', 5]
 
     // An individual todo in a "preview" format
     useQuery(['todo', 5, { preview: true }], ...)
     // queryKey === ['todo', 5, { preview: true }]
 
     // A list of todos that are "done"
     useQuery(['todos', { type: 'done' }], ...)
     // queryKey === ['todos', { type: 'done' }]

    ```
  ### `Infinite Scroll`

    ```javascript
        const fetchSuperHero = ({ pageParam = 1 }) => {
            return axios.get(
            `http://localhost:4000/superheroes?_page=${pageParam}&_limit=3`
            );
        };

    ```
    ```javascript
    import { useInfiniteQuery } from "react-query";
    
    export const InfiniteScrollPage = () => {

        const { data, isLoading, isError, error, hasNextPage,fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(["super-hero"], fetchSuperHero, {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < 4) {
                    return pages.length + 1;
                } else {
                    return undefined;
                }
            },
        });

        if (isLoading) {
            return <h2>Loading...</h2>;
        }

        if (isError) {
            return <h2>{error.message}</h2>;
        }

        return (
            <>
            <h2>Infinite Queries Super Heroes Page</h2>
            <ul>
                {data?.pages.map((res, i) => {
                return (
                    <Fragment key={i}>
                    {res?.data.map((hero) => (
                        <li key={hero.id}>
                        <div>id : {hero.id}</div>
                        <div>Name : {hero.name}</div>
                        <div>AlterEgo : {hero.alterEgo}</div>
                        </li>
                    ))}
                    </Fragment>
                );
                })}
            </ul>
            <button onClick={fetchNextPage} disabled={!hasNextPage}>
                Load more..
            </button>
            <div>{isFetching && !isFetchingNextPage ? "Fetching...!" : null}</div>
            </>
        );
      };

    ```
  ### `Pagination `

    ```javascript
        const fetchSuperHero = (pageNumber) => {
            return axios.get(`http://localhost:4000/superheroes?_page=${pageNumber}&_limit=3`);
        };

    ```
    ```javascript
    import { useState } from "react";
    import { useQuery } from "react-query";
    
    export const PaginatedQueriesPage = () => {
        const [pageNumber, setPageNumber] = useState(1);

        const { data: heros, isLoading, isError, error } = useQuery(["super-hero", pageNumber],() => fetchSuperHero(pageNumber),{ keepPreviousData: true });

        if (isLoading) {
            return <h2>Loading...</h2>;
        }

        if (isError) {
            return <h2>{error.message}</h2>;
        }

        return (
            <>
            <h2>React Query pagination Super Heroes Page</h2>
            <ul>
                {heros?.data.map((hero) => (
                <>
                    <li key={hero.id}>
                    <div>id : {hero.id}</div>
                    <div>Name : {hero.name}</div>
                    <div>AlterEgo : {hero.alterEgo}</div>
                    </li>
                    <br />
                </>
                ))}
            </ul>
            <button
                onClick={() => setPageNumber((page) => page - 1)}
                disabled={pageNumber === 1}
            >
                Prev Page
            </button>
            <button onClick={() => setPageNumber((page) => page + 1)}>
                Next Page
            </button>
            </>
        );
        };


    ```
  ### `Mutations`
  - Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects. For this purpose, React Query exports a useMutation hook.

    ```javascript
     const postSuperHero = (data) => {
        return axios.post("http://localhost:4000/superheroes", data);
     };
    ```

    ```javascript
     import { useState } from "react";
     import { useQuery, useMutation } from "react-query";

     export const RQSuperHeroesPage = () => {
        const [name, setName] = useState("");
        const [alterEgo, setAlterEgo] = useState("");
        
        const addhero = useMutation((data) => postSuperHero(data));
                                (or)
        // const addData = useMutation((data) => postSuperHero(data), {
            //   onSuccess: (data) => {
            //     console.log("success", data);
            //   },
            //   onError: (error) => {
            //     console.log("error", error);
            //   },
            // });

            if (isLoading ||isFetching) {
                return <h2>Loading...</h2>;
            }

            if (isError) {
                return <h2>{error.message}</h2>;
            }
            
            const handleAddHeroClick = () => {
                const hero = { name, alterEgo };
                
                addhero.mutate(hero, {
                    onSuccess: (data) => {
                        console.log("Submit Data Success");
                    },
                    onError: (data) => {
                        console.log("Submit Data Error");
                    },
                    onSettled: (data, error, variables, context) => {
                         console.log("Finaly Data Stored");
                     },
                });
            };
            return (
                <div>
                    <input type="text" value={name} placeholder="name"   onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="alterEgo" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />

                    <button onClick={()=>handleAddHeroClick()}>Add Hero</button>
                </div>
            );
        };


    ```

  - The mutate cannot use it directly in an event callback in React 16 and earlier. If you need to access the event in onSubmit you need to wrap mutate in another function.

    ```javascript
        // This will not work in React 16 and earlier
        const CreateTodo = () => {
        const mutation = useMutation(event => {
            event.preventDefault()
            return fetch('/api', new FormData(event.target))
        })
        
        return <form onSubmit={mutation.mutate}>...</form>
        }
        
        // This will work
        const CreateTodo = () => {
        const mutation = useMutation(formData => {
            return fetch('/api', formData)
        })
        const onSubmit = event => {
            event.preventDefault()
            mutation.mutate(new FormData(event.target))
        }
        
        return <form onSubmit={onSubmit}>...</form>
        }

    ```
  ### `Task`
    - useQuery use to fetch the data and pagination from this api https://jsonplaceholder.typicode.com/users ?
  ### `FAQ`
    - create a student form 