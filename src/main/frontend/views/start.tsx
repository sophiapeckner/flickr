import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 2, icon: "line-awesome/svg/file.svg" },
  title: "Start",
};

export default function StartView() {
  return (
    <>
      <a className="login-link" href="/">
        Login
      </a>
      <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
        <div className="home-page">
          <h2 className="page-title">flickr</h2>
          <a href="/groupcode">
            <button className="join-group-btn">Join Group</button>
          </a>
          <p className="sign-in-prompt">
            Please{" "}
            <a href="/" style={{ textDecoration: "underline" }}>
              login
            </a>{" "}
            or{" "}
            <a href="/sign-up" style={{ textDecoration: "underline" }}>
              sign up
            </a>{" "}
            to create a group
          </p>
        </div>
      </div>
    </>
  );
}
