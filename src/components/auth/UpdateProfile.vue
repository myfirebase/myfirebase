<template>
<div>
<div class="container">
    <div class="col-md-4 col-md-offset-4">
        <div class="push-down">
            <div class="alert alert-danger" v-if="error">
                <a href="#" class="close"  @click="error = ''">&times;</a>
                <p align="center">{{error}}</p>
            </div>
            <div class="alert alert-success" v-if="message">
                <a href="#" class="close" @click="message = ''">&times;</a>
                <p align="center">{{message}}</p>
            </div>
        </div>
        <div class="panel panel-primary">
            <div class="panel-heading">
                Update Profile {{userEmail}}
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-4 col-sm-12" align="center">
                        <img :src="profilePicture" alt="Prifile Picture" class = "img-circle img-responsive img-rounded img-thumbnail image">
                        <br>
                        <label class = "btn btn-default btn-xs">
                            <input type="file" class="hidden" @change="getFile">
                            <i class="fa fa-file"></i>
                        </label>
                        <button v-if="newPhoto" class="btn btn-xs btn-primary" @click="updateAvatar()"><i class="fa fa-save"> update</i></button>
                    </div>
                    <div class="col-md-8 col-sm-12">
                        <input type="text" class = "form-control" placeholder="email" :value ="userEmail">
                        <input v-model = "userName" type="text" class = "form-control push-down" placeholder="userName" :value="userName">
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <button class="btn btn-primary" @click = "updateProfile()">Submit</button>
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
            error: ''
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
            let name = this.newPhoto.name
            this.$storage.upload({
                ref: `/images/${name}`,
                file: this.newPhoto,
                progress: (snapshot) => {
                },
                error: (err) => {
                    this.error = err.message
                },
                completed: (downloadURL) => {
                    console.log(downloadURL)
                    this.updateProfilePicture(downloadURL)
                    this.newPhoto = null
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
            this.$auth.user().updateProfile({
                displayName: this.userName,
                email: this.userEmail
            }).then(() => {
                this.message = "Updated"
            }).catch(error => {
                this.error = error.message
            })
        },
        synchronize() {
            /*this.$storage.getDownloadURL({
                ref: this.$auth.user().photoURL,
                result: (url) => {
                    this.profilePicture = url
                },
                error: (error) => {
                    this.error = error.message
                }
            })*/
            this.profilePicture = this.$auth.user().photoURL
        }
    }
}
</script>


<style>
    .image{
        max-height: 90px;
    }
</style>