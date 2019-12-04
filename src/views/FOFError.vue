<template>
  <div id="fof-error">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="12">
            <div class="content">
              <h1 class="display-2">404</h1>
              <p class="headline">Page not found</p>
              <v-btn
                color="primary"
                to="/">
                  Go Home
              </v-btn>
            </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'FOFError'
}
</script>

<style lang="scss" scoped>
  .content {
    text-align: center;
  }
</style>
