import { useAuthStore } from "@/stores/auth.store";
import getUuidByString from "uuid-by-string";
import http from "@/config/http-common";

class AuthService {
  /* authHeader() {
  const { session } = useAuthStore();
  if (user && session.id_user) {
    return {
      "x-access-token": session.id_user,
    };
  } else {
    return {};
  }


} */

  //Login
  login(user) {
    const body = {
      username: user.username,
      password_token: getUuidByString(user.password),
    };

    return http.post("/login", body);
  }

  //Logout
  logout() {
    const session = JSON.parse(localStorage.getItem("session"));
    const body = {
      id_user: session.id_user,
    };
    return http.post("/logout", body);
  }
}

export default new AuthService();
