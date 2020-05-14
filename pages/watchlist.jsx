import React, { useState } from "react";
import MainPage from "../src/components/MainPage";
import fetch from "isomorphic-unfetch";

const WatchlistPage = () => {
  const [movies, setMovies] = useState(null);
  const [first, setFirst] = useState(true);

  function fetchMovies() {
    return new Promise((resolve, reject) => {
      if (first) {
        fetch("/api/watchlist", {
          method: "get",
          headers: new Headers({
            Authorization: `Bearer ${
              localStorage.getItem("login")
                ? JSON.parse(localStorage.getItem("login")).token
                : ""
            }`,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            resolve(data.results.slice(0, 10));
            setMovies(data.results.slice(10));
          })
          .catch((err) => {
            reject(err);
          });
        setFirst(false);
      } else if (movies.length > 0) {
        resolve(movies.slice(0, 10));
        setMovies(movies.slice(10));
      } else {
        resolve([]);
      }
    });
  }

  return (
    <MainPage
      fetchMovies={fetchMovies}
      path="watchlist"
      imgSrc=""
      imgSrc_blur=""
    />
  );
};

export default WatchlistPage;
