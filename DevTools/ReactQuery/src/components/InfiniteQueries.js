import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Fragment } from "react/cjs/react.production.min";
// import { useQuery } from "react-query";

const fetchSuperHero = ({ pageParam = 1 }) => {
  return axios.get(
    `http://localhost:4000/superheroes?_page=${pageParam}&_limit=3`
  );
};

export const InfiniteScrollPage = () => {

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["super-hero"], fetchSuperHero, {
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
