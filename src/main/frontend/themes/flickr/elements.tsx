import {Icon, MenuBar} from "@vaadin/react-components";
import {style} from "Frontend/themes/flickr/css";
import {items} from "Frontend/themes/flickr/ProfileMenuBar";
import {useNavigate} from "react-router-dom";

// @ts-ignore
export const CustomHeader: ReactNode = () => {
  const navigate = useNavigate()

  const handleProfileMenuSelection = (e: { detail: { value: any; }; }) =>{
    const selectedItem = e.detail.value;
    if(selectedItem && selectedItem.path){
      navigate(selectedItem.path);
    }
  }

  return (
    <div>
      <a href="/">
        <Icon icon="vaadin:close" style={style.backButton}/>
      </a>
      <MenuBar
        items={items}
        theme="tertiary"
        style={{...style.topCornerButton,}}
        onItemSelected={handleProfileMenuSelection}
      />
    </div>
  );
}