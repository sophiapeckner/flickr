import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState, useEffect } from "react";

export default function SwipeView() {

   console.log(import.meta.env.VITE_KEY);
   console.log(import.meta.env);
  const fullAuth = 'Bearer ' + import.meta.env.VITE_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: fullAuth,
    },
  };

  function getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  const [titles, setTitles] = useState([]);
  const [year, setYear] = useState([]);
  const [url, setUrl] = useState([]);
  useEffect(() => {
    let number = getRandomNumber(500);
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=" +
        number +
        "&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results[0]);
        setTitles(data.results[0].original_title);
        setYear(data.results[0].release_date);
        setUrl(data.results[0].backdrop_path);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <a href="/start_auth">
        <button className="back-button">X</button>
      </a>
      <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
        <div>
          <h2>flickr</h2>
        </div>

        <div className="movie1">
          <img
            className="movie-example1"
            src={"https://image.tmdb.org/t/p/w500/" + url}
            alt=""
          />
          <div className="movie1-info">
            <label>Title: {titles}</label>
            <label>Year: {year} </label>
          </div>
        </div>

        <div className="choices">
          <a href="/swipe">
            <img src="images/garbage.png" alt="dislike button" />
          </a>
          <a href="/swipe">
            <img src="images/like.png" alt="like button" />
          </a>
        </div>

        <div className="bottom-nav">
          <a href="/swipe">
            <img src="images/pic.png" alt="pic" />
          </a>

          <a href="/movieList">
            <img src="images/liked.png" alt="liked" />
          </a>
        </div>
      </div>
    </>
  );
}

