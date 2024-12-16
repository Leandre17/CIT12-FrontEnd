import React from "react";
import Cooplayer from "./Cooplayer";
import { ImageById } from "./FetchData";

function Actor({ actor }) {
  return (
    <>
      <div>
        <h2>Primary Name: {actor.primaryname}</h2>
        <p>Birth Year: {actor.birthyear || "Unknown"}</p>
        <p>Death Year: {actor.deathyear || "Unknown"}</p>
        <p>Primary Profession: {actor.primaryprofession || "Unknown"}</p>
      </div>
      <ImageById id={actor.nconst} name={actor.primaryname} />
      <Cooplayer actorName={actor.primaryname} />
    </>
  );
}

export default Actor;
