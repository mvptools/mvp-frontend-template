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

export default axiosInstance
