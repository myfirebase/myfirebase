<template>
    <div class="container">
        <div class="push-down"></div>
        <md-layout md-gutter>
            <md-layout md-flex-large="100" md-flex-xsmall="100" md-align="center">
                <span class="md-display-2">Cloud Firestore Example</span>
            </md-layout>
            <md-layout md-flex-large="100" md-flex-xsmall="100" md-align="center">
                <md-whiteframe class="data-container">
                    <md-list>
                        <md-subheader>Data Example</md-subheader>
                        <md-list-item v-for="snapshot in Persons" :key="snapshot['.key']">
                            <span>
                                {{snapshot.name}}
                            </span>
                            <md-button @click.native="remove(snapshot)" class="md-icon-button md-list-action">
                                <md-icon class="md-accent">delete</md-icon>
                            </md-button>
                        </md-list-item>
                        <md-list-item>
                            <md-input-container>
                                <label>Add Person</label>
                                <md-input v-model="Person.name" v-on:keyup.enter.native="add()" placeholder="Add Person"></md-input>
                            </md-input-container>
                            <md-button class="md-icon-button md-list-action" @click.native="add()">
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

import Person from "./../models/Person"

export default {
    mounted() {
        this.$auth.check({
            then: (user) => {
                // retrieve the logged-in user
            },
            catch: () => {
                // user is not logged in
            }
        })
    },
    firestore() {
        return {
            Persons: this.$store.state.firestore.collection("Persons")
        }
    },
    data() {
        return {
            username: "",
            Person: new Person(this.$store.state.firestore.collection('Persons')).init()
        }
    },
    methods: {
        add() {
            this.Person.add().then((success) => {
                this.Person.name = ""
            }).catch(error => {
                console.log(error.message)
            })
        },
        remove(e) {
            this.Person.delete(e['.key']).then(() => {
                console.log("Done")
            }).catch(error => {
                console.log(error.message)
            })
        }
    }
}
</script>

<style scoped>
.container {
    margin: 0 auto;
}

.data-container {
    width: 700px;
}
</style>