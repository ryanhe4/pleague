import axios from 'axios'

const careerClient = axios.create({
  baseURL: 'http://www.career.go.kr/cnet/openapi'
})


export default careerClient
