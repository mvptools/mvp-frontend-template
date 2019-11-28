import { GraphQLClient } from 'graphql-request'
import isJSON from 'is-json'

const graphql = new GraphQLClient(process.env.VUE_APP_API_URL, {
  headers: isJSON(localStorage.getItem('token'))
    ? {
      Authorization: JSON.parse(localStorage.getItem('token')).api_token
    }
    : undefined
})

export default graphql
