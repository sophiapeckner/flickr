import { LogInEndpoint } from 'Frontend/generated/endpoints';
let memberId: undefined | string;

/**
 * Login wrapper method that retrieves user information.
 *
 * Uses `localStorage` for offline support.
 */
export async function login(email: string, password: string) {
    memberId = await LogInEndpoint.login(email, password);
    if (memberId == "Wrong password" || memberId == "User Not found") {
        return memberId;
    } else {
        localStorage.setItem('RYT', memberId);
        return "Success";
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
        const member = await LogInEndpoint.getMember(token);
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
            return await LogInEndpoint.getMember(memberId);
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
