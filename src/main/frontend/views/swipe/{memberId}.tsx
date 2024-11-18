import { useState, useEffect } from "react";
import { colors } from "../../themes/flickr/colors";
import {useNavigate, useParams} from "react-router-dom";
import SessionMovie from "Frontend/generated/com/flickr/entities/SessionMovie";
import Member from "Frontend/generated/com/flickr/entities/Member";
import {Icon, MenuBar} from "@vaadin/react-components";
import { items } from "../../themes/flickr/ProfileMenuBar";
import {style} from "Frontend/themes/flickr/css";

export default function SwipeView() {
  const { memberId } = useParams();

  const [movies, setMovies] = useState<SessionMovie[]>([]);
  const [movieIndex, setMovieIndex] = useState(0);
  const [member, setMember] = useState<Member>();
  const [isVotingComplete, setIsVotingComplete] = useState(false);

  const navigate = useNavigate()

  const handleProfileMenuSelection = (e: { detail: { value: any; }; }) =>{
    const selectedItem = e.detail.value;
    if(selectedItem && selectedItem.path){
      navigate(selectedItem.path);
    }
  }

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

  const viewList = () => {
    window.location.href = `/list/${memberId}`;
  };

  return (
    <div style={styles.outerDiv}>
      <div>
        <a href="/">
          <Icon icon="vaadin:close" style={style.backButton}/>
        </a>
        <MenuBar
          items={items}
          theme="tertiary"
          style={{...style.topCornerButton,}}
          onItemSelected={handleProfileMenuSelection}
        />
      </div>
      {isVotingComplete ? (
        <p>You're done voting!</p>
      ) : (
        movies.length > 0 && movies[movieIndex] && (
          <>
            <div style={styles.movieProfile}>
              <img
                style={styles.movieThumbnail}
                src={movies[movieIndex].movie?.imgURL}
                alt="movie poster"
              />
              <div style={styles.movieInfo}>
                <label style={styles.movieLabel}>
                  Title: {movies[movieIndex].movie?.title}
                </label>
                <label style={styles.movieLabel}>
                  Release date: {movies[movieIndex].movie?.release}
                </label>
              </div>
            </div>
            <div style={styles.choices}>
              <a onClick={() => handleNextMovie(false)}>
                <img style={{float: "left"}} src="images/garbage.png" alt="dislike button"/>
              </a>
              <a onClick={() => handleNextMovie(true)}>
                <img style={{float: "right"}} src="images/like.png" alt="like button"/>
              </a>
            </div>
          </>
        )
      )}
      <div style={styles.bottomNav}>
        <a>
          <img src="images/pic.png" alt="pic"/>
        </a>
        <a>
          <img src="images/liked.png" alt="liked" onClick={viewList}/>
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
  movieThumbnail: {
    height: '60%',
    width: 'auto'
  },
  movieInfo: {
    backgroundColor: colors.main,
    margin: 20,
    padding: '5px 40px',
    borderRadius: 12,
    width: '70%',
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
