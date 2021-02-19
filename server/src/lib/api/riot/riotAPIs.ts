import RiotClient from '../RiotClient'

export async function searchByName(username: string) {
  const response = await RiotClient.get(`/lol/summoner/v4/summoners/by-name/${username}/?api_key=${process.env.RIOT_API_KEY}`)
  return response.data
}

export async function searchBySummoner(id: string) {
  try {
    const response = await RiotClient.get(`/lol/league/v4/entries/by-summoner/${id}/?api_key=${process.env.RIOT_API_KEY}`)
    return response.data
  } catch (e) {
    return {}
  }
}

// TODO Riot Apply return ValueType
