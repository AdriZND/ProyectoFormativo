import http from "../config/http-common";

class RelationsDataService {
     //FindUserRelations
  findUserRelations(id_user) {
    return http.get(`/user/relations/id?id=${id_user}`);
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
  //Find number of students by subject id
  numberOfStudents(id_subject){
    return http.get(`/user/subjects/id_subject?id_subject=${id_subject}`)
  }
}

export default new RelationsDataService();
