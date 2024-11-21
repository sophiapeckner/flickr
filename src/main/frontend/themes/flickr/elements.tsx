import {Icon, MenuBar, Dialog, Button} from "@vaadin/react-components";
import {style} from "Frontend/themes/flickr/css";
import {items} from "Frontend/themes/flickr/ProfileMenuBar";
import {useNavigate} from "react-router-dom";
import {logout} from "Frontend/auth";
import {useSignal} from "@vaadin/hilla-react-signals";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

interface CustomHeaderProps {
  hideBackButton?: boolean,
  hideProfileIcon?: boolean,
  confirmExit?: boolean,
  loggedIn?: boolean;
}

// @ts-ignore
export const CustomHeader: React.FC<CustomHeaderProps> = (
  {
    hideBackButton = false,
    hideProfileIcon = false,
    confirmExit = false,
    loggedIn = true
  }) => {
  const navigate = useNavigate()
  const dialogOpened = useSignal(false);

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
      {/* Top Left Back Button*/}
      {/* displays either the back arrow or back X determined by whether in a session or not */}
      {!hideBackButton &&
        (confirmExit ? (
        <>
          <Button onClick={() => dialogOpened.value = true} style={style.backButton} theme='tertiary'>
            <Icon icon="vaadin:close" />
          </Button>
          <Dialog
            headerTitle="Exit Group"
            opened={dialogOpened.value}
            onOpenedChanged={({ detail }) => {
              dialogOpened.value = detail.value;
            }}
            footerRenderer={() => (
              <>
                <Button onClick={() => { dialogOpened.value = false; }}>
                  Cancel
                </Button>
                <Button theme="primary"
                  onClick={() => {
                    dialogOpened.value = false;
                    window.location.href = "/start"
                  }}
                >
                  Leave
                </Button>
              </>
            )}
          >Are you sure you want to leave the session?
          </Dialog>
        </>
      ) : (
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={style.backButton}
          onClick={() => window.history.back()}
        />
      ))}

      {/* Top Right Corner*/}
      {/* displays either 'Log In' or the user profile icon determined on loggedIn status*/}
      {!hideProfileIcon &&
        (loggedIn ? (
        <MenuBar
          items={items}
          theme="tertiary"
          style={style.topCornerButton}
          onItemSelected={handleProfileMenuSelection}
        />
      ) : (
        <a href="/" style={{...style.topCornerButton, fontSize: 16}}>
          Log In
        </a>
      ))}
    </div>
  );
}