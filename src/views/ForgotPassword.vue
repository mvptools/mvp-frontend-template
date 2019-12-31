<template>
  <div id="verify">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="12">
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
                    label="New Password"
                    v-model="password_reset.password"
                    type="password">
                  </v-text-field>
                  <v-text-field
                    label="Confirm New Password"
                    v-model="password_reset.password_confirmation"
                    type="password">
                  </v-text-field>
                  <v-btn
                    color="primary"
                    type="submit">
                      Update Password
                  </v-btn>
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
  name: 'ForgotPassword',
  data: () => ({
    email_sent: false,
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
      this.$store.dispatch('password_reset', this.password_reset)
    },
    sendPasswordReset () {
      this.$store.dispatch('send_password_reset', this.login).then(() => {
        this.email_sent = true
      }).catch(error => {
        console.log(error)
        this.email_sent = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.password_reset.token = to.params.token
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
