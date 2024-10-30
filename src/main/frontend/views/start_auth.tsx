import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import {useEffect, useState} from "react";
import Session from "Frontend/generated/com/flickr/entities/Session";
import {createSession, findAll} from "Frontend/generated/SessionEndpoint";

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
        <>
            <a className="profile-link" href="/userprofile">
                <img className="profile-link-img" src="images/profile.png" />
            </a>
            <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
                <div className="SignedInStartPage">
                    <h2 className="page-title">flickr</h2>
                    <a href="/groupcode">
                        <button className="join-group-btn2">Join Group</button>
                    </a>
                    <a>
                        <button className="create-group-btn" onClick={handleCreateGroup}>Create Group</button>
                    </a>
                </div>
            </div>
            {sessions.map(session => (
                <div key={session.id}>
                    <h1>hi</h1>
                    <span>{session.id}</span>
                    <span>{session.groupCode}</span>
                </div>
            ))}
        </>
    );
}
