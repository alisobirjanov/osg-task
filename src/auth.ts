
const AUTH_KEY = 'osg-auth'

export interface User {
  username: string
  password: string
}

class Auth {

  login(userData: User) {
    const data = localStorage.getItem(AUTH_KEY)
    if(!data) {
      return false
    }

    const user: User = JSON.parse(data)

    if (userData.password === user.password && userData.username === user.username) {
      return true
    }

    return false
  }

  register(user: User) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    return true
  }

  isAuthenticated() {
    const data = localStorage.getItem(AUTH_KEY)
    if (!data) {
      return false
    }
    return true
  }
}

export default new Auth()