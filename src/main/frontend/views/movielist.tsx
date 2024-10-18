import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 7, icon: "line-awesome/svg/file.svg" },
  title: "Movie List",
};

export default function MovieListView() {
  return (
    <div>
      <div>
        <a href="/start-auth">
          <button className="back-button">X</button>
        </a>
        <a href="/user-profile">
          <img className="profile-img" src="images/profile.png" />
        </a>
      </div>

      <div className="movies-selected">
        <div className="movie">
          <img className="movie-img" src="images/movie.jpg" alt="" />
          <div>
            <h4>Movie Number 1</h4>
            <h5>Votes: 9</h5>
          </div>
        </div>
        <div className="movie">
          <img className="movie-img" src="images/movie.jpg" alt="" />
          <div>
            <h4>Movie Number 2</h4>
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
  );
}
