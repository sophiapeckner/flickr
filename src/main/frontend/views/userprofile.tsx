import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 8, icon: "line-awesome/svg/file.svg" },
  title: "User Profile",
};

export default function UserProfileView() {
  return (
    <>
      <a href="/start_auth">
        <button className="back-button">X</button>
      </a>
      <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
        <h2>flickr</h2>
        <h3 className="username">ExampleUser Profile</h3>
        <form className="profile-form">
          <div className="input">
            <label className="emailLabel">Username</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              className="emailInput"
              placeholder="example-username"
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

          <div className="input">
            <label className="emailLabel">Email</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              className="emailInput"
              placeholder="example@gmail.com"
            />
          </div>
        </form>
        <form className="streamingServices">
        <label htmlFor="StreamService">Available Streaming Services: </label>
        <br />
        <div className = "ServiceSelect">
          <select id="StreamService">
            <option value="netflix">Netflix</option>
            <option value="hulu">Hulu</option>
            <option value="paramount">Paramount+</option>
            <option value="disney">Disney+</option>
          </select>
        </div>
        <br />
        <div className="AddStreamingService">
          <button className="moreServices">
            <a className="addAnotherService" href="/swipe">+ Streaming Service</a>
          </button>
        </div>
        </form>
      </div>
    </>
  );
}
