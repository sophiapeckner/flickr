import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { colors } from "../themes/flickr/colors";

export const config: ViewConfig = {
  menu: { order: 2, icon: "line-awesome/svg/file.svg" },
  title: "Start Auth",
};

export default function StartView() {
  return (
    <div style={styles.outerDiv}>
      <div>
        <a style={styles.topCornerButton} href="/userprofile">
          <img src="images/profile.png" />
        </a>
      </div>
      <h2 style={styles.pageTitle}>flickr</h2>
      
      <div style={styles.mainPage}>
          <a href="/groupcode">
            <button style={styles.groupChoiceButton}>Join Group</button>
          </a>
          <a href="/grouplanding">
            <button style={styles.groupChoiceButton}>Create Group</button>
          </a>
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
    width: '100%',
    padding: '15px',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupChoiceButton: {
    backgroundColor: colors.main,
    height: '75px',
    width: '200px',
    color: 'white',
    fontSize: '16px',
    margin: 20,
    borderRadius: '12px',
    borderWidth: '0',
  },
}

