<template>
    <div>
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>
<script>
import navbar from './../components/partials/Navbar'
export default {
    mounted() {
        this.$auth.check({
            then: (user) => {
                // User loggedin
            },
            catch: () => { }
        });
    },
    data() {
        return {
            message: "Welcome Myfirebase SPA framework",
            userLogged: false
        }
    },
    methods: {},
    components: {
        navbar
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