<template>
  <div id="signup">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-card>
              <v-card-title>
                Sign Up
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="signupUser">
                  <v-row>
                    <v-col md6>
                      <v-text-field
                        :error-messages="errors.first_name"
                        label="First Name"
                        type="text"
                        v-model="signup.first_name">
                      </v-text-field>
                    </v-col>
                    <v-col md6>
                      <v-text-field
                        :error-messages="errors.last_name"
                        label="Last Name"
                        type="text"
                        v-model="signup.last_name">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                    :error-messages="errors.email"
                    label="Email"
                    type="email"
                    v-model="signup.email">
                  </v-text-field>
                  <v-text-field
                    :error-messages="errors.username"
                    label="Username"
                    type="text"
                    v-model="signup.username">
                  </v-text-field>
                  <v-text-field
                    :error-messages="errors.password"
                    label="Password"
                    type="password"
                    v-model="signup.password">
                  </v-text-field>
                  <v-text-field
                    :error-messages="errors.password_confirmation"
                    label="Confirm Password"
                    type="password"
                    v-model="signup.password_confirmation">
                  </v-text-field>
                  <v-row>
                    <v-col md6>
                      <v-btn
                        color="primary"
                        type="submit"
                        block>
                          Sign Up
                      </v-btn>
                    </v-col>
                    <v-col md6>
                      <v-btn
                        type="button"
                        block
                        to="/login">
                          Have an account? Login
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
  name: 'Signup',
  data: () => ({
    errors: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      password_confirmation: ''
    },
    signup: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      password_confirmation: ''
    }
  }),
  methods: {
    signupUser () {
      this.$store.dispatch('signup', this.signup).then(response => {
        this.$router.go()
      }).catch(error => {
        if (error[0].extensions.category === 'validation') {
          this.errors.first_name = error[0].extensions.validation['input.first_name']
          this.errors.last_name = error[0].extensions.validation['input.last_name']
          this.errors.email = error[0].extensions.validation['input.email']
          this.errors.username = error[0].extensions.validation['input.username']
          this.errors.password = error[0].extensions.validation['input.password']
          this.errors.password_confirmation = error[0].extensions.validation['input.password_confirmation']
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
