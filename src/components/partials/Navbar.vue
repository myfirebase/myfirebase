<template>
<nav class="navbar navbar-default">
	<div class="container-fluid">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" @click='collapsAction'>
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">{{Logo}}</a>
		</div>
		<!-- Collect the nav links, forms, and other content for toggling -->
		<div :class="collaps">
			<ul class="nav navbar-nav">
				<li><router-link to="/">Home</router-link></li>
				<li><router-link to="/app">App</router-link></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="">
					<a href="#" role="button" @click = "toggle = !toggle">{{username}} <span class="caret"></span></a>
					<ul v-if="toggle" class="dropdown-menu">
						<li v-if = "!signed"><router-link to = "login">Login</router-link></li>
						<li v-if = "signed"><router-link to = 'update-profile'>Profile</router-link></li>
						<li role="separator" class="divider"></li>
						<li v-if = "signed"><a href="/login" @click="logout()">Logout</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</nav>
</template>

<script>
export default {
    mounted() {
    	this.$auth.state({
            forward: '/update-profile',
            redirect: '/login',
    		then: (user) => {
    			this.signed = true
    			this.username = user.displayName
    		},
    		catch: () => {
    			this.username = "Auth"
    		}
    	})
    },
    data() {
        return {
            Logo: "Myfirebase",
            toggle: false,
            signed: false,
            username: '',
            collapsClass: 'collapse navbar-collapse'
        }
    },
    computed:{
    	collaps()
    	{
    		return this.collapsClass
    	}
    },
    methods:{
    	logout(){
    		this.$auth.logout()
    		this.signed = false
    	},
    	collapsAction(){
    		this.collapsClass = this.collapsClass ? '' : 'collapse navbar-collapse'
    	}
    }
}
</script>