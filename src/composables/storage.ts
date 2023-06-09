import { User } from "~/models/user"

const TOKEN_KEY = 'token'

/* Response from : /api/login
{
    "user": {
        ...
    },
    "token": "..."
}
*/

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function saveToken(accessToken: any) {
    localStorage.setItem(TOKEN_KEY, accessToken)
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
}

export function getUser(): User {
    const userJson = localStorage.getItem("user");
    let user;
    if (userJson !== null) {
        user = JSON.parse(userJson);
    }
    return user
}
export function saveUser(user: User) {
    const userJson = JSON.stringify(user);
    localStorage.setItem("user", userJson);
}
export function removeUser() {
    localStorage.removeItem("user")
}