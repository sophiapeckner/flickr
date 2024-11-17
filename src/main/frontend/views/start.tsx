import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import {useEffect, useState} from "react";
import Session from "Frontend/generated/com/flickr/entities/Session";
import {createSession, findAll, joinSession} from "Frontend/generated/SessionEndpoint";

import { style } from "../themes/flickr/css.js";
import member from "Frontend/generated/com/flickr/entities/Member";
import {getEmail, getUsername, isLoggedIn} from "Frontend/auth";

export const config: ViewConfig = {
  menu: { order: 2, icon: "line-awesome/svg/file.svg" },
  title: "Start Auth",
};

export default function StartView() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const user = isLoggedIn();

  // For database visualization purposes
  useEffect(() => {
    findAll().then(setSessions)
  }, []);

  const handleCreateGroup = async () => {
    let session;
    let member;

    // Try creating a Session and pushing to H2 DB
    try {
      session = await createSession();
    } catch (error) {
      console.error("Error creating session: ", error);
      return;
    }

    // Attempt to add Member to the Session
    if (session && session.id) {
      try {
        member = await joinSession(session.id, getEmail() || "");
      } catch (error) {
        console.error("Error adding Member to Session: ", error);
        return;
      }
      // Session Creation/Join was successful; update state and redirect
      setSessions([...sessions, session]);
      window.location.href = `/preferences/${member.id}`;
    } else {
      console.log("Session's ID is invalid")
    }
  }

  const handleJoinGroup = () => {
    window.location.href = `/groupcode`;
  }

  return (
      <div style={style.outerDiv}>
        <div>
          <a style={style.backButton} href="/">
            X
          </a>
          <a style={style.topCornerButton} href="/userprofile">
            <img src="images/profile.png" />
          </a>
        </div>
        <h2 style={style.pageTitle}>flickr</h2>

        <div style={{...style.innerDiv, ...style.innerDivAddOn}}>
          <a>
            <button style={style.groupChoiceButton} onClick={handleJoinGroup}>Join Group</button>
          </a>
          {user && (
              <a>
                <button style={style.groupChoiceButton} onClick={handleCreateGroup}>Create Group</button>
              </a>
          )}
        </div>
      </div>
  );
}