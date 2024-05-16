<script setup>
import ForgetPass from "./ForgetPass.vue"
import { useForm } from "vee-validate"
import * as yup from "yup"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth.store"
import Button from "./Button.vue"

const router = useRouter()

const schema = yup.object({
  username: yup.string().required().label("Username"),
  password: yup.string().required().label("Password"),
})

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
})
const [username, usernameAttrs] = defineField("username")
const [password, passwordAttrs] = defineField("password")

const onSuccess = async (user) => {
  const authStore = useAuthStore()
  return await authStore.login(user)
}

const onInvalidSubmit = async () => {
  await alert(Object.values(errors.value)[0])
}

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit)
</script>

<template>
  <form class="form" @submit="onSubmit">
    <div class="mb-2">
      <label for="username" class="form-label h5">Usuario</label>
      <input
        v-bind="usernameAttrs"
        id="username"
        v-model="username"
        class="form-control"
        placeholder="Introduce el usuario"
        type="text"
      />

      <label for="password" class="form-label h5">Contraseña</label>
      <input
        v-bind="passwordAttrs"
        id="password"
        v-model="password"
        type="password"
        class="form-control"
        placeholder="Introduce la contraseña"
      />

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-secondary mt-3 me-2">
          Iniciar Sesión
        </button>
        <RouterLink to="/signup"
          ><button class="btn btn-secondary mt-3">
            Registrarse
          </button></RouterLink
        >
      </div>
      <ForgetPass class="mt-3" />
    </div>
  </form>
</template>

<style scoped>
.form {
  color: #35495e;
}

.form-control:focus {
  box-shadow: 0 0 10px rgba(66, 184, 131, 1);
}
</style>
