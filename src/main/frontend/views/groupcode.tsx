import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { colors } from "../themes/flickr/colors";
import {joinSession} from "Frontend/generated/SessionEndpoint";
import {useState} from "react";
import { style } from "../themes/flickr/css.js";
import { getMember } from "Frontend/auth";

export const config: ViewConfig = {
  menu: { order: 3, icon: "line-awesome/svg/file.svg" },
  title: "Group Code",
};

export default function GroupCodeView() {
  const [groupCode, setGroupCode] = useState("")

  const submit = async () => {
      const member = await getMember()
    await joinSession(groupCode, member?.email || "");
    window.location.href = `/preferences/${groupCode}`;
  }

  return (
    <div style={style.outerDiv}>
      <div>
        <a style={style.backButton} href="/start">
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
          <input style={styles.codeInput} placeholder="XXXXXXXX" type="text" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setGroupCode(e.target.value)}/>
        </div>

        <a>
          <button style={style.button} onClick={submit}>join</button>
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
  },
}
