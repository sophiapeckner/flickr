import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 6, icon: "line-awesome/svg/file.svg" },
  title: "Swipe",
};

export default function SwipeView() {
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
          <img className="movie-example1" src="images/movie.jpg" alt="" />
          <div className="movie1-info">
            <label>Title: Talladega Nights </label>
            <label>Year: 2006 </label>
          </div>
        </div>

        <div className="choices">
          <img src="images/garbage.png" alt="dislike button" />
          <img src="images/like.png" alt="like button" />
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
