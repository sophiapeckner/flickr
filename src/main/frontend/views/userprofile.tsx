import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import {useEffect, useState} from "react";
import { style } from "../themes/flickr/css.js";
import {Button, EmailField, MultiSelectComboBox, TextField} from "@vaadin/react-components";
import {useNavigate} from "react-router-dom";
import { getMember, logout } from "Frontend/auth";
import {updateUser} from "Frontend/generated/ManageProfileEndpoint";
import {CustomHeader} from "Frontend/views/elements";

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
        // @ts-ignore
        setSelectedPlatforms(convertSavedToSelected(r.streamingPlatforms))
      }
    })
  }, []);

  const convertSelectedToSaved = (selected: { label: string; value: number; }[]) => {
    return selected.map((platform: {label: string, value: number}) =>
      platform.value as unknown as string + "," + platform.label
    )
  }

  const convertSavedToSelected = (saved: string[]) => {
    return saved.map((platform: string) => {
      const index = platform.indexOf(",");
      return (
          {
            label: platform.slice(index + 1),
            value: Number(platform.slice(0, index))
          })
      }
    )
  }

  const save = async () => {
    const id = localStorage.getItem('RYT');
    if (id) {
      await updateUser(id, email, username,convertSelectedToSaved(selectedPlatforms));
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

      <CustomHeader hideProfileIcon={true}/>
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
            selectedItems={selectedPlatforms}
            onChange={e => {
              // @ts-ignore
              setSelectedPlatforms(e.target.selectedItems)
            }}
          />

          <Button
            style={style.button}
            onClick={() => {
              save()
            }}
          >
            Save
          </Button>
        </form>

        <Button
          style={style.secondaryButton}
          onClick={e => {
            logout().then(() => navigate("/"));
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
