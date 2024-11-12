import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import React, {useEffect, useState} from "react";
import Session from "Frontend/generated/com/flickr/entities/Session";
import {createSession, findAll, joinSession} from "Frontend/generated/SessionEndpoint";

import { style } from "../themes/flickr/css.js";
import member from "Frontend/generated/com/flickr/entities/Member";
import {useNavigate} from "react-router-dom";
import {items} from "Frontend/themes/flickr/ProfileMenuBar";
import {MenuBar} from "@vaadin/react-components";

export const config: ViewConfig = {
  menu: { order: 2, icon: "line-awesome/svg/file.svg" },
  title: "Start Auth",
};

export default function StartView() {
    const [sessions, setSessions] = useState<Session[]>([]);

    // For database visualization purposes
    useEffect(() => {
        findAll().then(setSessions)
    }, []);

    const handleCreateGroup = async () => {
        let session;

        // Try creating a Session and pushing to H2 DB
        try {

            session = await createSession();
        } catch (error) {
            console.error("Error creating session: ", error);
            return;
        }

        // Try adding the group admin as a member of the Session that was just created
        if (session && session.groupCode != null) {
            try {
                // For now, add the Group Admin as an Anon user
                await joinSession(session.groupCode, "", "", "");
            } catch (error) {
                console.error("Error adding Group Admin to Session: ", error);
                return;
            }
            // If both the session creation and join succeed, update state and redirect
            window.location.href = `/landing/${session.groupCode}`;
            setSessions([...sessions, session]);
        }
    }
//the menu bar isnt working on this page so lets just ignore this for now
    // const navigate = useNavigate()
    //
    // const handleProfileMenuSelection = (e: { detail: { value: any; }; }) =>{
    //     const selectedItem = e.detail.value;
    //     if(selectedItem && selectedItem.path){
    //         navigate(selectedItem.path);
    //     }
    // }

  return (
    <div style={style.outerDiv}>
      <div>
        <a style={style.backButton} href="/">
          X
        </a>
          {/*I tried to add the menu bar here but for some reason it doesnt work on this page*/}
          {/*<MenuBar*/}
          {/*    items={items}*/}
          {/*    theme = "tertiary"*/}
          {/*    style={style.topCornerButton}*/}
          {/*    onItemSelected={handleProfileMenuSelection}*/}
          {/*/>*/}

      </div>
      <h2 style={style.pageTitle}>flickr</h2>
      
      <div style={{...style.innerDiv, ...style.innerDivAddOn}}>
          <a href="/groupcode">
            <button style={style.groupChoiceButton}>Join Group</button>
          </a>
          <a>
            <button style={style.groupChoiceButton} onClick={handleCreateGroup}>Create Group</button>
          </a>
      </div>
        {/*For viewing H2 Database entries*/}
        {sessions.map((session) => (
            <div key={session.id}>
                <span>Group Code: {session.groupCode}</span>
                <br />
                {session.members && session.members.length > 0 ? (
                    session.members.map((member, idx) => (
                        <span key={idx}>Member: {member?.username || 'Unknown'}</span>
                    ))
                ) : (
                    <span>No members yet.</span>
                )}
            </div>
        ))}
    </div>
  );
}
