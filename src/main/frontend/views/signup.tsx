import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 1, icon: "line-awesome/svg/file.svg" },
  title: "Sign Up",
};

export default function SignUpView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <img style={{ width: "100%" }} src="images/movie_reel.png" />
      <form className="sign-up-form">
        <label htmlFor="username">Email</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="example@gmail.com"
        />
        <label htmlFor="password">Set Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="5-7 characters long"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
        <a href="/start_auth">
          <input className="sign-up" value="Sign Up" />
        </a>
        <div className="redirect">
          <a href="/">Already have an account</a>
        </div>
      </form>
    </div>
  );
}
