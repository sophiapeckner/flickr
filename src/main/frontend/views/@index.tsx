import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";
import { login, isLoggedIn } from "../auth"
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import member from "Frontend/generated/com/flickr/entities/Member";
import {Button, EmailField, PasswordField} from "@vaadin/react-components";

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

            <PasswordField
                label="Password"
                value={password}
                style={style.input}
                onValueChanged={(e) => setPassword(e.detail.value)}
            />

            <div style={styles.buttonDiv}>
              <Button
                  style={styles.signUpButton}
                  onClick={() => {
                    login(email, password).then(() => {
                      if (isLoggedIn()) {
                        navigate("/start");
                      }
                    });
                  }}
              >
                Sign In
              </Button>
            </div>

            <div style={style.redirect}>
              <a style={{ float: 'left' }} href="/signup">Forgot Password</a>
              <a style={{ float: 'right' }} href="/signup">Sign Up</a>
            </div>
          </form>

          <div style={styles.buttonDiv}>
            <Button
                style={styles.button}
                onClick={() => navigate("/start")}
            >
              Continue as Guest
            </Button>
          </div>
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
