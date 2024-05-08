<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import UsersDataService from '@/services/UsersDataService';


const schema = yup.object().shape({
    email: yup.string().email().required('Email is required')
})

const {handleSubmit, defineField, errors  } = useForm({
    validationSchema: schema
})

const [email, emailAttrs] = defineField('email')

const onSuccess = async (user) => {
    UsersDataService.forgetPassword(user).then(res => {
        if(res.status === 200){
            alert(res.data.message)
        } else {
            alert(res.data.message)
        }
    }).catch(err => {
        if(err.response && err.response.status === 404){
            alert(err.response.data.message)
            console.error(err.message)
        } else if (err.response && err.response.status === 400){
            alert(err.response.data.message)
            console.error(err.message)

        } else {
            alert(err.response.data.message)
            console.error(err.message)
        }
        
    })

}

const onInvalidSubmit = async () => {
    await alert(Object.values(errors.value)[0])

}

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit)
</script>

<template>
    <div class="forgetPassword">
        <form @submit="onSubmit">
            <label class="form-label h6" for="changePassword">Enter the email for changing your password</label>
            <input v-model="email" v-bind="emailAttrs"class="form-control" id="changePassword" /> 

            <button type="submit" class="btn btn-secondary mt-3">Send</button>
        </form>
    </div>
</template>

<style scoped>
.forgetPassword {
    border-radius: 2em;
    background-color: aliceblue;
    border: black 2px solid;
    padding: 3em;
}
.form-control:focus {
    box-shadow: 0 0 10px rgba(66, 184, 131, 1);
}
</style>