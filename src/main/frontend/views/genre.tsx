import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
  menu: { order: 5, icon: "line-awesome/svg/file.svg" },
  title: "Pick Genre",
};

export default function PickGenreView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <h2>flickr</h2>
      <form className="restrict-form">
        <label htmlFor="Genre">Genre: </label>
        <select name="comedy" id="comedy">
          <option>Comedy</option>
          <option>Action</option>
        </select>
        <br />
        <br />
        <label htmlFor="Rating">Rating: </label>
        <select name="R" id="R">
          <option>R</option>
          <option>PG-13</option>
        </select>
        <br />
        <br />
        <a href="/swipe">
          <input className="ready-btn" value="Ready" />
        </a>
      </form>
    </div>
  );
}
