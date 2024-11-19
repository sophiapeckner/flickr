import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";

import {useEffect, useState} from "react";
import Member from "Frontend/generated/com/flickr/entities/Member";
import {useParams} from "react-router-dom";
import {Avatar, Button, Scroller} from "@vaadin/react-components";
import {CustomHeader} from "Frontend/themes/flickr/elements";
import {isLoggedIn} from "Frontend/auth";

export const config: ViewConfig = {
  menu: { order: 4, icon: "line-awesome/svg/file.svg" },
  title: "Group Landing",
};

export default function GroupLandingView() {
    const { memberId } = useParams();
    const [members, setMembers] = useState<Member[]>([]);
    const [groupCode, setGroupCode] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchLogin = async () => {
      const result = await isLoggedIn();
      setLoggedIn(result);
    };
    fetchLogin();
  }, []);

    const fetchGroupCode = async () => {
        const response = await fetch(`/api/session/${memberId}`);
        const session = await response.json();
        setGroupCode(session.groupCode);
    }

    const submit = async () => {
        // Generate movie suggestions for the Session that member is in
        await fetch(`/api/session/${memberId}/movies`, { method: "POST" });
        // Start the session for everyone else
        await fetch(`/api/session/${memberId}/startSession`, { method: "PUT" });
        window.location.href = `/swipe/${memberId}`;
    }

    // Fetch the Session with groupCode and update the members currently in the Session
    useEffect(() => {
        fetchGroupCode();

        const intervalId = setInterval(() => {
            fetch(`/api/session/${memberId}`)
                .then(response => response.json())
                .then(data => {
                    // Update member list
                    setMembers(data.members)

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
    }, []);

    return (
      <div style={style.outerDiv}>
        <CustomHeader loggedIn={loggedIn}/>

        <h6 style={style.groupTitle}>Group Code: </h6>
        <h3 style={style.groupCode}>{groupCode}</h3>

        <Scroller style={styles.membersDiv} scrollDirection="vertical">
          {members.map((member) => (
              <div style={styles.personDiv} key={member.id}>
                <Avatar theme="xlarge" />
                <h4 style={styles.personLabel}>{member?.username || 'Unknown'}</h4>
              </div>
          ))}
        </Scroller>

        <div style={style.form}>
          <Button style={style.button} onClick={submit}>Start Voting</Button>
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
    padding: 10
  },
  personDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  personLabel: {
    padding: 20,
    fontSize: 20,
  }
}
