<script setup>
import { useForm } from "vee-validate"
import * as yup from "yup"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth.store"
import SubjectsDataService from "@/services/SubjectsDataService"

const authStore = useAuthStore()
const user = authStore.user
const router = useRouter()

const schema = yup.object({
  subject: yup
    .string()
    .required("Debes añadir una asignatura")
    .label("Subject"),
})

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
})
const [subject, subjectAttrs] = defineField("subject")

const onSuccess = async (subject) => {
  try {
    const res = await SubjectsDataService.createSubject(subject, user.id)
    if (res.status === 200) {
      alert(res.data.message)
      router.go(-1)
    } else if (res.status === 250) {
      alert(res.data.message)
      console.log(res)
    } else {
      console.log(res)
    }
  } catch (error) {
    console.log(error)
  }
}

const onInvalidSubmit = async () => {
  await alert(Object.values(errors.value)[0])
}

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit)
</script>

<template>
  <div class="container">
    <form class="form" @submit="onSubmit" >
      <div>
        <label class="form-label h5" for="subject"
          >Introduce la asignatura</label
        >
        <input
          id="subject"
          v-model="subject"
          v-bind="subjectAttrs"
          class="form-control"
          placeholder="Ej: Lengua"
          type="text"
        />
      </div>
      <div>
        <button type="submit" class="btn btn-secondary mt-3">Añadir</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  color: #35495e;
  border-radius: 2em;
  background-color: aliceblue;
  border: black 2px solid;
  padding: 3em;
  max-width: 40em;
}

.form-control:focus {
  box-shadow: 0 0 10px rgba(66, 184, 131, 1);
}
</style>
