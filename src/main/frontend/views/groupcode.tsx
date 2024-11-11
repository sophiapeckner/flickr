import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import React, { useState } from "react";

export const config: ViewConfig = {
  menu: { order: 3, icon: "line-awesome/svg/file.svg" },
  title: "Group Code",
};

export default function GroupCodeView() {

  const [groupCodeInput, setGroupCodeInput] = useState("");

  const limitLetters = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Regular expression to allow only letters (uppercase and lowercase)
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setGroupCodeInput(value); // Update state only if input contains letters
    }
  };

  return (
    <div style={style.outerDiv}>
      <div>
        <a style={style.backButton} href="/start_auth">
          X
        </a>
        <a style={style.topCornerButton} href="/userprofile">
          <img src="images/profile.png" />
        </a>
      </div>
      <h2 style={style.pageTitle}>flickr</h2>
      
      <div style={{...style.innerDiv, ...style.innerDivAddOn}}>
        <div style={styles.groupCodeDiv}>
          <label style={{fontSize: 22}}>
            Enter Group Code:
          </label>
          <input
              style={styles.codeInput}
              value={groupCodeInput}
              maxLength={8}
              placeholder="XXXXXXXX"
              type="text"
              onChange={limitLetters}
          />
        </div>

        <a href="/landing/{groupCode}">
          <button style={style.button}>Join</button>
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
