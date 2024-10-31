import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";

export const config: ViewConfig = {
  menu: { order: 2, icon: "line-awesome/svg/file.svg" },
  title: "Start Auth",
};

export default function StartView() {
  return (
    <div style={style.outerDiv}>
      <div>
        <a style={style.backButton} href="/">
          X
        </a>
        <a style={style.topCornerButton} href="/userprofile">
          <img src="images/profile.png" />
        </a>
      </div>
      <h2 style={style.pageTitle}>flickr</h2>
      
      <div style={{...style.innerDiv, ...style.innerDivAddOn}}>
          <a href="/groupcode">
            <button style={style.groupChoiceButton}>Join Group</button>
          </a>
          <a href="/grouplanding">
            <button style={style.groupChoiceButton}>Create Group</button>
          </a>
      </div>
    </div>
  );
}
