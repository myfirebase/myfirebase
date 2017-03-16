<template>
<nav class="navbar navbar-default">
	<div class="container-fluid">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">{{Logo}}</a>
		</div>
		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="">
			<ul class="nav navbar-nav">
				<li><a href="#">Home <span class="sr-only">(current)</span></a></li>
				<li><a href="#">App</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="">
					<a href="#" role="button" @click = "toggle = !toggle">{{userEmail}} <span class="caret"></span></a>
					<ul v-if="toggle" class="dropdown-menu">
						<li v-if = "!signed"><router-link to = "login">Login</router-link></li>
						<li v-if = "signed"><router-link to = 'update-profile'>Profile</router-link></li>
						<li role="separator" class="divider"></li>
						<li v-if = "signed"><a href="#">logout</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</nav>
</template>

<script>
export default {
	mounted(){
		this.$auth.state({
			forward: null,
			redirect: null,
			then: (user) => {
				this.signed = true
				this.userEmail = user.email
			},
			catch: () => {
				this.userEmail = "Auth" 
				}
		})
	},
	data(){
		return {
			Logo: "Myfirebase",
			toggle: false,
			signed: false,
			userEmail: ''
		}
	}
}
</script>