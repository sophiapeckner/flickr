import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 2, icon: "line-awesome/svg/file.svg" },
  title: "Start Auth",
};

export default function StartView() {
  return (
    <>
      <a className="profile-link" href="/userprofile">
        <img className="profile-link-img" src="images/profile.png" />
      </a>
      <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
        <div className="SignedInStartPage">
          <h2 className="page-title">flickr</h2>
          <a href="/groupcode">
            <button className="join-group-btn2">Join Group</button>
          </a>
          <a href="/grouplanding">
            <button className="create-group-btn">Create Group</button>
          </a>
        </div>
      </div>
    </>
  );
}
