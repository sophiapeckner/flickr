import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { colors } from "../../themes/flickr/colors";
import {MultiSelectComboBox} from "@vaadin/react-components";
import {useEffect, useState} from "react";

export const config: ViewConfig = {
  menu: { order: 5, icon: "line-awesome/svg/file.svg" },
  title: "Pick Genre",
};

export default function PreferencesView() {
  const memberId = localStorage.getItem("RYT");

  const [genres, setGenres] = useState([]);
  const [groupCode, setGroupCode] = useState([]);
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Retrieve every genre option available on The Movie Database
  const fetchGenres = async () => {
    try {
      const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_TOKEN}`,
              accept: "application/json",
            },
          }
      )
      const data = await response.json();
      if (data.genres) {
        return data.genres.map((genre) => (
            {
              label: genre.name,
              value: genre.id,
            }));
      }
    } catch (error) {
      console.error("Error fetching genres: ", error);
    }
  };

  // Retrieve every streaming platform option available on The Movie Database
  const fetchStreamingPlatforms = async () => {
    try {
      const response = await fetch(
          "https://api.themoviedb.org/3/watch/providers/movie?language=en-US",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_TOKEN}`,
              accept: "application/json",
            },
          }
      )
      const data = await response.json();
      if (data.results) {
        return data.results.map((platform) => (
            {
              label: platform.provider_name,
              value: platform.provider_id,
            }));
      }
    } catch (error) {
      console.error("Error fetching genres: ", error);
    }
  };

  const fetchGroupCode = async () => {
    const response = await fetch(`/api/session/${memberId}`);
    const data = await response.json();
    setGroupCode(data.groupCode);
  }

  const submit = async () => {
    // selectedGenres & selectedPlatforms are a list of objects
    // The PUT request only accepts a list of Strings as the body of the request
    // The conversion from [Object] to [String] is accomplished here:
    const selectedGenreList = selectedGenres.map((genre) => genre.value);
    const genreResponse = await fetch(`/api/session/${memberId}/genres`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedGenreList)
    });
    if (!genreResponse.ok) {
      throw new Error(`Failed to update Session genres`);
    }

    const selectedPlatformList = selectedPlatforms.map((platform) => platform.value);
    const platformResponse = await fetch(`/api/session/${memberId}/platforms`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedPlatformList)
    });
    if (!platformResponse.ok) {
      throw new Error(`Failed to update Session streaming platforms`);
    }

    window.location.href = `/landing/${memberId}`;
  }

  // Used to populate the dropdowns with every option available in The Movie DB
  useEffect(() => {
    fetchGenres().then(setGenres)
    fetchStreamingPlatforms().then(setStreamingPlatforms)
    fetchGroupCode()
  }, []);

  return (
    <div style={styles.outerDiv}>
      <div>
        <a style={styles.backButton} href="/">
          X
        </a>
        <a style={styles.topCornerButton} href="/userprofile">
          <img src="images/profile.png" alt={"Profile"} />
        </a>
      </div>

      <h6 style={styles.groupTitle}>Group Code: </h6>
      <h3 style={styles.groupCode}>{groupCode}</h3>

      <form style={styles.form}>
        <MultiSelectComboBox
            label="Select Genre(s):"
            itemLabelPath="label"
            itemIdPath="value"
            items={genres}
            style={{ width: '300px' }}
            autoExpandHorizontally
            autoExpandVertically
            onChange={e => setSelectedGenres(e.target.selectedItems)}
        />

        <MultiSelectComboBox
            label="Select Streaming Platform(s):"
            itemLabelPath="label"
            itemIdPath="value"
            items={streamingPlatforms}
            style={{ width: '300px' }}
            autoExpandHorizontally
            autoExpandVertically
            onChange={e => setSelectedPlatforms(e.target.selectedItems)}
        />

        {/*<a href="/swipe">*/}
        <a>
          <input style={styles.button} onClick={submit} value="Ready"/>
        </a>
      </form>
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
  groupTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  groupCode: {
    textAlign: 'center',
    fontSize: 40,
  },
  form: {
    margin: 'auto',
    width: '80%',
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginRight: 'auto', 
    marginLeft: '5%'
  },
  input: {
    width: '90%',
    height: 30,
    margin: 'auto',
    border: '1px solid black',
    marginBottom: 20,
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 8,
  },
  button: {
    width: 180,
    height: 36,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderWidth: 0,
    backgroundColor: colors.main,
    color: 'white',
    textAlign: 'center',
    marginTop: 36,
    fontSize: '17px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
  }
}
