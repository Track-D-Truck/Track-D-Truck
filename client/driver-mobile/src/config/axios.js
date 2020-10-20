import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.43.167:3000'
})

export default instance