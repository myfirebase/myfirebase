<template>
    <div class="container">
        <div id="app">
            <br>
            <md-layout md-tag="form" novalidate md-align="center">
                <md-layout md-tag="md-card" md-column md-flex="30" md-flex-medium="40" md-flex-small="60" md-flex-xsmall="90" class="md-primary">
                    <md-card-header>
                        <div class="md-title">Login</div>
                    </md-card-header>
                    <md-card-content>
                        <md-input-container>
                            <md-icon>person</md-icon>
                            <label>Email</label>
                            <md-input email required v-model="email" />
                        </md-input-container>
                        <md-input-container md-has-password>
                            <md-icon>lock</md-icon>
                            <label>Passowrd</label>
                            <md-input type="password" required v-model="password" />
                        </md-input-container>
                    </md-card-content>
                    <md-card-actions>
                        <md-button @click="login()">Login</md-button>
                        <md-button @click="register()">Register</md-button>
                    </md-card-actions>
                </md-layout>
            </md-layout>
            <div class="push-down"></div>
            <md-layout md-align="center" md-guter>
                <md-theme md-name="default" md-layout md-flex-xsmall="100" md-flex-medium="100">
                    <md-button @click.native="signInGoogle()" class="md-raised">
                        <img class="icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"> google
                    </md-button>
                </md-theme>
                <md-theme md-name="login" md-layout md-flex-xsmall="100">
                    <md-button @click.native="signInFacebook()" class="md-raised md-primary">
                        <img class="icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"> facebook
                    </md-button>
                </md-theme>
                <md-theme md-name="login" md-layout md-flex-xsmall="100">
                    <md-button @click.native="signInTwitter()" class="md-raised md-accent">
                        <img class="icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg"> twitter
                    </md-button>
                </md-theme>
                <md-theme md-name="login" md-layout md-flex-xsmall="100">
                    <md-button @click.native="signInGithub()" class="md-raised md-warn">
                        <img class="icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg"> github
                    </md-button>
                </md-theme>
            </md-layout>
        </div>
        <div id="popup1" class="overlay" v-if="!ready">
            <div class="flex-spinner">
                <md-spinner :md-size="150" md-indeterminate></md-spinner>
            </div>
        </div>
        <md-snackbar :md-position="'top center'" ref="snackbar" :md-duration="4000">
            <span>{{error}}</span>
            <md-icon class="md-accent">warning</md-icon>
        </md-snackbar>
    </div>
</template>
<script>
export default {
    mounted() {
        this.$auth.logout()
        this.$auth.state({
            forward: '/app',
            redirect: '/login',
            then: (user) => {

            },
            catch: () => {
                this.ready = true;
            }
        });
    },
    data() {
        return {
            email: '',
            password: '',
            error: '',
            ready: false
        }
    },
    computed: {},
    methods: {
        login() {
            this.ready = false
            this.$auth.loginWithEmailAndPassowrd({
                email: this.email,
                password: this.password,
                result: (user) => {
                    this.ready = true;
                },
                error: (error) => {
                    this.$refs.snackbar.open()
                    this.ready = true;
                    this.error = error.message
                }
            })
            this.middleware()
        },
        register() {
            this.ready = false
            this.$auth.registerWithEmailAndPassword({
                email: this.email,
                password: this.password,
                result: (user) => {
                    this.ready = true;
                    //console.log("User Email : " + user.email)
                },
                error: (error) => {
                    this.error = error.message
                    this.ready = false;
                    this.$refs.snackbar.open()
                }
            });
        },
        middleware() {
            this.password = ''
        },
        signInGoogle() {
            this.ready = false
            this.$auth.signInWithGoogle({
                result: (result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    // console.log("Token : " + result.credential.accessToken)
                    // The signed-in user info.
                    //console.log("User Email : " + result.user.email)
                    this.ready = true
                },
                error: (error) => {
                    // Error
                    this.error = error.message
                    this.ready = false;
                    this.$refs.snackbar.open()
                }
            })
        },
        signInFacebook() {
            this.ready = false
            this.$auth.signInWithFacebook({
                result: (result) => {
                    //console.log("Token : " + result.credential.accessToken)
                    //console.log("User Email : " + result.user.email)
                    this.ready = true
                },
                error: (error) => {
                    this.error = error.message
                    this.ready = false;
                    this.$refs.snackbar.open()
                }
            })
        },
        signInTwitter() {
            this.ready = false
            this.$auth.signInWithTwitter({
                result: (result) => {
                    //console.log("Token : " + result.credential.accessToken)
                    //console.log("User Email : " + result.user.email)
                    //console.log(result.user)
                    this.ready = true
                },
                error: (error) => {
                    this.error = error.message
                    this.ready = false;
                    this.$refs.snackbar.open()
                }
            })
        },
        signInGithub() {
            this.ready = false
            this.$auth.signInWithGithub({
                result: (result) => {
                    //console.log("Token : " + result.credential.accessToken)
                    //console.log("User Email : " + result.user.email)
                    this.true = true
                },
                error: (error) => {
                    this.error = error.message
                    this.ready = false;
                    this.$refs.snackbar.open()
                }
            })
        }
    }
}
</script>


<style scoped>
.push-down {
    margin-top: 15px;
}

.icon {
    height: 18px;
    width: 18px;
    margin-right: 8px;
}
</style>
