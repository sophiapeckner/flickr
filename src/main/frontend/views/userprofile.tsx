import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { logout } from "Frontend/auth";

export const config: ViewConfig = {
  menu: { order: 8, icon: "line-awesome/svg/file.svg" },
  title: "User Profile",
};

export default function UserProfileView() {
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
          id="email"
          name="email"
          className="emailInput"
          placeholder="example-username"
        />

        <label style={style.label}>Password</label>
        <input style={style.input}
          type="password"
          id="password"
          name="password"
          placeholder="**********"
        />

        <label style={style.label}>Email</label>
        <input style={style.input}
          type="text"
          id="email"
          name="email"
          className="emailInput"
          placeholder="example@gmail.com"
        />

        <button onClick={e => logout()}>Logout</button>
        <a href="/start_auth">
          <input style={style.button} value="Save" />
        </a>
      </form>
    </div>
  );
}
