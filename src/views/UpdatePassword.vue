<template>
  <div id="password-reset">
    <v-container fluid>
      <v-row>
        <v-col md12>
          <v-card>
            <v-card-title>
              Update Password
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="updatePassword">
                <v-text-field
                  :error-messages="errors.old_password"
                  label="Old Password"
                  type="password"
                  v-model="password_reset.old_password">
                </v-text-field>
                <v-text-field
                  :error-messages="errors.new_password"
                  label="New Password"
                  type="password"
                  v-model="password_reset.new_password">
                </v-text-field>
                <v-text-field
                  :error-messages="errors.new_password_confirmation"
                  label="Confirm New Password"
                  type="password"
                  v-model="password_reset.new_password_confirmation">
                </v-text-field>
                <v-row>
                  <v-col md12>
                    <v-btn
                      color="primary"
                      type="submit"
                      dark>
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
import updatepassword from '@/graphql/updatepassword.gql'

export default {
  name: 'UpdatePassword',
  data: () => ({
    errors: {
      old_password: '',
      new_password: '',
      new_password_confirmation: ''
    },
    password_reset: {
      old_password: '',
      new_password: '',
      new_password_confirmation: ''
    }
  }),
  methods: {
    updatePassword () {
      axios({
        method: 'post',
        data: {
          query: updatepassword,
          variables: this.password_reset
        }
      }).then(response => {
        this.$router.push('/dashboard')
      }).catch(error => {
        if (error[0].extensions.category === 'auth') {
          this.errors.old_password = error[0].extensions.reason
        }

        if (error[0].extensions.category === 'validation') {
          this.errors.old_password = error[0].extensions.validation['input.old_password']
          this.errors.new_password = error[0].extensions.validation['input.new_password']
          this.errors.new_password_confirmation = error[0].extensions.validation['input.new_password_confirmation']
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
