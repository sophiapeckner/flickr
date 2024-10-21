import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { MovieListController } from "Frontend/generated/endpoints.ts";
import { useState, useEffect } from "react";

export const config: ViewConfig = {
  menu: { order: 7, icon: "line-awesome/svg/file.svg" },
  title: "Movie List",
};

export default function MovieListView() {
  const [selectedMovies, setSelectedMovies] = useState([]);

    useEffect(() => {
      MovieListController.getSelectedMovieList().then(setSelectedMovies).then(console.log(selectedMovies));
    });


  return (
    <>
      <a href="/start_auth" className="back-ml">
        <button className="back-button">X</button>
      </a>
      <div>
        <div className="movies-selected">
          <div className="movie">
            <img className="movie-img" src="images/movie.jpg" alt="" />
            <div>
              <h4>{selectedMovies[0]}</h4>
              <h5>Votes: 9</h5>
            </div>
          </div>
          <div className="movie">
            <img className="movie-img" src="images/movie.jpg" alt="" />
            <div>
              <h4>{selectedMovies[1]}</h4>
              <h5>Votes: 9</h5>
            </div>
          </div>
        </div>

        <div className="bottom-nav">
          <a href="/swipe">
            <img src="images/pic.png" alt="pic" />
          </a>

          <a href="/movielist">
            <img src="images/liked.png" alt="liked" />
          </a>
        </div>
      </div>
    </>
  );
}
