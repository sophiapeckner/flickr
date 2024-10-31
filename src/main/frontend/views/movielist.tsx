import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";

export const config: ViewConfig = {
  menu: { order: 7, icon: "line-awesome/svg/file.svg" },
  title: "Movie List",
};

export default function MovieListView() {
  return (
    <div style={{...style.outerDiv, backgroundColor: colors.light}}>
      <div style={{backgroundColor: 'white'}}>
        <a style={style.backButton} href="/start_auth">
          X
        </a>
        <a style={style.topCornerButton} href="/userprofile">
          <img src="images/profile.png" />
        </a>
      </div>

      <div style={styles.moviesSelected}>
        <div style={styles.movie}>
          <img style={styles.movieImage} src="images/movie.jpg" alt="" />
          <div>
            <h4>Step Brothers</h4>
            <h5>Votes: 9</h5>
          </div>
        </div>
        <div style={styles.movie}>
          <img style={styles.movieImage} src="images/movie.jpg" alt="" />
          <div>
            <h4>Cars</h4>
            <h5>Votes: 6</h5>
          </div>
        </div>
      </div>

      <div style={style.bottomNav}>
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

const styles = {
  moviesSelected: {
    backgroundColor: colors.light,
    display: "flex",
    flexDirection: "column",
  },
  movie: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
  },
  movieImage: {
    width: 55,
    backgroundColor: colors.main,
    marginRight: 20,
  },
};
