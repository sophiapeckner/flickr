import { useState, useEffect } from "react";
import { colors } from "../../themes/flickr/colors";
import { useParams } from "react-router-dom";
import SessionMovie from "Frontend/generated/com/flickr/entities/SessionMovie";
import Member from "Frontend/generated/com/flickr/entities/Member";
import {Dialog, Icon} from "@vaadin/react-components";
import {style} from "Frontend/themes/flickr/css";

export default function SwipeView() {
  const { memberId } = useParams();

  const [movies, setMovies] = useState<SessionMovie[]>([]);
  const [movieIndex, setMovieIndex] = useState(0);
  const [member, setMember] = useState<Member>();
  const [isVotingComplete, setIsVotingComplete] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      // Fetch the movie recommendations associated with the Session member is in
      try {
        const response = await fetch(`/api/session/${memberId}`);
        const sessionData = await response.json();
        setMovies(sessionData.movies || []);
      } catch (error) {
        console.error("Failed to fetch Session's movies:", error);
      }
    };

    const fetchMember = async () => {
      // Fetch the Member with memberId
      try {
        const response = await fetch(`/api/session/member/${memberId}`);
        const memberData = await response.json();
        setMember(memberData);
        setMovieIndex(memberData.movieIndex)
      } catch (error) {
        console.error("Failed to fetch Member:", error);
      }
    };

    fetchMovies();
    fetchMember();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      setIsVotingComplete(movieIndex >= movies.length);
    }
  }, [movies]);

  const handleNextMovie = async (liked: boolean) => {
    if (movieIndex <= movies.length - 1) {
      const newMovieIndex = movieIndex + 1;

      // Update member's movieIndex in the backend
      await fetch(`/api/session/member/${memberId}/updateMovieIndex`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieIndex: newMovieIndex }),
      });

      // Update voteCount if liked
      if (liked) {
        await fetch(`/api/session/movie/${movies[movieIndex].id}/incrementVote`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        });
      }
      setMovieIndex(newMovieIndex);

      if (movieIndex == movies.length - 1) {
        setIsVotingComplete(true);
      }
    }
  };

  const exitSession = async () => {
    // Reset index
  }

  const viewList = () => {
    window.location.href = `/list/${memberId}`;
  };

  return (
      <div style={styles.outerDiv}>
        <div>
          <a style={style.backButton} href="/start" onClick={exitSession}>
            <Icon icon="vaadin:close"/>
          </a>
          <a style={style.topCornerButton} href="/userprofile">
            <img src="images/profile.png"/>
          </a>
        </div>
        {isVotingComplete ? (
            <p>You're done voting!</p>
        ) : (
            movies.length > 0 && movies[movieIndex] && (
                <>
                  <div style={styles.movieProfile}>
                    <div style={{...styles.movieThumbnail}}>
                      <img style={{width: '100%', height: 'auto'}}
                          src={movies[movieIndex].movie?.imgURL}
                          alt="movie poster"
                      />
                    </div>
                    <div style={styles.movieInfo}>
                      <h2 style={styles.movieLabel}>
                        {movies[movieIndex].movie?.title}
                      </h2>
                      <h3 style={styles.movieLabel}>
                        {movies[movieIndex].movie?.release}
                      </h3>
                    </div>
                  </div>
                  <div style={styles.choices}>
                    <Icon
                        style={{float: "left", height: '38px', width: '38px', color: colors.main}}
                        icon="vaadin:thumbs-down"
                        onClick={() => handleNextMovie(false)}/>
                    <Icon
                          style={{float: "right", height: '38px', width: '38px', color: colors.main}}
                          icon="vaadin:thumbs-up"
                          onClick={() => handleNextMovie(true)}/>
                  </div>
                </>
            )
        )}
        <div style={styles.bottomNav}>
          <img src="images/pic.png" alt="pic"/>
          <img src="images/liked.png" alt="liked" onClick={viewList}/>
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
    // width: '40%',
    // height: '50%',
    marginTop: 60,
    marginRight: 'auto',
    marginLeft: 'auto',
    border: '1px solid rgba(0, 0, 0, 0.125)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
  },
  movieThumbnail: {
    height: 'auto',
    width: '70%'
  },
  movieInfo: {
    backgroundColor: colors.main,
    margin: 20,
    padding: '5px 40px',
    borderRadius: 12,
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'left',
    // justifyContent: 'left',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  movieLabel: {
    fontSize: '15px',
    color: 'white'
  },
  choices: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '30px auto',
    width: '90%',
    maxWidth: '500px', // Prevents the container from growing too wide
    padding: '0 20px',
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
