import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import {useEffect, useState} from "react";
import Session from "Frontend/generated/com/flickr/entities/Session";
import {createSession, findAll} from "Frontend/generated/SessionEndpoint";
import { colors } from "../themes/flickr/colors";

export const config: ViewConfig = {
  menu: { order: 2, icon: "line-awesome/svg/file.svg" },
  title: "Start Auth",
};

export default function StartView() {
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        findAll().then(setSessions)
    }, []);

    const handleCreateGroup = async () => {
        try {
            const session = await createSession();
            if (session)
                console.log(sessions);
                setSessions([...sessions, session]);
        } catch (error) {
            console.error("Error creating session: ", error);
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
          <a href="/grouplanding">
            <button style={styles.groupChoiceButton}>Create Group</button>
          </a>
      </div>
        {sessions.map(session => (
            <div key={session.id}>
                <h1>hi</h1>
                <span>{session.id}</span>
                <span>{session.groupCode}</span>
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

