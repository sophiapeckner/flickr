import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";
import { login, isLoggedIn } from "../auth"
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import member from "Frontend/generated/com/flickr/entities/Member";

export const config: ViewConfig = {
  menu: { order: 0, icon: "line-awesome/svg/file.svg" },
  title: "Log In",
};

export default function LogInView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log(isLoggedIn());

  return (
    <div style={style.outerDiv}>
      <h2 style={{...style.pageTitle, marginTop: 20}}>flickr</h2>
      <img style={{width: '100%'}} src="images/movie_reel.png" />
    
    <div style={style.innerDiv}>
      <form style={{...style.authFormAddOn, ...style.form}}>
        <label style={style.label}>Email</label>
        <input style={style.input}
          type="text"
          id="email"
          name="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
        />

        <label style={style.label}>Password</label>
        <input style={style.input}
          type="password"
          id="password"
          name="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
          placeholder="**********"
        />

        <a style={styles.buttonDiv} onClick={e => {
          e.preventDefault();
          login(email, password).then(r => {
            if (isLoggedIn()) {
              navigate("/start");
            }
          });
        }}>
          <input style={styles.signUpButton} value="Sign In" />
        </a>

        <div style={style.redirect}>
          <a style={{float: 'left'}} href="/signup">Forgot Password</a>
          <a style={{float: 'right'}} href="/signup">Sign Up</a>
        </div>
      </form>


      <a style={styles.buttonDiv} href="/start">
        <button style={styles.button}>Continue as Guest</button>
      </a>
      </div>
    </div>
  );
}

const styles = {
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
}
