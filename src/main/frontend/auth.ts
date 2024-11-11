// Uses the Vaadin provided login an logout helper methods
import {
    login as loginImpl,
    type LoginOptions,
    type LoginResult,
    logout as logoutImpl,
    type LogoutOptions,
} from '@vaadin/hilla-frontend';
import Member from "Frontend/generated/com/flickr/entities/Member";
import { MemberServices } from 'Frontend/generated/endpoints';

interface Authentication {
    user: Member;
    timestamp: number;
}

let authentication: Member | undefined | Authentication;
let userLoginIn: boolean = false;

const AUTHENTICATION_KEY = 'authentication';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
/**
 * Forces the session to expire and removes user information stored in
 * `localStorage`.
 */
export function setSessionExpired() {
    authentication = undefined;

    // Delete the authentication from the local storage
    localStorage.removeItem(AUTHENTICATION_KEY);
}


// Get authentication from local storage
const storedAuthenticationJson = localStorage.getItem(AUTHENTICATION_KEY);
if (storedAuthenticationJson !== null) {
    const storedAuthentication = JSON.parse(storedAuthenticationJson) as Authentication;
    // Check that the stored timestamp is not older than 30 days
    const hasRecentAuthenticationTimestamp =
        new Date().getTime() - storedAuthentication.timestamp < THIRTY_DAYS_MS;
    if (hasRecentAuthenticationTimestamp) {
        // Use loaded authentication
        authentication = storedAuthentication;
    } else {
        // Delete expired stored authentication
        setSessionExpired();
    }
}

/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
export async function login(email: string, password: string) {
    userLoginIn = true;
    const user = await MemberServices.login(email, password);
    console.log(user);
}
// export async function login(
//     username: string,
//     password: string,
// ): Promise<LoginResult> {
//     return await loginImpl(username, password, {
//         async onSuccess() {
//             // Get user info from endpoint
//             const user = await MemberServices.login(username, password);
//             authentication = {
//                 user,
//                 timestamp: new Date().getTime(),
//             };
//
//             // Save the authentication to local storage
//             localStorage.setItem(AUTHENTICATION_KEY, JSON.stringify(authentication));
//         },
//     });
// }

/**
 * Checks if the user is logged in.
 */
export function isLoggedIn() {
    // return !!authentication;
    return userLoginIn;
}

/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
// export async function logout(options: LogoutOptions = ) {
//     return await logoutImpl({
//         ...options,
//         onSuccess() {
//             setSessionExpired();
//         },
//     });
// }

/**
 * Checks if the user has the role.
 */
// export function isUserInRole(role: string) {
//     if (!authentication) {
//         return false;
//     }
//
//     return authentication.user.authorities.includes(`ROLE_${role}`);
// }

