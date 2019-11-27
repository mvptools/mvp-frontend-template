<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>{{ appName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            v-for="link in links"
            :key="link.id"
            @click="link.method"
            text>
              <v-icon>{{ link.icon }}</v-icon>
              {{ link.name }}
          </v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    appName: process.env.VUE_APP_NAME
  }),
  computed: {
    isAuthenticatedUser () {
      return this.$store.getters.isAuthenticatedUser
    },
    links () {
      if (this.isAuthenticatedUser) {
        return [
          {
            id: 1,
            name: 'Logout',
            icon: 'mdi-exit-to-app',
            method: () => {
              this.$store.dispatch('logout')
            }
          }
        ]
      }

      return [
        {
          id: 1,
          name: 'Login',
          icon: 'mdi-account',
          method: () => {
            location.href = '/#/login'
          }
        },
        {
          id: 2,
          name: 'Sign Up',
          icon: 'mdi-account-plus',
          method: () => {
            location.href = '/#/signup'
          }
        }
      ]
    }
  }
}
</script>
