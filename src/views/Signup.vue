<template>
  <div id="signup">
    <v-container fluid>
      <v-row>
        <v-col md12>
          <v-card>
            <v-card-title>Sign Up</v-card-title>
            <v-card-text>
              <v-form>
                <v-row>
                  <v-col md6>
                    <v-text-field
                      label="First Name"
                      type="text"
                      v-model="signup.first_name">
                    </v-text-field>
                  </v-col>
                  <v-col md6>
                    <v-text-field
                      label="Last Name"
                      type="text"
                      v-model="signup.last_name">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  label="Email"
                  type="email"
                  v-model="signup.email">
                </v-text-field>
                <v-text-field
                  label="Username"
                  type="text"
                  v-model="signup.username">
                </v-text-field>
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="signup.password">
                </v-text-field>
                <v-text-field
                  label="Confirm Password"
                  type="password"
                  v-model="signup.password_confirmation">
                </v-text-field>
                <v-row>
                  <v-col md6>
                    <ApolloMutation
                      :mutation="require('@/graphql/signup.gql')"
                      :variables="signup"
                      @done="signupUser">
                        <template v-slot="{ mutate, loading, error }">
                          <v-btn
                            color="primary"
                            @click="mutate()"
                            :disabled="loading"
                            block>
                              Sign Up
                          </v-btn>
                        </template>
                    </ApolloMutation>
                  </v-col>
                  <v-col md6>
                    <v-btn
                      type="button"
                      block
                      to="/login">
                        Already have an account? Login
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
import { onLogin } from '@/plugins/apollo'

export default {
  name: 'Signup',
  data: () => ({
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
    signupUser (response) {
      onLogin(this.$apollo.provider.defaultClient, response.data.signup)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
