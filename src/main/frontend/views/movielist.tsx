import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState, useEffect } from "react";
import { style } from "../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";
import { getVotedMovies } from "Frontend/generated/MovieEndpoint";
import Movie from "Frontend/generated/com/flickr/entities/Movie";

export const config: ViewConfig = {
  menu: { order: 7, icon: "line-awesome/svg/file.svg" },
  title: "Movie List",
};

export default function MovieListView() {
  const [isBusy, setBusy] = useState(true);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getVotedMovies()
        .then(r => setSelectedMovies(r))
        .then(r => setBusy(false));
  });


  return (
      <div style={{...style.outerDiv, backgroundColor: colors.light}}>
        <div style={{backgroundColor: 'white'}}>
          <a style={style.backButton} href="/start_auth">
            X
          </a>
          <a style={style.topCornerButton} href="/userprofile">
            <img src="images/profile.png"/>
          </a>
        </div>

        <div style={styles.moviesSelected}>
          {isBusy ? (
                  <h3>Loading Movies</h3>
              ) :
              <>
                {
                  selectedMovies.map((movie) => (
                      <div key={movie.id} style={styles.movie}>
                        <img style={styles.movieImage} src={movie.imgURL} alt=""/>
                        <div>
                          <h4>{movie.title}</h4>
                          <h5>Votes: {movie.votes}</h5>
                        </div>
                      </div>
                  ))
                }
              </>
          }
        </div>

          <div style={style.bottomNav}>
            <a href="/swipe">
              <img src="images/pic.png" alt="pic"/>
            </a>
            <a href="/movielist">
              <img src="images/liked.png" alt="liked"/>
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
