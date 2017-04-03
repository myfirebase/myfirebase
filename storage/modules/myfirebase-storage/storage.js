import {
    firebase
} from './../../../app/firebase/firebase'

// firebase storage
const storage = firebase.storage();

// Error
const error = ''

export default {
    namespaced: true,
    state: {
        storage: storage,
        error: error
    },
    mutations: {
        uploadFile(state, file) {
            let task = state.storage.ref().child(file.ref).put(file.file)
            task.on('state_changed',
                function progress(snapshot) {
                    file.progress(snapshot)
                },
                function error(err) {
                    file.error(err)
                },
                function completed() {
                    file.completed(task.snapshot.downloadURL)
                });
        },
        deleteFile(state, file) {
            let promis = state.storage.ref().child(file.ref).delete()
            promis.then(() => {
                file.result()
            }).catch(error => {
                file.error(error)
            })
        }
    },
    actions: {},
    getters: {}
}