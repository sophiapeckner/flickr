import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { colors } from "../../themes/flickr/colors";
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
      <div style={styles.outerDiv}>
        <div>
          <a style={styles.backButton} href="/">
            X
          </a>
          <a style={styles.topCornerButton} href="/userprofile">
            <img src="../../../resources/META-INF/resources/images/profile.png"/>
          </a>
        </div>

        <h6 style={styles.groupTitle}>Group Code: </h6>
        <h3 style={styles.groupCode}>{groupCode}</h3>

        <div style={styles.membersDiv}>
          {members.map((member) => (
              <div style={styles.personDiv} key={member.id}>
                <img style={styles.personImage} src="../../../resources/META-INF/resources/images/person.png" alt=""/>
                <h4 style={styles.personLabel}>{member?.username || 'Unknown'}</h4>
              </div>
          ))}
        </div>

          <a href="/swipe">
            <button style={styles.button}>Start Session</button>
          </a>
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
  button: {
    width: 180,
    height: 36,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderWidth: 0,
    backgroundColor: colors.main,
    color: 'white',
    textAlign: 'center',
    marginTop: 36,
    fontSize: '17px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
  },
  groupTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  groupCode: {
    textAlign: 'center',
    fontSize: 40,
  },
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
