import http from "../config/http-common";
import AuthService from "./AuthService";

class RelationsDataService {
     //FindUserRelations
  findUserRelations(id_user) {
    return http.get(`/user/relations/id?id=${id_user}`, {headers: AuthService.authHeader()});
  }

  deleteUserRelation(id_relation) {
    return http.delete(`/user/relations/id?id=${id_relation}`, {headers: AuthService.authHeader()});
  }

  //Asignar asignatura y profesor a alumno
  assignRelation(id_user, id_teacher, id_subject) {
    const body = {
      id_user: id_user,
      id_teacher: id_teacher,
      id_subject: id_subject,
    };
    return http.post("/user/relations", body, {headers: AuthService.authHeader()});
  }
  //Find number of students by subject id
  numberOfStudents(id_subject){
    return http.get(`/user/subjects/id_subject?id_subject=${id_subject}`, {headers: AuthService.authHeader()})
  }
}

export default new RelationsDataService();
