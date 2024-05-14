import http from "../config/http-common";
import AuthService from "./AuthService";

class SubjectsDataService {
  //Subjects
  findAllSubjects() {
    return http.get(`/subjects`, {headers: AuthService.authHeader()});
  }

  //Find subject by name
  findSubjectName(subject_name) {
    return http.get(`/subjects/name?name=${subject_name}`, {headers: AuthService.authHeader()});
  }

  //Find all subjects based on an user id
  findUserSubject(id_subject) {
    return http.get(`/user/subjects/id?id=${id_subject}`, {headers: AuthService.authHeader()});
  }

  findAllByTeacher(id_teacher) {
    return http.get(`/subjects/teacher?teacher=${id_teacher}`, {headers: AuthService.authHeader()})
  }

  createSubject(subject, userID) {
    const body = {
      subject_name: subject.subject,
      id_teacher: userID,
    };

    return http.post("/subjects/add", body, {headers: AuthService.authHeader()});
  }
}

export default new SubjectsDataService();
