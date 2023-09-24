export function getAccessToken() {
  return localStorage.getItem('access_token')
}

export function getRefreshToken() {
  return localStorage.getItem('refresh_token')
}

export function setAccessToken(token: string) {
  localStorage.setItem('access_token', token)
}

export function setRefreshToken(token: string) {
  localStorage.setItem('refresh_token', token)
}

export function removeAccessToken() {
  localStorage.removeItem('access_token')
}

export function removeRefreshToken() {
  localStorage.removeItem('refresh_token')
}
