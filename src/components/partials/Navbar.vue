<template>
	<div>
		<md-toolbar>
			<md-toolbar class="md-toolbar-container">
				<md-button v-if="signed" class="md-icon-button" @click="toggleLeftSidenav">
					<md-icon class="md-danger">menue</md-icon>
				</md-button>
				<h2 class="md-title">Myfirebase</h2>
			</md-toolbar>
		</md-toolbar>
		<md-sidenav v-if="signed" :md-swipe-distance="50" class="md-left md-fixed" ref="leftSidenav">
			<md-toolbar class="md-account-header">
				<md-list class="md-transparent">
					<md-list-item class="md-avatar-list">
						<md-avatar class="md-large">
							<img :src="userPhoto" alt="user-avatar">
						</md-avatar>
						<span style="flex: 1"></span>
					</md-list-item>

					<md-list-item>
						<div class="md-list-text-container">
							<span>{{userName}}</span>
							<span>{{userEmail}}</span>
						</div>
					</md-list-item>
				</md-list>
			</md-toolbar>
			<md-list>
				<md-list-item class="md-primary">
					<router-link @click.native="$refs.leftSidenav.toggle()" to="/app">
						<md-icon>dashboard</md-icon>
						<span>Realtime database</span>
					</router-link>
				</md-list-item>
				<md-list-item class="md-primary">
					<router-link @click.native="$refs.leftSidenav.toggle()" to="/firestore">
						<md-icon>dashboard</md-icon>
						<span>Cloud firestore</span>
					</router-link>
				</md-list-item>
				<md-list-item class="md-primary">
					<router-link @click.native="$refs.leftSidenav.toggle()" to="/update-profile">
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
		this.$auth.check({
			then: (user) => {
				this.signed = true
				this.userName = user.displayName
				this.userEmail = user.email
				this.userPhoto = user.photoURL
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
			userName: '',
			userEmail: '',
			userPhoto: '',
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
		signout() {
			this.$auth.logout()
			this.signed = false;
			this.$refs.leftSidenav.toggle()
		}
	}
}
</script>