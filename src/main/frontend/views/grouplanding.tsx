import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = { menu: { order: 4, icon: 'line-awesome/svg/file.svg' }, title: 'Group Landing' };

export default function GroupLandingView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <div>
        <a href="/">
          <button className="back-button">
            X
          </button>
        </a>
        <a href="/userprofile">
          <img className="profile-img" src="images/profile.png" />
        </a>
      </div>
      <h2>flickr</h2>
      <h6 className="group-title">Group Code: </h6>
      <h3 className="group-code">XPJMRT</h3>

      <div className="members">
        <div className="person">
          <img className="person-img" src="images/person.png" alt="" />
          <h4>Jane Mustang</h4>
        </div>
        <div className="person">
          <img className="person-img" src="images/person.png" alt="" />
          <h4>Jane Doe</h4>
        </div>
      </div>

      <div className="session-div">
        <button className="start-session-btn">
          <a className="start-session-link" href="/movie-selection">
            Start Session
          </a>
        </button>
      </div>
    </div>
  );
}
