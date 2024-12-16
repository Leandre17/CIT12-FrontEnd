import React from "react";
import Cooplayer from "./Cooplayer";
import { ImageById } from "./FetchData";

function Actor({ actor }) {
  return (
    <>
      <div>
        <h2>Primary Name: {actor.primaryname}</h2>
        {actor.birthyear !== "    " && <p>Birth Year: {actor.birthyear}</p>}
        {actor.deathyear !== "    " && <p>Death Year: {actor.deathyear}</p>}
        {actor.primaryprofession && <p>Primary Profession: {actor.primaryprofession}</p>}
      </div>
      <ImageById id={actor.nconst} name={actor.primaryname} />
      <Cooplayer actorName={actor.primaryname} />
    </>
  );
}

export default Actor;
