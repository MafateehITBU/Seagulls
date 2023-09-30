import axios from 'axios'

const request = axios.create({
    baseURL: 'https://api.tekramit.com/api/'
})


export default request

