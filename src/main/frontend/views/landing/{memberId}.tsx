import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";

import {useEffect, useState} from "react";
import Member from "Frontend/generated/com/flickr/entities/Member";
import {useNavigate, useParams} from "react-router-dom";
import {Avatar, Button, Icon, Scroller, MenuBar} from "@vaadin/react-components";
import { items } from "../../themes/flickr/ProfileMenuBar";

export const config: ViewConfig = {
  menu: { order: 4, icon: "line-awesome/svg/file.svg" },
  title: "Group Landing",
};

export default function GroupLandingView() {
  const { memberId } = useParams();
  const [members, setMembers] = useState<Member[]>([]);
  const [groupCode, setGroupCode] = useState([]);

  const navigate = useNavigate()

  const handleProfileMenuSelection = (e: { detail: { value: any; }; }) =>{
    const selectedItem = e.detail.value;
    if(selectedItem && selectedItem.path){
      navigate(selectedItem.path);
    }
  }

  const submit = async () => {
    // Generate movie suggestions for the Session that member is in
    await fetch(`/api/session/${memberId}/movies`, { method: "POST" });
    // Start the session for everyone else
    await fetch(`/api/session/${memberId}/startSession`, { method: "PUT" });
    window.location.href = `/swipe/${memberId}`;
  }

  const fetchGroupCode = async () => {
    const response = await fetch(`/api/session/${memberId}`);
    const data = await response.json();
    setGroupCode(data.groupCode);
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
        <div>
          <a href="/">
            <Icon icon="vaadin:close" style={style.backButton} />
          </a>
          <MenuBar
            items={items}
            theme="tertiary"
            style={{...style.topCornerButton, }}
            onItemSelected={handleProfileMenuSelection}
          />
        </div>

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

        <Button style={style.button} onClick={submit}>Start Voting</Button>
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
  // personImage: {
  //   width: '20%',
  //   height: '30%',
  // },
  personLabel: {
    padding: 20,
    fontSize: 20,
  }
}
