<script setup>
import { useAuthStore } from "@/stores/auth.store"
import UsersDataService from "@/services/UsersDataService"
import RelationsDataService from "@/services/RelationsDataService"
import SubjectsDataService from "@/services/SubjectsDataService"
import Button from "@/components/Button.vue"

const authStore = useAuthStore()
const user = authStore.user

//Buscamos en la bdd las relaciones para ver que profesor y asignaturas tiene relacionados
const fetchUserRelation = async () => {
  try {
    const id = user.id
    const response = await RelationsDataService.findUserRelations(id)
    const relation = response.data.relation
    return relation
  } catch (error) {
    console.log(error)
  }
}
//Guardamos las relacions en una variable
const relation = await fetchUserRelation()

//Iteramos las relaciones obtenidas para guardar los datos en un array
const relationData = []
if (user.role === 1) {
  for (let rel of relation) {
    const resTeacher = await UsersDataService.findOneById(rel.id_teacher)
    const teacher = resTeacher.data.user
    const resSubject = await SubjectsDataService.findUserSubject(rel.id_subject)
    const subject = resSubject.data.subject
    relationData.push({ teacher, subject })
  }
} else {
  for (let rel of relation) {
    const resStudent = await UsersDataService.findOneById(rel.id_student)
    const student = resStudent.data.user
    const resSubject = await SubjectsDataService.findUserSubject(rel.id_subject)
    const subject = resSubject.data.subject
    const id_relation = rel.id
    relationData.push({ student, subject, id_relation })
  }
}
console.log(relationData)
</script>

<template>
  <div class="container">
    <div v-if="user.role === 1">
      <div class="row">
        <div class="col h3">Bienvenido! {{ user.username }}</div>
      </div>
      <div class="row">
        <h6 class="col">Lista de profesores</h6>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Email</th>
              <th scope="col">Asignatura</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="data in relationData">
              <td>{{ data.teacher.name }}</td>
              <td>{{ data.teacher.surnames }}</td>
              <td>{{ data.teacher.email }}</td>
              <td>{{ data.subject.subject_name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="user.role === 2">
      <div class="row">
        <div class="col h3">Bienvenido! {{ user.username }}</div>
      </div>
      <div class="row">
        <h6 class="col">Lista de alumnos</h6>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Email</th>
              <th scope="col">Asignatura</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="data in relationData">
              <td>{{ data.student.name }}</td>
              <td>{{ data.student.surnames }}</td>
              <td>{{ data.student.email }}</td>
              <td>{{ data.subject.subject_name }}</td>
              <td>
                <Button
                  action="Edit"
                  :editUser="data.student.id"
                  text="Editar"
                  class="btn btn-sm btn-secondary"
                />
              </td>
              <td>
                <Button
                  action="Delete"
                  :relationID="data.id_relation"
                  text="Eliminar"
                  class="btn btn-sm btn-outline-secondary"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
