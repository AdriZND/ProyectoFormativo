<script setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from "@/stores/auth.store"
import Button from "./Button.vue"
import SubjectsDataService from "@/services/SubjectsDataService"
import RelationsDataService from "@/services/RelationsDataService"
import UploadAvatar from "@/components/UploadAvatar.vue"
import AvatarDisplay from "@/components/AvatarDisplay.vue"

const authStore = useAuthStore()
const user = authStore.user
const subjects = ref([])
const numberOfStudents = ref([])


const fetchSubjects = async () => {
  try {
    const subjectsData = await SubjectsDataService.findAllByTeacher(user.id)
    subjects.value = subjectsData.data.subjects
    console.log(subjects.value)
  } catch (error) {
    console.log(error)
  }
}

const fetchNumberOfStudents = async () => {
  try {
    for (let subject of subjects.value) {
      const numberOfStudentsData = await RelationsDataService.numberOfStudents(
        subject.id
      )
      numberOfStudents.value.push(numberOfStudentsData.data)
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  if (user.role === 2) {
    await fetchSubjects()
    await fetchNumberOfStudents()
  }
})
</script>

<template>
  <div class="row mb-5">
    <div class="col-3">
     <AvatarDisplay/>
    </div>
    <div class="col h1 d-flex justify-content-center">{{ user.username }}</div>
    <div class="col d-flex justify-content-center align-items-center">
      <Button
        action="Edit"
        :editUser="user.id"
        text="Editar"
        class="btn btn-sm btn-secondary me-2"
      />
      <Button
        action="Logout"
        text="Salir"
        class="btn btn-sm btn-outline-secondary"
      />
    </div>
  </div>
  <div class="row mb-3">
    <p class="h5">Nombre: {{ user.name }}</p>
    <p class="h5">Apellidos: {{ user.surnames }}</p>
    <p class="h5">Email: {{ user.email }}</p>
    <p v-if="user.role === 1" class="h5">Rol: Alumno</p>
    <p v-else-if="user.role === 2" class="h5">Rol: Profesor</p>
  </div>
  <div class="row" v-if="user.role === 2">
    <div class="table-responsive">
      <table class="table table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">Asignatura</th>
            <th scope="col">Nº de Alumnos</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(subject, index) in subjects">
            <td>{{ subject.subject_name }}</td>
            <td>{{ numberOfStudents[index] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <Button
        action="Add Subject"
        text="Añadir asignatura"
        class="col me-2 btn btn-secondary"
      />
      <Button
        action="Assign"
        text="Asignar Alumno"
        class="col btn btn-secondary"
      />
    </div>
  </div>
  <div class="mt-3">
    <p class="h5">Modifica tu avatar</p>
    <UploadAvatar />
  </div>
</template>

<style scoped></style>
