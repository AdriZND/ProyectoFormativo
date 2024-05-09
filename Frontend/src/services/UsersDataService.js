import http from "../config/http-common";
import getUuidByString from "uuid-by-string";

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

  //Función para cambiar la contraseña al user en bdd
  changePassword(user, route) {
    const body = {
      password: user.password,
    };
    return http.put("/forgetpassword/changepassword/" + route, body);
  }

  //Función para validar el email del usuario y cambiar el estado de la cuenta a
  //activo
  validateEmail(route) {
    const body = {
      active: true,
    };

    return http.put("/user/username/" + route, body);
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
    return http.get(`/user`);
  }
  //FindOneByID
  findOneById(id_user) {
    return http.get(`/user/id?id=${id_user}`);
  }
  //Find one by username
  findOneUsername(username) {
    return http.get(`/user/username?username=${username}`);
  }

  //FindUserRelations
  findUserRelations(id_user) {
    return http.get(`/user/relations/id?id=${id_user}`);
  }
  //Subjects
  findAllSubjects() {
    return http.get(`/subjects`);
  }
  //Find subject by name
  findSubjectName(subject_name) {
    return http.get(`/subjects/name?name=${subject_name}`);
  }
  //Find one Subject
  findUserSubject(id_subject) {
    return http.get(`/user/subjects/id?id=${id_subject}`);
  }

  deleteUser(id) {
    return http.delete(`/user/username/id?id=${id}`);
  }
  deleteUserRelation(id_relation) {
    return http.delete(`/user/relations/id?id=${id_relation}`);
  }

  //Asignar asignatura y profesor a alumno
  assignRelation(id_user, id_teacher, id_subject) {
    const body = {
      id_user: id_user,
      id_teacher: id_teacher,
      id_subject: id_subject,
    };
    return http.post("/user/relations", body);
  }

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

  createSubject(subject, userID) {
    const body = {
      subject_name: subject.subject,
      id_teacher: userID,
    };

    return http.post("/subjects/add", body);
  }
}

export default new UsersDataService();
