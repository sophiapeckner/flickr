import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { colors } from "../themes/flickr/colors";

export const config: ViewConfig = {
  menu: { order: 2, icon: "line-awesome/svg/file.svg" },
  title: "Start",
};

export default function StartView() {
  return (
    <div style={styles.outerDiv}>
      <div>
        <a style={styles.topCornerButton} href="/">
          Login
        </a>
      </div>
      <h2 style={styles.pageTitle}>flickr</h2>

      <div style={styles.mainPage}>
        <a href="/groupcode">
          <button style={styles.groupChoiceButton}>Join Group</button>
        </a>
        
        <p style={styles.signInPrompt}>
          Please{" "}
          <a href="/" style={{ textDecoration: "underline" }}>
            login
          </a>{" "}
          or{" "}
          <a href="/sign-up" style={{ textDecoration: "underline" }}>
            sign up
          </a>{" "}
          to create a group
        </p>
      </div>

    </div>
  );
}

const styles = {
  outerDiv: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  topCornerButton: {
    height: '50px',
    margin: '15px',
    float: 'right',
  },
  pageTitle: {
    color: colors.main, 
    textAlign: 'center',
    fontSize: '48px',
    fontFamily: 'Nunito, Verdana',
  },
  mainPage: {
    margin: 'auto',
    width: '80%',
    padding: '15px',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupChoiceButton: {
    backgroundColor: colors.main,
    height: 75,
    margin: 20,
    fontSize: '16px',
    width: '200px',
    color: 'white',
    borderRadius: '12px',
    borderWidth: '0',
  },
  signInPrompt: {
    color: colors.main,
    height: 75,
    margin: 20,
    fontSize: '16px',
  }
}
