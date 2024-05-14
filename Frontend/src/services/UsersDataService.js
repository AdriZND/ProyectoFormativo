import http from "../config/http-common";
import AuthService from "./AuthService";

class UsersDataService {
  //Funcion para crear al user en BDD
  create(user) {
    const body = {
      name: user.name,
      surnames: user.surnames,
      username: user.username,
      email: user.email,
      role: user.selectRole === "Student" ? "1" : "2",
      password: user.password,
      token: user.token,
    };

    return http.post("/user", body);
  }
  updateUser(user, id_user) {
    const id= id_user
    const body = {
      name: user.name,
      surnames: user.surnames,
      username: user.username,
      email: user.email,
      password: user.password
    }
    return http.put(`/user/username/id?id=${id}`, body, {headers: AuthService.authHeader()})
  }
  //Función para cambiar la contraseña al user en bdd
  changePassword(user, route) {
    const body = {
      password: user.password,
    };
    return http.put("/forgetpassword/changepassword/" + route, body);
  }

  //Función para validar el email del usuario y cambiar el estado de la cuenta a
  //activo
  validateEmail(username) {
    const body = {
      active: true,
    };

    return http.put(`/user/username/username?username=${username}`, body);
  }

  //Funcion para que el user pueda cambiar la contraseña a traves del email
  forgetPassword(user) {
    const body = {
      email: user.email,
    };

    return http.post("/forgetpassword", body);
  }
  //FindAllUsername
  findAll() {
    return http.get(`/user`, {headers: AuthService.authHeader()} );
  }

  findAllStudents(){
    return http.get(`/user/students`, {headers: AuthService.authHeader()})
  }
  //FindOneByID
  findOneById(id_user) {
    return http.get(`/user/id?id=${id_user}`, {headers: AuthService.authHeader()});
  }
  //Find one by username
  findOneUsername(username) {
    return http.get(`/user/username?username=${username}`, {headers: AuthService.authHeader()});
  }

  deleteUser(id) {
    return http.delete(`/user/username/id?id=${id}`, {headers: AuthService.authHeader()});
  }
}

export default new UsersDataService();
