import { Icon } from "@vaadin/react-components";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";

//Used to display user icon for the menu bar
export function createItem(iconName: string, text: string, isChild = false) {
  const iconStyle: React.CSSProperties = {
    width: isChild ? 'var(--lumo-icon-size-xl)' : '',
    height: isChild ? 'var(--lumo-icon-size-xl)' : '',
    marginRight: isChild ? 'var(--lumo-space-s)' : '',
    fontSize: 30
  };

  return (
    <>
      <FontAwesomeIcon icon={faCircleUser} style={iconStyle} />
      {text}
    </>
  );
}

export const items = [
  { component: createItem('user', ''),
    children: [
      { text: 'Profile', path: '/userprofile' },
      { text: 'Log Out', path: '/'},
    ],
  },
];
