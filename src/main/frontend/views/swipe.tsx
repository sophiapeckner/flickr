import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState, useEffect } from "react";
import Movie from "Frontend/generated/com/flickr/entities/Movie";
import {findAll, generateSuggestions} from "Frontend/generated/SuggestionsEndpoint";


export default function SwipeView() {
  const [isBusy, setBusy] = useState(true);
  const [movies, setMovies] =useState<Movie[]>([]);

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
                src={movies[0].imgURL}

                alt="movie poster"/>
            <div className="movie1-info">
              <label>Title: {movies[0].title}</label>
              <label>Release date: {movies[0].release}</label>
            </div>
          </div>
          <div className="choices">
            <a href="/swipe">
              <img src="images/garbage.png" alt="dislike button"/>
            </a>
            <a href="/swipe">
              <img src="images/like.png" alt="like button"/>
            </a>
          </div>
        </>}

        <div className="bottom-nav">
          <a href="/swipe">
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

