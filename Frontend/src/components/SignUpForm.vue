<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import UsersDataService from "@/services/UsersDataService";

const router = useRouter();

//Esquema de validación de los campos del formulario
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surnames: yup.string().required("Surnames are required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email().required("Email is required"),
  repeatEmail: yup
    .string()
    .email()
    .required()
    .oneOf([yup.ref("email"), null], "Emails must match"),
  password: yup.string().required("Password is required"),
  /* .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Must contain 8 caracters, lowercase, uppercase, number and special'), */
  passwordConfirmation: yup
    .string()
    .label("")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  selectRole: yup.string().required("You must select a role"),
  token: yup.string().when("selectRole", () => {
    if (selectRole.value === "Teacher") {
      return yup.string().required("Token must be provided");
    }
  }),
});

const { values, errors, defineField, handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    selectRole: "Student",
  },
});

//Parametros del formulario
const [name, nameAttrs] = defineField("name");
const [surnames, surnamesAttrs] = defineField("surnames");
const [username, usernameAttrs] = defineField("username");
const [email, emailAttrs] = defineField("email");
const [repeatEmail, repeatEmailAttrs] = defineField("repeatEmail");
const [password, passwordAttrs] = defineField("password");
const [passwordConfirmation, passwordConfirmationAttrs] = defineField(
  "passwordConfirmation"
);
const [selectRole, selectRoleAttrs] = defineField("selectRole");
const [token, tokenAttrs] = defineField("token");

//Petición de axios para crear el usuario en BDD
//Si el submit es exitoso
const onSuccess = async (user) => {
  await UsersDataService.create(user)
    .then((res) => {
      if (res.status === 200) {
        router.push("/");
        alert(res.data.message);
      } else {
        alert(res.data.message);
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Si el submit tiene algun error
const onInvalidSubmit = () => {
  alert(Object.values(errors.value)[0]);
};
const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);
</script>

<template>
  <form @submit="onSubmit">
    <div class="d-flex flex-column">
      <label for="name" class="form-label h6">Name</label>
      <input
        v-model="name"
        v-bind="nameAttrs"
        id="name"
        type="text"
        class="form-control form-control-sm mb-2"
      />

      <label for="surnames" class="form-label h6">Surnames</label>
      <input
        v-model="surnames"
        v-bind="surnamesAttrs"
        id="surnames"
        class="form-control form-control-sm mb-2"
      />

      <label for="username" class="form-label h6">Username</label>
      <input
        v-model="username"
        v-bind="usernameAttrs"
        id="username"
        class="form-control form-control-sm mb-2"
      />

      <label for="email" class="form-label h6">Email</label>
      <input
        v-model="email"
        v-bind="emailAttrs"
        id="email"
        class="form-control form-control-sm mb-2"
      />

      <label for="repeatEmail" class="form-label h6">Confirm your email</label>
      <input
        v-model="repeatEmail"
        v-bind="repeatEmailAttrs"
        id="repeatEmail"
        class="form-control form-control-sm mb-2"
      />

      <label for="password" class="form-label h6">Password</label>
      <input
        v-model="password"
        v-bind="passwordAttrs"
        id="password"
        class="form-control form-control-sm mb-2"
        type="password"
      />

      <label for="passwordConfirmation" class="form-label h6"
        >Repeat your password</label
      >
      <input
        v-model="passwordConfirmation"
        v-bind="passwordConfirmationAttrs"
        id="passwordConfirmation"
        class="form-control form-control-sm mb-2"
        type="password"
      />

      <label for="rol" class="for-label h6"
        >Are you a teacher? Or a student.</label
      >
      <select
        class="form-select"
        id="rol"
        v-model="selectRole"
        v-bind="selectRoleAttrs"
        @change="setValues({ token: '' })"
      >
        <option value="Student">Student</option>
        <option value="Teacher">Teacher</option>
      </select>
      <div v-if="selectRole === 'Teacher'" class="d-flex flex-column mt-2">
        <label class="h6">Enter your access token</label>
        <input
          v-model="token"
          v-bind="tokenAttrs"
          class="form-control form-control-sm"
        />
        <p>{{ errors.token }}</p>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-secondary mt-3">Sign up</button>
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
