import axios from 'axios'

const request = axios.create({
    baseURL: 'http://api.tekramit.com/api/'
})


export default request

