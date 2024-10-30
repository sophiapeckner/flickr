import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { colors } from "../themes/flickr/colors";

export const config: ViewConfig = {
  menu: { order: 8, icon: "line-awesome/svg/file.svg" },
  title: "User Profile",
};

export default function UserProfileView() {
  return (
    <div style={styles.outerDiv}>
      <div>
        <a style={styles.backButton} href="/start_auth">
          X
        </a>
        <a style={styles.topCornerButton} href="/userprofile">
          <img src="images/profile.png" />
        </a>
      </div>
      <h2 style={styles.pageTitle}>flickr</h2>

      <form style={styles.form}>
        <label style={styles.label}>Username</label>
        <input style={styles.input}
          type="text"
          id="email"
          name="email"
          className="emailInput"
          placeholder="example-username"
        />

        <label style={styles.label}>Password</label>
        <input style={styles.input}
          type="password"
          id="password"
          name="password"
          placeholder="**********"
        />

        <label style={styles.label}>Email</label>
        <input style={styles.input}
          type="text"
          id="email"
          name="email"
          className="emailInput"
          placeholder="example@gmail.com"
        />

        <a href="/start_auth">
          <input style={styles.button} value="Save" />
        </a>
      </form>
    </div>
  );
}


const styles = {
  outerDiv: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',

  },
  backButton: {
    height: '50px',
    margin: '15px',
    float: 'left',
    fontSize: 20,
    marginRight: 15,
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
  form: {
    margin: 'auto',
    width: '80%',
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginRight: 'auto', 
    marginLeft: '5%'
  },
  input: {
    width: '90%',
    height: 30,
    margin: 'auto',
    border: '1px solid black',
    marginBottom: 20,
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 8,
  },
  button: {
    width: 180,
    height: 36,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderWidth: 0,
    backgroundColor: colors.main,
    color: 'white',
    textAlign: 'center',
    marginTop: 36,
    fontSize: '17px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
  }
}
