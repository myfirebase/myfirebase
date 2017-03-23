<template>
<div>
<navbar></navbar>
<div class="container">
    <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-primary">
            <div class="panel-heading">
                Data
            </div>
            <div class="panel-body">
                <ul class="list-group">
                    <li class="list-group-item" v-for="snapshot in data">
                        {{snapshot.data}}
                    </li>
                </ul>
            </div>
            <div class="panel-footer">
                <div class="input-group">
                    <input type="text" class = "form-control" v-model = "newData" v-on:keyup.enter="addData()">
                    <div class="input-group-btn">
                        <button class="btn btn-primary" @click = "addData()">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
import navbar from './../components/partials/Navbar.vue'

export default {
    mounted() {
        this.$auth.state({
            forward: '/app',
            redirect: '/login',
            then: (user) => {
                console.log("Logged in")
            },
            catch: () => {}
        })
    },
    firebase() {
        return {
            data: this.$store.state.database.child('data')

        }
    },
    data() {
        return {
            message: "welcome",
            newData: '',
        }
    },
    methods: {
        addData() {
            this.$firebaseRefs.data.onDisconnect().cancel((err) => {
                if (err) {
                    console.log("Connection lost")
                } else {
                    console.log("Passed")
                }
            })
            this.$firebaseRefs.data.push({
                data: this.newData
            });
            this.newData = ''
        },
        logout() {
            this.$auth.logout();
            this.$destroy();
        }
    },
    components: {
        navbar
    }
}
</script>