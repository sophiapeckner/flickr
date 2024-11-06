import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import {useEffect, useState} from "react";
import Session from "Frontend/generated/com/flickr/entities/Session";
import {createSession, findAll, joinSession} from "Frontend/generated/SessionEndpoint";

import { colors } from "../themes/flickr/colors";
import member from "Frontend/generated/com/flickr/entities/Member";

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
          <a href="/groupcode">
            <button style={styles.groupChoiceButton}>Join Group</button>
          </a>
          <a>
            <button style={styles.groupChoiceButton} onClick={handleCreateGroup}>Create Group</button>
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
    margin: 'auto',
    width: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupChoiceButton: {
    backgroundColor: colors.main,
    height: '75px',
    width: '200px',
    color: 'white',
    fontSize: '16px',
    margin: 20,
    borderRadius: '12px',
    borderWidth: '0',
  },
}

