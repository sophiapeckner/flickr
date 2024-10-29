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
        <a style={styles.loginButton} href="/">
          Login
        </a>
      </div>
      
      <div>
        <div style={styles.homePage}>
          <h2 style={styles.pageTitle}>flickr</h2>
          <a href="/groupcode">
            <button style={styles.joinGroupButton}>Join Group</button>
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
    </div>
  );
}

const styles = {
  outerDiv: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  loginButton: {
    margin: '15px',
    float: 'right',
  },
  homePage: {
    margin: 'auto',
    width: '80%',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageTitle: {
    color: colors.main, 
    textAlign: 'center',
    fontSize: '48px',
    marginTop: '50px',
    fontFamily: 'Nunito, Verdana',
  },
  joinGroupButton: {
    backgroundColor: colors.main,
    height: '75px',
    width: '200px',
    color: 'white',
    fontSize: '20px',
    marginTop: '200px',
    borderRadius: '12px',
    borderWidth: '0',
  },
  signInPrompt: {
    color: colors.main,
    marginTop: '20px',
    fontSize: '16px',
  }
}
