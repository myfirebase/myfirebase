export default class Profile {
    
    /** 
     * Create new Profile Instance. 
     */
    constructor () {
        this.email = ""
        this.displayName = ""
        this.photoURL = ""
    }

    /**
     * Set Email.
     * 
     * @param {string} email
     * 
     * @return Profile 
     */
    setEmail (email) {
        this.email = email
        return this
    }

    /**
     * Set displayName.
     * 
     * @param {string} displayName
     * 
     * @return Profile
     */
    setDisplayName (displayName) {
        this.displayName = displayName
        return this
    }

    /**
     * Set photoURL.
     * 
     * @param {string} photoURL
     * 
     * @return Profile 
     */
    setPhotoURL (photoURL) {
        this.photoURL = photoURL 
        return this
    }

    /** 
     * Export to Json. 
     */
    toJson () {
        return {
            email: this.email,
            displayName: this.displayName,
        }
    }
}
