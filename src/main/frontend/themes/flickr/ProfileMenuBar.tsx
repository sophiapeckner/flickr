import { Icon } from "@vaadin/react-components";
import { useNavigate } from "react-router-dom";
import React from "react";

//Used to display user icon for the menu bar
export function createItem(iconName: string, text: string, isChild = false) {
    const iconStyle: React.CSSProperties = {
        width: isChild ? 'var(--lumo-icon-size-s)' : '',
        height: isChild ? 'var(--lumo-icon-size-s)' : '',
        marginRight: isChild ? 'var(--lumo-space-s)' : '',
    };

    let ariaLabel = '';
    if (iconName === 'copy') {
        ariaLabel = 'duplicate';
    }

    return (
        <>
            <Icon icon={`vaadin:${iconName}`} style={iconStyle} aria-label={ariaLabel} />
            {text}
        </>
    );
}
export const items = [
    { component: createItem('user', ''),
        children: [
            { text: 'Profile', path: '/userprofile' },
            { text: 'Log Out', path: '/' },
        ],
    },
];