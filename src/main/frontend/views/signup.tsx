import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";
import { createUser } from "Frontend/generated/MemberServices";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export const config: ViewConfig = {
  menu: { order: 1, icon: "line-awesome/svg/file.svg" },
  title: "Sign Up",
};

export default function SignUpView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  return (
    <div style={style.outerDiv}>
      <h2 style={{...style.pageTitle, marginTop: 20}}>flickr</h2>
      <img style={{width: '100%'}} src="images/movie_reel.png" alt={""} />

      <div style={style.innerDiv}>
        <form style={{...style.authFormAddOn, ...style.form}}>
          <label style={style.label} htmlFor="username">Email</label>
          <input style={style.input}
                 type="text"
                 onChange={e => setEmail(e.target.value)}
                 value={email}
                 id="email"
                 name="email"
                 placeholder="example@gmail.com"
          />

          <label style={style.label} htmlFor="username">Username</label>
          <input style={style.input}
                 type="text"
                 onChange={e => setUsername(e.target.value)}
                 value={username}
                 id="username"
                 name="username"
                 placeholder="user123"
          />

          <label style={style.label} htmlFor="password">Set Password</label>
          <input style={style.input}
                 type="password"
                 onChange={e => setPassword(e.target.value)}
                 value={password}
                 id="password"
                 name="password"
                 placeholder="5-7 characters long"
          />

          <label style={style.label} htmlFor="confirmPassword">Confirm Password</label>
          <input style={style.input}
                 type="password"
                 id="confirmPassword"
                 name="confirmPassword"
          />

          <input
            style={styles.signUp}
            type="submit" value="Sign Up"
            onClick={e => {
              e.preventDefault();
              createUser(email, username, password);
              navigate("/");
            }}
            tabIndex={0}
          />

          <a style={{...style.redirect, display: 'flex'}} href="/">
            Already have an account
          </a>
        </form>
      </div>
    </div>
  );
}

const styles = {
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
}

