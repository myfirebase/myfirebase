<style scoped>
  /* Styles */
</style>

<template>
<div>
  <v-card>
    <v-avatar></v-avatar>
    <v-card-media
      class="white--text"
      height="200px"
      :src="$auth.user().photoURL"
    >
    </v-card-media>
    <v-card-title>
      <div>
        <v-text-field v-model="Profile.email" label="Email"></v-text-field>
        <v-text-field v-model="Profile.displayName" label="Full name"></v-text-field>
        <v-text-field v-model="selectedPhoto.name" label="Avatar" prepend-icon='attach_file' @click="$refs.avatar.click()"></v-text-field>
        <input type="file" style="display: none" ref="avatar" accept="image/*" @change="getFile">
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange" @click="updateProfile()">Update</v-btn>
    </v-card-actions>
  </v-card>
  <v-snackbar
    :timeout="6000"
    :top="true"
    :bottom="false"
    :right="false"
    :left="false"
    :multi-line="false"
    :vertical="true"
    v-model="snackbar"
  >
    {{ message }}
    <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
  </v-snackbar>
  <div class="overlay" v-if="ready">
    <div class="flex-spinner">
      <v-progress-circular :size="200" :width="7" indeterminate color="amber"></v-progress-circular>
    </div> 
  </div>
</div>
</template>

<script>

import Profile from './../../models/Profile';

export default {
  mounted () {
    this.$auth.check().then(user => {
      this.Profile.setPhotoURL(user.photoURL)
        .setDisplayName(user.displayName)
        .setEmail(user.email);
      this.ready = false;
    });
  },
  data () {
    return {
      message: '',
      selectedPhoto: { name: '' },
      error: '',
      snackbar: false,
      ready: true,
      Profile: new Profile()
    };
  },
  computed: {},
  methods: {
    getFile (e) {
      this.selectedPhoto = e.target.files[0]
    },
    updateAvatar () {
      if (!this.selectedPhoto) {
        return
      }
      this.ready = true
      let name = this.selectedPhoto.name
      this.$storage.upload({
        ref: `/images/${name}`,
        file: this.selectedPhoto,
        progress: snapshot => { },
        error: err => {
          this.message = err.message
          this.snackbar = true
        },
        completed: downloadURL => {
          this.updateProfilePicture(downloadURL)
          .then(() => {
            this.message = 'Your profile info has been updated'
            this.snackbar = true
            this.selectedPhoto = { name: "" }
            this.ready = false
          }).catch(error => {
              this.message = error.message
              this.snackbar = true
          })
        }
      })
    },
    updateProfilePicture (fileName) {
      return this.$auth.updateProfilePicture(fileName)
    },
    updateProfile () {
      this.ready = true
      this.$auth
        .user()
        .updateProfile(this.Profile.toJson())
        .then(() => {
          if (this.selectedPhoto.type != undefined) {
            this.updateAvatar()
          } else {
            this.message = 'Your profile info has been updated'
            this.snackbar = true
            this.ready = false
          }
        })
        .catch(error => {
          this.message = error.message
          this.snackbar = true
          this.ready = false
        });
    },
    synchronize () {
      this.Profile.setPhotoURL(this.$auth.user().photoURL)
    }
  }
};
</script>
