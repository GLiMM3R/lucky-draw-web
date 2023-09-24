import jwtDecode from 'jwt-decode'

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

export function isTokenExpired(token?: string) {
  const decoded: any = jwtDecode(token ?? '')
  // console.log('🚀 ~ file: token.ts:29 ~ isTokenExpired ~ decoded:', decoded)
  // if (decoded.exp < Date.now() / 1000) {
  //   console.log('token expire')
  // }
  // return decoded.iat > Date.now()
  return decoded.exp < Date.now() / 1000
}
