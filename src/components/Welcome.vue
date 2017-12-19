<template>
    <div class="flex">
        <img src="./../assets/img/MyFireBase.svg" alt="MyfirebaseLogo">
        <span class="md-display-2">Welcome to
            <i>Myfirebase</i>
        </span>
        <router-link tag="md-button" to="/login" class="md-raised md-primary">Login</router-link>
    </div>
</template>
<script>
export default {
    mouted() {
        // component mounted
    },
    data() {
        return {
        }
    }
}
</script>

<style>
.flex {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>