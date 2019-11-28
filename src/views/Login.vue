<template>
  <div id="login">
    <v-container fluid>
      <v-row>
        <v-col md12>
          <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="loginUser">
                <v-text-field
                  label="Email/Username"
                  type="text"
                  v-model="login.login">
                </v-text-field>
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="login.password">
                </v-text-field>
                <v-row>
                  <v-col md6>
                    <v-btn
                      color="primary"
                      type="submit"
                      block>
                        Login
                    </v-btn>
                  </v-col>
                  <v-col md6>
                    <v-btn
                      type="button"
                      block
                      to="/signup">
                        Don't have an account? Sign Up
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    login: {
      login: '',
      password: ''
    }
  }),
  methods: {
    loginUser () {
      this.$store.dispatch('login', this.login)
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
