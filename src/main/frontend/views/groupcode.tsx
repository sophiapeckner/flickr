import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 3, icon: "line-awesome/svg/file.svg" },
  title: "Group Code",
};

export default function GroupCodeView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <div>
        <a href="/login">
          <button className="back-button">X</button>
        </a>
        <h2>flickr</h2>
      </div>

      <div>
        <label style={{ marginLeft: 10, fontSize: 22 }}>
          Enter Group Code:
        </label>
      </div>

      <div style={{ marginLeft: 10 }}>
        <input></input>
      </div>

      {/* go to group landing page */}
      <div>
        <a href="/genre">
          <button className="join-group">Join</button>
        </a>
      </div>
    </div>
  );
}
