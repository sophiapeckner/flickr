import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { login } from "../auth"
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {Button, EmailField, PasswordField} from "@vaadin/react-components";

export const config: ViewConfig = {
  menu: { order: 0, icon: "line-awesome/svg/file.svg" },
  title: "Log In",
};

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    login(email, password).then(async (r) => {
      if (r == "Success") {
          navigate("/start");
      } else {
        // @ts-ignore
        setError(r);
      }
    });
  };

  return (
      <div style={style.outerDiv}>
          <h2 style={{...style.pageTitle, marginTop: 20}}>flickr</h2>
          <img style={{width: '100%'}} src="images/movie_reel.png" alt={""}/>

          <div style={style.innerDiv}>
              <form style={{...style.form, ...style.formAddOn}} onSubmit={(e) => e.preventDefault()}>
                  {error && <span style={{color: 'red'}}>{error}</span>}
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


                  <Button style={style.button} onClick={handleLogin}>
                      Sign In
                  </Button>


                  <div style={style.redirect}>
                      <a style={{float: 'left'}} href="/signup">Forgot Password</a>
                      <a style={{float: 'right'}} href="/signup">Sign Up</a>
                  </div>
              </form>

          <Button
              style={style.secondaryButton}
              onClick={() => navigate("/start")}
          >
            Continue as Guest
          </Button>
        </div>
      </div>
  );
}
