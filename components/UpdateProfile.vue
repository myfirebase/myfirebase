<template>
	<div class="col-md-8 col-md-offset-2">
		<div class="push-down"></div>
		<div class="panel panel-primary">
			<div class="panel-heading">
				Update Profile {{userEmail}}
			</div>
			<div class="panel-body" align="center">
			<img :src="profilePicture" alt="Prifile Picture" class = "img-circle img-responsiv img-rounded img-thumbnail">
			<div class="push-down"></div>
				<input type="text" class = "form-control" placeholder="email" :value ="userEmail">
				<input v-model = "userName" type="text" class = "form-control" placeholder="userName" :value="userName">
			</div>
			<div class="panel-footer">
				<button class="btn btn-primary" @click = "updateProfile()">Submit</button>
				<button class="btn btn-danger">Getback to app</button>
			</div>
		</div>
	</div>
</template>


<script>
export default {
    mounted() {
        console.log("Component mounted")
        this.$auth.state({
            forward: '/update-profile',
            rederict: 'login',
            then: (user) => {
                this.userEmail = this.$auth.user().email
				 this.storage.getDownloadURL({
            		ref: this.$auth.user().photoURL,
            		result: (url) => {
            			this.profilePicture = url
            		},
            		error: (error) => {
            			this.error = error.message
            		}
            	})
            	console.log("name : " + this.$auth.user().displayName)            
            }
        })
    },
    data() {
        return {
            message: "hello",
            userEmail: '',
            profilePicture: '',
            userName: ''
        }
    },
    computed: {},
    methods: {
    	updateProfile(){
    		let that = this
    		console.log("before : " + this.userName)
    		this.$auth.user().updateProfile({
    			displayName: this.userName
    		}).then(()=> {
    			console.log("promis update" + this.$auth.user().displayName)
				console.log("after : " + this.userName)
    		}).catch(error => {
    			this.error = error.message
    		})
    	}
    }
}
</script>