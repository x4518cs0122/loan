const TOKEN_KEY = 'admin-token'

export function getToken() {
    const token = sessionStorage.getItem(TOKEN_KEY)
    return token
}

export function setToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token)
}