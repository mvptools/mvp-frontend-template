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
            :to="link.path"
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
    links () {
      return [
        {
          id: 1,
          name: 'Login',
          path: '/login',
          icon: 'mdi-account'
        },
        {
          id: 2,
          name: 'Sign Up',
          path: '/signup',
          icon: 'mdi-account-plus'
        }
      ]
    }
  }
}
</script>
