import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../themes/flickr/css.js";
import React, { useState } from "react";
import { colors } from "Frontend/themes/flickr/colors.js";
import {useSignal} from "@vaadin/hilla-react-signals";
import {Icon, MenuBar, MenuBarItem} from "@vaadin/react-components";
import {useNavigate} from "react-router-dom";

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

  const selectedItem = useSignal<MenuBarItem | undefined>(undefined);

  function createItem(iconName: string, text: string, isChild = false) {
    const iconStyle: React.CSSProperties = {
      width: isChild ? 'var(--lumo-icon-size-s)' : '',
      height: isChild ? 'var(--lumo-icon-size-s)' : '',
      marginRight: isChild ? 'var(--lumo-space-s)' : '',
    };

    let ariaLabel = '';
    if (iconName === 'copy') {
      ariaLabel = 'duplicate';
    }

    return (
        <>
          <Icon icon={`vaadin:${iconName}`} style={iconStyle} aria-label={ariaLabel} />
        </>
    );
  }

  const items = [
    { component: createItem('user', 'Profile'),
      children: [
        { text: 'Profile' },
        { text: 'Log Out' },
      ],
    },
  ];
  const navigate = useNavigate()

  const newPageSelection=(location: string)=>{
    navigate("/" + location);
  }
  return (
    <div style={style.outerDiv}>
      <div>
        <a style={style.backButton} href="/start_auth">
          X
        </a>


        <MenuBar
            items={items}
            theme = "end-aligned"
            style={style.topCornerButton}
            onItemSelected={(event) => {
              selectedItem.value = event.detail.value;
            }}
        />



      </div>
      <h2 style={style.pageTitle}>flickr</h2>
      <div style={{...style.innerDiv, ...style.innerDivAddOn}}>
        <div style={styles.groupCodeDiv}>
          <label style={{fontSize: 22}}>
            Enter Group Code:
          </label>
          <input
              style={{...styles.codeInput, backgroundColor: groupCodeHovered ? '#e5e5e5' : '#ffffff'}}
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
  profileMenuBar:{

    marginRight: '20px',
  },
}
