import client from '../client'
import { SearchSchoolsResult } from '../schools/searchSchools'

export async function sendValidationCode(data: { email: string }) {
  const response = await client.post('/api/auth/sendmail', data)
  return response.data
}

export async function checkValidationCode(data: { email: string, code: string }) {
  const response = await client.post('/api/auth/checkcode', data)
  return response.data
}

export type summonerForm = {
  id: string
  name: string
  profileIconId: number
  summonerLevel: number
  tier?: string
  rank?: string
  leaguePoints?: number
}

export type registerFormType = {
  name: string
  email: string
  password: string
  school: SearchSchoolsResult | null
  summoner: summonerForm | null
}

export async function register(data: registerFormType) {
  const response = await client.post('/api/auth/register', data)
  return response.data
}

export type loginData = {
  email: string
  password: string
}


export async function login(data: loginData) {
  try {
    const response = await client.post('/api/auth/login', data)
    return response.data
  } catch (e) {
    throw e.response.data
  }
}

export async function check() {
  const response = await client.get('/api/auth/check')
  return response.data
}

export async function logout() {
  const response = await client.get('/api/auth/logout')
  return response.data
}
