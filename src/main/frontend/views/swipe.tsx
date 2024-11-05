// import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState, useEffect } from "react";
import Movie from "Frontend/generated/com/flickr/entities/Movie";
import {findAll, generateSuggestions} from "Frontend/generated/SuggestionsEndpoint";
import { colors } from "../themes/flickr/colors";


export default function SwipeView() {
  const [isBusy, setBusy] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieIndex, setMovieIndex] = useState(0);

  useEffect(() => {
           generateSuggestions()
               .then(r => findAll().then(r => setMovies(r)))
               .then(r => setBusy(false));
      }, []);

  return (
    <div style={styles.outerDiv}>
      <div>
        <a style={styles.backButton} href="/">
          X
        </a>
        <a style={styles.topCornerButton} href="/userprofile">
          <img src="images/profile.png" />
        </a>
      </div>

      
      {isBusy ? (
            <h3>Loading Movies</h3>
        ) : <>
          <div style={styles.movieProfile}>
            <img
                style={styles.moiveThumbnail}
                src={movies[movieIndex].imgURL}

                alt="movie poster"/>
            <div style={styles.movieInfo}>
              <label style={styles.movieLabel}>Title: {movies[movieIndex].title}</label>
              <label style={styles.movieLabel}>Release date: {movies[movieIndex].release}</label>
            </div>
          </div>
          <div style={styles.choices}>
            <a onClick={() => setMovieIndex(movieIndex + 1)} href="/swipe">
              <img style={{float: 'left'}} src="images/garbage.png" alt="dislike button" />
            </a>
            <a onClick={() => setMovieIndex(movieIndex + 1)} href="/swipe">
              <img style={{float: 'right'}} src="images/like.png" alt="like button" />
            </a>
          </div>
        </>}

      

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
  movieProfile: {
    width: '40%',
    height: '50%',
    marginTop: 60,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moiveThumbnail: {
    height: '60%',
    width: 'auto'
  },
  movieInfo: {
    backgroundColor: colors.main,
    margin: 20,
    padding: '5px 40px',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  movieLabel: {
    fontSize: '15px',
    color: 'white'
  },
  choices: {
    margin: '0px 150px',
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
