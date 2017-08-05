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
                                <md-file @change.native="getFile"></md-file>
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
    </div>
</template>

<script>
export default {
    mounted() {
        this.$auth.state({
            forward: '/update-profile',
            rederict: '/login',
            then: (user) => {
                this.userEmail = this.$auth.user().email
                this.userName = user.displayName
                this.profilePicture = this.$auth.user().photoURL
                console.log(this.profilePicture)
            },
            catch: () => { }
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
            saving: false,
            uploading: false,
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
            this.uploading = true
            let name = this.newPhoto.name
            this.$storage.upload({
                ref: `/images/${name}`,
                file: this.newPhoto,
                progress: (snapshot) => { },
                error: (err) => {
                    this.error = err.message
                },
                completed: (downloadURL) => {
                    console.log(downloadURL)
                    this.updateProfilePicture(downloadURL)
                    this.newPhoto = null
                    this.uploading = false
                }
            })
        },
        updateProfilePicture(fileName) {
            this.$auth.updateProfilePicture({
                ref: `${fileName}`,
                result: () => {
                    this.message = "Updated!!"
                    this.synchronize()
                },
                error: (error) => {
                    this.error = error.message
                    console.log(this.error)
                }
            })
        },
        updateProfile() {
            this.saving = true
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
                this.saving = false
            }).catch(error => {
                this.error = error.message
                this.saving = false
            })
        },
        synchronize() {
            this.profilePicture = this.$auth.user().photoURL
        }
    }
}
</script>


<style>
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