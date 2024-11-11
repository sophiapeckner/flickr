import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";
import { isLoggedIn} from "Frontend/auth";

export const config: ViewConfig = {
  menu: { order: 2, icon: "line-awesome/svg/file.svg" },
  title: "Start",
};

export default function StartView() {
  const user = isLoggedIn();

  return (
      <div style={style.outerDiv}>
        {user ? (
            <>
            <div>
              <a style={style.backButton} href="/">
                X
              </a>
              <a style={style.topCornerButton} href="/userprofile">
                <img src="images/profile.png"/>
              </a>
            </div>
            <h2 style={style.pageTitle}>flickr</h2>

            <div style={{...style.innerDiv, ...style.innerDivAddOn}}>
              <a href="/groupcode">
                <button style={style.groupChoiceButton}>Join Group</button>
              </a>
              <a>
                <button style={style.groupChoiceButton}>Create Group</button>
              </a>
            </div>
          </>
          ) : <>
        <div>
          <a style={style.backButton} href="/">
            X
          </a>
          <a style={style.topCornerButton} href="/">
            Login
          </a>
        </div>
        <h2 style={style.pageTitle}>flickr</h2>

        <div style={{...style.innerDiv, ...style.innerDivAddOn}}>
          <a href="/groupcode">
            <button style={style.groupChoiceButton}>Join Group</button>
          </a>

          <p style={styles.signInPrompt}>
            Please{" "}
            <a href="/" style={{textDecoration: "underline"}}>
              login
            </a>{" "}
            or{" "}
            <a href="/sign-up" style={{textDecoration: "underline"}}>
              sign up
            </a>{" "}
            to create a group
          </p>
        </div>


</>}
      </div>
);
}

const styles = {
  signInPrompt: {
    color: colors.main,
    height: 75,
    margin: 20,
    fontSize: '16px',
  }
}
