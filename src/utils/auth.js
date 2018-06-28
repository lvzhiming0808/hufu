import Storage from './storage'
const authKey = 'Authorization'
const JSESSIONID = 'JSESSIONID'

export const getAuth = () => {
  return Storage.getItem(authKey)
}

export const setAuth = auth => {
  Storage.setItem(authKey, auth)
}

export const removeAuth = () => {
  Storage.removeItem(authKey)
}

export const refreshAuth = newAuth => {
  removeAuth()
  setAuth(newAuth)
}

export const getJsessionid = () => {
  return Storage.getItem(JSESSIONID)
}
