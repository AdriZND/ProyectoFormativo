<script setup>
import { useAuthStore } from "@/stores/auth.store";
import Button from "./Button.vue";

const authStore = useAuthStore();

//Guardamos el user en una variable
const user = authStore.user;
</script>

<template>
  <div class="row mb-5">
    <div class="col-3">Image</div>
    <div class="col h1">{{ user.username }}</div>
    <div class="col-2">
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
</template>

<style scoped></style>
