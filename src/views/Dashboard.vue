<template>
  <div id="dashboard">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="12">
            <h1 class="headline">
              Dashboard
            </h1>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-card
            to="/update-password">
              <v-card-title>
                Update Password
              </v-card-title>
              <v-card-subtitle>
                Update user password.
              </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss" scoped>
</style>
