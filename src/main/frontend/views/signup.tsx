import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";
import { createUser } from "Frontend/generated/MemberServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const config: ViewConfig = {
  menu: { order: 1, icon: "line-awesome/svg/file.svg" },
  title: "Sign Up",
};

export default function SignUpView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    // Username validation
    if (username.trim() === "") {
      setUsernameError("Username is required.");
      isValid = false;
    }

    // Password validation
    if (password.length < 5) {
      setPasswordError("Password must be 5-7 characters long.");
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
        <img style={{ width: "100%" }} src="images/movie_reel.png" alt={""} />

        <div style={style.innerDiv}>
          <form style={{ ...style.authFormAddOn, ...style.form }}>
            {/* Email Input */}
            <label style={style.label} htmlFor="email">Email</label>
            <input
                style={style.input}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                name="email"
                placeholder="example@gmail.com"
            />
            {emailError && <span style={{ color: "red" }}>{emailError}</span>}

            {/* Username Input */}
            <label style={style.label} htmlFor="username">Username</label>
            <input
                style={style.input}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                id="username"
                name="username"
                placeholder="user123"
            />
            {usernameError && <span style={{ color: "red" }}>{usernameError}</span>}

            {/* Password Input */}
            <label style={style.label} htmlFor="password">Set Password</label>
            <input
                style={style.input}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                name="password"
                placeholder="5-7 characters long"
            />
            {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}

            {/* Confirm Password Input */}
            <label style={style.label} htmlFor="confirmPassword">Confirm Password</label>
            <input
                style={style.input}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                id="confirmPassword"
                name="confirmPassword"
            />
            {confirmPasswordError && (
                <span style={{ color: "red" }}>{confirmPasswordError}</span>
            )}

            {/* Sign Up Button */}
            <div style={styles.signUpDiv}>
              <button style={styles.signUp} onClick={handleSignUp}>
                Sign Up
              </button>
            </div>

            {/* Redirect Link */}
            <a style={{ ...style.redirect, display: "flex" }} href="/">
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

