import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { logout } from "Frontend/auth";
import { useState } from "react";
import { getUsername, getEmail } from "Frontend/auth";
import { MemberServices } from 'Frontend/generated/endpoints';


export const config: ViewConfig = {
  menu: { order: 8, icon: "line-awesome/svg/file.svg" },
  title: "User Profile",
};

export default function UserProfileView() {
  const og_email = getEmail();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

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


  return (
    <div style={style.outerDiv}>
      <div>
        <a style={style.backButton} href="/start_auth">
          X
        </a>
        <a style={style.topCornerButton} href="/userprofile">
          <img src="images/profile.png" />
        </a>
      </div>
      <h2 style={style.pageTitle}>flickr</h2>

      <form style={style.form}>
        <label style={style.label}>Username</label>
        <input style={style.input}
          type="text"
          value={username? username : ''}
               onChange={e => setUsername(e.target.value)}
          placeholder="example-username"
        />

        <label style={style.label}>Email</label>
        <input style={style.input}
          type="text"
               value={email? email : ''}
               onChange={e => setEmail(e.target.value)}
          placeholder="example@gmail.com"
        />

        <button style={style.button} onClick={e => logout()}>Logout</button>
        <a>
          <input style={style.button} onClick={e => {
            // @ts-ignore
            MemberServices.updateUser(og_email, email, username);
            localStorage.setItem("email", email);
            localStorage.setItem("username", username);
          }} value="Save" />
        </a>
      </form>
    </div>
  );
}
