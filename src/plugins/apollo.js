import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'

Vue.use(VueApollo)

// Name Of The Token In localStorage
const AUTH_TOKEN = 'apollo-token'

// Name Of The User In localStorage
const AUTH_USER = 'apollo-user'

// HTTP Endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost/graphql'

// Files URL Root
export const filesRoot = process.env.VUE_APP_FILES_ROOT || httpEndpoint.substr(0, httpEndpoint.indexOf('/graphql'))

Vue.prototype.$filesRoot = filesRoot

const defaultOptions = {
  httpEndpoint,
  wsEndpoint: null,
  tokenName: AUTH_TOKEN,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  getAuth: () => {
    return 'bearer ' + JSON.parse(localStorage.getItem(AUTH_TOKEN)).api_token
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

// On User Login
export async function onLogin (apolloClient, data) {
  if (typeof localStorage !== 'undefined' && data) {
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(data.token))
    localStorage.setItem(AUTH_USER, JSON.stringify(data.user))
  }

  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

// On User Logout
export async function onLogout (apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem(AUTH_USER)
  }

  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
}
