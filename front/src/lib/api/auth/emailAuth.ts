import client from '../client'

export async function sendValidationCode(data: { email: string }) {
  const response = await client.post('/api/auth/sendmail', data)
  return response.data
}

export async function checkValidationCode(data: { email: string, code: string }) {
  const response = await client.post('/api/auth/checkcode', data)
  return response.data
}
