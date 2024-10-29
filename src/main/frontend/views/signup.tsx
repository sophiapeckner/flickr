import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { colors } from "../themes/flickr/colors";

export const config: ViewConfig = {
  menu: { order: 1, icon: "line-awesome/svg/file.svg" },
  title: "Sign Up",
};

export default function SignUpView() {
  return (
    <div style={styles.outerDiv}>
      <h2 style={styles.pageTitle}>flickr</h2>
      <img style={styles.headerImage} src="images/movie_reel.png" />

      <div style={styles.innerDiv}>
        <form style={styles.form}>

          <div style={styles.inputDiv}>
            <label style={styles.label} htmlFor="username">Email</label>
            <input style={styles.input}
              type="text"
              id="username"
              name="username"
              placeholder="example@gmail.com"
            />
          </div>

          <div style={styles.inputDiv}>
            <label style={styles.label} htmlFor="password">Set Password</label>
            <input style={styles.input}
              type="password"
              id="password"
              name="password"
              placeholder="5-7 characters long"
            />
          </div>
          
          <div style={styles.inputDiv}>
            <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
            <input style={styles.input} 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
            />
          </div>
          
          <a style={styles.signUpDiv} href="/start_auth">
            <input style={styles.signUp} value="Sign Up" />
          </a>
         
          <a style={styles.redirect} href="/">Already have an account</a>
        </form>
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
  signUpDiv: {
      justifyContent: 'center', 
      display: 'flex',
      width: '100%'
  },
  signUp: {
    borderRadius: 8,
    width: '90%',
    height: 30,
    backgroundColor: colors.main,
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 0,
    textAlign: 'center',
    fontSize: 16,
    cursor: 'pointer',
  },
  redirect: {
    width: '100%',
    fontSize: 16,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
  }
}

