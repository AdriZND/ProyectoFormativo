<script setup>
import ForgetPass from "./ForgetPass.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

const router = useRouter();

const schema = yup.object({
  username: yup.string().required().label("Username"),
  password: yup.string().required().label("Password"),
});

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
});
const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");

const onSuccess = async (user) => {
  const authStore = useAuthStore();
  return await authStore.login(user);
};

const onInvalidSubmit = async () => {
  await alert(Object.values(errors.value)[0]);
};

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);
</script>

<template>
  <form @submit="onSubmit" class="form">
    <div class="mb-2">
      <label for="username" class="form-label h5">Username</label>
      <input
        v-model="username"
        v-bind="usernameAttrs"
        class="form-control"
        id="username"
        placeholder="Enter your username"
        type="text"
      />

      <label for="password" class="form-label h5">Password</label>
      <input
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        id="password"
        class="form-control"
        placeholder="Enter your password"
      />

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-secondary mt-3">Login</button>
        <router-link to="/signup"
          ><button class="btn btn-secondary mt-3">Sign up</button></router-link
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
