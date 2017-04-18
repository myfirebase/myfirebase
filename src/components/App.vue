<template>
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
                    <input type="text" class = "form-control" v-model = "newData" v-on:keyup.enter="addData()" placeholder="Write something...">
                    <div class="input-group-btn">
                        <button class="btn btn-primary" @click = "addData()">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    mounted() {
        this.$auth.state({
            forward: '/app',
            redirect: '/login',
            then: (user) => {
                this.userEmail = this.$auth.user().email
            },
            catch: () => {
                this.$destroy()
            }
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
            error: '',
        }
    },
    methods: {
        addData() {
            this.$firebaseRefs.data.onDisconnect().cancel()
            this.$firebaseRefs.data.push({
                data: this.newData,
            });
            this.newData = ''
        },
        logout() {
            this.$auth.logout();
            this.$destroy();
        },
    }
}
</script>

<style scoped>
    .delete-data{
        cursor: pointer;
        color: red;
    }
</style>