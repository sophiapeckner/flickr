import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 3, icon: "line-awesome/svg/file.svg" },
  title: "Group Code",
};

export default function GroupCodeView() {
  return (
    <>
      <div className="back-gc">
        <a href="/">
          <button className="back-button">X</button>
        </a>
      </div>
      <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
        <div>
          <h2>flickr</h2>
        </div>

        <div className="enter-group-input">
          <label style={{ marginLeft: 10, fontSize: 22 }}>
            Enter Group Code:
          </label>
          <input placeholder="XXXXXX" type="text" />
        </div>

        {/* go to group landing page */}
        <div>
          <a className="joina" href="/grouplanding">
            <button className="join-group">join</button>
          </a>
        </div>
      </div>
    </>
  );
}
