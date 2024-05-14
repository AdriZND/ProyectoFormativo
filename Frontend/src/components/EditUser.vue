<script setup>
import { useForm } from "vee-validate"
import * as yup from "yup"
import { useRouter, useRoute } from "vue-router"
import UsersDataService from "@/services/UsersDataService"
import { useAuthStore } from "@/stores/auth.store"

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const response = await UsersDataService.findOneById(route.params.id)
const user = response.data.user

const schema = yup.object().shape({
  name: yup.string(),
  surnames: yup.string(),
  username: yup.string(),
  email: yup.string().email(),
  repeatEmail: yup
    .string()
    .email()
    .required()
    .oneOf([yup.ref("email"), null], "Los emails deben coincidir"),
  password: yup.string(),
  /* .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Must contain 8 caracters, lowercase, uppercase, number and special'), */
  passwordConfirmation: yup
    .string()
    .label("")
    .required()
    .oneOf([yup.ref("password"), null], "Los emails deben coincidir"),
})

const { values, errors, defineField, handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    selectRole: "Student",
  },
})

const [name, nameAttrs] = defineField("name")
const [surnames, surnamesAttrs] = defineField("surnames")
const [username, usernameAttrs] = defineField("username")
const [email, emailAttrs] = defineField("email")
const [repeatEmail, repeatEmailAttrs] = defineField("repeatEmail")
const [password, passwordAttrs] = defineField("password")
const [passwordConfirmation, passwordConfirmationAttrs] = defineField(
  "passwordConfirmation"
)

const onSuccess = async (data) => {
  try {
    const response = await UsersDataService.updateUser(data, user.id)
    if (response) {
      alert(response.data.message)
      if (authStore.user.id === user.id) {
        authStore.setUser(user.id)
        router.push(`/profile/${user.username}`)
        setTimeout(() => {
          location.reload()
        }, 100)
      }
      router.go(-1)
    } else {
      console.log("Error al actualizar usuario")
    }
  } catch (error) {
    console.log(error)
  }
}

//Si el submit tiene algun error
const onInvalidSubmit = () => {
  alert(Object.values(errors.value)[0])
}
const onSubmit = handleSubmit(onSuccess, onInvalidSubmit)
</script>

<template>
  <form @submit="onSubmit">
    <div class="d-flex flex-column">
      <label for="name" class="form-label h6">Nombre</label>
      <input
        v-model="name"
        v-bind="nameAttrs"
        id="name"
        type="text"
        class="form-control form-control-sm mb-2"
        :placeholder="user.name"
      />

      <label for="surnames" class="form-label h6">Apellidos</label>
      <input
        v-model="surnames"
        v-bind="surnamesAttrs"
        id="surnames"
        class="form-control form-control-sm mb-2"
        :placeholder="user.surnames"
      />

      <label for="username" class="form-label h6">Nombre de usuario</label>
      <input
        v-model="username"
        v-bind="usernameAttrs"
        id="username"
        class="form-control form-control-sm mb-2"
        :placeholder="user.username"
      />

      <label for="email" class="form-label h6">Email</label>
      <input
        v-model="email"
        v-bind="emailAttrs"
        id="email"
        class="form-control form-control-sm mb-2"
        :placeholder="user.email"
      />

      <label for="repeatEmail" class="form-label h6">Confirma el email</label>
      <input
        v-model="repeatEmail"
        v-bind="repeatEmailAttrs"
        id="repeatEmail"
        class="form-control form-control-sm mb-2"
      />

      <label for="password" class="form-label h6">Contraseña</label>
      <input
        v-model="password"
        v-bind="passwordAttrs"
        id="password"
        class="form-control form-control-sm mb-2"
        type="password"
      />

      <label for="passwordConfirmation" class="form-label h6"
        >Repite la contraseña</label
      >
      <input
        v-model="passwordConfirmation"
        v-bind="passwordConfirmationAttrs"
        id="passwordConfirmation"
        class="form-control form-control-sm mb-2"
        type="password"
      />
    </div>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-secondary mt-3">Guardar</button>
    </div>
  </form>
</template>

<style scoped></style>
