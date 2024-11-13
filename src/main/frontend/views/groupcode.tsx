import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import React, { useState } from "react";
import { colors } from "../themes/flickr/colors.js";
import { MenuBar } from "@vaadin/react-components";
import { items } from "../themes/flickr/ProfileMenuBar";
import { useNavigate } from "react-router-dom";

export const config: ViewConfig = {
  menu: { order: 3, icon: "line-awesome/svg/file.svg" },
  title: "Group Code",
};

export default function GroupCodeView() {

  const [groupCodeInput, setGroupCodeInput] = useState("");
  const [groupCodeHovered, setGroupCodeHovered] = useState(false);
  const [joinButtonHovered, setJoinButtonHovered] = useState(false);

  const limitLetters = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Regular expression to allow only letters (uppercase and lowercase)
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setGroupCodeInput(value); // Update state only if input contains letters
    }
  };

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
      <h2 style={style.pageTitle}>flickr</h2>
      <div style={{...style.innerDiv, ...style.innerDivAddOn}}>
        <div style={styles.groupCodeDiv}>
          <label style={{fontSize: 22}}>
            Enter Group Code:
          </label>
          <input
              style={{...styles.codeInput, backgroundColor: groupCodeHovered ? colors.light : 'white'}}
              value={groupCodeInput}
              maxLength={8}
              placeholder="XXXXXXXX"
              type="text"
              onChange={ limitLetters }
              onMouseEnter={() => setGroupCodeHovered(true)}
              onMouseLeave={() => setGroupCodeHovered(false)}
          />
        </div>

        <a href="/landing/{groupCode}">
          <button
              style={{...style.button, backgroundColor: joinButtonHovered ? colors.mainHovered : colors.main}}
              onMouseEnter={() => setJoinButtonHovered(true)}
              onMouseLeave={() => setJoinButtonHovered(false)}
          >Join</button>
        </a>
      </div>
    </div>
  );
}

const styles = {
  groupCodeDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
  },
  codeInput: {
    width: '50%',
    borderRadius: 24,
    height: 48,
    margin: 12,
    border: '1px solid black',
    marginBottom: '20px',
    fontSize: 32,
    paddingLeft: 16,
    textTransform: 'uppercase',
  },
}
