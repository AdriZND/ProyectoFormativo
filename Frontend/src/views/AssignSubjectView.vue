<script setup>
import { useAuthStore } from "@/stores/auth.store"
import { useRouter } from "vue-router"
import { ref } from "vue"
import DynamicSearch from "@/components/DynamicSearch.vue"
import UsersDataService from "@/services/UsersDataService"
import SubjectsDataService from "@/services/SubjectsDataService"
import RelationsDataService from "@/services/RelationsDataService"

const router = useRouter()
const authStore = useAuthStore()
const id_teacher = ref("")
const id_user = ref("")
const id_subject = ref("")
const isUserSelected = ref(false)
const isSubjectSelected = ref(false)

const handleUserSelected = async (username) => {
  console.log(username)
  const response = await UsersDataService.findOneUsername(username)
  id_user.value = response.data.id
  isUserSelected.value = true
  console.log(id_user)
}

const handleSubjectSelected = async (subjectName) => {
  console.log(subjectName)
  const response = await SubjectsDataService.findSubjectName(subjectName)
  id_subject.value = response.data.id
  id_teacher.value = response.data.id_teacher
  isSubjectSelected.value = true
  console.log(id_subject)
}

const handleSubmit = async () => {
  if (!isUserSelected.value || !isSubjectSelected.value) {
    alert('Por favor elige usuario y asignatura.')
    return
  }
  try {
    const res = await RelationsDataService.assignRelation(
      id_user.value,
      id_teacher.value,
      id_subject.value
    )
    if (res.status === 200) {
      alert(res.data.message)
      router.go(-1)
    } else {
      alert(res.data.message)
    }
  } catch (error) { console.log(error)}
}
</script>

<template>
  <div class="container">
    <div class="mb-3">
      <p>Selecciona al alumno</p>
      <DynamicSearch type="User" @user-selected="handleUserSelected" />
    </div>
    <div>
      <p class="h5">Selecciona la asignatura</p>
      <DynamicSearch type="Subject" @subject-selected="handleSubjectSelected" />
    </div>
    <div class="mt-3 d-flex justify-content-center">
      <button class="btn btn-secondary" type="button" @click="handleSubmit()">
        Enviar
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  color: #35495e;
  border-radius: 2em;
  background-color: aliceblue;
  border: black 2px solid;
  padding: 3em;
}
</style>
