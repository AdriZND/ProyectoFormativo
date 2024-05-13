<script setup>
import Avatar from 'primevue/avatar'
import {useAuthStore} from '../stores/auth.store'
import {ref} from 'vue';



const ASSETS = import.meta.env.VITE_ASSETS;
const authStore = useAuthStore()
const avatarPath = ref(ASSETS + authStore.user.avatarPath)

</script>

<template>
     <Avatar
        v-if="avatarPath"
        :image="avatarPath"
        class="mr-2"
        size="xlarge"
        shape="circle"
      />
</template>

<style scoped>
</style>