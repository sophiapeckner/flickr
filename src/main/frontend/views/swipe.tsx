import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState, useEffect } from "react";

interface Movie {
    id: number;
    title: string;
    url: string;
    year: string;
}

export default function SwipeView() {

  // const fullAuth = 'Bearer ' + import.meta.env.VITE_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      // Authorization: fullAuth,
    },
  };

  function getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  const [movies, setMovies] = useState([]);
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
        for (let i = 0; i < data.results.length; i++) {
        console.log(data.results[i].original_title);
            setMovies(data.results[i].original_title);
           console.log(movies);
        }
      }

      )
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
            src={"https://image.tmdb.org/t/p/w500/" }

            alt=""
          />
          <div className="movie1-info">
            <label>Title: slakfd</label>
            <label>Year: 2022 </label>
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

