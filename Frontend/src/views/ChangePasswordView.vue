<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRoute, useRouter } from "vue-router";
import UsersDataService from "@/services/UsersDataService";

const route = useRoute();
const router = useRouter();

const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .label("")
    .required("You must repeat your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
});

const [password, passwordAttrs] = defineField("password");
const [passwordConfirmation, passwordConfirmationAttrs] = defineField(
  "passwordConfirmation"
);

const onSuccess = async (user) => {
  await UsersDataService.changePassword(user, route.params.access_token)
    .then((res) => {
      if (res.status === 200) {
        alert(res.data.message);
        router.push("/");
      } else {
        alert(res.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const onInvalidSubmit = () => {
  alert(Object.values(errors.value)[0]);
};

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);
</script>

<template>
  <div class="changePassword">
    <form @submit="onSubmit">
      <label for="password" class="form-label h6">New password</label>
      <input
        v-model="password"
        v-bind="passwordAttrs"
        id="password"
        class="form-control form-control-sm mb-2"
        type="password"
      />

      <label for="passwordConfirmation" class="form-label h6"
        >Repeat your new password</label
      >
      <input
        v-model="passwordConfirmation"
        v-bind="passwordConfirmationAttrs"
        id="passwordConfirmation"
        class="form-control form-control-sm mb-2"
        type="password"
      />

      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-secondary mt-3">
          Update password
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.changePassword {
  border-radius: 2em;
  background-color: aliceblue;
  border: black 2px solid;
  padding: 3em;
}
.form-control:focus {
  box-shadow: 0 0 10px rgba(66, 184, 131, 1);
}
</style>
