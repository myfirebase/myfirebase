<template>
	<div>
		<!-- Always shows a header, even in smaller screens. -->
		<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			<header class="mdl-layout__header">
				<div class="mdl-layout__header-row">
					<!-- Title -->
					<span class="mdl-layout-title">MyFirebase - Theme</span>
					<!-- Add spacer, to align navigation to the right -->
					<div class="mdl-layout-spacer"></div>
					<!-- Navigation. We hide it in small screens. -->
					<nav class="mdl-navigation mdl-layout--large-screen-only">
						<a class="mdl-navigation__link" href="">About</a>
						<a class="mdl-navigation__link" href="https://myfirebase.github.com">Docs</a>
            <a class="mdl-navigation__link" @click="signout()">Signout</a>						
					</nav>
				</div>
			</header>
			<div class="mdl-layout__drawer">
				<span class="mdl-layout-title">Title</span>
				<nav class="mdl-navigation">
					<a class="mdl-navigation__link" href="">Link</a>
					<a class="mdl-navigation__link" href="">Link</a>
					<a class="mdl-navigation__link" href="">Link</a>
					<a class="mdl-navigation__link" href="">Link</a>
				</nav>
			</div>
			<main class="mdl-layout__content">
				<div class="page-content">
          <router-view></router-view>
        </div>
			</main>
		</div>
	</div>
</template>

<script>
export default {
  mounted() {
    this.$auth
      .check()
      .then(user => {
        this.signed = true;
        this.userName = user.displayName;
        this.userEmail = user.email;
        this.userPhoto = user.photoURL;
      })
      .catch(err => {
        this.username = "Auth";
      });
  },
  data() {
    return {
      logo: "Myfirebase",
      toggle: false,
      signed: false,
      userName: "",
      userEmail: "",
      userPhoto: ""
    };
  },
  computed: {
    collaps() {
      return this.collapsClass;
    }
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.signed = false
    },
    signout() {
      this.$auth.logout()
      this.signed = false;
    }
  }
}
</script>