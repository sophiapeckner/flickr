import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";

export const config: ViewConfig = {
  menu: { order: 5, icon: "line-awesome/svg/file.svg" },
  title: "Pick Genre",
};

export default function PickGenreView() {
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

      <h6 style={style.groupTitle}>Group Code: </h6>
      <h3 style={style.groupCode}>XPJMRT</h3>

      <form style={style.form}>
        <label style={style.label} htmlFor="Genre">Genre: </label>
        <select style={style.input} name="comedy" id="comedy">
          <option>Comedy</option>
          <option>Action</option>
        </select>

        <label style={style.label} htmlFor="Rating">Rating: </label>
        <select style={style.input} name="R" id="R">
          <option>R</option>
          <option>PG-13</option>
        </select>

        <a href="/grouplanding">
          <input style={style.button} value="Ready" />
        </a>
      </form>
    </div>
  );
}
