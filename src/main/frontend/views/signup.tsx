import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { createUser } from "Frontend/generated/LogInEndpoint";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {Button, EmailField, PasswordField, TextField} from "@vaadin/react-components";

export const config: ViewConfig = {
  menu: { order: 1, icon: "line-awesome/svg/file.svg" },
  title: "Sign Up",
};

export default function SignUpView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Username validation
    if (username.trim() === "") {
      setUsernameError("Username is required.");
      isValid = false;
    }

    // Password validation
    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long.");
      isValid = false;
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateForm()) {
      createUser(email, username, password).then((r) => {
        if (r === "Account created") {
          navigate("/");
        } else {
          alert(r);
        }
      });
    }
  };

  return (
      <div style={style.outerDiv}>
        <h2 style={{ ...style.pageTitle, marginTop: 20 }}>flickr</h2>
        <img style={{ width: "100%" }} src="images/movie_reel.png" alt={""}/>

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
              {usernameError && <span style={{ color: "red" }}>{usernameError}</span>}

            <PasswordField
                label="Set Password"
                value={password}
                style={style.input}
                onValueChanged={(e) => setPassword(e.detail.value)}
                placeholder="Minimum 5 Characters"
            />
              {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}

            <PasswordField
                label="Confirm Password"
                style={style.input}
                onChange={(e) => setConfirmPassword(e.detail.value)}
                value={confirmPassword}
            />
              {confirmPasswordError && (
                  <span style={{ color: "red" }}>{confirmPasswordError}</span>
              )}


              <Button
                  style={style.button}
                  onClick={handleSignUp}
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
