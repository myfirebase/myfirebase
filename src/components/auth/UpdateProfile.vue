<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3 col-sm-12" align="center">
                <img :src="profilePicture" alt="Prifile Picture" class="img-circle img-responsive img-rounded img-thumbnail image">
                <div class="push-down">
                    <label class="btn btn-default">
                        <input type="file" class="hidden" @change="getFile">
                        Browse <i class="fa fa-file"></i>
                    </label>
                    <button v-if="newPhoto" class="btn btn-primary" :disabled="uploading" @click="updateAvatar()"><i v-if="uploading" class="fa fa-spinner fa-spin"></i> update</i></button>
                </div>
            </div>
            <div class="col-md-9 col-sm-12">
                <div class="push-down">
                    <div class="alert alert-danger" v-if="error">
                        <a href="#" class="close" @click="error = ''">&times;</a>
                        <p align="center">{{error}}</p>
                    </div>
                    <div class="alert alert-success" v-if="message">
                        <a href="#" class="close" @click="message = ''">&times;</a>
                        <p align="center">{{message}}</p>
                    </div>
                </div>
                <h3>Personal info</h3>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Email" :value="userEmail">
                </div>
                <div class="form-group">
                    <input v-model="userName" type="text" class="form-control" placeholder="Username">
                </div>
                <a class="btn btn-primary" @click="updateProfile()" :disabled="saving"><i v-if="saving" class="fa fa-spinner fa-spin"></i> Save Changes</a>
            </div>
        </div>
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
                },
                catch: () => {}
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
                    progress: (snapshot) => {},
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
        min-width: 150px
    }
</style>