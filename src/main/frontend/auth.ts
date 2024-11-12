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
        localStorage.setItem('username', member.username.toString());
        // @ts-ignore
        localStorage.setItem('email', member.email.toString());
    }
    return member;
}

/**
 * Checks if the user is logged in.
 */
export function isLoggedIn() {
    return localStorage.getItem('username') != null;
}

/**
 * Gets the username if the user is logged in.
 */
export function getUsername() {
    if (isLoggedIn()) {
        return localStorage.getItem('username');
    } else {
        return null;
    }
}

/**
 * Gets the email if the user is logged in.
 */
export function getEmail() {
    if (isLoggedIn()) {
        return localStorage.getItem('email');
    } else {
        return null;
    }
}


/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
export async function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
}
