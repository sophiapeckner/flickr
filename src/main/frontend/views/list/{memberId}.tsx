import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState, useEffect, KeyboardEvent} from "react";
import {style} from "../../themes/flickr/css.js";
import {colors} from "../../themes/flickr/colors";
import SessionMovie from "Frontend/generated/com/flickr/entities/SessionMovie";
import {useParams} from "react-router-dom";
import {CustomHeader} from "Frontend/themes/flickr/elements";
import {isLoggedIn} from "Frontend/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faFilm } from '@fortawesome/free-solid-svg-icons';

export const config: ViewConfig = {
    menu: { order: 7, icon: "line-awesome/svg/file.svg" },
    title: "Movie List",
};

export default function MovieListView() {
  // const [selectedMovies, setSelectedMovies] = useState([]);
  const {memberId} = useParams();
  const [selectedMovies, setSelectedMovies] = useState<SessionMovie[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchLogin = async () => {
      const result = await isLoggedIn();
      setLoggedIn(result);
    };
    fetchLogin();
  }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            // Fetch the movie recommendations associated with the Session member is in
            try {
                const response = await fetch(`/api/session/${memberId}`);
                const session = await response.json();
                // Sort in descending order so that movies with the most votes appear on top
                const filteredMovies = (session.movies as SessionMovie[] || [])
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

  const handleKeyPress = (event: KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter") {
      swipe();
    }
  };

  return (
      <div style={style.outerDiv}>
        <CustomHeader confirmExit={true} loggedIn={loggedIn}/>

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

        <div style={style.bottomNav}>
          <div style={{...style.navBarItem, color: colors.half}} onClick={swipe}>
            <FontAwesomeIcon icon={faFilm} style={style.navBarIcon}/>
            <span>Suggestions</span>
          </div>
          <div style={style.navBarItem}>
            <FontAwesomeIcon icon={faBookmark} style={style.navBarIcon}/>
            <span>Liked</span>
          </div>
        </div>
      </div>
  );
}

const styles = {
  moviesSelected: {
    backgroundColor: colors.light,
    display: "flex",
    flexDirection: "column",
    overflowY: 'auto',
        flex: 1,
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
    }
};
