<script setup>
import ProfilePage from "@/components/ProfilePage.vue";
</script>

<template>
  <div class="container">
    <Suspense>
      <ProfilePage />
    </Suspense>
  </div>
</template>

<style scoped>
.container {
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
