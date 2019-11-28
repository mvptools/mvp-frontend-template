module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)?$/,
          loader: 'webpack-graphql-loader'
        }
      ]
    }
  },
  devServer: {
    disableHostCheck: true
  },
  transpileDependencies: [
    'vuetify'
  ]
}
