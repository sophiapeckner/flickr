import Member from "Frontend/generated/com/flickr/entities/Member";
import { MemberServices } from 'Frontend/generated/endpoints';

interface Authentication {
    user: Member;
    timestamp: number;
}

let member: undefined | Member;



/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
export async function login(email: string, password: string) {
    member = await MemberServices.login(email, password);
    if (member !== undefined) {
        // @ts-ignore
        localStorage.setItem('token', member.username.toString());
    }
    return member;
}

/**
 * Checks if the user is logged in.
 */
export function isLoggedIn() {
    return localStorage.getItem('token') != null;
}

/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
export async function logout() {
    localStorage.removeItem('token');
}

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

