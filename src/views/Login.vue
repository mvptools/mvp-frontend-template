<template>
  <div id="login">
    <v-container fluid>
      <v-row>
        <v-col md12>
          <v-card>
            <v-card-title>
              Login
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="loginUser">
                <v-text-field
                  :error-messages="errors.login"
                  label="Email/Username"
                  type="text"
                  v-model="login.login">
                </v-text-field>
                <v-text-field
                  :error-messages="errors.password"
                  label="Password"
                  type="password"
                  v-model="login.password">
                </v-text-field>
                <v-row>
                  <v-col md12>
                    <v-btn
                      to="/forgot-password"
                      text>
                        Forgot Password?
                    </v-btn>
                  </v-col>
                </v-row>
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
                        Need an account? Sign Up
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
    errors: {
      login: '',
      password: ''
    },
    login: {
      login: '',
      password: ''
    }
  }),
  methods: {
    loginUser () {
      this.$store.dispatch('login', this.login).then(response => {
        this.$router.go()
      }).catch(error => {
        if (error[0].extensions.category === 'auth') {
          this.errors.login = error[0].extensions.reason
          this.errors.password = error[0].extensions.reason
        }

        if (error[0].extensions.category === 'validation') {
          this.errors.login = error[0].extensions.validation['input.login']
          this.errors.password = error[0].extensions.validation['input.password']
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
