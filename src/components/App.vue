<template>
    <div class="container">
        <md-layout md-gutter>
            <md-layout md-flex-large="100" md-flex-xsmall="100" md-align="center">
                <md-whiteframe class="data-container">
                    <md-list>
                        <md-subheader>Data Example</md-subheader>
                        <md-list-item v-for="snapshot in data" :key="snapshot.data">
                            <span>
                                {{snapshot.data}}
                            </span>
                        </md-list-item>
                        <md-list-item>
                            <md-input-container>
                                <label>Write</label>
                                <md-input v-model="newData" v-on:keyup.enter.native="addData()" placeholder="Write something..."></md-input>
                            </md-input-container>
                            <md-button class="md-raised md-primary" @click.native="addData()">Add</md-button>
                        </md-list-item>
                    </md-list>
                </md-whiteframe>
            </md-layout>
        </md-layout>
    </div>
</template>

<script>
export default {
    mounted() {
        this.userEmail = this.$auth.user().email
        this.$store.state.messaging.getToken()
            .then((token) => {
                this.token = token
            })
    },
    firebase() {
        return {
            data: this.$store.state.database.child('data'),
        }
    },
    data() {
        return {
            message: "welcome",
            newData: '',
            error: '',
            token: ''
        }
    },
    methods: {
        addData() {
            this.$firebaseRefs.data.onDisconnect().cancel()
            this.$firebaseRefs.data.push({
                data: this.newData,
                email: this.$auth.user().email,
                name: this.$auth.user().displayName,
                token: this.token
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
.delete-data {
    cursor: pointer;
    color: red;
}

.data-container {
    width: 700px;
}
</style>