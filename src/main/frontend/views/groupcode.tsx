import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import React, {useEffect, useState} from "react";
import { style } from "../themes/flickr/css.js";
import {Button, TextField} from "@vaadin/react-components";
import type { TextFieldChangeEvent } from '@vaadin/react-components';
import {CustomHeader} from "Frontend/views/elements";
import {getMember, isLoggedIn} from "Frontend/auth";
import {fetchSessionByGroupCode} from "Frontend/generated/ManageSessionEndpoint";
import {joinSession} from "Frontend/generated/JoinSessionEndpoint";
import {colors} from "Frontend/themes/flickr/colors";

export const config: ViewConfig = {
  menu: { order: 3, icon: "line-awesome/svg/file.svg" },
  title: "Group Code",
};

export default function GroupCodeView() {
  const [groupCode, setGroupCode] = useState("")
  const [loggedIn, setLoggedIn] = useState(false);
  const [joinButtonHover, setJoinButtonHover] = useState(false);

  useEffect(() => {
    const fetchLogin = async () => {
      const result = await isLoggedIn();
      setLoggedIn(result);
    };
    fetchLogin();
  }, []);

  const submit = async () => {
      let session = await fetchSessionByGroupCode(groupCode.toUpperCase());

      if (session.id == null) {
          console.log("Session's ID is null");
          return;   // Don't redirect if Session's ID is invalid
      }

      let member = await getMember();
      const memberId = await joinSession(session.id, member?.email || "");

    window.location.href = `/preferences/${memberId}`;
  }

  return (
      <div style={style.outerDiv}>
        <CustomHeader loggedIn={loggedIn}/>
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
                  '--vaadin-input-field-value-font-size': '32px',
                } as React.CSSProperties}
                placeholder="XXXXXXXX"
                value={groupCode}
                maxlength={8}
                allowedCharPattern="[0-9a-zA-Z]"
                clearButtonVisible={true}
                onValueChanged={(e) => setGroupCode(e.detail.value)}>
            </TextField>
          </div>

          <Button
              style={{
                  ...style.groupChoiceButton,
                  backgroundColor: joinButtonHover ? colors.mainHovered : colors.main}}
              onMouseEnter={() =>setJoinButtonHover(true)}
              onMouseLeave={() => setJoinButtonHover(false)}
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
  },
}
