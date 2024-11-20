import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import {useEffect, useState} from "react";
import { style } from "../themes/flickr/css.js";
import {Button, EmailField, MultiSelectComboBox, TextField, Icon} from "@vaadin/react-components";
import {useNavigate} from "react-router-dom";
import { getMember, logout } from "Frontend/auth";
import {updateUser} from "Frontend/generated/ManageProfileEndpoint";

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

  useEffect(() => {
    getMember().then(r => {
      if (r) {
        // @ts-ignore
        setUsername(r.username);
        // @ts-ignore
        setEmail(r.email);
      }
    })
  }, []);

  const save = async () => {
    const id = localStorage.getItem('RYT');
    if (id) {
      await updateUser(id, email, username);
    }

    window.history.back();
  }

  const fetchStreamingPlatforms = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/watch/providers/movie?language=en-US",
        {
          headers: {
            Authorization: `Bearer ${(import.meta as any).env.VITE_MOVIE_DB_TOKEN}`,
            accept: "application/json",
          },
        }
      )
      const data = await response.json();
      if (data.results) {
        return data.results.map((platform: {provider_name: string, provider_id: number}) => (
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
      <Icon icon="vaadin:close" style={style.backButton} onClick={() => window.history.back()}/>
      <h2 style={style.pageTitle}>flickr</h2>

      <div style={style.innerDiv}>
        <form style={{ ...style.form, ...style.formAddOn  }}>
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
            style={style.input}
            autoExpandVertically
            onChange={e => setSelectedPlatforms(e.target.selectedItems)}
          />

          <Button
            style={style.button}
            onClick={() => {
              save()
              navigate("/start");
            }}
          >
            Save
          </Button>
        </form>

        <Button
          style={style.secondaryButton}
          onClick={e => logout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
