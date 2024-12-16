import React from "react";
import { useEffect, useState } from "react";
import fetchData from "./FetchData";
import { Pagination, handlePreviousPage, handleNextPage } from "./Pagination";
import { useNavigate } from "react-router-dom";

const CoplayerPage = ({ actorName }) => {
  const [Coplayer, setCoplayer] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData("api/FindCoplayers/Search?actorName=" + actorName + "&page=" + page)
      .then((data) => {
        setCoplayer(data.items);
        setLoading(false);
        setTotalPages(data.numberPages);
      });
  }, [actorName, page]);
  if (Loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>Coplayer</h1>
      {Coplayer.map((item) => (
        <span key={item.nconst}>
          <button onClick={() => navigate(`/actor/${item.nconst}`)}>{item.primaryName}</button>
        </span>
      ))}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPreviousPage={() => handlePreviousPage(setPage)}
        onNextPage={() => handleNextPage(setPage)}
      />
    </div>
  );
};

export default CoplayerPage;
