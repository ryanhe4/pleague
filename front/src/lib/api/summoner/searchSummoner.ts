import client from '../client'

export type summonerEntryType = {
  leagueId: string
  queueType: 'RANKED_SOLO_5X5' | string
  tier: string
  rank: string
  summonerId: string
  summonerName: string
  leaguePoints: number
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
}

export type searchSummonerType = {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionData: number
  summonerLevel: number
  "0"?: summonerEntryType
  "1"?: summonerEntryType
}


//keyword : summoner name
export async function searchSummoner(keyword: string) {
  const { data } = await client.get<searchSummonerType>(`/api/auth/search/summoner/${keyword}`)
  return data
}
