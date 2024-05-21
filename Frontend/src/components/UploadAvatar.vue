<script setup>
import { useToast } from "primevue/usetoast"
import Toast from "primevue/toast"
import FileUpload from "primevue/fileupload"
import { useAuthStore } from "@/stores/auth.store"
import { useRouter } from "vue-router"

const router = useRouter()
const authStore = useAuthStore()
const idUser = authStore.user.id
const toast = useToast()
const API_URL = import.meta.env.VITE_API_URL

const userUrl = API_URL + `/upload/id?id=` + idUser
const onUpload = async () => {
  toast.add({
    severity: "info",
    summary: "Success",
    detail: "File Uploaded",
    life: 3000,
  })

  await authStore.setUser(idUser)
  router.go(0)
}
</script>

<template>
  <Toast />
  <form>
    <FileUpload
      mode="basic"
      name="avatar"
      :url="userUrl"
      accept="image/*"
      :auto="true"
      :file-limit="1"
      :max-file-size="1000000"
      @upload="onUpload"
    />
  </form>
</template>

<style scoped></style>
