import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import {useEffect, useState} from "react";
import { style } from "../themes/flickr/css.js";
import {colors} from "Frontend/themes/flickr/colors";
import {getMember, isLoggedIn} from "Frontend/auth";
import {Button} from "@vaadin/react-components";
import {CustomHeader} from "Frontend/elements";
import {createSession} from "Frontend/generated/ManageSessionEndpoint";
import {joinSession} from "Frontend/generated/JoinSessionEndpoint";

export const config: ViewConfig = {
  menu: { order: 2, icon: "line-awesome/svg/file.svg" },
  title: "Start Auth",
};

const checkLoginStatus = async () => {
  return await isLoggedIn();
}

export default function StartView() {
  const [allowCreateGroup, setAllowCreateGroup] = useState(false);
  const [joinButtonHover, setJoinButtonHover] = useState(false);
  const [createButtonHover, setCreateButtonHover] = useState(false);


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
      // Pass in the email of the member who's creating the session
      // Since member's must be authenticated in order to create a session
      // assume that member.email will be non null
      session = await createSession(member?.email ?? "");
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
          <Button
              style={{
                ...style.groupChoiceButton,
                backgroundColor: joinButtonHover ? colors.mainHovered : colors.main}}
              onMouseEnter={() =>setJoinButtonHover(true)}
              onMouseLeave={() => setJoinButtonHover(false)}
              onClick={handleJoinGroup}
          >Join Group</Button>
          {allowCreateGroup ? (
              <Button
                  style={{
                    ...style.groupChoiceButton,
                    backgroundColor: createButtonHover ? colors.mainHovered : colors.main}}
                  onMouseEnter={() =>setCreateButtonHover(true)}
                  onMouseLeave={() => setCreateButtonHover(false)}
                  onClick={handleCreateGroup}>Create Group</Button>
          ) : (
            <p style={{color: colors.main}}>
              Please{" "}
              <a href="/" style={{textDecoration: "underline"}}>
                Log In
              </a>{" "}
              or{" "}
              <a href="/signup" style={{textDecoration: "underline"}}>
                Sign Up
              </a>{" "}
              to create a group.
            </p>
          )}
        </div>
      </div>
  );
}