<template>
  <div id="verify">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-card>
              <v-card-title>
                Welcome to {{ appName }}
              </v-card-title>
              <v-card-text>
                <p>
                  A link to verify your account has been sent to your email.
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  @click="verifyResend">
                    Resend Link
                  </v-btn>
              </v-card-actions>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import verifyresend from '@/graphql/verifyresend.gql'

export default {
  name: 'Verify',
  data: () => ({
    appName: process.env.VUE_APP_NAME
  }),
  computed: {
    hasToken () {
      return this.$route.params.token !== undefined
    }
  },
  methods: {
    verifyResend () {
      axios({
        method: 'post',
        data: {
          query: verifyresend
        }
      }).then(response => {
        this.$router.go()
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('verify', {
        token: to.params.token
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  .content {
    text-align: center;
  }
</style>
