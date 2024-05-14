import { useAuthStore } from "@/stores/auth.store"
import http from "@/config/http-common"

class AuthService {
  authHeader() {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user && user.access_token) {
      return {
        "x-access-token": user.access_token,
      }
    } else {
      return {}
    }
  }

  //Login
  login(user) {
    const body = {
      username: user.username,
      password: user.password,
    }

    return http.post("/login", body)
  }

  //Logout
  logout() {
    const session = JSON.parse(localStorage.getItem("session"))
    const body = {
      id_user: session.id_user,
    }
    return http.post("/logout", body, {headers: this.authHeader()})
  }
}

export default new AuthService()
