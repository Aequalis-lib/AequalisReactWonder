import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
// import { useQuery } from "react-query";

const fetchSuperHero = (pageNumber) => {
  return axios.get(`http://localhost:4000/superheroes?_page=${pageNumber}&_limit=3`);
};

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: heros,
    isLoading,
    isError,
    error,
  } = useQuery(["super-hero", pageNumber],
    () => fetchSuperHero(pageNumber),
    {
      keepPreviousData: true,
    });

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
