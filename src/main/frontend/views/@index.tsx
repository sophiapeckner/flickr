import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { colors } from "../themes/flickr/colors";

export const config: ViewConfig = {
  menu: { order: 0, icon: "line-awesome/svg/file.svg" },
  title: "Log In",
};

export default function LogInView() {
  return (
    <div style={styles.outerDiv}>
      <h2 style={styles.pageTitle}>flickr</h2>
      <img style={styles.headerImage} src="images/movie_reel.png" />
    
    <div style={styles.innerDiv}>
      <form style={styles.form}>
        <div style={styles.inputDiv}>
          <label style={styles.label}>Email</label>
          <input style={styles.input}
            type="text"
            id="email"
            name="email"
            placeholder="example@gmail.com"
          />
        </div>

        <div style={styles.inputDiv}>
          <label style={styles.label}>Password</label>
          <input style={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="**********"
          />
        </div>

        
        <a style={styles.buttonDiv} href="/start_auth">
          <input style={styles.signUpButton} value="Sign In" />
        </a>

        <div style={styles.redirect}>
          <a style={{float: 'left'}} href="/signup">Forgot Password</a>
          <a style={{float: 'right'}} href="/signup">Sign Up</a>
        </div>
      </form>


      <a style={styles.buttonDiv} href="/groupCode">
        <button style={styles.button}>Continue as Guest</button>
      </a>
      </div>
    </div>
  );
}

const styles = {
  outerDiv: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  innerDiv: {
    flexDirection: 'column',
    width: '100%',
    margin: 'auto',
  },
  headerImage: {
    width: '110%',
  },
  pageTitle: {
    color: colors.main, 
    textAlign: 'center',
    fontSize: '48px',
    fontFamily: 'Nunito, Verdana',
    marginTop: 20
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: '80%',
    border: '1px solid grey',
    borderRadius: 8,
    padding: 15,
  },
  inputDiv: {
    display: 'flex', 
    width: '100%',
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
  buttonDiv: {
    justifyContent: 'center', 
    display: 'flex',
    width: '100%'
  },
  signUpButton: {
    borderRadius: 8,
    width: '90%',
    height: 30,
    backgroundColor: colors.main,
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0,
    textAlign: 'center',
    fontSize: 16,
    cursor: 'pointer',
  },
  button: {
    borderRadius: 8,
    width: '60%',
    height: 30,
    backgroundColor: colors.secondary,
    color: 'white',
    margin: 20,
    borderWidth: 0,
    textAlign: 'center',
    fontSize: 16,
    cursor: 'pointer',
  },
  redirect: {
    width: '100%',
    fontSize: 16,
    marginTop: 10,
    justifyContent: 'center',
  }
}
