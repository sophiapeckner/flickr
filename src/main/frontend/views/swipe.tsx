// import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState, useEffect } from "react";
import { colors } from "../themes/flickr/colors";

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
    <div style={styles.outerDiv}>
      <div>
        <a style={styles.backButton} href="/">
          X
        </a>
        <a style={styles.topCornerButton} href="/userprofile">
          <img src="images/profile.png" />
        </a>
      </div>

      <div style={styles.innerDiv}>
        <div style={styles.movieProfile}>
          <img
            style={styles.moiveThumbnail}
            src={"https://image.tmdb.org/t/p/w500/" }
            alt=""
          />
          <div style={styles.movieInfo}>
            <label style={styles.movieLabel}>Title: {titles}</label>
            <label style={styles.movieLabel}>Year: 2022 </label>
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
  innerDiv: {
    flexDirection: 'column',
    width: '100%',
    margin: 'auto',
  },
  movieProfile: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    label: {
      color: 'white'
    }
  },
  moiveThumbnail: {
    width: '35%',
    height: 'auto',
  },
  movieInfo: {
    backgroundColor: '#62598b',
    width: '50%',
    padding: '10px',
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
  }
}

// .movie1 label {
//   font-size: 15px;
//   background-color: #62598b;
//   color: white;
// }

