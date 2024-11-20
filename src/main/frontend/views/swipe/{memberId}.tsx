import {useState, useEffect, KeyboardEvent} from "react";
import { style } from "../../themes/flickr/css.js";
import {useParams} from "react-router-dom";
import SessionMovie from "Frontend/generated/com/flickr/entities/SessionMovie";
import Member from "Frontend/generated/com/flickr/entities/Member";
import {Icon, Scroller} from "@vaadin/react-components";
import {CustomHeader} from "Frontend/themes/flickr/elements";
import {isLoggedIn} from "Frontend/auth";
import {colors} from "Frontend/themes/flickr/colors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faFilm} from "@fortawesome/free-solid-svg-icons";

export default function SwipeView() {
    const { memberId } = useParams();
    const [movies, setMovies] = useState<SessionMovie[]>([]);
    const [movieIndex, setMovieIndex] = useState(0);
    const [member, setMember] = useState<Member>();
    const [isVotingComplete, setIsVotingComplete] = useState(false);
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
                setMovies(session.movies || []);
            } catch (error) {
                console.error("Failed to fetch Session's movies:", error);
            }
        };

        const fetchMember = async () => {
            // Fetch the Member with memberId
            try {
                const response = await fetch(`/api/vote/${memberId}`);
                const member = await response.json();
                setMember(member);
                setMovieIndex(member.movieIndex)
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
            await fetch(`/api/vote/${memberId}/updateMovieIndex`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ movieIndex: newMovieIndex }),
            });

            // Update voteCount if liked
            if (liked) {
                await fetch(`/api/vote/${movies[movieIndex].id}/incrementVote`, {
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

    function parseDate(dateString: string | undefined): string {
        if (!dateString) return "Unknown Release Date";

        const date = new Date(dateString);

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',    // Outputs the year in 4 digits
            month: 'short',      // Use the full month name (e.g., "October")
            day: 'numeric',     // Include the day of the month (e.g., 24)
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    const viewList = () => {
        window.location.href = `/list/${memberId}`;
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLImageElement>) => {
        if (event.key === "Enter") {
          viewList();
        }
    };

    return (
        <div style={style.outerDiv}>
            <CustomHeader loggedIn={loggedIn}/>

            {isVotingComplete ? (
                <p>You're done voting!</p>
            ) : (
                movies.length > 0 && movies[movieIndex] && (
                    <>
                        <div style={styles.movieProfile}>
                            <div style={styles.movieThumbnail}>
                                <img
                                    style={{width: '100%', height: 'auto'}}
                                    src={movies[movieIndex].movie?.imgURL}
                                    alt="movie poster"
                                />
                            </div>
                            <div style={styles.movieInfo}>
                                <h2 style={styles.movieTitle}>{movies[movieIndex].movie?.title}</h2>
                                <h3 style={styles.movieSubtitle}>{parseDate(movies[movieIndex].movie?.release)}</h3>
                                <Scroller style={styles.movieTextDiv}>
                                    <p style={styles.movieText}>{movies[movieIndex].movie?.overview}</p>
                                </Scroller>
                            </div>
                        </div>
                        <div style={styles.choices}>
                            <Icon
                                style={styles.choiceButton}
                                icon="vaadin:close"
                                onClick={() => handleNextMovie(false)}/>
                            <Icon
                                style={styles.choiceButton}
                                icon="vaadin:heart"
                                onClick={() => handleNextMovie(true)}/>
                        </div>
                    </>
                )
            )}
            <div style={style.bottomNav}>
                <div style={style.navBarItem} >
                    <FontAwesomeIcon icon={faFilm} style={style.navBarIcon}/>
                    <span>Suggestions</span>
                </div>
                <div style={{...style.navBarItem, color: colors.half}} onClick={viewList}>
                    <FontAwesomeIcon icon={faBookmark} style={style.navBarIcon}/>
                    <span>Liked</span>
                </div>
            </div>
        </div>
    );
}

const styles = {
    movieProfile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        maxWidth: '600px', // Limit the width for larger screens
        margin: '0px auto', // Center horizontally and add vertical spacing
        padding: '15px',
        border: '1px solid rgba(0, 0, 0, 0.125)',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    movieThumbnail: {
        width: '100%',
        maxHeight: '300px',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '0.3rem', // Add spacing between the image and text content
    },
    movieInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%', // Ensure text takes up the full width of the profile
        textAlign: 'left',
    },
    movieTitle: {
        fontSize: '1.5rem', // Adjust size for phones
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
    },
    movieSubtitle: {
        fontSize: '1rem',
        fontWeight: 'normal',
        // marginBottom: '15px',
        color: '#888',
    },
    movieText: {
        fontSize: '1rem',
        fontWeight: 'normal',
        color: '#555',
    },
    movieTextDiv: {
        maxHeight: '84px', // Restrict maximum height
        overflowY: 'auto',  // Enable vertical scrolling for overflow
    },
    choices: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '20px',
        marginBottom: '20px', // Ensures spacing from bottomNav
    },
    choiceButton: {
        color: "#f54251",
        height: '50px',
        width: '50px',
        cursor: 'pointer',
        transition: 'transform 0.5s ease',
        border: `2px solid #00000020`, // Circular border
        borderRadius: '50%', // Makes it a perfect circle
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px', // Adds space between the icon and the border
        boxSizing: 'border-box', // Ensures padding doesn't affect dimensions
    },
}
