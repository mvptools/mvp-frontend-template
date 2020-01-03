<template>
  <div id="home">
    <v-parallax
      src="@/assets/background.jpg"
      dark>
        <v-row
          align="center"
          justify="center">
            <v-col
              class="text-center"
              cols="12"
              md="12">
                <h1 class="display-3">Welcome!</h1>
                <h2 class="headline">{{ appName }}</h2>
            </v-col>
        </v-row>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    appName: process.env.VUE_APP_NAME
  })
}
</script>

<style lang="scss" scoped>
</style>
