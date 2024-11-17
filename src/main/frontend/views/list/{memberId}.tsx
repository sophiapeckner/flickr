import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState, useEffect } from "react";
import { colors } from "../../themes/flickr/colors";
import SessionMovie from "Frontend/generated/com/flickr/entities/SessionMovie";
import {useParams} from "react-router-dom";
import session from "Frontend/generated/com/flickr/entities/Session";
// import { MovieListController } from "Frontend/generated/endpoints.ts";
// import { useState, useEffect } from "react";

export const config: ViewConfig = {
  menu: { order: 7, icon: "line-awesome/svg/file.svg" },
  title: "Movie List",
};

export default function MovieListView() {
  // const [selectedMovies, setSelectedMovies] = useState([]);
  const { memberId } = useParams();
  const [selectedMovies, setSelectedMovies] = useState<SessionMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // Fetch the movie recommendations associated with the Session member is in
      try {
        const response = await fetch(`/api/session/${memberId}`);
        const data = await response.json();
        // Sort in descending order so that movies with the most votes appear on top
        const filteredMovies = (data.movies as SessionMovie[] || [])
            .filter((sessionMovie) => (sessionMovie.voteCount ?? 0) > 0)
            .sort((a, b) => (b.voteCount ?? 0) - (a.voteCount ?? 0));
        setSelectedMovies(filteredMovies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const swipe = () => {
    window.location.href = `/swipe/${memberId}`;
  };

  return (
      <div style={styles.outerDiv}>
        <div style={{backgroundColor: "white"}}>
          <a style={styles.backButton} href="/">
            X
          </a>
          <a style={styles.topCornerButton} href="/userprofile">
            <img src="/images/profile.png"/>
          </a>
        </div>

        <div style={styles.moviesSelected}>
          {selectedMovies.length > 0 ? (
              selectedMovies.map((sessionMovie) => (
                  <div key={sessionMovie.id} style={styles.movie}>
                    <img style={styles.movieImage} src={sessionMovie.movie?.imgURL} alt=""/>
                    <div>
                      <h4>{sessionMovie.movie?.title}</h4>
                      <h5>Votes: {sessionMovie.voteCount}</h5>
                    </div>
                  </div>
              ))
          ) : (
              <p>No movies have been voted on :(</p>
          )}
        </div>

        <div style={styles.bottomNav}>
          <a onClick={swipe}>
            <img src="/images/pic.png" alt="pic"/>
          </a>
          <a>
            <img src="/images/liked.png" alt="liked"/>
          </a>
        </div>
      </div>
  );
}

const styles = {
  outerDiv: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: colors.light,
  },
  backButton: {
    height: "50px",
    margin: "15px",
    float: "left",
    fontSize: 20,
    marginRight: 15,
  },
  topCornerButton: {
    height: "50px",
    margin: "15px",
    float: "right",
  },
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
  bottomNav: {
    width: "100%",
    backgroundColor: colors.main,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "25px",
    position: "absolute",
    bottom: "0px",
  },
};
