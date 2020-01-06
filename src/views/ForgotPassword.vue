<template>
  <div id="verify">
    <v-container fluid>
      <v-row>
        <v-col md12>
          <v-card>
            <v-card-title>
              Password Reset
            </v-card-title>
            <v-card-text v-if="!hasToken && !email_sent">
              <v-form @submit.prevent="sendPasswordReset">
                <v-text-field
                  label="Email/Username"
                  type="text"
                  v-model="login">
                </v-text-field>
                <v-btn
                  color="primary"
                  type="submit">
                    Send Password Reset Link
                  </v-btn>
              </v-form>
            </v-card-text>
            <v-card-text v-if="!hasToken && email_sent">
              <p>
                A password reset link has been sent to your email.
              </p>
              <v-btn
                color="primary"
                type="button"
                @click="sendPasswordReset">
                  Resend Email
              </v-btn>
            </v-card-text>
            <v-card-text v-if="hasToken">
              <v-form @submit.prevent="passwordReset">
                <v-text-field
                  :error-messages="error.password"
                  label="New Password"
                  v-model="password_reset.password"
                  type="password">
                </v-text-field>
                <v-text-field
                  :error-messages="error.password_confirmation"
                  label="Confirm New Password"
                  v-model="password_reset.password_confirmation"
                  type="password">
                </v-text-field>
                <v-row>
                  <v-col md12>
                    <v-btn
                      color="primary"
                      type="submit">
                        Update Password
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
import axios from '@/plugins/axios'
import sendpasswordreset from '@/graphql/sendpasswordreset.gql'

export default {
  name: 'ForgotPassword',
  data: () => ({
    email_sent: false,
    error: {
      token: '',
      password: '',
      password_confirmation: ''
    },
    login: '',
    password_reset: {
      token: '',
      password: '',
      password_confirmation: ''
    }
  }),
  computed: {
    hasToken () {
      return this.$route.params.token !== undefined
    }
  },
  methods: {
    passwordReset () {
      this.password_reset.token = this.$route.params.token

      this.$store.dispatch('password_reset', this.password_reset).then(response => {
        this.$router.go()
      }).catch(error => {
        console.log(error)

        if (error[0].extensions.category === 'auth') {
          this.$router.push('/login')
        }

        if (error[0].extensions.category === 'validation') {
          console.log(error[0].extensions.validation['input.token'])
          this.error.password = error[0].extensions.validation['input.password']
          this.error.password_confirmation = error[0].extensions.validation['input.password_confirmation']
        }
      })
    },
    sendPasswordReset () {
      axios({
        method: 'post',
        data: {
          query: sendpasswordreset,
          variables: {
            login: this.login
          }
        }
      }).then(response => {
        this.email_sent = true
      }).catch(() => {
        this.email_sent = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
