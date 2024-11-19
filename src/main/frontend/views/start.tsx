import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import {useEffect, useState} from "react";
import Session from "Frontend/generated/com/flickr/entities/Session";
import {createSession, findAll, joinSession} from "Frontend/generated/SessionEndpoint";
import { style } from "../themes/flickr/css.js";
import {getMember, isLoggedIn} from "Frontend/auth";
import Member from "Frontend/generated/com/flickr/entities/Member";
import {Button} from "@vaadin/react-components";
import {CustomHeader} from "Frontend/themes/flickr/elements";

export const config: ViewConfig = {
  menu: { order: 2, icon: "line-awesome/svg/file.svg" },
  title: "Start Auth",
};

const checkLoginStatus = async () => {
  return await isLoggedIn();
}

export default function StartView() {
  const [allowCreateGroup, setAllowCreateGroup] = useState(false);

  useEffect(() => {
    const fetchLogin = async () => {
      const result = await checkLoginStatus();
      setAllowCreateGroup(result);
    };
    fetchLogin();
  }, []);

  const handleCreateGroup = async () => {
    let session;
    let memberId;
    let member = await getMember();

    // Try creating a Session and pushing to H2 DB
    try {
      session = await createSession();
    } catch (error) {
      console.error("Error creating session: ", error);
      return;
    }

    // Attempt to add Member to the Session
    if (session?.id) {
      try {
        memberId = await joinSession(session.id, member?.email || "");
      } catch (error) {
        console.error("Error adding Member to Session: ", error);
        return;
      }
      // Session Creation/Join was successful; update state and redirect
      window.location.href = `/preferences/${memberId}`;
    } else {
      console.log("Session's ID is invalid")
    }
  }

  const handleJoinGroup = () => {
    window.location.href = `/groupcode`;
  }

  return (
      <div style={style.outerDiv}>
        <CustomHeader hideBackButton={true} loggedIn={allowCreateGroup}/>

        <h2 style={style.pageTitle}>flickr</h2>
        <div style={{...style.innerDiv, ...style.innerDivAddOn}}>
          <Button style={style.groupChoiceButton} onClick={handleJoinGroup}>Join Group</Button>
          {allowCreateGroup && (
              <Button style={style.groupChoiceButton} onClick={handleCreateGroup}>Create Group</Button>
          )}
        </div>
      </div>
  );
}