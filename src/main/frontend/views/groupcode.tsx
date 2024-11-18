import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { colors } from "../themes/flickr/colors";
import {fetchSessionByGroupCode, joinSession} from "Frontend/generated/SessionEndpoint";
import {useState} from "react";
import { style } from "../themes/flickr/css.js";
import {Button, Icon, TextField} from "@vaadin/react-components";
import {CustomHeader} from "Frontend/themes/flickr/elements";
import { getMember } from "Frontend/auth";
import {CustomHeader} from "Frontend/themes/flickr/elements";

export const config: ViewConfig = {
  menu: { order: 3, icon: "line-awesome/svg/file.svg" },
  title: "Group Code",
};

export default function GroupCodeView() {
  const [groupCode, setGroupCode] = useState("")

  const submit = async () => {
    let session = await fetchSessionByGroupCode(groupCode);
    let member = await getMember();
    if (session.id == null) {
      console.log("Session's ID is null");
      return;   // Don't redirect if Session's ID is invalid
    }

    member = await joinSession(session.id, member?.email || "");
    // if (member == null) {
    //     // Save anon user
    //     console.log("here")
    //     member = await joinSession(session.id, "");
    // } else {
    //     member= await joinSession(session.id, member?.email || "");
    // }
      console.log(member);
    // window.location.href = `/preferences/${member.id}`;
  }

  return (
      <div style={style.outerDiv}>
        <CustomHeader />
        <h2 style={style.pageTitle}>flickr</h2>

        <div style={{ ...style.innerDiv, ...style.innerDivAddOn }}>
          <div style={styles.groupCodeDiv}>
            <TextField
                label="Group Code"
                style={{
                  ...styles.codeInput,
                  '--vaadin-input-field-height': '68px',
                  '--vaadin-input-field-border-radius': '40px',
                  '--vaadin-input-field-label-font-size': '20px',
                  '--vaadin-input-field-value-font-size': '32px'
                } as React.CSSProperties}
                placeholder="XXXXXX"
                value={groupCode}
                onValueChanged={(e) => setGroupCode(e.detail.value)}>
            </TextField>

          </div>

            <Button
                style={style.groupChoiceButton}
                onClick={submit}
            >
              Join
            </Button>
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
    width: '75%',
    borderRadius: 24,
    marginBottom: '20px',
    paddingLeft: 16,
  },
}
