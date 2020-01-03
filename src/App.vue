<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>
        <v-app-bar-nav-icon @click="toggleDrawer">
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          {{ appName }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            v-for="link in links"
            :key="link.id"
            @click="link.method"
            text>
              <v-icon>
                {{ link.icon }}
              </v-icon>
              {{ link.name }}
          </v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped>
        <v-list-item
          v-for="link in links"
          :key="link.id"
          @click="link.method">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="title">
                  {{ link.name }}
              </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    appName: process.env.VUE_APP_NAME,
    drawer: false
  }),
  computed: {
    isAuthenticatedUser () {
      return this.$store.getters.isAuthenticatedUser
    },
    isVerifiedUser () {
      return this.$store.getters.isVerifiedUser
    },
    links () {
      if (this.isAuthenticatedUser) {
        return [
          {
            id: 1,
            name: 'Dashboard',
            icon: 'mdi-view-dashboard',
            method: () => {
              location.href = '/#/dashboard'
            }
          },
          {
            id: 2,
            name: 'Logout',
            icon: 'mdi-exit-to-app',
            method: () => this.$store.dispatch('logout').then(response => {
              this.$router.go()
            })
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
  },
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>
