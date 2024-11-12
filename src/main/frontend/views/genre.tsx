import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import {items} from "Frontend/themes/flickr/ProfileMenuBar";
import {MenuBar} from "@vaadin/react-components";
import React from "react";
import {useNavigate} from "react-router-dom";

export const config: ViewConfig = {
  menu: { order: 5, icon: "line-awesome/svg/file.svg" },
  title: "Pick Genre",
};

export default function PickGenreView() {

  const navigate = useNavigate()

  const handleProfileMenuSelection = (e: { detail: { value: any; }; }) =>{
    const selectedItem = e.detail.value;
    if(selectedItem && selectedItem.path){
      navigate(selectedItem.path);
    }
  }
  
  return (
    <div style={style.outerDiv}>
      <div>
        <a style={style.backButton} href="/start_auth">
          X
        </a>
        <MenuBar
            items={items}
            theme = "tertiary"
            style={style.topCornerButton}
            onItemSelected={handleProfileMenuSelection}
        />
      </div>

      <h6 style={style.groupTitle}>Group Code: </h6>
      <h3 style={style.groupCode}>XPJMRT</h3>

      <form style={style.form}>
        <label style={style.label} htmlFor="Genre">Genre: </label>
        <select style={style.input} name="comedy" id="comedy">
          <option>Comedy</option>
          <option>Action</option>
          <option>Romance</option>
          <option>Documentary</option>
          <option>Horror</option>
          <option>Drama</option>
          <option>Science Fiction</option>
          <option>Fantasy</option>
          <option>Mystery</option>
        </select>
        <label style={style.label} htmlFor="Rating">Rating: </label>
        <select style={style.input} name="R" id="R">
          <option>R</option>
          <option>PG-13</option>
          <option>PG</option>
          <option>G</option>
        </select>

        <a href="/grouplanding">
          <input style={style.button} value="Ready" />
        </a>
      </form>
    </div>
  );
}
