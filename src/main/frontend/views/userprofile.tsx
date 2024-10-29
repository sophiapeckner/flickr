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
          <div className="input">
            <label className="Services-label">Streaming Services</label>
            <br />
            <button className="Streaming-Button">
              <a className="NetflixBoolean" href="/swipe">
                Netflix
              </a>
            </button>
            <br />
            <br />
            <button className="Streaming-Button">
              <a className="HuluBoolean" href="/swipe">
                Hulu
              </a>
            </button>
            <br />
            <br />
            <button className="Streaming-Button">
              <a className="DisneyBoolean" href="/swipe">
                DisneyPlus
              </a>
            </button>
            <br />
            <br />
            <button className="Streaming-Button">
              <a className="ParamountBoolean" href="/swipe">
                ParamountPlus
              </a>
            </button>
            <br />
            <br />
            <button className="Streaming-Button">
              <a className="MaxBoolean" href="/swipe">
                Max
              </a>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
