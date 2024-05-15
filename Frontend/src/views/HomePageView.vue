<script setup>
import { Suspense } from "vue"
import Button from "../components/Button.vue"
import UserPage from "../components/UserPage.vue"
</script>

<template>
  <div class="container container-style d-flex flex-column">
    <div class="row d-flex">
      <div class="col-5">
        <h1>Pagina inicial</h1>
      </div>
      <div class="col"></div>
      <div class="col">
        <div class="d-flex justify-content-start">
          <Button
            class="me-2 btn btn-sm btn-secondary"
            action="Profile"
            text="Perfil"
          />
          <Button
            class="btn btn-sm btn-outline-secondary"
            action="Logout"
            text="Salir"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Suspense>
          <UserPage />
        </Suspense>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-style {
  color: #35495e;
  border-radius: 2em;
  background-color: aliceblue;
  border: black 2px solid;
  padding: 3em;
 height: auto;
 width: 90vw;
 max-width: 50em;
}
</style>
