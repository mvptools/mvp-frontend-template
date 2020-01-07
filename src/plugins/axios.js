import axios from 'axios'
import isJSON from 'is-json'
import refresh from '@/graphql/refresh.gql'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: isJSON(localStorage.getItem('token'))
    ? {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')).api_token
    }
    : undefined
})

axiosInstance.interceptors.response.use(response => {
  if (response.data.errors !== undefined) {
    if (response.data.errors[0].debugMessage !== 'Unauthenticated.') {
      return Promise.reject(response.data.errors)
    }

    axiosInstance({
      method: 'post',
      data: {
        query: refresh
      }
    }).then(response => {
      localStorage.setItem('token', JSON.stringify(response.data.data.refresh))
    }).catch(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      location.reload()
    })
  }

  return response
})

export default axiosInstance
