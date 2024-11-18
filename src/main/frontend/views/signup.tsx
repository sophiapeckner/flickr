import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";
import { createUser } from "Frontend/generated/MemberServices";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, EmailField, PasswordField, TextField} from "@vaadin/react-components";

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
        <h2 style={{ ...style.pageTitle, marginTop: 20 }}>flickr</h2>
        <img style={{ width: '100%' }} src="images/movie_reel.png" />

        <div style={style.innerDiv}>
          <form style={{ ...style.authFormAddOn, ...style.form }} onSubmit={(e) => e.preventDefault()}>
            <EmailField
                label="Email address"
                value={email}
                style={style.input}
                errorMessage="Enter a valid email address"
                onValueChanged={(e) => setEmail(e.detail.value)}
            />

            <TextField
                label="Username"
                value={username}
                style={style.input}
                onValueChanged={(e) => setUsername(e.detail.value)}
            />

            <PasswordField
                label="Set Password"
                value={password}
                style={style.input}
                onValueChanged={(e) => setPassword(e.detail.value)}
            />

            <PasswordField
                label="Confirm Password"
                style={style.input}
            />

            <div style={styles.signUpDiv}>
              <Button
                  style={styles.signUp}
                  onClick={() => {
                    createUser(email, username, password);
                    navigate("/");
                  }}
              >
                Sign Up
              </Button>
            </div>

            <a style={{ ...style.redirect, display: 'flex' }} href="/">
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
    // borderRadius: 8,
    width: '90%',
    // height: 30,
    backgroundColor: colors.main,
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0,
    textAlign: 'center',
    fontSize: 16,
    cursor: 'pointer',
  },
}

