<style scoped>
.push-down {
  margin-top: 15px;
}

.icon {
  height: 18px;
  width: 18px;
  margin-right: 8px;
}
.mdl-layout {
  align-items: center;
  justify-content: center;
}
.mdl-layout__content {
  padding: 24px;
  flex: none;
}

.facebook {
  background: #3b5998 !important;
  color: white !important;
  width: 100%;
}

.github {
  background: black !important;
  color: #fff !important;
  width: 100%;
}

.twitter {
  background: #1da1f2 !important;
  color: #fff !important;
  width: 100%;
}

.google {
  background: #727272 !important;
  color: #fff !important;
  width: 100%;
}
</style>

<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="mx-auto">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Sign In</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field v-model="password" :append-icon="e3 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e3 = !e3)" :type="e3 ? 'password' : 'text'" name="input-10-2" label="Enter your password" hint="At least 8 characters" min="8" value="" required></v-text-field>
                <v-btn @click="login">
                  Login
                </v-btn>
                <v-btn @click="register">
                  Sign Up
                </v-btn>
              </v-form>

              <v-btn class="google" block @click="signInGoogle">
                <img class="icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg">
                Login with Google
              </v-btn>
              <v-btn class="facebook" block @click="signInFacebook">
                <img class="icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg">
                Login with Facebook
              </v-btn>
              <v-btn class="twitter" block @click="signInTwitter">
                <img class="icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg">
                Login with Twitter
              </v-btn>
              <v-btn class="github" block @click="signInGithub">
                <img class="icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg">
                Login with GitHub
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-snackbar :timeout="6000" :top="true" :bottom="false" :right="false" :left="false" :multi-line="false" :vertical="true" v-model="snackbar"
      >
        {{ error }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
      <div class="overlay" v-if="ready">
        <div class="flex-spinner">
          <v-progress-circular :size="200" :width="7" indeterminate color="amber"></v-progress-circular>
        </div> 
      </div>
    </v-container>
</template>
<script>
export default {
  mounted () {
    this.$auth.logout();
    this.$auth.state("/realtime-database", "/login").then(user => {
      if (!user) {
        this.ready = false;
      }
    });
  },
  data () {
    return {
      snackbar: false,
      email: "",
      password: "",
      error: "",
      ready: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      e3: true
    };
  },
  computed: {},
  methods: {
    login () {
      this.ready = true;
      this.$auth.logout();
      this.$auth
        .loginWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.ready = false;
        })
        .catch(error => {
          this.snackbar = true;
          this.ready = false;
          this.error = error.message;
        });
    },
    register () {
      this.ready = true;
      this.$auth
        .registerWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.ready = false;
        })
        .catch(error => {
          this.error = error.message;
          this.ready = false;
          this.snackbar = true;
        });
    },
    signInGoogle () {
      this.ready = true;
      this.$auth
        .signInWithGoogle()
        .then(result => {
          // This gives you the Google's Access Token. You can use it to access the Google API.
          // console.log("Token : " + result.credential.accessToken)
          // The signed-in user info.
          // console.log("User Email : " + result.user.email)
          this.ready = false;
        })
        .catch(error => {
          this.error = error.message;
          this.ready = false;
          this.snackbar = true;
        });
    },
    signInFacebook () {
      this.ready = true;
      this.$auth
        .signInWithFacebook()
        .then(result => {
          this.ready = false;
        })
        .catch(error => {
          this.error = error.message;
          this.ready = false;
          this.snackbar = true;
        });
    },
    signInTwitter () {
      this.ready = true;
      this.$auth
        .signInWithTwitter()
        .then(result => (this.ready = false))
        .catch(error => {
          this.error = error.message;
          this.ready = false;
          this.snackbar = true;
        });
    },
    signInGithub () {
      this.ready = true;
      this.$auth
        .signInWithGithub()
        .then(result => (this.ready = false))
        .catch(error => {
          this.error = error.message;
          this.ready = false;
          this.snackbar = true;
        });
    },
    clear () {
      this.$refs.form.reset();
    }
  }
};
</script>
