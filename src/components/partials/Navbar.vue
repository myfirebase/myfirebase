<template>
	<nav class="navbar navbar-default">
		<div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<router-link to="/" class="navbar-brand">{{logo}}</router-link>
			</div>
			<!-- Collect the nav links, forms, and other content for toggling -->
			<ul class="nav navbar-nav">
				<li>
					<router-link to="/">Home</router-link>
				</li>
				<li>
					<router-link to="/app">App</router-link>
				</li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li v-if="!signed">
					<router-link to="login">Login</router-link>
				</li>
				<li v-if="signed">
					<router-link to='update-profile'>Profile</router-link>
				</li>
				<li role="separator" class="divider"></li>
				<li v-if="signed"><a href="/login" @click="logout()">Logout</a></li>
			</ul>
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
				logo: "Myfirebase",
				toggle: false,
				signed: false,
				username: '',
				collapsClass: 'collapse navbar-collapse'
			}
		},
		computed: {
			collaps() {
				return this.collapsClass
			}
		},
		methods: {
			logout() {
				this.$auth.logout()
				this.signed = false
			},
			collapsAction() {
				this.collapsClass = this.collapsClass ? '' : 'collapse navbar-collapse'
			}
		}
	}
</script>