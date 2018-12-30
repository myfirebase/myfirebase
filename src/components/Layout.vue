<style>
 /* Styles */
</style>

<template>
    <v-app>
      <v-navigation-drawer app v-model="drawer" :permanent="drawer" hide-overlay width="200" v-if="$auth.user()">
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="$auth.user().photoURL">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ $auth.user().displayName || $auth.user().email }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list>
          <v-list-tile @click="$router.push('/realtime-database')">
            <v-list-tile-content>
              <v-list-tile-title>Realtime database</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="$router.push('/firestore')">
            <v-list-tile-content>
              <v-list-tile-title>Cloud firestore</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="$router.push('/update-profile')">
            <v-list-tile-content>
              <v-list-tile-title>Update profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout()">
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app >
        <v-toolbar-side-icon @click.native="drawer = !drawer" v-if="$auth.user()"></v-toolbar-side-icon>
        <v-toolbar-title>Myfirebase</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat @click="RoutesUtils.docs()">Docs</v-btn>
          <v-btn flat @click="RoutesUtils.github()">Github</v-btn>
          <v-btn flat v-if="$auth.user()" @click="logout()">SignOut</v-btn>
          <v-btn flat v-else @click="login()">Login</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app>
        <span>&copy; 2018</span>
        <v-spacer></v-spacer>
      </v-footer>
    </v-app>
</template>
<script>
import RoutesUtils from '@/router/utils'

export default {
  mounted () {
    this.$auth
      .check()
      .then(user => {})
      .catch(err => {})
  },
  data () {
    return {
      items: [
        { title: 'Real time Database', link: 'dashboard' },
        { title: 'Cloud Firestore', link: 'account_box' },
      ],
      drawer: true,
      RoutesUtils: RoutesUtils.navigation
    }
  },
  methods: {
    logout () {
      this.$auth.logout().then(() => {
        this.$router.push('/login')
      })
    },
    login () {
      this.$router.push('/login')
    }
  },
}
</script>
