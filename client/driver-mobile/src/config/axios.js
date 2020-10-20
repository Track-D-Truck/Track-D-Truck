import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.68.100:3000'
})

export default instance