import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchData from "../Components/FetchData";
import Actor from "../Components/Actor";

const ActorPage = () => {
  const [Loading, setLoading] = useState(true);
  const { nconst } = useParams();
  const [actor, setActor] = useState([]);
  useEffect(() => {
    fetchData("api/Actor/" + nconst)
      .then((data) => {
        setActor(data);
        setLoading(false);
      });
  }, [nconst]);

  if (Loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <Actor actor={actor} />
    </div>
  );
};

export default ActorPage;
