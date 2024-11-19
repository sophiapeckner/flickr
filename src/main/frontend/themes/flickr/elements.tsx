import {Icon, MenuBar} from "@vaadin/react-components";
import {style} from "Frontend/themes/flickr/css";
import {items} from "Frontend/themes/flickr/ProfileMenuBar";
import {useNavigate} from "react-router-dom";
import {logout} from "Frontend/auth";

interface CustomHeaderProps {
  hideBackButton?: boolean,
  backPath?: string;
  loggedIn?: boolean;
}

// @ts-ignore
export const CustomHeader: React.FC<CustomHeaderProps> = (
  {hideBackButton = false, backPath = "/start", loggedIn = true}) => {
  const navigate = useNavigate()

  const handleProfileMenuSelection = (e: { detail: { value: any; }; }) =>{
    const selectedItem = e.detail.value;

    if (selectedItem.text == "Log Out") {
      logout();
    }

    if (selectedItem?.path) {
      navigate(selectedItem.path);
    }
  }

  return (
    <div>
      {hideBackButton ? (
        <></>
      ) : (
        <a href={backPath}>
          <Icon icon="vaadin:close" style={style.backButton}/>
        </a>
      )}
      {loggedIn ? (
        <MenuBar
          items={items}
          theme="tertiary"
          style={style.topCornerButton}
          onItemSelected={handleProfileMenuSelection}
        />
      ) : (
        <a href="/" style={{...style.topCornerButton, fontSize: 20}}>
          Log In
        </a>
      )}
    </div>
  );
}