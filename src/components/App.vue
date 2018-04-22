<template>
    <div class="container">
        <md-layout md-gutter>
            <div class="push-down"></div>
            <md-layout md-flex-large="100" md-flex-xsmall="100" md-align="center">
                <span class="md-display-2">Realtime Database Example</span>
            </md-layout>
                <md-layout md-flex-large="100" md-flex-xsmall="100" md-align="center">
                <md-whiteframe class="data-container">
                    <md-list>
                        <md-subheader>Data Example</md-subheader>
                        <md-list-item v-for="item in data" :key="item['.key']">
                            <span>
                                {{item.name}}
                            </span>
                            <md-button @click.native="deleteItem(item['.key'])" class="md-icon-button md-list-action">
                                <md-icon class="md-accent">delete</md-icon>
                            </md-button>
                        </md-list-item>
                        <md-list-item>
                            <md-input-container>
                                <label>Add Item</label>
                                <md-input v-model="Item.name" v-on:keyup.enter.native="addItem()" placeholder="Add Item..."></md-input>
                            </md-input-container>
                            <md-button class="md-icon-button md-list-action" @click.native="addItem()">
                                <md-icon class="md-primary">send</md-icon>
                            </md-button>
                        </md-list-item>
                    </md-list>
                </md-whiteframe>
            </md-layout>
        </md-layout>
    </div>
</template>

<script>

import Item from "./../models/Item";

export default {
  mounted() {
    this.$auth.check({
      then(user) {
      },
      catch(error) {}
    });

    // retrieve messaging token.
    // only for production, you have to register the serviceworker.
    /*
        this.$store.state.messaging.getToken()
            .then((token) => {
                this.token = token
            })
        */
  },
  firebase() {
    return {
      data: this.$store.state.database.child("data")
    };
  },
  data() {
    return {
      token: "",
      Item: new Item(this.$store.state.database.child('data')).init()
    }
  },
  methods: {
    addItem() {
      this.$firebaseRefs.data.onDisconnect().cancel();
      this.Item.push();
      this.Item.name = ""
    },
    deleteItem(key) {
      this.Item.remove(key);
    }
  }
};
</script>

<style scoped>
.delete-data {
  cursor: pointer;
  color: red;
}

.data-container {
  width: 700px;
}
</style>