<script setup>
import EditUser from "@/components/EditUser.vue"
</script>

<template>
  <div>
    <Suspense>
      <EditUser class="form" />
    </Suspense>
  </div>
</template>

<style scoped>
.form {
  color: #35495e;
  border-radius: 2em;
  background-color: aliceblue;
  border: black 2px solid;
  padding: 3em;
}
</style>
