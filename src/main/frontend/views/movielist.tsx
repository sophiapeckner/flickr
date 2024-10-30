import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { MovieListController } from "Frontend/generated/endpoints.ts";
import { useState, useEffect } from "react";
import { colors } from "../themes/flickr/colors";

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
    <div style={styles.outerDiv}>
      <div style={{backgroundColor: 'white'}}>
        <a style={styles.backButton} href="/">
          X
        </a>
        <a style={styles.topCornerButton} href="/userprofile">
          <img src="images/profile.png" />
        </a>
      </div>

      <div style={styles.moviesSelected}>
        <div style={styles.movie}>
          <img style={styles.movieImage} src="images/movie.jpg" alt="" />
          <div>
            <h4>{selectedMovies[0]}</h4>
            <h5>Votes: 9</h5>
          </div>
        </div>
        <div style={styles.movie}>
          <img style={styles.movieImage} src="images/movie.jpg" alt="" />
          <div>
            <h4>{selectedMovies[0]}</h4>
            <h5>Votes: 6</h5>
          </div>
        </div>
      </div>

      <div style={styles.bottomNav}>
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
  outerDiv: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: colors.light
  },
  backButton: {
    height: '50px',
    margin: '15px',
    float: 'left',
    fontSize: 20,
    marginRight: 15,
  },
  topCornerButton: {
    height: '50px',
    margin: '15px',
    float: 'right',
  },
  moviesSelected: {
    backgroundColor: colors.light,
    display: 'flex',
    flexDirection: 'column',
  },
  movie: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
  },
  movieImage: {
    width: 55,
    backgroundColor: colors.main,
    marginRight: 20,
  },
  bottomNav: {
    width: '100%',
    backgroundColor: colors.main,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '25px',
    position: 'absolute',
    bottom: '0px',
  }
}
