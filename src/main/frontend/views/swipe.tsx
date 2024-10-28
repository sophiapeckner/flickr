import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState, useEffect } from "react";
import { SuggestionsEndpoint } from "Frontend/generated/endpoints.ts";

export default function SwipeView() {

  const [currMovie, setCurrMovie] = useState();

      useEffect(() => {
        SuggestionsEndpoint.generateSuggestions()
            .then(setCurrMovie)
            .then(console.log(currMovie));
      });

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
            <label>Title: asdlfjk</label>
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

