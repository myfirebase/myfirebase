<style scoped>
  /* Styles */
</style>

<template>
  <div>
    <v-card>
      <v-list two-line subheader>
        <v-subheader>Persons</v-subheader>
        <v-list-tile v-for="(person, index) in Persons" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{person.name}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon color="black" @click="remove(person['.key'])">delete</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-container>
      <v-text-field label="Person Name" v-model="Person.name" @keyup.enter="add()"></v-text-field>
      <v-btn @click="add()">Add Person</v-btn>
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

import Person from "@/models/Person"

export default {
    created () {
        this.$binding('Persons', this.$myFirestore.collection('Persons')).then(data => {
            this.ready = true
        })
    },
    data () {
        return {
            Person: new Person(this.$myFirestore.collection('Persons')).init(),
            ready: false
        }
    },
    methods: {
        add () {
            this.Person.add().then((success) => {
            }).catch(error => {
                console.log(error.message)
            })
            this.Person.name = ""
        },
        remove (key) {
            this.Person.delete(key).then(() => {
            }).catch(error => {
                console.log(error.message)
            })
        }
    }
}
</script>
