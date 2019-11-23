module.exports = {
  devServer: {
    disableHostCheck: true
  },
  pluginOptions: {
    apollo: {
      lintGQL: false
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
