<template>
    <div class="container" md-theme="login">
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
            <md-layout md-gutter md-column>
                <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100" md-align="center">
                    <md-button @click.native="signInGoogle()" class="md-raised md-accent">
                        google
                    </md-button>
                </md-layout>
                <md-theme md-name="login">
                    <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100" md-align="center">
                        <md-button @click.native="signInFacebook()" class="md-raised md-primary">
                            facebook
                        </md-button>
                    </md-layout>
                    <md-layout md-theme="login" md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100" md-align="center">
                        <md-button @click.native="signInTwitter()" class="md-raised md-accent">
                            twitter
                        </md-button>
                    </md-layout>
                    <md-layout md-theme="login" md-flex-xsmall="100" md-flex-small="100" md-flex-medium="100" md-align="center">
                        <md-button @click.native="signInGithub()" class="md-raised md-warn">
                            github
                        </md-button>
                    </md-layout>
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
            loginState: false,
            error: '',
            ready: false
        }
    },
    computed: {},
    methods: {
        login() {
            this.ready = false
            this.loginState = true
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
            this.loginState = true;
            this.$auth.registerWithEmailAndPassword({
                email: this.email,
                password: this.password,
                result: (user) => {
                    //console.log("User Email : " + user.email)
                },
                error: (error) => {
                    this.error = error.message
                }
            });
        },
        middleware() {
            this.password = ''
            this.loginState = false
        },
        signInGoogle() {
            this.$auth.signInWithGoogle({
                result: (result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    // console.log("Token : " + result.credential.accessToken)
                    // The signed-in user info.
                    //console.log("User Email : " + result.user.email)
                },
                error: (error) => {
                    // Error
                    this.error = error.message
                }
            })
        },
        signInFacebook() {
            this.$auth.signInWithFacebook({
                result: (result) => {
                    //console.log("Token : " + result.credential.accessToken)
                    //console.log("User Email : " + result.user.email)
                },
                error: (error) => {
                    this.error = error.message
                }
            })
        },
        signInTwitter() {
            this.$auth.signInWithTwitter({
                result: (result) => {
                    //console.log("Token : " + result.credential.accessToken)
                    //console.log("User Email : " + result.user.email)
                    //console.log(result.user)
                },
                error: (error) => {
                    this.error = error.message
                }
            })
        },
        signInGithub() {
            this.$auth.signInWithGithub({
                result: (result) => {
                    //console.log("Token : " + result.credential.accessToken)
                    //console.log("User Email : " + result.user.email)
                },
                error: (error) => {
                    this.error = error.message
                }
            })
        }
    }
}
</script>


<style scoped>
.facebook {
    background: #3b5998;
    color: #fff;
}

.facebook:hover {
    background: #3b5998;
    color: #fff;
}
</style>