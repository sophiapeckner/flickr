import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 0, icon: "line-awesome/svg/file.svg" },
  title: "Log In",
};

export default function LogInView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <img style={{ width: "100%" }} src="images/movie_reel.png" />
      <form className="login-form">
        <div className="input">
          <label>Email</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example@gmail.com"
          />
        </div>

        <div className="input">
          <label>Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="**********"
          />
        </div>

        <a href="/start_auth">
          <input className="sign-in" value="Sign In" />
        </a>

        <div className="redirect">
          <a href="/signup">Forgot Password</a>
          <a href="/signup">Sign Up</a>
        </div>
      </form>
      <a href="/groupCode">
        <button className="guest-btn">Continue as Guest</button>
      </a>
    </div>
  );
}
