import { firebase } from '@/firebase/firebase'

// setup auth
const auth = firebase.auth();

// catch error
const error = '';

// Google Auth Provider
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

//Facebook Auth Provider
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

// Twitter Auth Provider
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

// Github Auth Provider
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export default {
    namespaced: true,
    state: {
        auth: auth,
        error: error,
        googleAuthProvider: googleAuthProvider,
        facebookAuthProvider: facebookAuthProvider,
        twitterAuthProvider: twitterAuthProvider,
        githubAuthProvider: githubAuthProvider
    },
    mutations: {},
    getters: {},
    actions: {
        login (context, user) {
            return context.state.auth.signInWithEmailAndPassword(user.email, user.password)
        },
        logout (context) {
            return context.state.auth.signOut();
        },
        register (context, user) {
            return context.state.auth.createUserWithEmailAndPassword(user.email, user.password)
        },
        signInGoogle (context) {
            let provider = context.state.googleAuthProvider;
            return context.state.auth.signInWithPopup(provider)
        },
        signInFacebook (context) {
            let provider = context.state.facebookAuthProvider;
            return context.state.auth.signInWithPopup(provider)
        },
        signInTwitter (context) {
            let provider = context.state.twitterAuthProvider;
            return context.state.auth.signInWithPopup(provider)
        },
        signInGithub (context) {
            let provider = context.state.githubAuthProvider;
            return context.state.auth.signInWithPopup(provider)
        },
        updateProfilePicture (context, image) {
            return context.state.auth.currentUser.updateProfile({
                photoURL: image
            })
        }
    }
}