import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import {useEffect, useState} from "react";
import { style } from "../themes/flickr/css.js";
import { logout } from "Frontend/auth";
import { getUsername, getEmail } from "Frontend/auth";
import {Button, EmailField, MultiSelectComboBox, TextField, Icon} from "@vaadin/react-components";
import {colors} from "Frontend/themes/flickr/colors";
import {useNavigate, useParams} from "react-router-dom";

export const config: ViewConfig = {
  menu: { order: 8, icon: "line-awesome/svg/file.svg" },
  title: "User Profile",
};

export default function UserProfileView() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const { memberId } = useParams();

  function getProfile() {
    if (getUsername()) {
      // @ts-ignore
      setUsername(getUsername());
    }
    if (getEmail()) {
      // @ts-ignore
      setEmail(getEmail());
    }
  }

  if (email.length == 0) {
    getProfile();
  }

  const save = async () => {
    // selectedGenres & selectedPlatforms are a list of objects
    // The PUT request only accepts a list of Strings as the body of the request
    // The conversion from [Object] to [String] is accomplished here:

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

  useEffect(() => {
    fetchStreamingPlatforms().then(setStreamingPlatforms)
  }, []);

  return (
    <div style={style.outerDiv}>
      <a href="/start">
        <Icon icon="vaadin:close" style={style.backButton} />
      </a>
      <h2 style={style.pageTitle}>flickr</h2>

        <form style={{ ...style.form, ...styles.formAddOn  }}>
          <TextField
            label="Username"
            value={username}
            style={style.input}
            onValueChanged={(e) => setUsername(e.detail.value)}
          />
          <EmailField
            label="Email address"
            value={email}
            style={style.input}
            errorMessage="Enter a valid email address"
            onValueChanged={(e) => setEmail(e.detail.value)}
          />

          <MultiSelectComboBox
            label="Select Streaming Platform(s):"
            itemLabelPath="label"
            itemIdPath="value"
            items={streamingPlatforms}
            style={{width: '90%', marginLeft: '5%'}}
            autoExpandVertically
            onChange={e => setSelectedPlatforms(e.target.selectedItems)}
          />

          <Button
            style={styles.saveButton}
            onClick={() => {
              navigate("/start");
            }}
          >
            Save
          </Button>
        </form>

        <Button
          style={{...styles.saveButton,
            backgroundColor: colors.secondary,
            width: '60%', marginLeft: '20%',
            marginBottom: 'auto'
        }}
          onClick={e => logout()}
        >
          Logout
        </Button>
    </div>
  );
}

const styles = {
  formAddOn: {
    border: '1px solid grey',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 'auto'
  },
  saveButton: {
    width: '90%',
    marginLeft: '5%',
    backgroundColor: colors.main,
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0,
    textAlign: 'center',
    fontSize: 16,
    cursor: 'pointer',
  },
}
