import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { style } from "../../themes/flickr/css.js";
import { colors } from "Frontend/themes/flickr/colors.js";

import {useEffect, useState} from "react";
import Member from "Frontend/generated/com/flickr/entities/Member";
import {useParams} from "react-router-dom";

export const config: ViewConfig = {
  menu: { order: 4, icon: "line-awesome/svg/file.svg" },
  title: "Group Landing",
};

export default function GroupLandingView() {
  const { groupCode } = useParams();
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`/api/session/${groupCode}`)
          .then(response => response.json())
          .then(data => setMembers(data.members));
    }, 10); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, [groupCode]);

  return (
      <div style={style.outerDiv}>
        <div>
          <a style={style.backButton} href="/">
            X
          </a>
          <a style={style.topCornerButton} href="/userprofile">
            <img src="../../../resources/META-INF/resources/images/profile.png"/>
          </a>
        </div>

        <h6 style={style.groupTitle}>Group Code: </h6>
        <h3 style={style.groupCode}>{groupCode}</h3>

        <div style={styles.membersDiv}>
          {members.map((member) => (
              <div style={styles.personDiv} key={member.id}>
                <img style={styles.personImage} src="../../../resources/META-INF/resources/images/person.png" alt=""/>
                <h4 style={styles.personLabel}>{member?.username || 'Unknown'}</h4>
              </div>
          ))}
        </div>

          <a href="/swipe">
            <button style={style.button}>Start Session</button>
          </a>
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
  personImage: {
    width: '20%',
    height: '30%',
  },
  personLabel: {
    padding: 20,
    fontSize: 20,
  }
}
