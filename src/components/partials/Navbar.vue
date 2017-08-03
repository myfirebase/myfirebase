<template>
	<div>
		<md-toolbar>
			<md-toolbar class="md-toolbar-container">
				<md-button v-if="signed"  class="md-icon-button" @click="toggleLeftSidenav">
					<md-icon class="md-danger">menue</md-icon>
				</md-button>
				<h2 class="md-title">Myfirebase</h2>
			</md-toolbar>
		</md-toolbar>
		<md-sidenav v-if="signed" :md-swipe-distance="50" class="md-left md-fixed" ref="leftSidenav">
			<md-toolbar class="md-medium">
				<div class="md-toolbar-container">
					<h3 class="md-title">Menue</h3>
				</div>
			</md-toolbar>
			<md-list>
				<md-list-item class="md-primary">
					<router-link @click.native="$refs.leftSidenav.toggle()" to="/app">
						<md-icon>dashboard</md-icon>
						<span>App</span>
					</router-link>
				</md-list-item>
	
				<md-list-item class="md-primary">
					<router-link @click.native="$refs.leftSidenav.toggle()" to="/create-posts">
						<md-icon>person</md-icon>
						<span>Update Profile</span>
					</router-link>
				</md-list-item>
				<md-list-item class="md-primary">
					<router-link to="" @click.native="signout()">
						<md-icon>exit_to_app</md-icon>
						<span>Signout</span>
					</router-link>
				</md-list-item>
			</md-list>
		</md-sidenav>
	</div>
</template>

<script>
export default {
	mounted() {
		this.$auth.state({
			forward: '',
			redirect: '/login',
			then: (user) => {
				this.signed = true
				this.username = user.email
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
		},
		toggleLeftSidenav() {
			this.$refs.leftSidenav.toggle();
		},
		closeRightSidenav() {
			this.$refs.rightSidenav.close();
		},
		signout(){
			this.$auth.logout()
			this.signed = false;
			this.$refs.leftSidenav.toggle()
		}
	}
}
</script>