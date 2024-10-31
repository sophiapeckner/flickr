import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";

export const config: ViewConfig = {
  menu: { order: 4, icon: "line-awesome/svg/file.svg" },
  title: "Group Landing",
};

export default function GroupLandingView() {
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

      <div style={styles.membersDiv}>
        <div style={styles.personDiv}>
          <img style={styles.personImage} src="images/person.png" alt="" />
          <h4 style={styles.personLabel}>Jane Mustang</h4>
        </div>
        <div style={styles.personDiv}>
          <img style={styles.personImage} src="images/person.png" alt="" />
          <h4 style={styles.personLabel}>Jane Doe</h4>
        </div>
      </div>

      <a href="/swipe">
        <button style={style.button}>Start Session</button>
      </a>
    </div>
  );
}

const styles = {
  membersDiv: {
    width: '60%',
    margin: '10px auto',
    height: '50%',
    backgroundColor: colors.light,
    borderRadius: 12,
    padding: 10
  },
  personDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  personImage: {
    width: '20%',
    height: '30%',
  },
  personLabel: {
    padding: 20,
    fontSize: 20,
  }
}
