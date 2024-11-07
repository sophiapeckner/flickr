import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { colors } from "../themes/flickr/colors";
import { useState } from "react";

export const config: ViewConfig = {
  menu: { order: 8, icon: "line-awesome/svg/file.svg" },
  title: "User Profile",
};

export default function UserProfileView() {
  // State to track the select menus
  const [selectMenus, setSelectMenus] = useState<string[]>([]);

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
      <a href="/start_auth">
        <button className="back-button">X</button>
      </a>
      <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
        <h2>flickr</h2>
        <h3 className="username">ExampleUser Profile</h3>
        <form style={styles.form}>
          <div className="input">
            <label className="emailLabel">Username</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              className="emailInput"
              placeholder="example-username"
            />
          </div>

          <div className="input">
            <label>Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="**********"
            />
          </div>

          <div className="input">
            <label className="emailLabel">Email</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              className="emailInput"
              placeholder="example@gmail.com"
            />
          </div>
        </form>
        <form style={styles.servicesForm}>
          <label htmlFor="StreamService">Available Streaming Services: </label>
          <div style={styles.servicesDiv}>
            {selectMenus.map((value, index) => (
              <div key={index}>
                <select
                  style={styles.serviceSelect}
                  value={value}
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                >
                  <option value="" style={styles.firstSelect}>Select an option</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            
            ))}
          </div>
          <button type="button" style={styles.moreServicesButton} onClick={addSelectMenu}>+ Streaming Service</button>
        </form>
      </div>
    </>
  );
}

const styles = {
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
    overflow:'auto',
  },
  servicesDiv:{
    overflow:'auto',
  },
  serviceSelect: {
    marginBottom: '5px',
    height: 50,
    marginTop: '5px', 
  },
  firstSelect: {
    color: 'gainsboro',
  },
  moreServicesButton:{
    width: '200px',
    height: '35px',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    borderColor: '#ffffff',
    marginTop: '20px',
  }
  
}
