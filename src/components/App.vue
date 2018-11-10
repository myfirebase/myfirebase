<style scoped>
  /* Styles */
</style>

<template>
  <div>
    <v-card>
      <v-list two-line subheader>
        <v-subheader>Items</v-subheader>
        <v-list-tile v-for="(item, index) in data" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon color="black" @click="deleteItem(item['.key'])">delete</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-container>
      <v-text-field label="Item Name" v-model="Item.name" @keyup.enter="addItem()"></v-text-field>
      <v-btn @click="addItem()">Add Item</v-btn>
      </v-container>
    </v-card>
    <div class="overlay" v-if="!ready">
      <div class="flex-spinner">
        <v-progress-circular :size="200" :width="7" indeterminate color="amber"></v-progress-circular>
      </div> 
    </div>
  </div>
</template>

<script>

import Item from "@/models/Item";

export default {
  mounted () {
    this.$auth.check()
    .then(user => { })
    .catch(err => {
      console.log(err)
    })

    // retrieve messaging token.
    // only for production, you have to register the service-worker.

    // this.$store.state.messaging.getToken()
    //     .then((token) => {
    //         this.token = token
    //     })
  },
  firebase () {
    return {
      data: {
        source: this.$myDatabase.child("item"),
        readyCallback: () => {
          this.ready = true
        }
      }
    };
  },
  data () {
    return {
      token: "",
      Item: new Item(this.$myDatabase.child('item')).init(),
      ready: false
    }
  },
  methods: {
    addItem () {
      this.$firebaseRefs.data.onDisconnect().cancel()
      this.Item.push()
      this.Item.name = ""
    },
    deleteItem (key) {
      this.Item.remove(key);
    }
  }
};
</script>
