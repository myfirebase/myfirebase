<template>
    <div class="container">
        <md-layout md-gutter>
            <md-layout>
                <md-layout md-align="center" md-flex-xsmall="100" md-flex-large="100" md-flex-small="100">
                    <md-card class="">
                        <md-card-header>
                            <md-card-header-text>
                                <div class="md-title">Update Profile</div>
                                <div class="md-subhead">{{userEmail}}</div>
                            </md-card-header-text>
                            <md-card-media>
                                <img :src="profilePicture" alt="Profile">
                            </md-card-media>
                        </md-card-header>
                        <md-card-content>
                            <md-input-container>
                                <label>Email</label>
                                <md-input v-model="userEmail"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Username</label>
                                <md-input v-model="userName"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Update Avatar</label>
                                <md-file @change.native="getFile" accept="image/*"></md-file>
                            </md-input-container>
                        </md-card-content>
                        <md-card-actions>
                            <md-button @click="updateProfile()">Save Changes</md-button>
                            <md-button v-if="newPhoto" @click.native="updateAvatar()">Update Avatar</md-button>
                        </md-card-actions>
                    </md-card>
                </md-layout>
            </md-layout>
        </md-layout>
        <div id="popup1" class="overlay" v-if="ready">
            <div class="flex-spinner">
                <md-spinner :md-size="150" md-indeterminate></md-spinner>
            </div>
        </div>
        <md-snackbar :md-position="'top center'" ref="snackbar" :md-duration="4000">
            <span>{{message}}</span>
            <md-icon class="md-accent">warning</md-icon>
        </md-snackbar>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$auth.check({
            then: (user) => {
                this.userEmail = user.email
                this.userName = user.displayName
                this.profilePicture = user.photoURL
                this.ready = false
            },
            ctach: (error) => {
                console.log(error.message)
            }
        })
    },
    data() {
        return {
            message: "",
            userEmail: '',
            profilePicture: '',
            userName: '',
            newPhoto: null,
            error: '',
            ready: true,
        }
    },
    computed: {},
    methods: {
        getFile(e) {
            this.newPhoto = e.target.files[0]
        },
        updateAvatar() {
            if (!this.newPhoto) {
                return
            }
            this.ready = true
            let name = this.newPhoto.name
            this.$storage.upload({
                ref: `/images/${name}`,
                file: this.newPhoto,
                progress: (snapshot) => { },
                error: (err) => {
                    this.message = err.message
                    this.$refs.snackbar.open()
                },
                completed: (downloadURL) => {
                    this.updateProfilePicture(downloadURL)
                    this.message = "Your avatar has been updated"
                    this.$refs.snackbar.open()
                    this.newPhoto = null
                    this.ready = false
                }
            })
        },
        updateProfilePicture(fileName) {
            this.$auth.updateProfilePicture({
                ref: `${fileName}`,
                result: () => {
                    this.synchronize()
                },
                error: (error) => {
                    this.message = error.message
                    this.$refs.snackbar.open()
                }
            })
        },
        updateProfile() {
            this.ready = true
            this.$auth.user().updateProfile({
                displayName: this.userName,
                email: this.userEmail
            }).then(() => {
                this.$store.state.database.child("data").once("value").then(snapshot => {
                    snapshot.forEach(childSnapshot => {
                        if (childSnapshot.child("email").val() == this.$auth.user().email) {
                            this.$store.state.database.child("data").child(childSnapshot.key).update({
                                name: this.userName
                            })
                        }
                    })
                })
                this.message = "Updated"
                this.$refs.snackbar.open()
                this.ready = false
            }).catch(error => {
                this.message = error.message
                this.$refs.snackbar.open()
                this.ready = false
            })
        },
        synchronize() {
            this.profilePicture = this.$auth.user().photoURL
        }
    }
}
</script>


<style scoped>
.image {
    max-width: 200px;
    min-width: 150px;
}
.profile-card {
    margin-top: 20px;
    width: 50%;
}
.hidden {
    opacity: 0;
    width: 0;
}
</style>