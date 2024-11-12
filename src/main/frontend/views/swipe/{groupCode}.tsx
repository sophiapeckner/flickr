import { useState, useEffect } from "react";
import { colors } from "../../themes/flickr/colors";
import { useParams } from "react-router-dom";
import SessionMovie from "Frontend/generated/com/flickr/entities/SessionMovie";
import Member from "Frontend/generated/com/flickr/entities/Member";

export default function SwipeView() {
  const { groupCode } = useParams();

  const [movies, setMovies] = useState<SessionMovie[]>([]);
  const [movieIndex, setMovieIndex] = useState(0);
  const [member, setMember] = useState<Member>();
  const [isVotingComplete, setIsVotingComplete] = useState(false);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`/api/session/${groupCode}`);
        const data = await response.json();
        setMovies(data.movies || []);
        setMember(data.members ? data.members[0] : null); // Set as the first (and only) member for now
        setMovieIndex(data.members[0] ? data.members[0].movieIndex : 0);
      } catch (error) {
        console.error("Failed to fetch session data:", error);
      }
    };
    fetchSessionData();
  }, [groupCode]);

  useEffect(() => {
    if (member && movies.length > 0) {
      setIsVotingComplete(member.movieIndex >= movies.length);
    }
  }, [member, movies]);

  const handleNextMovie = async (liked: boolean) => {
    if (!member) {
      console.error("Member is null");
      return;
    }

    if (movieIndex <= movies.length - 1) {
      const newMovieIndex = movieIndex + 1;

      // Update member's movieIndex in the backend
      await fetch(`/api/session/member/${member.id}/updateMovieIndex`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieIndex: newMovieIndex }),
      });

      // Update voteCount if liked
      if (liked) {
        await fetch(`/api/session/${groupCode}/movie/${movies[movieIndex].id}/incrementVote`, {
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
    window.location.href = `/list/${groupCode}`;
  };

  return (
      <div style={styles.outerDiv}>
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
                      <img style={{ float: "left" }} src="images/garbage.png" alt="dislike button" />
                    </a>
                    <a onClick={() => handleNextMovie(true)}>
                      <img style={{ float: "right" }} src="images/like.png" alt="like button" />
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