<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import DynamicSearch from "@/components/DynamicSearch.vue";
import UsersDataService from "@/services/UsersDataService";
import SubjectsDataService from "@/services/SubjectsDataService";
import RelationsDataService from "@/services/RelationsDataService";

const router = useRouter();
const authStore = useAuthStore();
let id_teacher = "";
let id_user = "";
let id_subject = "";

const handleUserSelected = async (username) => {
  console.log(username);
  const response = await UsersDataService.findOneUsername(username);
  id_user = response.data.id;
  console.log(id_user);
};

const handleSubjectSelected = async (subjectName) => {
  console.log(subjectName);
  const response = await SubjectsDataService.findSubjectName(subjectName);
  id_subject = response.data.id;
  id_teacher = response.data.id_teacher;
  console.log(id_subject);
};

const handleSubmit = async () => {
  try {
    const res = await RelationsDataService.assignRelation(
      id_user,
      id_teacher,
      id_subject
    );
    if (res.status === 200) {
      alert(res.data.message);
      router.go(-1);
    } else {
      alert(res.data.message);
    }
  } catch (error) {}
};
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
