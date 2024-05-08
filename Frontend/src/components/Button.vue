<script setup>
import UsersDataService from '@/services/UsersDataService';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const router = useRouter()

const props = defineProps({
    action: {
        type: String,
        required: true,
        validator: (value) => ['Logout', 'Edit', 'Delete'].includes(value)
    },
    userID: {
        type: Number,
    },
    username: {
        type: String,
    }
})

const onClick = async () => {
    const username = props.username
    const id = props.userID
    if(props.action === 'Logout'){
        return authStore.logout()
    } else if(props.action === 'Edit'){
        router.push(`/home/${username}/edit`)
    } else if(props.action === 'Delete'){
        //Delete
       await UsersDataService.deleteUser(id)
       await UsersDataService.deleteUserRelation(id)
     router.go(0)
    }
    
}
</script>

<template>
        <button @click="onClick" class="btn btn-sm btn-outline-secondary">{{props.action}}</button>  
</template>

<style scoped>
</style>