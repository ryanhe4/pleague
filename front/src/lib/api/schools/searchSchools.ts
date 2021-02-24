import client from '../client'

export async function searchSchools(keyword: string) {
  const response = await client.get<SearchSchoolsResult[]>(`/api/auth/search/school/${keyword}`)

  return response.data
}

export type SearchSchoolsResult = {
  schoolName: string,
  adres: string | null,
  region: string | null,
  id?: number
}
