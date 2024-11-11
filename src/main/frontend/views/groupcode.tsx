import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { colors } from "../themes/flickr/colors";
import {joinSession} from "Frontend/generated/SessionEndpoint";
import {useState} from "react";

export const config: ViewConfig = {
  menu: { order: 3, icon: "line-awesome/svg/file.svg" },
  title: "Group Code",
};

export default function GroupCodeView() {
  const [groupCode, setGroupCode] = useState("")

  const submit = async () => {
    await joinSession(groupCode, "", "", "");
    window.location.href = `/preferences/${groupCode}`;
  }

  return (
    <div style={styles.outerDiv}>
      <div>
        <a style={styles.backButton} href="/">
          X
        </a>
        <a style={styles.topCornerButton} href="/userprofile">
          <img src="images/profile.png" />
        </a>
      </div>
      <h2 style={styles.pageTitle}>flickr</h2>
      
      <div style={styles.innerDiv}>
        <div style={styles.groupCodeDiv}>
          <label style={styles.label}>
            Enter Group Code:
          </label>
          <input style={styles.codeInput} placeholder="XXXXXXXX" type="text" onInput={(e) => setGroupCode(e.target.value)}/>
        </div>

        <a href="/landing/{groupCode}">
          <button style={styles.button} onClick={submit}>join</button>
        </a>
      </div>
    </div>
  );
}

const styles = {
  outerDiv: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  backButton: {
    height: '50px',
    margin: '15px',
    float: 'left',
    fontSize: 20,
    marginRight: 15,
  },
  topCornerButton: {
    height: '50px',
    margin: '15px',
    float: 'right',
  },
  pageTitle: {
    color: colors.main, 
    textAlign: 'center',
    fontSize: '48px',
    fontFamily: 'Nunito, Verdana',
  },
  innerDiv: {
    flexDirection: 'column',
    marginTop: 'auto',
    marginBottom: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  groupCodeDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
  },
  label: {
    fontSize: 22
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
  button: {
    width: 180,
    height: 36,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderWidth: 0,
    backgroundColor: colors.main,
    color: 'white',
    textAlign: 'center',
    marginTop: 36,
    fontSize: '17px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
  }
}
