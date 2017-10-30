<template>
    <div class="container">
        <md-layout md-gutter>
            <div class="push-down"></div>
            <md-layout md-flex-large="100" md-flex-xsmall="100" md-align="center">
                <span class="md-display-2">Realtime Database Example</span>
            </md-layout>
            <md-layout md-flex-large="100" md-flex-xsmall="100" md-align="center">
                <md-whiteframe class="data-container">
                    <md-list>
                        <md-subheader>Data Example</md-subheader>
                        <md-list-item v-for="snapshot in data" :key="snapshot.data">
                            <span>
                                {{snapshot.data}}
                            </span>
                            <md-button @click.native="deleteData(snapshot['.key'])" class="md-icon-button md-list-action">
                                <md-icon class="md-accent">delete</md-icon>
                            </md-button>
                        </md-list-item>
                        <md-list-item>
                            <md-input-container>
                                <label>Write</label>
                                <md-input v-model="newData" v-on:keyup.enter.native="addData()" placeholder="Write something..."></md-input>
                            </md-input-container>
                            <md-button class="md-icon-button md-list-action" @click.native="addData()">
                                <md-icon class="md-primary">send</md-icon>
                            </md-button>
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
        this.$auth.check({
            then(user) {
                this.userEmail = user.email
            },
            catch(error) {

            }
        })
        // retrieve messaging token.
        // only for production, you have to register messaging serviceworker.
        /*
        this.$store.state.messaging.getToken()
            .then((token) => {
                this.token = token
            })
        */
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
            token: '',
            userEmail: ''
        }
    },
    methods: {
        addData() {
            this.$firebaseRefs.data.onDisconnect().cancel()
            this.$firebaseRefs.data.push({
                data: this.newData,
                name: this.userEmail,
                token: this.token
            });
            this.newData = ''
        },
        deleteData(key) {
            this.$firebaseRefs.data.child(key).remove()
        }
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