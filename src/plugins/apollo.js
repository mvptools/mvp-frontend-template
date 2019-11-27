import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'
import store from '@/store'

Vue.use(VueApollo)

// HTTP Endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost/graphql'

// Files URL Root
export const filesRoot = process.env.VUE_APP_FILES_ROOT || httpEndpoint.substr(0, httpEndpoint.indexOf('/graphql'))

Vue.prototype.$filesRoot = filesRoot

const defaultOptions = {
  httpEndpoint,
  wsEndpoint: null,
  tokenName: null,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  getAuth: () => {
    return store.getters.authHeader
  }
}

export function createProvider (options = {}) {
  const { apolloClient } = createApolloClient({
    ...defaultOptions,
    ...options
  })

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {},
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    }
  })

  return apolloProvider
}
