<template>
  <div id="password-reset">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-card>
              <v-card-title>
                Update Password
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="updatePassword">
                  <v-text-field
                    label="Old Password"
                    type="password"
                    v-model="password_reset.old_password">
                  </v-text-field>
                  <v-text-field
                    label="New Password"
                    type="password"
                    v-model="password_reset.new_password">
                  </v-text-field>
                  <v-text-field
                    label="Confirm New Password"
                    type="password"
                    v-model="password_reset.new_password_confirmation">
                  </v-text-field>
                  <v-btn
                    color="primary"
                    type="submit"
                    dark>
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
import axios from '@/plugins/axios'
import updatepassword from '@/graphql/updatepassword.gql'

export default {
  name: 'UpdatePassword',
  data: () => ({
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
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
