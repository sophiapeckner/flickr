import { MemberServices } from 'Frontend/generated/endpoints';
let memberId: undefined | String;


/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
export async function login(email: string, password: string) {
    memberId = await MemberServices.login(email, password);
    if (memberId != "Wrong password" || memberId != "User Not found") {
        // @ts-ignore
        localStorage.setItem('RYT', memberId);
        return "Success";
    } else {
        return memberId;
    }
}

/**
 * Checks if the user is logged in.
 */
export async function isLoggedIn() {
    const token = localStorage.getItem('RYT');
    if (token == null) {
        return false;
    } else {
        const member = await MemberServices.getMember(token);
        if (member == null) {
            localStorage.removeItem('RYT');
        }
        return true;
    }
}

/**
 * Gets the Member if the user is logged in.
 */
export async function getMember() {
    if (await isLoggedIn()) {
        const memberId = localStorage.getItem('RYT');
        if (memberId != null) {
            return await MemberServices.getMember(memberId);
        }
    }
    return null;
}

/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
export async function logout() {
    localStorage.removeItem('RYT');
}
