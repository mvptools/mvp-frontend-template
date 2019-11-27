<template>
  <div id="login">
    <v-container fluid>
      <v-row>
        <v-col md12>
          <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <v-form>
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
                    <ApolloMutation
                      :mutation="require('@/graphql/login.gql')"
                      :variables="login"
                      @done="loginUser">
                        <template v-slot="{ mutate, loading, error }">
                          <v-btn
                            color="primary"
                            @click="mutate()"
                            :disabled="loading"
                            block>
                              Login
                          </v-btn>
                        </template>
                    </ApolloMutation>
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
    loginUser (response) {
      this.$store.dispatch('login', response.data.login)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
