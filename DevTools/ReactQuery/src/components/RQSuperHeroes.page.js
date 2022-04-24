import axios from "axios";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
// import { useQuery } from "react-query";

const fetchSuperHero = ()=>{
  return axios.get("http://localhost:4000/superheroes");
}

const postSuperHero = (data) => {
  return axios.post("http://localhost:4000/superheroes", data);
};

export const RQSuperHeroesPage = () => {
    const [name, setName] = useState("");
    const [alterEgo, setAlterEgo] = useState("");
    
    const onSuccess = (data) => {
      console.log("success", data);
    };
    const onError = (error) => {
      console.log("error", error);
    };
    
    const { data:heros,isLoading,isError,error,isFetching } = useQuery("super-hero", fetchSuperHero,
    {
      onSuccess,
      onError
    });
  // const { isLoading, isError, data, error ,isFetching,refetch} = useQuery(
  //   "super-hero",
  //   fetchSuperHero,
  //   {
  //     onSuccess:onSuccess,
  //     onError:onError
  //   }
  // );
  const addhero = useMutation((data) => postSuperHero(data));
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
    // if (isFetching) {
    //   return <h2>isFetching...</h2>;
    // }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
 
    const handleAddHeroClick = () => {
       const hero = { name, alterEgo };
      addhero.mutate(hero, {
        onSuccess: (data) => {
          console.log("datasuccess");
        },
        onError: (data) => {
          console.log("dataError");
        },
      });
    };
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {/* <button onClick={refetch}>refetch</button> */}

      <div>
        <input
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="alterEgo"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={()=>handleAddHeroClick()}>Add Hero</button>
      </div>
      
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
    </>
  );
};
