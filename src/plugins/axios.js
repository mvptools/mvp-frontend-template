import axios from 'axios'
import isJSON from 'is-json'

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
    return Promise.reject(response.data.errors)
  }

  return response
})

export default axiosInstance
