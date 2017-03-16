<template>
<div>
<navbar></navbar>
<div class="container">
    <div class="push-down"></div>
    <div class="row">
        <div class="col-md-8 col-md-offset-2" align="center">
            <div class="row">
                <h3>Welcome to the <i>Myfirebase</i> Framework</h3>
                <div>
                    <button class="btn btn-default btn-xs block-username">AAA</button>
                    <button class="btn btn-success btn-xs" @click = "app()">Go to App</button>
                    <button class="btn btn-danger btn-xs" @click= "logout()">Logout <i class="fa fa-sign-out"></i></button>
                </div>
                <div  class = "col-md-8 col-md-offset-2">
                    <button class="btn btn-warning btn-bg form-control">Get Started</button>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>

import navbar from './../components/partials/Navbar'

export default {
    mounted() {
        this.$auth.state({
            forward: null,
            redirect: null,
            then: (user) =>{
                console.log("logged in")
            },
            catch: ()=> {}
        });
    },
    data() {
        return {
            message: "Welcome to Myfirebase",
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
