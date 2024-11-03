import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState, useEffect } from "react";
import Movie from "Frontend/generated/com/flickr/entities/Movie";
import {findAll, generateSuggestions} from "Frontend/generated/SuggestionsEndpoint";


export default function SwipeView() {
  const [isBusy, setBusy] = useState(true);
  const [movies, setMovies] =useState<Movie[]>([]);
  const [movieIndex, setMovieIndex] = useState(2);

useEffect(() => {
         generateSuggestions()
             .then(r => findAll().then(r => setMovies(r)))
             .then(r => setBusy(false));
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

        {isBusy ? (
            <h3>Loading Movies</h3>
        ) : <>
          <div className="movie1">
            <img
                className="movie-example1"
                src={movies[movieIndex].imgURL}

                alt="movie poster"/>
            <div className="movie1-info">
              <label>Title: {movies[movieIndex].title}</label>
              <label>Release date: {movies[movieIndex].release}</label>
            </div>
          </div>
          <div className="choices">
            <a onClick={() => setMovieIndex(movieIndex + 1)}>
              <img src="images/garbage.png" alt="dislike button"/>
            </a>
            <a onClick={() => setMovieIndex(movieIndex + 1)}>
              <img src="images/like.png" alt="like button"/>
            </a>
          </div>
        </>}

        <div className="bottom-nav">
          <a onClick={() => setMovieIndex(movieIndex + 1)}>
            <img src="images/pic.png" alt="pic"/>
          </a>

          <a href="/movieList">
            <img src="images/liked.png" alt="liked"/>
          </a>
        </div>
      </div>
    </>
  );
}

