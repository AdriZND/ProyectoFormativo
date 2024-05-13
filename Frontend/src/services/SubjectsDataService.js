import http from "../config/http-common";

class SubjectsDataService {
  //Subjects
  findAllSubjects() {
    return http.get(`/subjects`);
  }

  //Find subject by name
  findSubjectName(subject_name) {
    return http.get(`/subjects/name?name=${subject_name}`);
  }

  //Find all subjects based on an user id
  findUserSubject(id_subject) {
    return http.get(`/user/subjects/id?id=${id_subject}`);
  }

  findAllByTeacher(id_teacher) {
    return http.get(`/subjects/teacher?teacher=${id_teacher}`)
  }

  createSubject(subject, userID) {
    const body = {
      subject_name: subject.subject,
      id_teacher: userID,
    };

    return http.post("/subjects/add", body);
  }
}

export default new SubjectsDataService();
