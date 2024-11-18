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
          <form style={{ ...style.form, ...style.formAddOn }} onSubmit={(e) => e.preventDefault()}>
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

            <Button
                style={style.button}
                onClick={() => {
                  createUser(email, username, password);
                  navigate("/");
                }}
            >
              Sign Up
            </Button>

            <a style={{ ...style.redirect, display: 'flex' }} href="/">
              Already have an account
            </a>
          </form>
        </div>
      </div>
  );
}
