<script setup>
import { useForm } from 'vee-validate';
import { useRoute, useRouter } from 'vue-router';
import UsersDataService from '@/services/UsersDataService';


const  route = useRoute()
const router = useRouter()

const onSuccess = async () => {
    await UsersDataService.validateEmail(route.params.username)
    .then(res => {
        if(res.status === 200){
            alert('Email validado correctamente')
            router.push('/')
        } else {
            alert(res.data.message)
        }
    })
    .catch(err => {
        console.log(err)
    })
}
const {handleSubmit} = useForm()
const onSubmit = handleSubmit(onSuccess)

</script>

<template>
    <div class="confirmButton">
        <form @submit="onSubmit">
            <button class="btn btn-success btn-lg m5">Confirm email for {{ route.params.username }}</button>
        </form>
    </div>
</template>

<style scoped>
.confirmButton {
    border-radius: 1em;
    background-color: aliceblue;
    border: black 2px solid;
    padding: 3em;
}

</style>