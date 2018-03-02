export default class Profile {
    
    constructor() {
        this.email = ""
        this.displayName = ""
        this.photoURL = ""
    }

    setEmail(email) {
        this.email = email
        return this
    }

    setDisplayName(displayName) {
        this.displayName = displayName
        return this
    }

    setPhotoURL(photoURL) {
        this.photoURL = photoURL 
        return this
    }

    toJson() {
        return {
            email: this.email,
            displayName: this.displayName
        }
    }
}
