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

export type schoolListType = {
  school_name: string,
  address: string | null,
  region: string | null,
  id?: number
  point: number
  created_at: Date
}

export async function schoolLists() {
  const response = await client.get<schoolListType[]>(`/api/rank/schoolLists`)
  return response.data
}
