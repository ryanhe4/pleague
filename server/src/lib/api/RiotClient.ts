import axios from 'axios'

const RiotClient = axios.create({
  baseURL: 'https://kr.api.riotgames.com'
})

export default RiotClient
