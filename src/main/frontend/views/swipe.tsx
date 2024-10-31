// import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState, useEffect } from "react";
import { style } from "../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";

interface Movie {
    id: number;
    title: string;
    url: string;
    year: string;
}

export default function SwipeView() {
  const fullAuth = 'Bearer ' + import.meta.env.VITE_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: fullAuth,
    },
  };

  const [titles, setTitles] = useState([]);

  function getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    let number = getRandomNumber(500);
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=" +
        number +
        "&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results[0])
      }

      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={style.outerDiv}>
      <div>
        <a style={style.backButton} href="/start_auth">
          X
        </a>
        <a style={style.topCornerButton} href="/userprofile">
          <img src="images/profile.png" />
        </a>
      </div>

      <div style={styles.movieProfile}>
        {/* <img
          style={styles.moiveThumbnail}
          src={"https://image.tmdb.org/t/p/w500/" }
          alt=""
        /> */}
        {/* temp movie thumbnail */}
        <img style={styles.moiveThumbnail} src="images/movie.jpg" alt="" />
        <div style={styles.movieInfo}>
          <label style={styles.movieLabel}>Title: {titles}</label>
          <label style={styles.movieLabel}>Year: 2022 </label>
        </div>
      </div>

      <div style={styles.choices}>
        <a href="/swipe">
          <img style={{float: 'left'}} src="images/garbage.png" alt="dislike button" />
        </a>
        <a href="/swipe">
          <img style={{float: 'right'}} src="images/like.png" alt="like button" />
        </a>
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
}
