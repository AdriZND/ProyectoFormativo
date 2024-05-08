<script setup>
import { Suspense } from "vue";
import Button from "../components/Button.vue"
import UserPage from "../components/UserPage.vue"

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-9">
                <h1>HOME PAGE</h1>
            </div>
            <div class="col-3">
                <Button action="Logout" />
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <Suspense>
                <UserPage/>
                </Suspense>
            </div>
        </div>
    </div>  
</template>

<style scoped>
.container {
    color: #35495e;
    border-radius: 2em;
    background-color: aliceblue;
    border: black 2px solid;
    padding: 3em;
    height: 90dvh;
    width: 70dvw;

}
</style>