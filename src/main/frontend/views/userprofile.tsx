import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { useState } from "react";
import { style } from "../themes/flickr/css.js";
import { logout, getEmail, getUsername } from "Frontend/auth"

export const config: ViewConfig = {
  menu: { order: 8, icon: "line-awesome/svg/file.svg" },
  title: "User Profile",
};

export default function UserProfileView() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  function getProfile() {
    if (getUsername()) {
      // @ts-ignore
      setUsername(getUsername());
    }
    if (getEmail()) {
      // @ts-ignore
      setEmail(getEmail());
    }
  }

  if (email.length == 0) {
    getProfile();
  }

  // State to track the select menus
  const [selectMenus, setSelectMenus] = useState<string[]>(['']);

  const [addButtonHovered, setAddButtonHovered] = useState<boolean>(false);

  const [usernameHovered, setUsernameHovered] = useState<boolean>(false);

  const [passwordHovered, setPasswordHovered] = useState<boolean>(false);

  const [emailHovered, setEmailHovered] = useState<boolean>(false);



  // Options for the select menus (can be customized)
  const options = ['Netflix', 'Hulu', 'Paramount+', 'Disney+'];

  // Handler to add a new select menu
  const addSelectMenu = () => {
    setSelectMenus((prev) => [...prev, '']);
  };

  // Handler to handle changes in select menus
  const handleSelectChange = (index: number, value: string) => {
    setSelectMenus((prev) =>{
      const updatedMenus = [...prev];
      updatedMenus[index] = value;
      return updatedMenus;
    });

  };

  return (
    <>
      <a href="/start">
        <button style={styles.backButton}>X</button>
      </a>
      <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
        <h2 style={styles.header2}>flickr</h2>
        <h3 style={styles.username}>ExampleUser Profile</h3>
        <form style={styles.form}>
          <div style={styles.profileInputs}>
            <label style={styles.label}>Username
              <br/>
              <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="example-username"
                  style={{
                    ...styles.input,
                    backgroundColor: usernameHovered ? '#dbdbdb' : '#ffffff'
                  }}
                  onMouseEnter={() => setUsernameHovered(true)}
                  onMouseLeave={() => setUsernameHovered(false)}
              />
            </label>
          </div>

          <div style={styles.profileInputs}>
            <label style={styles.label}>Password
              <br/>
              <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="**********"
                  style={{
                    ...styles.input,
                    backgroundColor: passwordHovered ? '#dbdbdb' : '#ffffff'
                  }}
                  onMouseEnter={() => setPasswordHovered(true)}
                  onMouseLeave={() => setPasswordHovered(false)}
              />
            </label>
          </div>

          <div style={styles.profileInputs}>
            <label style={styles.label}>Email
              <br/>
              <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  style={{
                    ...styles.input,
                    backgroundColor: emailHovered ? '#dbdbdb' : '#ffffff'
                  }}
                  onMouseEnter={() => setEmailHovered(true)}
                  onMouseLeave={() => setEmailHovered(false)}
              />
            </label>
          </div>
          <a href="/start">
            <input style={style.button} value="Save"/>
          </a>
        </form>
        <form style={styles.servicesForm}>
        <label style={styles.label}>Available Streaming Services:
          <div style={styles.servicesDiv}>
            {selectMenus.map((value, index) => (
              <div key={value}>
                <select
                  style={styles.serviceSelect}
                  value={value}
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                >
                  <option value="" style={styles.firstSelect}>Select an option</option>
                  {options.map((option) => (
                    <option key={option} value={option} style={styles.option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

            ))}
          </div>

          <button
            type="button"
            style={{
              ...styles.moreServicesButton,
               backgroundColor: addButtonHovered ? '#dbdbdb' : '#ffffff'
            }}
            onClick={addSelectMenu}
            onMouseEnter={() => setAddButtonHovered(true)}
            onMouseLeave={() => setAddButtonHovered(false)}
            >
              + Streaming Service
            </button>
            <button style={style.button} onClick={e => logout()}>Logout</button>
        </label>
        </form>
      </div>
      </>
  );
}

const styles = {
  header2:{
    color: '#62598b',
    textAlign: 'center',
    fontSize: '37px',
    marginTop: '15px',
  },
  label:{
    fontSize:'25px'
  },
  form: {
    margin: 'auto',
    width: '80%',
    border: '1px solid grey',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height:'auto',
  },
  servicesForm: {
    margin: 'auto',
    width: '80%',
    border: '1px solid grey',
    height:'30%',
  },
  servicesDiv:{
    overflowY:'auto',
    display: 'flex',
    flexDirection: 'column',
    unicodeBidi: 'isolate',
    width: 'auto',
    margin:'0 350px',
    maxHeight: '60%',
  },
  serviceSelect: {
    margin:'auto',
    marginBottom: '5px',
    marginTop: '5px',
    height: '50px',
    borderRadius:'3px',
    textAlign:'center',
    fontSize: '20px',
    fontFamily:'Times New Roman, Times, serif',
    display: 'flex',
  },
  firstSelect: {
    color: 'gainsboro',
    fontSize: 16,
  },
  option:{
    fontSize: 16,
  },
  moreServicesButton:{
    width: '200px',
    height: '35px',
    alignSelf: 'center',
    borderColor: '#ffffff',
    marginTop: '10px',
    marginBottom: '10px',
  },
  select:{
    borderRadius: '3px',
    height: '50px',
    display: 'flex',
    textAlign: 'center',
    margin: 'auto',
    fontFamily:'Times New Roman, Times, serif',
    fontSize: '20px',
  },
  backButton:{
    border: '0px',
    fontSize: '20px',
    float: 'right',
  },
  username: {
    marginBottom: '12px',
  },
  profileInputs:{
    marginBottom:'10px',
  },
  input: {
    width: '90%',
    height: 30,
    margin: 'auto',
    border: '1px solid black',
    marginBottom: 20,
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 8,
  },


}


