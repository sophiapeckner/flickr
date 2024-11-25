import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";
import {useEffect, useState} from "react";
import Member from "Frontend/generated/com/flickr/entities/Member";
import {useParams} from "react-router-dom";
import {Avatar, Button, Icon, Scroller} from "@vaadin/react-components";
import {CustomHeader, NoLongerInSession} from "Frontend/themes/flickr/elements";
import {isLoggedIn} from "Frontend/auth";
import Session from "Frontend/generated/com/flickr/entities/Session";
import {getMemberById} from "Frontend/generated/MemberService";

export const config: ViewConfig = {
  menu: { order: 4, icon: "line-awesome/svg/file.svg" },
  title: "Group Landing",
};

export default function GroupLandingView() {
    const { memberId } = useParams();
    const [member, setMember] = useState<Member>();
    const [members, setMembers] = useState<Member[]>([]);
    const [session, setSession] = useState<Session>();
    const [loggedIn, setLoggedIn] = useState(false);
    const [startButtonHover, setStartButtonHover] = useState(false);
    const [inSession, setInSession] = useState(true);

    const fetchLogin = async () => {
        const result = await isLoggedIn();
        setLoggedIn(result);
    };

    const fetchSession = async () => {
        const response = await fetch(`/api/session/${memberId}`);
        const session = await response.json();
        setSession(session);
    }

    const fetchMember = async () => {
        const memberData = await getMemberById(memberId);
        setMember(memberData);

        // Check if the member is no longer part of a session
        if (memberData?.sessionId === 0) {
            setInSession(false);
        }
    };

    const removeMemberFromGroup = async (memberIndex: number) => {
        const response = await fetch(`/api/session/${session?.id}/remove/${memberIndex}`, { method: "PUT" });
        const updatedSession = await response.json();
        setSession(updatedSession);
    };

    const submit = async () => {
        // Generate movie suggestions for the Session that member is in
        await fetch(`/api/vote/${memberId}/movies`, { method: "POST" });
        // Start the session for everyone else
        await fetch(`/api/session/${memberId}/startSession`, { method: "PUT" });
        window.location.href = `/swipe/${memberId}`;
    }

    useEffect(() => {
        fetchMember(); // Fetch member first
        fetchLogin();

        if (inSession) {
            // Member is STILL in the session
            fetchSession();

            const intervalId = setInterval(() => {
                fetch(`/api/session/${memberId}`)
                    .then(response => response.json())
                    .then(data => {
                        // Update member list
                        setMembers(data.members);

                        // Check if someone has started the Session yet
                        if (data.started) {
                            clearInterval(intervalId); // Stop polling
                            window.location.href = `/swipe/${memberId}`;
                        }

                    })
                    .catch(error => {
                        console.error("Error fetching Session data: ", error);
                    });
            }, 10);
            return () => clearInterval(intervalId);
        }

        // If not in a session, return undefined
        return undefined;
    }, [inSession, memberId, member]);

    if (!inSession) {
        return <NoLongerInSession />;
    }

    return (
      <div style={style.outerDiv}>
        <CustomHeader confirmExit={true} loggedIn={loggedIn}/>

        <h6 style={style.groupTitle}>Group Code: </h6>
        <h3 style={style.groupCode}>{session?.groupCode}</h3>

        <Scroller style={styles.membersDiv} scrollDirection="vertical">
          {inSession && members?.length > 0 &&
              members.map((member, index) => (
                  <div style={styles.personDiv} key={member.id}>
                      <div style={styles.person}>
                          <Avatar theme="xlarge" />
                          <h4 style={styles.personLabel}>{member?.displayName || 'Waiting...'}</h4>
                      </div>
                      {/*Only allow the group admin to remove member(s) from group*/}
                      {session?.groupAdminId == memberId && member.id != memberId &&
                          <Icon
                              icon="vaadin:trash"
                              style={styles.trashIcon}
                              onClick={() => removeMemberFromGroup(index)}/>}
                  </div>
              ))
          }
        </Scroller>

        <div style={style.form}>
          <Button
              style={{
                  ...style.button,
                  backgroundColor: startButtonHover ? colors.mainHovered : colors.main}}
              onClick={submit}
              onMouseEnter={() =>setStartButtonHover(true)}
              onMouseLeave={() => setStartButtonHover(false)}
          >Start Voting</Button>
        </div>
      </div>
    );
}

const styles = {
    membersDiv: {
        width: '60%',
        margin: '10px auto',
        height: '50%',
        backgroundColor: colors.light,
        borderRadius: 12,
        padding: 10,
        overflowY: 'auto', // Allow vertical scrolling if needed
    },
    personDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Push children to the edges
        padding: '10px 0', // Add spacing between rows
    },
    person: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', // Align avatar and label vertically
    },
    personLabel: {
        marginLeft: 15, // Add spacing between Avatar and text
        fontSize: 20,
    },
    trashIcon: {
        cursor: 'pointer', // Make it look clickable
        color: "#f54251", // Optional: Set icon color
        marginLeft: 'auto', // Ensure it stays on the right side
    },
};
