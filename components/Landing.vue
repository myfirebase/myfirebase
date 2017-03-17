<template>
<div>
<navbar></navbar>
<div class="flex">
    <h3>Welcome to the <i>Myfirebase</i></h3>
</div>
</div>
</template>
<script>

import navbar from './../components/partials/Navbar'

export default {
    mounted() {
        this.$auth.check({
            then: (user) =>{
                console.log("logged in")
            },
            catch: ()=> {}
        });
    },
    data() {
        return {
            message: "Welcome Myfirebase SPA framework",
            userLogged: false
        }
    },
    methods: {
        logout() {
            this.$auth.logout()
        },
        app() {
            this.$router.push('/app')
            this.$router.go(1)
        }
    },
    components: {
        navbar
    }
}
</script>


<style>
    .flex{
        display: flex;
        align-items: center;
        justify-content: center
    }
</style>
